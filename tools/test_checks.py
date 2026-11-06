"""运行后检查（tools/py2check.py）的反例测试：错的画法 / 错的文件必须判不通过，换一种正确写法必须能通过。

用法：python3 tools/test_checks.py （CI 在 build_data.py 之前运行）
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from harness import run_user  # noqa: E402
from build_data import run_dir, _passes  # noqa: E402

ROOT = os.path.dirname(HERE)


def item(fname, qid):
    with open(os.path.join(ROOT, "data_src", fname), encoding="utf-8") as f:
        d = json.load(f)
    groups = [d["items"]] if "items" in d else [v for v in d.values() if isinstance(v, list)]
    for g in groups:
        for it in g:
            if isinstance(it, dict) and it.get("id") == qid:
                return it
    raise KeyError(qid)


def judge(q, code, t=None):
    spec = t if t is not None else q
    with run_dir(q):
        r = run_user(code, spec.get("stdin", q.get("stdin", "")), check=spec.get("check"), cleanup=spec.get("cleanup"))
    return _passes(r, spec.get("expected", q.get("expected", "")), spec), r


FAILS = 0


def expect(label, q, code, want_pass, t=None, msg_has=None):
    global FAILS
    ok, r = judge(q, code, t)
    good = ok == want_pass and (msg_has is None or msg_has in (r.get("checkMsg") or ""))
    print(("  ✓ " if good else "  ✗ ") + label + ("" if ok else "  → " + (r.get("checkMsg") or r.get("error") or "输出不符")))
    if not good:
        FAILS += 1


AXES = "t.pencolor('green')\nt.penup(); t.goto(-190, 0); t.pendown(); t.goto(190, 0)\nt.penup(); t.goto(0, 190); t.pendown(); t.goto(0, -190)\n"

print("== 27A 编程3：函数图像 ==")
c3 = item("official27A.json", "p27-c3")
t3 = c3["tests"][0]
expect("参考答案通过", c3, c3["ref"], True, t3)
expect("旧参考答案（x 跑到 ±2π、步长 0.04）判错", c3,
       "import turtle, math\nt = turtle.Turtle()\n" + AXES + "t.pencolor('red')\ni = -314\nwhile i <= 314:\n    x = i * 0.02\n"
       "    y = 30 * (4 * math.cos(x) - math.cos(6 * x))\n    t.penup(); t.goto(0, y); t.pendown(); t.goto(30 * x, y)\n    i += 2\n",
       False, t3)
expect("只 print('drawn') 不画图判错", c3, "print('drawn')\n", False, t3)
expect("没画坐标轴判错", c3,
       "import turtle, math\nt = turtle.Turtle()\nt.pencolor('red')\nx = -math.pi\nwhile x <= math.pi:\n"
       "    y = 4 * math.cos(x) - math.cos(6 * x)\n    t.penup(); t.goto(0, 30 * y); t.pendown(); t.goto(30 * x, 30 * y)\n    x += 0.02\n",
       False, t3, msg_has="坐标轴")
expect("忘了放大 30 倍判错", c3,
       "import turtle, math\nt = turtle.Turtle()\n" + AXES + "t.pencolor('red')\nx = -math.pi\nwhile x <= math.pi:\n"
       "    y = 4 * math.cos(x) - math.cos(6 * x)\n    t.penup(); t.goto(0, y); t.pendown(); t.goto(x, y)\n    x += 0.02\n",
       False, t3)
expect("函数写错（cos(5x)）判错", c3, c3["ref"].replace("math.cos(6 * x)", "math.cos(5 * x)"), False, t3)
expect("matplotlib 画法（axhline/axvline + 红色水平线）通过", c3,
       "import matplotlib\nmatplotlib.use('Agg')\nimport matplotlib.pyplot as plt\nimport math\n"
       "plt.figure(figsize=(4, 4))\nplt.axhline(0, color='green')\nplt.axvline(0, color='green')\n"
       "x = -math.pi\nwhile x <= math.pi:\n    y = 4 * math.cos(x) - math.cos(6 * x)\n"
       "    plt.plot([0, 30 * x], [30 * y, 30 * y], color='red')\n    x += 0.02\nplt.show()\n",
       True, t3)
expect("matplotlib 画法 + hlines（不放大）通过", c3,
       "import matplotlib\nmatplotlib.use('Agg')\nimport matplotlib.pyplot as plt\nimport numpy as np\n"
       "xs = np.arange(-np.pi, np.pi + 1e-9, 0.02)\nys = 4 * np.cos(xs) - np.cos(6 * xs)\n"
       "plt.plot([-4, 4], [0, 0], 'g-')\nplt.plot([0, 0], [-6, 6], 'g-')\nplt.hlines(ys, 0, xs, colors='r')\nplt.close()\n",
       True, t3)

print("== turtle 正多边形 / 正方形 ==")
poly = item("coding_l6_l7.json", "code-l6-004")
for t in poly["tests"]:
    expect("参考答案通过 stdin=" + repr(t["stdin"]), poly, poly["ref"], True, t)
expect("边长画错（d+10）判错", poly, poly["ref"].replace("t.forward(d)", "t.forward(d + 10)"), False, poly["tests"][0])
expect("少画一条边判错", poly, poly["ref"].replace("for i in range(n):", "for i in range(n - 1):").replace(
    "print('落点:', round(t.xcor()), round(t.ycor()))", "print('落点:', 0, 0)"), False, poly["tests"][0])
expect("颜色画成黑色、但 print 写死 red 判错", poly, poly["ref"].replace("t.pencolor('red')", "pass").replace(
    "print('画笔颜色:', t.pencolor())", "print('画笔颜色:', 'red')"), False, poly["tests"][0])
sq = item("blank_bank.json", "blk-l6-002")
filled = sq["code"]
for b in sq["blanks"]:
    filled = filled.replace("___(%d)___" % b["n"], b["answers"][0])
expect("填空：标准答案通过", sq, filled, True)
expect("填空：颜色 print 对、实际没设置判错", sq, filled.replace("t.pencolor(c1)", "pass"), False)

print("== matplotlib 折线 ==")
m13 = item("coding_gui_exp.json", "code-l7-013")
expect("参考答案通过", m13, m13["ref"], True, m13["tests"][0])
expect("没 savefig 判错", m13, m13["ref"].replace("plt.savefig('t.png')", "pass"), False, m13["tests"][0], msg_has="t.png")
expect("画错数据（temps 反了）判错", m13, m13["ref"].replace("plt.plot(months, temps)", "plt.plot(months, temps[::-1])"),
       False, m13["tests"][0], msg_has="折线数据不对")
m10 = item("coding_l7_exp.json", "code-l7-010")
expect("参考答案通过", m10, m10["ref"], True, m10["tests"][0])
expect("没用 'o-' 圆点标记判错", m10, m10["ref"].replace("plt.plot(xs, ys, 'o-')", "plt.plot(xs, ys)"), False,
       m10["tests"][0], msg_has="标记")

print("== 写文件 ==")
c5 = item("official27A.json", "p27-c5")
expect("参考答案（GBK）通过", c5, c5["ref"], True, c5["tests"][0])
expect("CSV 按 UTF-8 写判错（并提示编码）", c5, c5["ref"].replace("encoding='gbk'", "encoding='utf-8'"), False,
       c5["tests"][0], msg_has="gbk")
expect("CSV 少写标题行判错", c5, c5["ref"].replace("f.write('产品,网址\\n')", "pass"), False, c5["tests"][0])
k9 = item("coding_l5.json", "code-l5-009")
expect("参考答案通过", k9, k9["ref"], True, k9["tests"][0])
expect("只 print 不写 out.txt 判错", k9, k9["ref"].replace("out.write(res + '\\n')", "pass"), False, k9["tests"][0])

print("== 27A 编程4：SQLite 新增必须真正提交 ==")
c4 = item("official27A.json", "p27-c4")
for t in c4["tests"]:
    expect("参考答案通过 stdin=" + repr(t["stdin"]), c4, c4["ref"], True, t)
expect("忘了 conn.commit() 判错（同一连接里查得到、库里没保存）", c4,
       c4["ref"].replace("            conn.commit()\n", ""), False, c4["tests"][0], msg_has="commit")
expect("楼层/容量写错判错", c4, c4["ref"].replace("(n, n[0] + '楼', 30, 0)", "(n, '1楼', 0, 0)"), False,
       c4["tests"][0], msg_has="2楼")
expect("不管回答什么都新增判错", c4, c4["ref"].replace("        if ans.strip().lower() == 'y':\n", "        if True:\n"),
       False, c4["tests"][2], msg_has="不应新增")
expect("最后不 close 但已 commit 仍通过", c4, c4["ref"].replace("conn.close()", "pass"), True, c4["tests"][0])

print("== OOP 编程小题：必须自己定义类 ==")
with open(os.path.join(ROOT, "data_src", "oop_coding.json"), encoding="utf-8") as _f:
    OOP = json.load(_f)["items"]
for q in OOP:
    t = q["tests"][0]
    ok_ref, _ = judge(q, q["ref"], t)
    ok_start, _ = judge(q, q["starter"], t)
    # 不写类、直接把正确输出 print 出来（"背答案"）
    cheat = "".join(
        "print(%r)\n" % line for line in t["expected"].split("\n"))
    ok_cheat, r_cheat = judge(q, cheat, t)
    good = ok_ref and not ok_start and not ok_cheat
    print(("  ✓ " if good else "  ✗ ") + q["id"] + " " + q["title"] + "：参考通过 / 起始代码不通过 / 只 print 不写类不通过"
          + ("" if good else "  → ref=%s starter=%s cheat=%s" % (ok_ref, ok_start, ok_cheat)))
    FAILS += 0 if good else 1
dog = item("oop_coding.json", "code-oop-013")
expect("Dog 没继承 Animal 判错", dog, dog["ref"].replace("class Dog(Animal):", "class Dog:\n    def __init__(self, name):\n        self.name = name\n"),
       False, dog["tests"][0], msg_has="继承")
expect("Cat 没重写 speak 判错", dog, dog["ref"].replace("    def speak(self):\n        return '喵喵'\n", "    pass\n"),
       False, dog["tests"][1])

print("== 旧输出文件不能冒充本次结果（cleanup） ==")
with run_dir(k9):
    run_user(k9["ref"], "")  # 第一次：正确程序写出 out.txt
    bad = k9["ref"].replace("out = open('out.txt', 'w', encoding='utf-8')", "out = open('other.txt', 'w', encoding='utf-8')")
    r = run_user(bad, "", check=k9["tests"][0]["check"], cleanup=k9["tests"][0]["cleanup"])
good = r["checkOk"] is False
print(("  ✓ " if good else "  ✗ ") + "上一次留下的 out.txt 被清理，没写文件的程序判错")
FAILS += 0 if good else 1

print("\n反例测试：" + ("全部通过" if not FAILS else f"{FAILS} 项不符合预期"))
sys.exit(1 if FAILS else 0)
