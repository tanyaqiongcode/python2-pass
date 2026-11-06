"""运行后检查（post-run check）—— 浏览器 Pyodide 与本地 harness 共用同一份源码。

为什么需要：绘图题、写文件题光看 print 输出判不出对错（画错了照样能 print）。
测试点可带 "check" 字段（一段 Python），学生代码运行结束后执行，检查：
  - segs   ：turtle 实际画出的线段 [(x1, y1, x2, y2, color), ...]（turtle 坐标系）
  - mpl    ：matplotlib 图形快照 [{'kind': 'line'|'seg'|'bar', ...}, ...]
  - 写出的文件（read_text / read_bytes / exists）与数据库（db_rows / check_db_rows，新连接只看得到已提交的数据）
  - user   ：学生程序的全局变量；stdin / stdout：本测试点的输入与输出
检查不通过时调用 fail('中文原因')（或 assert 失败），判题显示该原因。

本文件由 tools/build_data.py 原样打包进 js/data.js（window.PY2CHECK_SRC），
浏览器端以模块 py2check 载入，与本地校验逐字节一致。
"""
import math
import os


class CheckFail(Exception):
    pass


def fail(msg):
    raise CheckFail(str(msg))


# ---------------- 颜色 ----------------
_NAMED = {
    'red': (255, 0, 0), 'r': (255, 0, 0), 'green': (0, 128, 0), 'g': (0, 128, 0),
    'lime': (0, 255, 0), 'blue': (0, 0, 255), 'b': (0, 0, 255), 'black': (0, 0, 0),
    'k': (0, 0, 0), 'white': (255, 255, 255), 'w': (255, 255, 255),
    'yellow': (255, 255, 0), 'y': (255, 255, 0), 'orange': (255, 165, 0),
    'purple': (128, 0, 128), 'pink': (255, 192, 203), 'gray': (128, 128, 128),
    'grey': (128, 128, 128), 'brown': (165, 42, 42), 'cyan': (0, 255, 255),
    'c': (0, 255, 255), 'magenta': (255, 0, 255), 'm': (255, 0, 255),
    'darkgreen': (0, 100, 0), 'darkred': (139, 0, 0), 'navy': (0, 0, 128),
    'tab:red': (214, 39, 40), 'tab:green': (44, 160, 44), 'tab:blue': (31, 119, 180),
}


def rgb(c):
    """把 'red' / '#ff0000' / (1, 0, 0) / (255, 0, 0) 统一成 0~255 的 (r, g, b)；认不出返回 None。"""
    if c is None:
        return None
    if isinstance(c, (tuple, list)):
        v = list(c)[:3]
        if len(v) < 3:
            return None
        try:
            v = [float(x) for x in v]
        except (TypeError, ValueError):
            return None
        if all(0 <= x <= 1 for x in v):
            return tuple(int(round(x * 255)) for x in v)
        return tuple(int(round(x)) for x in v)
    s = str(c).strip().lower()
    if s in _NAMED:
        return _NAMED[s]
    if s.startswith('#') and len(s) in (4, 7, 9):
        if len(s) == 4:
            s = '#' + ''.join(ch * 2 for ch in s[1:])
        try:
            return (int(s[1:3], 16), int(s[3:5], 16), int(s[5:7], 16))
        except ValueError:
            return None
    return None


def is_color(c, name):
    """颜色归类判断（宽松）：'red' 接受 red/#f00/#ff0000/(1,0,0)/'r'/'tab:red' 等。"""
    v = rgb(c)
    if v is None:
        return False
    r, g, b = v
    hi, lo = 120, 110
    name = name.lower()
    if name == 'red':
        return r >= hi and g < lo and b < lo
    if name == 'green':
        return g >= hi and r < lo + 20 and b < lo + 20
    if name == 'blue':
        return b >= hi and r < lo and g < lo + 60
    if name == 'black':
        return max(v) < 60
    want = rgb(name)
    return want is not None and all(abs(a - w) <= 40 for a, w in zip(v, want))


def approx(a, b, tol=1e-6):
    return abs(float(a) - float(b)) <= tol


