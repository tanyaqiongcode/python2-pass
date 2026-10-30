/* ============================================================
 * 判题引擎：Pyodide（Web Worker 优先，主线程回退）
 * - Worker 模式：判题不阻塞界面；主线程按 deadline 强制 terminate，
 *   彻底解决"底层调用无法被 settrace 打断"的挂死问题
 * - 主线程回退：file:// 等不支持 Worker 的环境下自动降级（行为一致）
 * - 两端共用同一份 HARNESS_PY / TURTLE_SHIM_SRC
 * - turtle：画布可用时直接绘制；不可用（Worker）时录制绘图命令，
 *   由主线程回放到 canvas
 * ============================================================ */

/* ---------- 注入 Pyodide 的判题 harness（与 tools/harness.py 行为一致） ---------- */
const HARNESS_PY = `
import sys, io, time, builtins, traceback, os

class _Watchdog(Exception):
    pass

class _Ctx:
    __slots__ = ('inputs', 'i', 'events', 'deadline', 'max_events', 'prompts', 'ops', 'duration')

def _run_user(code, stdin_text, timeout_s=8.0, max_events=2000000, canvas_id=None, ops=None):
    ctx = _Ctx()
    ctx.inputs = stdin_text.split('\\n') if stdin_text != '' else []
    if ctx.inputs and ctx.inputs[-1] == '':
        ctx.inputs.pop()
    ctx.i = 0
    ctx.events = 0
    ctx.max_events = max_events
    ctx.deadline = time.monotonic() + timeout_s
    ctx.prompts = []
    ctx.ops = ops if ops is not None else []

    out = io.StringIO()

    def _input(prompt=''):
        if prompt:
            ctx.prompts.append(str(prompt))
        if ctx.i >= len(ctx.inputs):
            raise EOFError('程序请求输入，但测试输入已用完（请检查 input() 调用次数或输入数据）')
        v = ctx.inputs[ctx.i]
        ctx.i += 1
        return v

    def _trace(frame, event, arg):
        ctx.events += 1
        if ctx.events > ctx.max_events or time.monotonic() > ctx.deadline:
            raise _Watchdog('执行超时：程序运行时间过长或存在死循环（判题已中止）')
        return _trace

    env = {'__name__': '__main__', 'input': _input, 'raw_input': _input}

    # 重型库预导入：在看门狗追踪开始前完成，避免 import 本身触发超时
    try:
        if 'matplotlib' in code:
            import matplotlib
            matplotlib.use('Agg')
            import numpy  # noqa
    except Exception:
        pass

    # turtle 支持：注册 canvas 版 turtle 模块（无 DOM 时录制绘图命令）
    _turtle_mod = None
    try:
        import turtle_shim
        _turtle_mod = turtle_shim.make_turtle(canvas_id, ctx.ops)
        if _turtle_mod is not None:
            env['turtle'] = _turtle_mod
            sys.modules['turtle'] = _turtle_mod
    except Exception:
        _turtle_mod = None

    _t0 = time.monotonic()
    saved_stdin = sys.stdin
    saved_stdout = sys.stdout
    saved_path = sys.path[:]
    _cwd = os.getcwd()
    if _cwd not in saved_path:
        sys.path.insert(0, _cwd)  # 数据目录中的模块可 import
    sys.stdin = io.StringIO(stdin_text)
    sys.stdout = out
    old_input = builtins.input
    builtins.input = _input
    err = ''
    tb = ''
    try:
        sys.settrace(_trace)
        try:
            exec(compile(code, '<student>', 'exec'), env)
        finally:
            sys.settrace(None)
    except _Watchdog as w:
        err = str(w)
    except EOFError as e:
        err = '输入不足：' + str(e)
    except SystemExit:
        pass
    except BaseException as e:
        err = e.__class__.__name__ + ': ' + str(e)
        tb = ''.join(traceback.format_exception_only(type(e), e)).strip()
        try:
            _frames = traceback.extract_tb(sys.exc_info()[2])
            _user_frames = [f for f in _frames if f.filename == '<student>']
            if _user_frames:
                tb = 'File "<student>", line ' + str(_user_frames[-1].lineno) + '\\n' + tb
        except Exception:
            pass
    finally:
        ctx.duration = int((time.monotonic() - _t0) * 1000)
        builtins.input = old_input
        sys.stdin = saved_stdin
        sys.stdout = saved_stdout
        sys.path[:] = saved_path
        if _turtle_mod is not None:
            try:
                del sys.modules['turtle']
            except Exception:
                pass

    return {'ok': err == '', 'stdout': out.getvalue(), 'prompts': '\\n'.join(ctx.prompts),
            'error': err, 'tb': tb, 'canvasOps': ctx.ops, 'durationMs': ctx.duration}
`;

