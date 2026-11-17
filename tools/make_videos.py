#!/usr/bin/env python3
"""生成备考站教学动画视频（4 个核心考点）"""
import os, sys, shutil
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from video_gen import Frame, encode, W, H, ACCENT, RED, GREEN, FG, DIM, YELLOW, BLUE

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'videos')
os.makedirs(OUT, exist_ok=True)
TMP = '/tmp/py2_videos'
os.makedirs(TMP, exist_ok=True)


def make_video(name, steps, hold=2.8):
    """steps = [(title, sub, code_lines, hl, vars, output, note)]"""
    vdir = os.path.join(TMP, name)
    os.makedirs(vdir, exist_ok=True)
    # 清理旧帧
    for f in os.listdir(vdir):
        os.remove(os.path.join(vdir, f))
    total = len(steps)
    for i, (title, sub, code, hl, vars_, output, note) in enumerate(steps):
        f = Frame(duration=hold)
        f.title(title, sub)
        f.code_panel(code, hl_line=hl)
        if vars_:
            f.vars_panel(vars_)
        if output:
            f.output_panel(output)
        if note:
            f.note(note)
        f.progress_bar(i + 1, total)
        f.save(os.path.join(vdir, f'frame_{i:03d}.png'))
    output_path = os.path.join(OUT, f'{name}.mp4')
    encode(vdir, output_path, duration_per_frame=hold)
    return output_path


# ═══════════════════════════════════════════════════════════
# 视频 1: and/or 短路求值
# ═══════════════════════════════════════════════════════════
def gen_and_or():
    steps = [
        ("and/or 短路求值", "返回操作数本身，不是 True/False",
         ["print(3 and 5)", "# 3 为真 → 返回第二个操作数"],
         0, [("3", "真", True), ("5", "← 返回这个", True)], [],
         "and: 左边为真 → 看右边 → 返回右边"),

        ("and/or 短路求值", "",
         ["print(0 and 5)", "# 0 为假 → 短路，直接返回 0"],
         0, [("0", "假", True), ("5", "不执行", False)], ["0"],
         "and: 左边为假 → 短路 → 返回左边"),

        ("and/or 短路求值", "",
         ["print(3 or 5)", "# 3 为真 → 短路，直接返回 3"],
         0, [("3", "← 返回这个", True), ("5", "不执行", False)], ["3"],
         "or: 左边为真 → 短路 → 返回左边"),

        ("and/or 短路求值", "",
         ["print(0 or 'hello')", "# 0 为假 → 返回右边 'hello'"],
         0, [("0", "假", True), ("'hello'", "← 返回这个", True)], ["hello"],
         "or: 左边为假 → 看右边 → 返回右边"),

        ("and/or 短路求值", "记忆口诀",
         ["# and: 假返前，真返后", "# or:  真返前，假返后",
          "# 0、''、[]、None 都是假"],
         -1, [], [],
         "print(3 and 5) → 5  |  print(0 or 'x') → 'x'"),
    ]
    return make_video('and_or', steps)


# ═══════════════════════════════════════════════════════════
# 视频 2: 切片左闭右开
# ═══════════════════════════════════════════════════════════
def gen_slice():
    steps = [
        ("切片 s[1:4] 左闭右开", "包含起点 1，不包含终点 4",
         ['s = "Python"', 'print(s[1:4])'],
         1, [('s', '"Python"', False)], [],
         "索引: P=0  y=1  t=2  h=3  o=4  n=5"),

        ("切片 s[1:4] 左闭右开", "",
         ['s = "Python"', 'print(s[1:4])', "# 取下标 1,2,3 → 'yth'"],
         1, [('下标 1', '✓ 取', True), ('下标 2', '✓ 取', True),
             ('下标 3', '✓ 取', True), ('下标 4', '✗ 不取', False)],
         ["yth"],
         "s[1:4] = 'yth'（包含下标 1,2,3）"),

        ("切片 s[::-1] 反转", "步长 -1 = 从右往左",
         ['s = "Python"', 'print(s[::-1])'],
         1, [('方向', '← ← ← ← ←', True), ('结果', 'nohtyP', True)],
         ["nohtyP"],
         "s[::-1] = 字符串反转"),
    ]
    return make_video('slice', steps)


# ═══════════════════════════════════════════════════════════
# 视频 3: 运算符优先级
# ═══════════════════════════════════════════════════════════
def gen_precedence():
    steps = [
        ("-3 ** 2 为什么是 -9", "优先级：** 高于负号",
         ["print(-3 ** 2)"],
         0, [('-3 ** 2', '先算 3**2', True)], [],
         "Python 先算 ** 再取负号"),

        ("-3 ** 2 为什么是 -9", "",
         ["print(-3 ** 2)", "# 等价于 -(3 ** 2)"],
         0, [('步骤 1', '3 ** 2 = 9', True), ('步骤 2', '-9', True)],
         ["-9"],
         "-3**2 = -(3²) = -9"),

        ("(-3) ** 2 = 9", "加括号改变优先级",
         ["print((-3) ** 2)"],
         0, [('(-3)²', '= 9', True)],
         ["9"],
         "要得到 9 必须写 (-3) ** 2"),
    ]
    return make_video('precedence', steps)