# ---------------- 运行期采集 ----------------
def mpl_snapshot():
    """抓取当前所有 matplotlib 图形中的折线 / 线段集合 / 柱子（未导入 matplotlib 时返回 []）。"""
    import sys
    if 'matplotlib.pyplot' not in sys.modules:
        return []
    try:
        from matplotlib import _pylab_helpers
        from matplotlib.colors import to_hex
    except Exception:
        return []
    out = []
    for mgr in _pylab_helpers.Gcf.get_all_fig_managers():
        fig = mgr.canvas.figure
        for ax in fig.axes:
            for ln in ax.get_lines():
                try:
                    xs = [float(x) for x in ln.get_xdata()]
                    ys = [float(y) for y in ln.get_ydata()]
                except (TypeError, ValueError):
                    continue
                item = {'kind': 'line', 'x': xs, 'y': ys,
                        'color': to_hex(ln.get_color()), 'marker': str(ln.get_marker())}
                # plt.axhline / axvline：数据坐标只有一维，另一维是 0~1 的轴坐标
                tr = ln.get_transform()
                if tr == ax.get_yaxis_transform():
                    item = {'kind': 'axline', 'dir': 'h', 'at': ys[0], 'color': item['color']}
                elif tr == ax.get_xaxis_transform():
                    item = {'kind': 'axline', 'dir': 'v', 'at': xs[0], 'color': item['color']}
                out.append(item)
            for coll in ax.collections:
                get_segments = getattr(coll, 'get_segments', None)
                if get_segments is None:
                    continue
                colors = [to_hex(c) for c in coll.get_colors()] or ['#000000']
                for i, seg in enumerate(get_segments()):
                    if len(seg) >= 2:
                        (x1, y1), (x2, y2) = seg[0], seg[-1]
                        out.append({'kind': 'seg', 'x': [float(x1), float(x2)], 'y': [float(y1), float(y2)],
                                    'color': colors[i % len(colors)]})
            for p in ax.patches:
                if hasattr(p, 'get_height') and hasattr(p, 'get_x'):
                    out.append({'kind': 'bar', 'x': float(p.get_x() + p.get_width() / 2),
                                'h': float(p.get_height()), 'color': to_hex(p.get_facecolor())})
    return out


def install_mpl_hooks(store):
    """学生代码里的 plt.close() / plt.show() 会清掉或"消费"图形：调用前先快照。返回还原函数。"""
    import sys
    if 'matplotlib.pyplot' not in sys.modules:
        try:
            import matplotlib.pyplot  # noqa: F401  （matplotlib 题在 harness 中已预导入）
        except Exception:
            return lambda: None
    plt = sys.modules['matplotlib.pyplot']
    orig_close, orig_show = plt.close, plt.show

    def close(*a, **k):
        store.extend(mpl_snapshot())
        return orig_close(*a, **k)

    def show(*a, **k):
        store.extend(mpl_snapshot())
        return None

    plt.close, plt.show = close, show

    def restore():
        plt.close, plt.show = orig_close, orig_show
    return restore


def cleanup_files(names):
    for n in names or []:
        try:
            os.remove(n)
        except OSError:
            pass


# ---------------- 文件 ----------------
def exists(name):
    return os.path.exists(name)


def read_bytes(name):
    if not os.path.exists(name):
        fail('没有找到程序应生成的文件 ' + name)
    with open(name, 'rb') as f:
        return f.read()


def read_text(name, encoding='utf-8'):
    data = read_bytes(name)
    try:
        return data.decode(encoding)
    except UnicodeDecodeError:
        hint = ''
        if encoding.lower() in ('gbk', 'gb2312', 'gb18030'):
            try:
                data.decode('utf-8')
                hint = '（看起来是按 UTF-8 写的，open 时要写 encoding=\'gbk\'）'
            except UnicodeDecodeError:
                pass
        fail('文件 ' + name + ' 不能按 ' + encoding + ' 编码读取' + hint)


def check_lines(name, expected_lines, encoding='utf-8'):
    """文件内容逐行比对（忽略行尾空白与末尾空行）。"""
    got = [ln.rstrip() for ln in read_text(name, encoding).replace('\r\n', '\n').split('\n')]
    while got and got[-1] == '':
        got.pop()
    want = [ln.rstrip() for ln in expected_lines]
    if got != want:
        for i in range(max(len(got), len(want))):
            g = got[i] if i < len(got) else '（缺少这一行）'
            w = want[i] if i < len(want) else '（多出这一行）'
            if g != w:
                fail('文件 {} 第 {} 行不对：应为 {!r}，实际 {!r}'.format(name, i + 1, w, g))


