# -*- coding: utf-8 -*-
"""上信考 Python 本机实操包（由 Py2 通关网站生成）。

用法（在命令行 / Anaconda Prompt 里，进入本文件所在文件夹）：
    python 本文件名.py           在本文件旁边建好 ks/ 和 素材/ 文件夹，放好题目与素材
    python 本文件名.py --c       Windows：直接建成考场目录 C:\\ks 和 C:\\素材（已有的同名程序不会被覆盖）
    python 本文件名.py check     做完后自动判分（加 --c 表示检查 C:\\ks）
    python 本文件名.py env       检查本机 Python 环境（版本、matplotlib、sqlite3、pip）

做题时请像考场一样：用 IDLE / PyCharm 打开 ks 里的程序，素材写全路径 c:/素材/文件名，
改错题只改不增删语句、改过的行末加 ####，第三方包要先 pip install 素材里的 .whl。
本文件需要 Python 3.8 及以上。
"""
import base64
import json
import os
import shutil
import sys
import tempfile
import time

PACK = json.loads(base64.b64decode("__PACK_B64__").decode("utf-8"))
LIBS = json.loads(base64.b64decode("__LIBS_B64__").decode("utf-8"))

HERE = os.path.dirname(os.path.abspath(__file__))


def root_dir(argv):
    if "--c" in argv:
        return "C:\\"
    return os.path.join(HERE, PACK["folder"])


def write_file(path, data, binary=False, overwrite=True):
    if os.path.exists(path) and not overwrite:
        return False
    d = os.path.dirname(path)
    if d and not os.path.isdir(d):
        os.makedirs(d)
    if binary:
        with open(path, "wb") as f:
            f.write(data)
    else:
        with open(path, "w", encoding="utf-8", newline="\n") as f:
            f.write(data)
    return True


def material_bytes(m):
    if m.get("b64"):
        return base64.b64decode(m["content"])
    return m["content"].encode("utf-8")


def layout():
    """把各题素材合并到 素材/ 下：同名同内容共用；同名不同内容放到 素材/题N/ 并改写该题程序里的路径。

    返回 (materials: [{path, data}], questions: 每题加上 code（已改写）与 mat_paths)。
    """
    placed = {}
    mats = []
    qs = []
    for i, q in enumerate(PACK["questions"], 1):
        q = dict(q)
        code = q["code"]
        paths = []
        for m in q.get("materials", []):
            data = material_bytes(m)
            path = m["path"]
            if path in placed and placed[path] != data:
                alt = "题{}/{}".format(i, path)
                code = code.replace("c:/素材/" + path, "c:/素材/" + alt)
                path = alt
            if path not in placed:
                placed[path] = data
                mats.append({"path": path, "data": data})
            paths.append(path)
        q["code"] = code
        q["mat_paths"] = paths
        qs.append(q)
    return mats, qs


def setup(argv):
    root = root_dir(argv)
    ks = os.path.join(root, "ks")
    sc = os.path.join(root, "素材")
    for p in (ks, sc):
        if not os.path.isdir(p):
            os.makedirs(p)
    mats, qs = layout()
    for m in mats:
        write_file(os.path.join(sc, m["path"]), m["data"], binary=True)
    kept = []
    for q in qs:
        if not write_file(os.path.join(ks, q["file"]), q["code"], overwrite=False):
            kept.append(q["file"])
    lines = [PACK["title"], "=" * 40, ""]
    for i, q in enumerate(qs, 1):
        lines.append("【{}】{}（{} 分）  程序：c:/ks/{}".format(i, q["title"], q["points"], q["file"]))
        lines.append(q["desc"])
        if q.get("mat_paths"):
            lines.append("素材：" + "、".join("c:/素材/" + p for p in q["mat_paths"]))
        if q.get("wheels"):
            lines.append("先安装第三方包：pip install " + " ".join('"c:/素材/{}"'.format(w) for w in q["wheels"]))
        lines.append("")
    lines += ["做完后运行：python {} check{}".format(os.path.basename(__file__), " --c" if "--c" in argv else ""), ""]
    write_file(os.path.join(root, "题目.txt"), "\n".join(lines))
    print("✓ 已建好练习目录：")
    print("   程序：" + ks)
    print("   素材：" + sc)
    print("   题目：" + os.path.join(root, "题目.txt"))
    if kept:
        print("   （保留了你已有的程序，没有覆盖：" + "、".join(kept) + "）")
    if "--c" not in argv:
        print("提示：考场路径是 c:/素材/文件名。本练习里写 c:/素材/ 或相对路径都能通过自检；")
        print("      Windows 上可以用 --c 直接建成 C:\\ks 和 C:\\素材，和考场完全一样。")
    if any(q.get("wheels") for q in qs):
        print("第三方包题：先在命令行运行 题目.txt 里写的 pip install 命令（考场还要求截图保存）。")


def load_libs():
    d = tempfile.mkdtemp(prefix="py2pass_")
    for name, src in LIBS.items():
        write_file(os.path.join(d, name), src)
    sys.path.insert(0, d)
    return d