# ═══════════════════════════════════════════════════════════
# 视频 4: for 循环执行过程
# ═══════════════════════════════════════════════════════════
def gen_for_loop():
    code_lines = [
        "total = 0",
        "for i in range(1, 6):",
        "    total += i",
        "print(total)",
    ]
    steps = [
        ("for 循环执行过程", "range(1, 6) → 1, 2, 3, 4, 5",
         code_lines, 0, [('total', '0', True), ('i', '未开始', False)], [],
         "total = 0（累加器初始化）"),

        ("for 循环执行过程", "", code_lines, 1,
         [('total', '0', False), ('i', '1', True)], [],
         "第 1 轮：i = 1"),

        ("for 循环执行过程", "", code_lines, 2,
         [('total', '1', True), ('i', '1', True)], ["1"],
         "total += i → 0 + 1 = 1"),

        ("for 循环执行过程", "", code_lines, 1,
         [('total', '1', False), ('i', '2', True)], [],
         "第 2 轮：i = 2"),

        ("for 循环执行过程", "", code_lines, 2,
         [('total', '3', True), ('i', '2', True)], [],
         "total += i → 1 + 2 = 3"),

        ("for 循环执行过程", "", code_lines, 1,
         [('total', '3', False), ('i', '3', True)], [],
         "第 3 轮：i = 3"),

        ("for 循环执行过程", "", code_lines, 2,
         [('total', '6', True), ('i', '3', True)], [],
         "total += i → 3 + 3 = 6"),

        ("for 循环执行过程", "", code_lines, 1,
         [('total', '6', False), ('i', '4', True)], [],
         "第 4 轮：i = 4"),

        ("for 循环执行过程", "", code_lines, 2,
         [('total', '10', True), ('i', '4', True)], [],
         "total += i → 6 + 4 = 10"),

        ("for 循环执行过程", "", code_lines, 1,
         [('total', '10', False), ('i', '5', True)], [],
         "第 5 轮：i = 5（最后一轮）"),

        ("for 循环执行过程", "", code_lines, 2,
         [('total', '15', True), ('i', '5', True)], [],
         "total += i → 10 + 5 = 15"),

        ("for 循环执行过程", "循环结束", code_lines, 3,
         [('total', '15', True), ('i', '5', True)], ["15"],
         "print(total) → 15"),
    ]
    return make_video('for_loop', steps, hold=1.8)


# ═══════════════════════════════════════════════════════════
# 视频 5: 文件读写三步走
# ═══════════════════════════════════════════════════════════
def gen_file_io():
    code_lines = [
        "f = open('data.txt', 'r', encoding='utf-8')",
        "for line in f:",
        "    print(line.strip())",
        "f.close()",
    ]
    steps = [
        ("文件读写三步走", "① 打开  ② 读写  ③ 关闭",
         code_lines, 0,
         [('模式', "'r' 读", True), ('encoding', 'utf-8', True)], [],
         "① open 打开文件，指定模式和编码"),

        ("文件读写三步走", "", code_lines, 1,
         [('模式', "'r' 读", True), ('状态', '逐行读取', True)], [],
         "② for line in f 逐行读取（行尾带 \\n）"),

        ("文件读写三步走", "", code_lines, 2,
         [('strip()', '去换行', True)], ['上海', '北京', '广州'],
         "③ strip() 去掉行尾 \\n 后输出"),

        ("文件读写三步走", "", code_lines, 3,
         [('close()', '释放资源', True)], ['上海', '北京', '广州'],
         "④ close 关闭文件（或用 with 自动关闭）"),
    ]
    return make_video('file_io', steps)


# ═══════════════════════════════════════════════════════════
# 视频 6: 改错题实操
# ═══════════════════════════════════════════════════════════
def gen_fix_demo():
    buggy = [
        "total = 1",
        "for i in range(1, 6):",
        "    total += i",
        "print('总和:', total)",
    ]
    fixed = [
        "total = 0",
        "for i in range(1, 6):",
        "    total += i",
        "print('总和:', total)",
    ]
    steps = [
        ("改错题实操演示", "拿到题 → 运行 → 看报错 → 修复 → 验证",
         buggy, -1, [], ["总和: 16"],
         "第一步：把代码粘贴进 IDLE 运行一遍"),

        ("改错题实操演示", "对比运行结果与样例",
         buggy, -1, [], ["总和: 16"],
         "运行结果：总和 16 ≠ 样例 15 → 有逻辑错误"),

        ("改错题实操演示", "逐行检查：累加器初值",
         buggy, 0, [('total 初值', '1 ← 应该是 0', True)],
         ["总和: 16"],
         "求和累加器应该从 0 开始"),

        ("改错题实操演示", "修复后验证",
         fixed, -1, [('total', '0', True), ('结果', '15 ✓', True)],
         ["总和: 15"],
         "修改后重新运行 → 15 = 样例 ✓"),
    ]
    return make_video('fix_demo', steps, hold=2.5)


# ═══════════════════════════════════════════════════════════
if __name__ == '__main__':
    print('生成教学视频...')
    gen_and_or()
    gen_slice()
    gen_precedence()
    gen_for_loop()
    gen_file_io()
    gen_fix_demo()
    print('\n全部视频生成完成！')
    for f in sorted(os.listdir(OUT)):
        if f.endswith('.mp4'):
            size = os.path.getsize(os.path.join(OUT, f)) / 1024
            print(f'  {f}: {size:.0f} KB')