def check_png(name):
    data = read_bytes(name)
    if not data.startswith(b'\x89PNG'):
        fail('文件 ' + name + ' 不是有效的 PNG 图片（savefig 的文件名要以 .png 结尾）')


# ---------------- SQLite ----------------
def db_rows(name, sql, params=()):
    """用一个新连接读数据库：只能看到已经 commit 的数据（学生程序忘了 commit 时，新增的行在这里看不到）。"""
    if not os.path.exists(name):
        fail('没有找到数据库文件 ' + name)
    import sqlite3
    conn = sqlite3.connect(name, timeout=1)
    try:
        return [tuple(r) for r in conn.execute(sql, params).fetchall()]
    except sqlite3.Error as e:
        fail('读取数据库 {} 出错：{}'.format(name, e))
    finally:
        conn.close()


def check_db_rows(name, sql, expected, hint=''):
    """程序结束后数据库里的查询结果必须等于 expected（行的列表）。"""
    got = db_rows(name, sql)
    want = [tuple(r) for r in expected]
    if got != want:
        fail('程序结束后数据库 {} 的内容不对：应为 {}，实际 {}{}'.format(
            name, want if want else '（无记录）', got if got else '（无记录）', '。' + hint if hint else ''))


# ---------------- turtle ----------------
def _seglen(s):
    return math.hypot(s[2] - s[0], s[3] - s[1])


def check_polygon(segs, n, side, color, tol=1.0):
    """画出的同色线段恰好构成一个边长 side 的闭合正 n 边形。"""
    mine = [s for s in segs if is_color(s[4], color)]
    if not mine:
        fail('画布上没有{}色线条（检查 pencolor/color 的设置）'.format(_CN.get(color, color)))
    if len(mine) != n:
        fail('{}色线条应有 {} 条边，实际画了 {} 条'.format(_CN.get(color, color), n, len(mine)))
    for i, s in enumerate(mine):
        if abs(_seglen(s) - side) > tol:
            fail('第 {} 条边长度约为 {:.1f}，应为 {}'.format(i + 1, _seglen(s), side))
        nxt = mine[(i + 1) % n]
        if math.hypot(s[2] - nxt[0], s[3] - nxt[1]) > tol:
            fail('第 {} 条边与下一条边没有首尾相接，图形不闭合'.format(i + 1))
    for i in range(n):
        a, b = mine[i], mine[(i + 1) % n]
        v1 = (a[2] - a[0], a[3] - a[1])
        v2 = (b[2] - b[0], b[3] - b[1])
        cosang = (v1[0] * v2[0] + v1[1] * v2[1]) / (side * side)
        turn = math.degrees(math.acos(max(-1.0, min(1.0, cosang))))
        if abs(turn - 360.0 / n) > 1.0:
            fail('第 {} 个转角约 {:.0f}°，正 {} 边形每次应转 {:.0f}°'.format(i + 1, turn, n, 360.0 / n))


def _axis_ok(lines, color, min_len):
    h = v = False
    for (x1, y1, x2, y2, c) in lines:
        if not is_color(c, color):
            continue
        if abs(y1) < 2 and abs(y2) < 2 and abs(x2 - x1) >= min_len and min(x1, x2) < 0 < max(x1, x2):
            h = True
        if abs(x1) < 2 and abs(x2) < 2 and abs(y2 - y1) >= min_len and min(y1, y2) < 0 < max(y1, y2):
            v = True
    return h, v


def _as_lines(segs, mpl):
    """turtle 线段 + matplotlib 线条统一成 (x1, y1, x2, y2, color) 线段列表。"""
    out = list(segs)
    for item in mpl:
        if item['kind'] in ('line', 'seg'):
            xs, ys = item['x'], item['y']
            for i in range(len(xs) - 1):
                out.append((xs[i], ys[i], xs[i + 1], ys[i + 1], item['color']))
    return out