/* ============================================================
 * turtle 画布模拟 / 命令录制（同一份源码，两种模式）
 * - 主线程模式：cid 对应的宿主里有真实 canvas，直接绘制
 * - Worker 模式：无 DOM，绘制调用转为 canvasOps 命令，主线程回放
 * ============================================================ */
const TURTLE_SHIM_SRC = `
import math, types

def _install(js):
    class _Canvas:
        def __init__(self, cid, ops):
            self.ops = ops if ops is not None else []
            self.cv = None
            self.ctx = None
            host = None
            try:
                doc = js.document
                if cid and doc is not None:
                    host = doc.getElementById(cid)
            except Exception:
                host = None
            if host is not None:
                cv = doc.createElement('canvas')
                cv.width = 480
                cv.height = 360
                cv.setAttribute('data-turtle', '1')
                cv.style.background = '#fff'
                cv.style.border = '1px solid #d5dde7'
                cv.style.maxWidth = '100%'
                host.appendChild(cv)
                self.cv = cv
                self.ctx = cv.getContext('2d')

        def _rec(self, **kw):
            self.ops.append(kw)

        def line(self, x1, y1, x2, y2, color, width=2):
            if self.ctx is not None:
                c = self.ctx
                c.strokeStyle = color
                c.lineWidth = width
                c.beginPath()
                c.moveTo(240 + x1, 180 - y1)
                c.lineTo(240 + x2, 180 - y2)
                c.stroke()
            else:
                self._rec(op='line', x1=240 + x1, y1=180 - y1, x2=240 + x2, y2=180 - y2, color=color, width=width)

        def dot(self, x, y, color, r=3):
            if self.ctx is not None:
                c = self.ctx
                c.fillStyle = color
                c.beginPath()
                c.arc(240 + x, 180 - y, r, 0, 2 * math.pi)
                c.fill()
            else:
                self._rec(op='dot', x=240 + x, y=180 - y, color=color, r=r)

        def poly(self, pts, color):
            if self.ctx is not None:
                if len(pts) < 3:
                    return
                c = self.ctx
                c.fillStyle = color
                c.beginPath()
                c.moveTo(240 + pts[0][0], 180 - pts[0][1])
                for px, py in pts[1:]:
                    c.lineTo(240 + px, 180 - py)
                c.closePath()
                c.fill()
            else:
                self._rec(op='poly', pts=[(240 + px, 180 - py) for px, py in pts], color=color)

        def text(self, x, y, s, color):
            if self.ctx is not None:
                c = self.ctx
                c.fillStyle = color
                c.font = '14px monospace'
                c.fillText(str(s), 240 + x, 180 - y)
            else:
                self._rec(op='text', x=240 + x, y=180 - y, s=str(s), color=color)

    class Turtle:
        def __init__(self, cid=None, ops=None):
            self.wrap = _Canvas(cid, ops)
            self.x, self.y, self._hd = 0.0, 0.0, 0.0
            self.pen_down = True
            self.color_v = '#000000'
            self.fillcolor_v = '#000000'
            self.filling = False
            self.fill_pts = []
            self.speed_v = 6

        def _seg(self, nx, ny):
            if self.pen_down:
                self.wrap.line(self.x, self.y, nx, ny, self.color_v)
            self.x, self.y = nx, ny

        def forward(self, d):
            r = math.radians(self._hd)
            self._seg(self.x + d * math.cos(r), self.y + d * math.sin(r))
        fd = forward

        def backward(self, d):
            self.forward(-d)
        bk = back = backward

        def right(self, a):
            self._hd -= float(a)
        rt = right

        def left(self, a):
            self._hd += float(a)
        lt = left

        def goto(self, x, y=None):
            if y is None:
                x, y = x
            self._seg(float(x), float(y))
        setpos = setposition = goto

        def setx(self, x):
            self._seg(float(x), self.y)

        def sety(self, y):
            self._seg(self.x, float(y))

        def setheading(self, a):
            self._hd = float(a)
        seth = setheading

        def home(self):
            self.goto(0, 0)
            self.setheading(0)

        def circle(self, r, extent=None, steps=None):
            r = float(r)
            extent = 360.0 if extent is None else float(extent)
            steps = steps or max(8, int(abs(extent) / 5))
            if abs(r) < 1e-9:
                return
            cx = self.x + r * math.cos(math.radians(self._hd + 90))
            cy = self.y + r * math.sin(math.radians(self._hd + 90))
            a0 = math.radians(self._hd - 90)
            for i in range(1, steps + 1):
                a = a0 + math.radians(extent) * i / steps
                nx = cx + abs(r) * math.cos(a)
                ny = cy + abs(r) * math.sin(a)
                if r >= 0:
                    self._seg(nx, ny)
                else:
                    self._seg(2 * self.x - nx, 2 * self.y - ny)
            self._hd += extent

        def dot(self, size=1, color=None):
            self.wrap.dot(self.x, self.y, color or self.color_v, max(2, float(size) / 2))

        def penup(self):
            self.pen_down = False
        pu = up = penup

        def pendown(self):
            self.pen_down = True
        pd = down = pendown

        def pencolor(self, *a):
            if a:
                self.color_v = a[0] if len(a) == 1 else '#%02x%02x%02x' % tuple(a)
            return self.color_v

        def fillcolor(self, *a):
            if a:
                self.fillcolor_v = a[0] if len(a) == 1 else '#%02x%02x%02x' % tuple(a)
            return self.fillcolor_v

        def color(self, *a):
            if a:
                self.pencolor(*a[:1])
                if len(a) > 1:
                    self.fillcolor(a[1])
            return (self.color_v, self.fillcolor_v)

        def begin_fill(self):
            self.filling = True
            self.fill_pts = [(self.x, self.y)]

        def end_fill(self):
            if self.filling:
                self.wrap.poly(self.fill_pts, self.fillcolor_v)
            self.filling = False
            self.fill_pts = []

        def write(self, s, *a, **k):
            self.wrap.text(self.x, self.y, str(s), self.color_v)

        def heading(self):
            return self._hd

        def speed(self, s):
            self.speed_v = s

        def hideturtle(self):
            pass
        ht = hideturtle

        def showturtle(self):
            pass
        st = showturtle

        def tracer(self, *a):
            pass

        def update(self):
            pass

        def done(self):
            pass

        def exitonclick(self):
            pass

        def mainloop(self):
            pass

        def screensize(self, *a):
            pass

        def setup(self, *a, **k):
            pass

        def title(self, *a):
            pass

        def bgcolor(self, *a):
            pass

        def colormode(self, *a):
            pass

        def mode(self, *a):
            pass

        def reset(self):
            self.x, self.y, self._hd = 0.0, 0.0, 0.0
            self.pen_down = True

        def clear(self):
            pass

        def position(self):
            return (self.x, self.y)
        pos = position

        def xcor(self):
            return self.x

        def ycor(self):
            return self.y

        def towards(self, *a):
            return 0.0

        def distance(self, *a):
            return 0.0

        def pen(self, *a, **k):
            pass

        def isdown(self):
            return self.pen_down

        def isvisible(self):
            return True

        def window_width(self):
            return 480

        def window_height(self):
            return 360

    class Screen:
        def __getattr__(self, name):
            def _noop(*a, **k):
                return None
            return _noop

    def make_turtle_module(cid, ops):
        mod = types.ModuleType('turtle')
        state = {'t': None}

        # 类实例默认绑定模块的画布 cid 与命令列表
        _BaseTurtle = Turtle

        class TurtleWithCanvas(_BaseTurtle):
            def __init__(self, c=None, o=None):
                _BaseTurtle.__init__(self, cid if c is None else c, ops if o is None else o)

        def _get():
            if state['t'] is None:
                state['t'] = TurtleWithCanvas(cid, ops)
            return state['t']

        def _module_getattr(name):
            t = _get()
            return getattr(t, name)

        mod.__getattr__ = _module_getattr
        mod.Turtle = TurtleWithCanvas
        mod.Pen = TurtleWithCanvas
        mod.RawTurtle = TurtleWithCanvas
        mod.Screen = Screen
        mod.getscreen = lambda *a, **k: Screen()
        names = ['Turtle', 'Pen', 'RawTurtle', 'Screen', 'getscreen', 'forward', 'fd',
                 'backward', 'bk', 'back', 'right', 'rt', 'left', 'lt', 'goto', 'setpos',
                 'setposition', 'setx', 'sety', 'setheading', 'seth', 'home', 'circle',
                 'dot', 'penup', 'pu', 'up', 'pendown', 'pd', 'down', 'pencolor',
                 'fillcolor', 'color', 'begin_fill', 'end_fill', 'write', 'speed',
                 'hideturtle', 'ht', 'showturtle', 'st', 'tracer', 'update', 'done',
                 'exitonclick', 'mainloop', 'screensize', 'setup', 'title', 'bgcolor',
                 'colormode', 'reset', 'clear', 'position', 'pos', 'xcor', 'ycor',
                 'towards', 'distance', 'pen', 'isdown', 'isvisible', 'window_width',
                 'window_height', 'heading']
        mod.__all__ = names
        return mod

    return make_turtle_module

def make_turtle(cid, ops=None):
    import js
    factory = _install(js)
    return factory(cid, ops)
`;