def marking_problems(student, original):
    """改错题考场规则：不增删语句；改过的行末尾加 ####。返回问题列表。"""
    def lines(s):
        out = s.replace("\r\n", "\n").split("\n")
        while out and not out[-1].strip():
            out.pop()
        return out
    a, b = lines(student), lines(original)
    if len(a) != len(b):
        return ["行数从 {} 变成了 {}：考场要求不增删语句（只修改原有的语句）".format(len(b), len(a))]
    probs = []
    for i, (x, y) in enumerate(zip(a, b), 1):
        xs = x.rstrip()
        marked = xs.endswith("####")
        body = xs[:-4].rstrip() if marked else xs
        while body.endswith("#"):
            body = body[:-1].rstrip()
        changed = body != y.rstrip()
        if changed and not marked:
            probs.append("第 {} 行改动了但行末没有加 #### 标记".format(i))
        if marked and not changed:
            probs.append("第 {} 行加了 #### 但内容和原题一样（没改的行不要加标记）".format(i))
    return probs


def check(argv):
    root = root_dir(argv)
    ks = os.path.join(root, "ks")
    if not os.path.isdir(ks):
        print("没有找到 " + ks + "，请先运行：python {}{}".format(os.path.basename(__file__), " --c" if "--c" in argv else ""))
        return 1
    load_libs()
    from harness import run_user  # noqa: E402  （与网站判题同一份 harness）

    total = got_total = 0.0
    report = []
    mats, qs = layout()
    data_of = {m["path"]: m["data"] for m in mats}
    for i, q in enumerate(qs, 1):
        path = os.path.join(ks, q["file"])
        total += q["points"]
        head = "【{}】{} ({})".format(i, q["title"], q["file"])
        if not os.path.exists(path):
            report.append((head, 0, q["points"], ["没有找到程序文件 " + path]))
            continue
        with open(path, encoding="utf-8-sig") as f:
            code = f.read()
        notes = []
        missing = [w for w in q.get("wheels", []) if not _wheel_installed(q, w)]
        if missing:
            notes.append("第三方包还没安装：pip install " + " ".join('"c:/素材/{}"'.format(w) for w in missing))
        passed = 0
        for k, t in enumerate(q["tests"], 1):
            work = tempfile.mkdtemp(prefix="py2pass_run_")
            for pth in q["mat_paths"]:
                write_file(os.path.join(work, pth), data_of[pth], binary=True)
            old = os.getcwd()
            os.chdir(work)
            try:
                r = run_user(code, t.get("stdin", ""), check=t.get("check"), cleanup=t.get("cleanup"))
            finally:
                os.chdir(old)
                shutil.rmtree(work, ignore_errors=True)
            ok, why = _judge(r, t)
            if ok:
                passed += 1
            else:
                notes.append("测试 {}：{}".format(k, why))
        if q["kind"] == "fix":
            probs = marking_problems(code, q["code"])
            notes += probs
            score = q["points"] if passed == len(q["tests"]) and not probs else 0
        else:
            score = round(q["points"] * passed / len(q["tests"]), 1)
        got_total += score
        report.append((head, score, q["points"], notes))

    print(PACK["title"] + " · 自检结果")
    print("-" * 40)
    for head, s, full, notes in report:
        print("{}  {} / {} 分".format(head, s, full))
        for n in notes[:6]:
            print("    · " + n)
    print("-" * 40)
    print("合计 {} / {} 分".format(round(got_total, 1), round(total, 1)))
    stamp = time.strftime("%Y-%m-%d %H:%M")
    try:
        with open(os.path.join(root, "自检记录.txt"), "a", encoding="utf-8") as f:
            f.write("{}  {} / {}\n".format(stamp, round(got_total, 1), round(total, 1)))
    except OSError:
        pass
    print("（判分规则与网站一致：比对输出，并检查绘图、数据库、写出的文件；改错题另查 #### 标记与语句数。）")
    return 0


def _wheel_installed(q, whl):
    import importlib.util
    mod = q["wheels_modules"].get(whl)
    return mod is None or importlib.util.find_spec(mod) is not None


def _norm(s):
    return "\n".join(ln.rstrip() for ln in str(s).replace("\r\n", "\n").split("\n")).strip()


def _judge(r, t):
    if not r["ok"]:
        return False, "运行出错：" + (r["error"] or "")
    want = t.get("expected", "")
    if not (t.get("check") and not want) and _norm(r["stdout"]) != _norm(want):
        got = _norm(r["stdout"]).split("\n")
        exp = _norm(want).split("\n")
        for j in range(max(len(got), len(exp))):
            g = got[j] if j < len(got) else "（缺这一行）"
            e = exp[j] if j < len(exp) else "（多了这一行）"
            if g != e:
                return False, "输出第 {} 行应为 {!r}，实际 {!r}".format(j + 1, e, g)
    if t.get("check") and r.get("checkOk") is not True:
        return False, r.get("checkMsg") or "绘图/文件/数据库检查未通过"
    return True, ""


def env():
    print("Python " + sys.version.split()[0] + ("  ✓" if sys.version_info >= (3, 8) else "  ✗ 需要 3.8 及以上"))
    for mod in ("sqlite3", "turtle", "matplotlib", "openpyxl"):
        try:
            __import__(mod)
            print("  {:<12} ✓".format(mod))
        except Exception as e:
            print("  {:<12} ✗ {}".format(mod, e.__class__.__name__))
    try:
        import pip  # noqa: F401
        print("  {:<12} ✓  （安装 whl：python -m pip install 文件路径.whl）".format("pip"))
    except Exception:
        print("  {:<12} ✗".format("pip"))
    print("考场环境：Windows 10 + Python 3.x（建议 3.8 或 Anaconda3-2021.05），以考点实际安装为准。")
    return 0


def main(argv):
    if "env" in argv:
        return env()
    if "check" in argv:
        return check(argv)
    setup(argv)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]) or 0)
