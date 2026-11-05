"""纯 Python turtle 桩 —— 供本地/CI 校验使用。

行为与 js/runner.js 中注入浏览器的 turtle_shim 的状态数学完全一致
（浏览器中 turtle 绘制到 canvas，本地桩只维护坐标/角度/画笔状态）。
考试 turtle 题的判题依据是 print 出的状态值，两端一致即可互验。
"""
import math
import types


class Turtle:
    _segs = None  # make_module 绑定：画笔落下时记录线段，供运行后检查（tools/py2check.py）

    def __init__(self):
        self.x, self.y, self._hd = 0.0, 0.0, 0.0
        self.pen_down = True
        self.color_v = '#000000'
        self.fillcolor_v = '#000000'
        self.filling = False
        self.fill_pts = []
        self.speed_v = 6

    def _seg(self, nx, ny):
        if self.pen_down and self._segs is not None:
            self._segs.append((self.x, self.y, nx, ny, self.color_v))
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
        pass

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
        self.filling = False
        self.fill_pts = []

    def write(self, s, *a, **k):
        pass

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


def make_module(segs=None):
    mod = types.ModuleType('turtle')
    state = {'t': None}

    class BoundTurtle(Turtle):
        _segs = segs

    def _get():
        if state['t'] is None:
            state['t'] = BoundTurtle()
        return state['t']

    def _module_getattr(name):
        return getattr(_get(), name)

    mod.__getattr__ = _module_getattr
    mod.Turtle = BoundTurtle
    mod.Pen = BoundTurtle
    mod.RawTurtle = BoundTurtle
    mod.Screen = Screen
    mod.getscreen = lambda *a, **k: Screen()
    mod.__all__ = ['Turtle', 'Pen', 'RawTurtle', 'Screen', 'getscreen'] + [
        'forward', 'fd', 'backward', 'bk', 'back', 'right', 'rt', 'left', 'lt',
        'goto', 'setpos', 'setposition', 'setx', 'sety', 'setheading', 'seth',
        'home', 'circle', 'dot', 'penup', 'pu', 'up', 'pendown', 'pd', 'down',
        'pencolor', 'fillcolor', 'color', 'begin_fill', 'end_fill', 'write',
        'speed', 'hideturtle', 'ht', 'showturtle', 'st', 'tracer', 'update',
        'done', 'exitonclick', 'mainloop', 'screensize', 'setup', 'title',
        'bgcolor', 'colormode', 'reset', 'clear', 'position', 'pos', 'xcor',
        'ycor', 'towards', 'distance', 'pen', 'isdown', 'isvisible',
        'window_width', 'window_height']
    return mod