/* ---------- 浏览器端无法支持的库 → 中文提示 ---------- */
const UNSUPPORTED = {
  jieba: 'jieba 分词库无法在浏览器判题环境中加载（官方只有源码包，无 wheel）。本题为“读代码理解”题：请对照参考答案，掌握“jieba.lcut 分词 → 字典计数 → sorted 排序”的套路即可。',
  wordcloud: 'wordcloud 词云库无法在浏览器判题环境中安装（含 C 扩展）。本题为“读代码理解”题：请对照参考答案掌握套路。',
  tkinter: 'tkinter 窗口库无法在浏览器中运行。GUI 题为读代码理解题，请对照参考答案。'
};

function unsupportedCheck(code) {
  for (const [mod, msg] of Object.entries(UNSUPPORTED)) {
    if (new RegExp('\\bimport\\s+' + mod + '\\b|\\bfrom\\s+' + mod + '\\b').test(code)) {
      return '⚠ ' + msg;
    }
  }
  return null;
}

/* 浏览器端也可安装的第三方库 */
function detectPackages(code) {
  const pkgs = [];
  if (/\bimport\s+matplotlib|from\s+matplotlib\b/.test(code)) pkgs.push('matplotlib');
  if (/\bimport\s+openpyxl|from\s+openpyxl\b/.test(code)) pkgs.push('openpyxl');
  return pkgs;
}