def check_function_hlines(segs, mpl, f, x0, x1, step, axis_color='green', line_color='red', scales=(30, 1)):
    """函数图像题：axis_color 色坐标轴（过原点的横、纵两条）+ 每个采样点 (x, f(x)) 向 y 轴的 line_color 色水平线。

    turtle 画法（像素坐标）必须按 scales[0] 倍放大；matplotlib 坐标轴会自动缩放，放大或不放大（scales 内任一）都接受。
    """
    lines = _as_lines(segs, mpl)
    if not lines:
        fail('没有检测到任何绘图（turtle 线条或 matplotlib 图形）')
    mpl_lines = _as_lines([], mpl)
    expect_n = int(round((x1 - x0) / step)) + 1
    best = None
    for k in scales:
        hits, xs_cov = 0, []
        for (a1, b1, a2, b2, c) in (lines if k == scales[0] else mpl_lines):
            if not is_color(c, line_color) or abs(b1 - b2) > 0.05 * k + 0.5:
                continue
            if abs(a1) <= 0.05 * k + 0.5:
                ex, ey = a2, b2
            elif abs(a2) <= 0.05 * k + 0.5:
                ex, ey = a1, b1
            else:
                continue
            x = ex / k
            if x0 - step <= x <= x1 + step and abs(ey / k - f(x)) <= 0.05:
                hits += 1
                xs_cov.append(x)
        if best is None or hits > best[0]:
            best = (hits, k, xs_cov)
    hits, k, xs_cov = best
    if hits < 0.9 * expect_n:
        fail('{}色水平线与函数数据点对得上的只有 {} 条，应约 {} 条（检查 x 的范围与步长、横纵坐标是否都放大 {} 倍、是否从数据点画到 y 轴）'
             .format(_CN.get(line_color, line_color), hits, expect_n, scales[0]))
    if min(xs_cov) > x0 + 3 * step or max(xs_cov) < x1 - 3 * step:
        fail('水平线没有覆盖整个 x 范围（应为 {:.2f} ~ {:.2f}，实际 {:.2f} ~ {:.2f}）'
             .format(x0, x1, min(xs_cov), max(xs_cov)))
    h, v = _axis_ok(lines, axis_color, min_len=2 * 2.5 * k)
    for item in mpl:
        if item['kind'] == 'axline' and abs(item['at']) < 1e-9 and is_color(item['color'], axis_color):
            h = h or item['dir'] == 'h'
            v = v or item['dir'] == 'v'
    if not (h and v):
        missing = '、'.join(n for n, ok in (('横轴', h), ('纵轴', v)) if not ok)
        fail('缺少{}色坐标轴：{}（应为过原点的实线）'.format(_CN.get(axis_color, axis_color), missing))


# ---------------- matplotlib ----------------
def check_mpl_line(mpl, xs, ys, marker=None):
    lines = [m for m in mpl if m['kind'] == 'line']
    if not lines:
        fail('没有检测到 matplotlib 折线（是否调用了 plt.plot？）')
    xs = [float(x) for x in xs]
    ys = [float(y) for y in ys]
    for ln in lines:
        if len(ln['x']) == len(xs) and all(approx(a, b, 1e-6) for a, b in zip(ln['x'], xs)) \
                and all(approx(a, b, 1e-6) for a, b in zip(ln['y'], ys)):
            if marker and ln.get('marker') != marker:
                fail('折线数据正确，但没有用 {!r} 标记数据点（plot 的格式串要带 o）'.format(marker))
            return
    got = lines[0]
    fail('折线数据不对：应为 x={} y={}，实际画的是 x={} y={}'.format(
        _short(xs), _short(ys), _short(got['x']), _short(got['y'])))


def _short(v):
    v = [int(x) if float(x).is_integer() else round(x, 3) for x in v]
    return str(v if len(v) <= 8 else v[:8] + ['…'])


_CN = {'red': '红', 'green': '绿', 'blue': '蓝', 'black': '黑'}


def run_check(src, ns):
    """执行一段检查代码，返回 (ok, msg)。"""
    env = {name: globals()[name] for name in (
        'fail', 'is_color', 'rgb', 'approx', 'exists', 'read_text', 'read_bytes', 'check_lines',
        'check_png', 'check_polygon', 'check_function_hlines', 'check_mpl_line', 'db_rows', 'check_db_rows')}
    env['math'] = math
    env.update(ns)
    try:
        exec(compile(src, '<check>', 'exec'), env)
        return True, ''
    except CheckFail as e:
        return False, str(e)
    except AssertionError as e:
        return False, str(e) or '绘图/文件检查未通过'
    except Exception as e:
        return False, '检查时出错：{}: {}'.format(e.__class__.__name__, e)