/* ---------- Worker 源码（Blob 构造；内嵌 harness 与 turtle shim） ---------- */
function buildWorkerSource(cdns, pins) {
  return `
let pyodide = null;
const CDNS = ${JSON.stringify(cdns)};
const PINS = ${JSON.stringify(pins)};

function detectPackages(code) {
  const pkgs = [];
  if (/\\bimport\\s+matplotlib|from\\s+matplotlib\\b/.test(code)) pkgs.push('matplotlib');
  if (/\\bimport\\s+openpyxl|from\\s+openpyxl\\b/.test(code)) pkgs.push('openpyxl');
  return pkgs;
}

self.onmessage = async (e) => {
  const msg = e.data;
  if (msg.type === 'init') {
    // Pyodide 314 仅支持 ES Module 形式在 Worker 中运行（classic worker 会抛
    // "Classic web workers are not supported"），故本 Worker 以 type:module 创建
    const initErrors = [];
    for (const base of CDNS) {
      try {
        const mod = await import(base + 'pyodide.mjs');
        self.pyodide = await mod.loadPyodide({ indexURL: base });
        break;
      } catch (err) {
        initErrors.push(base + ' -> ' + String(err && err.message || err).slice(0, 160));
        self.pyodide = null;
      }
    }
    if (!self.pyodide) { postMessage({ type: 'initFail', errors: initErrors }); return; }
    self.pyodide.runPython(${JSON.stringify(HARNESS_PY)});
    self.pyodide.globals.set('_turtle_src', ${JSON.stringify(TURTLE_SHIM_SRC)});
    self.pyodide.runPython(\`
import sys, types
_mod = types.ModuleType('turtle_shim')
exec(compile(_turtle_src, 'turtle_shim.py', 'exec'), _mod.__dict__)
sys.modules['turtle_shim'] = _mod
del _turtle_src
\`);
    postMessage({ type: 'ready', version: self.pyodide.version });
    return;
  }
  if (msg.type === 'run') {
    const { id, code, stdin, files, timeoutS, maxEvents, mountId } = msg;
    try {
      for (const p of detectPackages(code)) {
        if (p === 'matplotlib') await self.pyodide.loadPackage('matplotlib');
        else {
          await self.pyodide.loadPackage('micropip');
          const spec = PINS[p] ? (p + '==' + PINS[p]) : p;
          await self.pyodide.runPythonAsync('import micropip; await micropip.install(' + JSON.stringify(spec) + ')');
        }
      }
      if (files && files.length) {
        self.pyodide.runPython("import os; os.makedirs('/home/pyodide/data', exist_ok=True); os.chdir('/home/pyodide/data')");
        for (const f of files) {
          self.pyodide.globals.set('_fname', f.name);
          self.pyodide.globals.set('_fcontent', f.content);
          self.pyodide.globals.set('_fb64', !!f.b64);
          self.pyodide.runPython(\`
import base64 as _b64mod, os as _osmod
_p = '/home/pyodide/data'
for seg in _fname.split('/')[:-1]:
    _p = _p + '/' + seg
    _osmod.makedirs(_p, exist_ok=True)
if _fb64:
    with open('/home/pyodide/data/' + _fname, 'wb') as _f:
        _f.write(_b64mod.b64decode(_fcontent))
else:
    with open('/home/pyodide/data/' + _fname, 'w', encoding='utf-8') as _f:
        _f.write(_fcontent)
\`);
        }
        self.pyodide.globals.set('_fname', null);
        self.pyodide.globals.set('_fcontent', null);
        self.pyodide.globals.set('_fb64', null);
      }
      let timeoutS2 = timeoutS || 8;
      let maxEvents2 = maxEvents || 2000000;
      if (/\\bimport\\s+matplotlib|from\\s+matplotlib\\b/.test(code)) {
        timeoutS2 = Math.max(timeoutS2, 60);
        maxEvents2 = Math.max(maxEvents2, 100000000);
      }
      const py = self.pyodide;
      py.globals.set('_code', code);
      py.globals.set('_stdin', stdin || '');
      py.globals.set('_timeout', timeoutS2);
      py.globals.set('_maxev', maxEvents2);
      py.globals.set('_cid', mountId || null);
      py.runPython('_ops = []');
      const raw = py.runPython('_run_user(_code, _stdin, _timeout, _maxev, _cid, _ops)');
      const obj = raw.toJs({ dict_converter: Object.fromEntries });
      raw.destroy();
      const opsProxy = py.globals.get('_ops');
      const ops = opsProxy ? opsProxy.toJs({ dict_converter: Object.fromEntries }) : [];
      if (opsProxy) opsProxy.destroy();
      postMessage({ type: 'result', id, ok: obj.ok, stdout: obj.stdout, prompts: obj.prompts,
                    error: obj.error, tb: obj.tb, canvasOps: ops });
    } catch (e) {
      postMessage({ type: 'result', id, ok: false, stdout: '', prompts: '', error: String(e && e.message || e), tb: '', canvasOps: [] });
    }
  }
};
`;
}

/* ---------- 主线程：把 turtle 命令回放到 canvas ---------- */
function renderTurtleOps(mount, ops) {
  if (!mount || !ops || !ops.length) return;
  const cv = document.createElement('canvas');
  cv.width = 480; cv.height = 360;
  cv.setAttribute('data-turtle', '1');
  cv.style.background = '#fff';
  cv.style.border = '1px solid #d5dde7';
  cv.style.maxWidth = '100%';
  mount.appendChild(cv);
  const c = cv.getContext('2d');
  for (const o of ops) {
    if (o.op === 'line') {
      c.strokeStyle = o.color; c.lineWidth = o.width || 2;
      c.beginPath(); c.moveTo(o.x1, o.y1); c.lineTo(o.x2, o.y2); c.stroke();
    } else if (o.op === 'dot') {
      c.fillStyle = o.color; c.beginPath(); c.arc(o.x, o.y, o.r, 0, Math.PI * 2); c.fill();
    } else if (o.op === 'poly') {
      if (!o.pts || o.pts.length < 3) continue;
      c.fillStyle = o.color; c.beginPath();
      c.moveTo(o.pts[0][0], o.pts[0][1]);
      for (let i = 1; i < o.pts.length; i++) c.lineTo(o.pts[i][0], o.pts[i][1]);
      c.closePath(); c.fill();
    } else if (o.op === 'text') {
      c.fillStyle = o.color; c.font = '14px monospace'; c.fillText(o.s, o.x, o.y);
    }
  }
}

/* ============================================================
 * Engine：Worker 优先，主线程回退
 * ============================================================ */
const Engine = {
  status: 'idle',        // idle | loading | ready | error
  mode: null,            // 'worker' | 'main'
  pyodide: null,         // 主线程模式下的实例
  worker: null,
  _loadingPromise: null,
  _pending: new Map(),   // runId -> {resolve, timer}
  _runSeq: 0,

  chip(text, cls) {
    const el = document.getElementById('engine-chip');
    if (!el) return;
    el.textContent = text;
    el.className = 'chip' + (cls ? ' ' + cls : '');
  },

  async ensure() {
    if (this.status === 'ready') return true;
    if (this._loadingPromise) return this._loadingPromise;
    this._loadingPromise = this._load();
    return this._loadingPromise;
  },

  _resolveCDNs() {
    return window.CONFIG.pyodideCDNs.map(c =>
      c === 'LOCAL' ? new URL('vendor/pyodide/', document.baseURI).href : c);
  },

  async _load() {
    this.status = 'loading';
    this.chip('判题引擎：加载中…');
    // 1) 优先 Worker：判题不阻塞界面，且可被主线程强制终止
    if (typeof Worker !== 'undefined' && typeof Blob !== 'undefined') {
      try {
        const ok = await this._loadWorker();
        if (ok) {
          this.mode = 'worker';
          this.status = 'ready';
          this.chip('判题引擎：就绪 ✓（后台线程）', 'chip-ok');
          return true;
        }
      } catch (e) {
        console.warn('Worker 引擎初始化失败，回退主线程', e);
      }
    }
    // 2) 主线程回退（file:// 等）
    try {
      const ok = await this._loadMain();
      if (ok) {
        this.mode = 'main';
        this.status = 'ready';
        this.chip('判题引擎：就绪 ✓（主线程降级——个别代码可能阻塞页面）', 'chip-warn');
        return true;
      }
    } catch (e) {
      console.warn('主线程引擎初始化失败', e);
    }
    this.status = 'error';
    this.chip('判题引擎：加载失败（可用“对照自评”模式）', 'chip-err');
    this._loadingPromise = null;
    return false;
  },

  /* ---- Worker 模式 ---- */
  _loadWorker() {
    return new Promise((resolve) => {
      let settled = false;
      const finish = (ok) => { if (!settled) { settled = true; resolve(ok); } };
      let worker;
      let src;
      try {
        src = buildWorkerSource(window.CONFIG.pyodideCDNs, window.CONFIG.packagePins || {});
        worker = new Worker(URL.createObjectURL(new Blob([src], { type: 'application/javascript' })), { type: 'module' });
      } catch (e) { finish(false); return; }
      const initTimer = setTimeout(() => { finish(false); worker.terminate(); }, 180000);
      worker.onmessage = (e) => {
        const m = e.data;
        if (m.type === 'ready') {
          clearTimeout(initTimer);
          this.worker = worker;
          worker.onmessage = (ev) => this._onWorkerMessage(ev.data);
          finish(true);
        } else if (m.type === 'initFail') {
          clearTimeout(initTimer);
          console.warn('Worker 内 Pyodide 初始化失败：', m.errors);
          worker.terminate();
          finish(false);
        }
      };
      worker.onerror = (e) => {
        clearTimeout(initTimer);
        if (!settled) { finish(false); worker.terminate(); }
      };
      worker.postMessage({ type: 'init' });
    });
  },

  _onWorkerMessage(m) {
    if (m.type === 'result') {
      const p = this._pending.get(m.id);
      if (p) {
        clearTimeout(p.timer);
        this._pending.delete(m.id);
        p.resolve({ ok: m.ok, stdout: m.stdout, prompts: m.prompts, error: m.error, tb: m.tb,
          canvasOps: m.canvasOps || [], hasCanvas: (m.canvasOps || []).length > 0 });
      }
    }
  },

  /* ---- 主线程模式 ---- */
  _loadMain() {
    return new Promise((resolve) => {
      let settled = false;
      const finish = (ok) => { if (!settled) { settled = true; resolve(ok); } };
      const cdns = this._resolveCDNs();
      const tryNext = async (idx) => {
        if (idx >= cdns.length) { finish(false); return; }
        const base = cdns[idx];
        try {
          await this._loadScript(base + 'pyodide.js');
          const py = await window.loadPyodide({ indexURL: base });
          this.pyodide = py;
          py.runPython(HARNESS_PY);
          py.globals.set('_turtle_src', TURTLE_SHIM_SRC);
          py.runPython(`
import sys, types
_mod = types.ModuleType('turtle_shim')
exec(compile(_turtle_src, 'turtle_shim.py', 'exec'), _mod.__dict__)
sys.modules['turtle_shim'] = _mod
del _turtle_src
`);
          finish(true);
        } catch (e) {
          console.warn('Pyodide CDN 失败，尝试下一个源', base, e);
          tryNext(idx + 1);
        }
      };
      tryNext(0);
    });
  },

  _loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('脚本加载失败: ' + src));
      document.head.appendChild(s);
    });
  },

  /* ---- 运行入口（两种模式同形） ---- */
  async run(code, opts = {}) {
    const unsup = unsupportedCheck(code);
    if (unsup) {
      return { ok: false, stdout: '', prompts: '', error: unsup, hasCanvas: false, canvasOps: [] };
    }
    const ready = await this.ensure();
    if (!ready) {
      return { ok: false, stdout: '', prompts: '', error: '判题引擎未加载（需联网首次加载，约 10~20MB）', hasCanvas: false, canvasOps: [] };
    }
    let timeoutS = opts.timeoutS || 8;
    let maxEvents = opts.maxEvents || 2000000;
    if (/\bimport\s+matplotlib|from\s+matplotlib\b/.test(code)) {
      timeoutS = Math.max(timeoutS, 60);
      maxEvents = Math.max(maxEvents, 100000000);
    }
    if (this.mode === 'worker') return this._runWorker(code, opts, timeoutS, maxEvents);
    return this._runMain(code, opts, timeoutS, maxEvents);
  },

  _runWorker(code, opts, timeoutS, maxEvents) {
    return new Promise((resolve) => {
      const id = ++this._runSeq;
      let mountId = null;
      if (opts.mount && opts.mount.nodeType) {
        if (!opts.mount.id) opts.mount.id = 'mount-w' + id;
        mountId = opts.mount.id;
      }
      // 主线程 deadline：对 settrace 无法打断的底层调用兜底（强制 terminate）
      const timer = setTimeout(() => {
        this._pending.delete(id);
        if (this.worker) { this.worker.terminate(); this.worker = null; }
        this.status = 'idle';
        this._loadingPromise = null; // 下次 ensure 重新拉起 worker
        resolve({ ok: false, stdout: '', prompts: '', error: '执行超时：已强制重置判题引擎（后台线程模式）', hasCanvas: false, canvasOps: [] });
      }, (timeoutS + 5) * 1000);
      this._pending.set(id, { resolve, timer });
      this.worker.postMessage({ type: 'run', id, code, stdin: opts.stdin || '', files: opts.files || [],
        timeoutS, maxEvents, mountId });
    }).then((res) => {
      if (res.canvasOps && res.canvasOps.length && opts.mount) renderTurtleOps(opts.mount, res.canvasOps);
      return res;
    });
  },

  _runMain(code, opts, timeoutS, maxEvents) {
    return (async () => {
      const withTimeout = (p, ms, what) => Promise.race([
        p,
        new Promise((_, rej) => setTimeout(() => rej(new Error(what + ' 超时（' + Math.round(ms / 1000) + 's）')), ms))
      ]);
      const py = this.pyodide;
      try {
        for (const p of detectPackages(code)) {
          if (p === 'matplotlib') await withTimeout(py.loadPackage('matplotlib'), 120000, '加载 matplotlib');
          else {
            await withTimeout(py.loadPackage('micropip'), 60000, '加载 micropip');
            const pin = (window.CONFIG.packagePins || {})[p];
            const spec = pin ? p + '==' + pin : p;
            await withTimeout(py.runPythonAsync('import micropip; await micropip.install(' + JSON.stringify(spec) + ')'), 120000, '安装 ' + p);
          }
        }
        let mountId = null;
        if (opts.files && opts.files.length) {
          py.runPython("import os; os.makedirs('/home/pyodide/data', exist_ok=True); os.chdir('/home/pyodide/data')");
          for (const f of opts.files) {
            py.globals.set('_fname', f.name);
            py.globals.set('_fcontent', f.content);
            py.globals.set('_fb64', !!f.b64);
            py.runPython(`
import base64 as _b64mod, os as _osmod
_p = '/home/pyodide/data'
for seg in _fname.split('/')[:-1]:
    _p = _p + '/' + seg
    _osmod.makedirs(_p, exist_ok=True)
if _fb64:
    with open('/home/pyodide/data/' + _fname, 'wb') as _f:
        _f.write(_b64mod.b64decode(_fcontent))
else:
    with open('/home/pyodide/data/' + _fname, 'w', encoding='utf-8') as _f:
        _f.write(_fcontent)
`);
          }
          py.globals.set('_fname', null); py.globals.set('_fcontent', null); py.globals.set('_fb64', null);
        }
        if (opts.mount && opts.mount.nodeType) {
          if (!opts.mount.id) opts.mount.id = 'mount-m' + Math.random().toString(36).slice(2, 8);
          mountId = opts.mount.id;
        }
        py.globals.set('_code', code);
        py.globals.set('_stdin', opts.stdin || '');
        py.globals.set('_timeout', timeoutS);
        py.globals.set('_maxev', maxEvents);
        py.globals.set('_cid', mountId);
        py.runPython('_ops = []');
        const raw = py.runPython('_run_user(_code, _stdin, _timeout, _maxev, _cid, _ops)');
        const obj = raw.toJs({ dict_converter: Object.fromEntries });
        raw.destroy();
        obj.canvasOps = [];
        const hostEl = mountId ? document.getElementById(mountId) : null;
        obj.hasCanvas = !!(hostEl && hostEl.querySelector('canvas[data-turtle]'));
        return obj;
      } catch (e) {
        return { ok: false, stdout: '', prompts: '', error: String(e.message || e), hasCanvas: false, canvasOps: [] };
      }
    })();
  }
};
