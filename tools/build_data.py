"""题库构建与校验工具。

用法： python3 tools/build_data.py

做四件事：
1. 读取 data_src/*.json（schema 见 data_src/SCHEMA.md），校验结构与字段。
2. 用 tools/harness.py 实际运行每道题的参考答案：
   - blank: 逐个空代入每个可接受答案 → 运行 → 输出必须等于 expected；
   - fix:   参考代码运行输出必须等于 expected，且 buggy 代码必须不等于 expected（报错也算不同）；
   - coding: 每个 test 运行参考代码 → 输出必须等于 expected。
3. 输出校验报告；有错误则退出码 1。
4. 全部通过后打包生成 js/data.js（window.BANK = {...}）。
"""

import json
import re
import time
import sys
import glob
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import run_user  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "data_src")
OUT = os.path.join(ROOT, "js", "data.js")

LEVEL_RANGE = set(range(1, 8))

BLANK_RE = re.compile(r"___\((\d+)\)___")


def norm(s: str) -> str:
    return "\n".join(
        ln.rstrip() for ln in str(s).replace("\r\n", "\n").split("\n")
    ).strip()



import tempfile
import contextlib


@contextlib.contextmanager
def run_dir(q):
    """每道题都在独立临时目录里运行（带 files 时先写入素材）。

    不能在仓库根目录跑：参考答案里的 savefig('sales.png') / 写文件会覆盖仓库文件，
    运行后检查的 cleanup 也会删掉同名文件。
    """
    files = q.get("files") or []
    old = os.getcwd()
    with tempfile.TemporaryDirectory() as td:
        import base64

        for f in files:
            fp = os.path.join(td, f["name"])
            os.makedirs(os.path.dirname(fp) or td, exist_ok=True)
            if f.get("b64"):
                with open(fp, "wb") as fh:
                    fh.write(base64.b64decode(f["content"]))
            else:
                with open(fp, "w", encoding="utf-8") as fh:
                    fh.write(f["content"])
        os.chdir(td)
        try:
            yield
        finally:
            os.chdir(old)


def _run(code, stdin, q, t=None):
    """运行一次；t 为测试点（编程/拼程序题），否则用题目本身的 check/cleanup（填空/改错题）。"""
    spec = t if t is not None else q
    with run_dir(q):
        return run_user(code, stdin, check=spec.get("check"), cleanup=spec.get("cleanup"))


def _passes(r, want, spec):
    """与 js/core.js judgeTest 同一判定：带 check 时检查必须通过；带 check 且无 expected 时不比对输出。"""
    if not r["ok"]:
        return False
    out_ok = True if (spec.get("check") and not want) else norm(r["stdout"]) == norm(want)
    if spec.get("check"):
        return out_ok and r.get("checkOk") is True
    return out_ok


def _why(r, want):
    if not r["ok"]:
        return f"（运行错误: {r['error']}）"
    if r.get("checkOk") is False:
        return f"（绘图/文件检查未通过: {r.get('checkMsg')}）"
    return f"（实际: {norm(r['stdout'])[:80]!r} 期望: {norm(want)[:80]!r}）"


def err(msg):
    print("  ✗ " + msg)
    return 1


def load_json(path):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f), None
    except Exception as e:
        return None, str(e)


def validate_mcq(q, fname):
    n = 0
    for f in ("id", "level", "topic", "q", "opts", "ans", "exp"):
        if f not in q:
            n += err(f"{fname}: {q.get('id', '?')} 缺字段 {f}")
    if q.get("level") not in LEVEL_RANGE:
        n += err(f"{fname}: {q.get('id')} level 非法")
    if not isinstance(q.get("opts"), list) or len(q.get("opts", [])) < 3:
        n += err(f"{fname}: {q.get('id')} opts 至少 3 项")
    if not isinstance(q.get("ans"), int) or not (
        0 <= q.get("ans", -1) < len(q.get("opts", []))
    ):
        n += err(f"{fname}: {q.get('id')} ans 索引非法")
    if len(q.get("exp", "")) < 8:
        n += err(f"{fname}: {q.get('id')} 解析(exp)过短")
    return n


def run_blank(q):
    """返回错误数；并校验 expected。"""
    n = 0
    code = q["code"]
    marks = BLANK_RE.findall(code)
    want = [str(b["n"]) for b in q["blanks"]]
    if sorted(marks) != sorted(want):
        n += err(
            f"{q['id']}: 代码中的空 {sorted(marks)} 与 blanks {sorted(want)} 不一致"
        )
        return n
    stdin = q.get("stdin", "")
    # 先验证“所有空都填第一个可接受答案”整体运行能得到期望输出
    filled = code
    for bb in q["blanks"]:
        filled = filled.replace(f"___({bb['n']})___", bb["answers"][0])
    r = _run(filled, stdin, q)
    if not _passes(r, q["expected"], q):
        n += err(f"{q['id']}: 参考答案整体运行结果与 expected 不符" + _why(r, q["expected"]))
    # 逐空验证其余可接受答案（其他空用第一个答案代入）
    for b in q["blanks"]:
        for ans in b["answers"][1:]:
            filled = code
            for bb in q["blanks"]:
                repl = ans if bb["n"] == b["n"] else bb["answers"][0]
                filled = filled.replace(f"___({bb['n']})___", repl)
            r = _run(filled, stdin, q)
            if not _passes(r, q["expected"], q):
                n += err(f"{q['id']}: 第{b['n']}空答案 {ans!r} 未得到期望输出" + _why(r, q["expected"]))
    return n


def validate_blank(q, fname):
    n = 0
    for f in ("id", "level", "title", "code", "blanks", "expected", "ref"):
        if f not in q:
            n += err(f"{fname}: {q.get('id', '?')} 缺字段 {f}")
    if q.get("level") not in LEVEL_RANGE:
        n += err(f"{fname}: {q.get('id')} level 非法")
    for b in q.get("blanks", []):
        if "n" not in b or "answers" not in b or not b["answers"]:
            n += err(f"{fname}: {q.get('id')} blank 缺 n/answers")
    if "___(" not in q.get("ref", ""):
        if not q.get("ref"):
            n += err(f"{fname}: {q.get('id')} 缺 ref")
    return n


def run_fix(q):
    n = 0
    r = _run(q["ref"], q.get("stdin", ""), q)
    if not _passes(r, q["expected"], q):
        n += err(f"{q['id']}: ref 运行结果与 expected 不符" + _why(r, q["expected"]))
    rb = _run(q["buggy"], q.get("stdin", ""), q)
    if _passes(rb, q["expected"], q):
        n += err(f"{q['id']}: buggy 代码已经能通过——改错题必须真的有错")
    if not q.get("errors"):
        n += err(f"{q['id']}: 缺 errors 提示")
    else:
        for e in q["errors"]:
            if "line" not in e or "hint" not in e:
                n += err(f"{q['id']}: errors 项缺 line/hint")
    return n


def validate_fix(q, fname):
    n = 0
    q["local_code"] = local_code(q, q.get("buggy") or "")
    for f in ("id", "level", "title", "buggy", "expected", "ref", "errors"):
        if f not in q:
            n += err(f"{fname}: {q.get('id', '?')} 缺字段 {f}")
    if q.get("level") not in LEVEL_RANGE:
        n += err(f"{fname}: {q.get('id')} level 非法")
    return n


def run_mcq_code(q):
    """带 code 的单选（代码阅读题）：真实运行，正确选项必须对应运行结果（run_expected）或报错类型（run_error）。"""
    if not q.get("code"):
        return 0
    r = _run(q["code"], "", q)
    if q.get("run_error"):
        if r["ok"] or q["run_error"] not in (r["error"] or ""):
            return err(f"{q['id']}: 应抛出 {q['run_error']}，实际 {r['error'] or '正常运行'}")
        return 0
    want = q.get("run_expected", q["opts"][q["ans"]] if q.get("opts") else "")
    if not r["ok"] or norm(r["stdout"]) != norm(want):
        return err(f"{q['id']}: 代码阅读题的运行结果与正确答案不符" + _why(r, want))
    return 0


def validate_output(q, fname):
    """读程序写运行结果题。"""
    n = 0
    for f in ("id", "level", "title", "code", "expected", "exp"):
        if f not in q:
            n += err(f"{fname}: {q.get('id', '?')} 缺字段 {f}")
    if q.get("level") not in LEVEL_RANGE:
        n += err(f"{fname}: {q.get('id')} level 非法")
    if "input(" in q.get("code", ""):
        n += err(f"{fname}: {q.get('id')} 读程序题不应有 input()")
    return n


def run_output(q):
    r = _run(q["code"], "", q)
    if not r["ok"] or norm(r["stdout"]) != norm(q["expected"]):
        return err(f"{q['id']}: 读程序题 expected 与真实运行结果不符" + _why(r, q["expected"]))
    return 0


def validate_parsons(q, fname):
    n = 0
    for f in ("id", "level", "title", "desc", "lines", "tests", "exp"):
        if f not in q:
            n += err(f'{fname}: {q.get("id", "?")} 缺字段 {f}')
    if q.get("level") not in LEVEL_RANGE:
        n += err(f'{fname}: {q.get("id")} level 非法')
    lines = q.get("lines", [])
    if not isinstance(lines, list) or len(lines) < 4:
        n += err(f'{fname}: {q.get("id")} lines 至少 4 行')
    if lines and any(not isinstance(l, str) for l in lines):
        n += err(f'{fname}: {q.get("id")} lines 必须全是字符串')
    ref = q.get("ref", "")
    if lines and ref != "\n".join(lines):
        n += err(f'{fname}: {q.get("id")} ref 必须等于 lines 按序 join')
    for d in q.get("distractors", []):
        if d in lines:
            n += err(f'{fname}: {q.get("id")} distractor 与正确行重复')
    return n


def run_parsons(q):
    n = 0
    for i, t in enumerate(q.get("tests", [])):
        r = _run(q["ref"], t.get("stdin", ""), q, t)
        want = t.get("expected", "")
        if not _passes(r, want, t):
            n += err(f"{q['id']}: test#{i + 1} 参考代码输出不符" + _why(r, want))
    return n


def run_coding(q):
    n = 0
    for i, t in enumerate(q.get("tests", [])):
        r = _run(q["ref"], t.get("stdin", ""), q, t)
        want = t.get("expected", "")
        if t.get("expectCanvas") and not want and not t.get("check"):
            # 旧式画布题（无运行后检查）：本地只能验证可运行
            ok = r["ok"]
        else:
            ok = _passes(r, want, t)
        if not ok:
            n += err(f"{q['id']}: test#{i + 1} 参考代码输出不符" + _why(r, want))
    return n


def check_files(q, fname, n):
    for f in q.get("files", []):
        if "name" not in f or "content" not in f:
            n += err(f"{fname}: {q.get('id')} files 项缺 name/content")
    return n


CODING_CATS = {"data", "calc", "draw", "db", "text"}


def make_wheel(module_file, content, dist, version):
    """把考场"第三方包"模块打成可 pip install 的纯 Python wheel（确定性：固定时间戳与顺序）。

    返回 (whl 文件名, base64 内容)。本机实操包里放的是 whl，学生要先 pip install 再 import。
    """
    import base64
    import hashlib
    import io
    import zipfile

    mod = module_file.rsplit("/", 1)[-1]
    info = f"{dist}-{version}.dist-info"
    files = [
        (mod, content.encode("utf-8")),
        (f"{info}/METADATA", f"Metadata-Version: 2.1\nName: {dist}\nVersion: {version}\n"
                             f"Summary: 上信考 Python 本机实操模拟包（{mod}）\n".encode("utf-8")),
        (f"{info}/WHEEL", b"Wheel-Version: 1.0\nGenerator: python2-pass\nRoot-Is-Purelib: true\nTag: py3-none-any\n"),
        (f"{info}/top_level.txt", (mod[:-3] + "\n").encode("utf-8")),
    ]

    def h(data):
        return "sha256=" + base64.urlsafe_b64encode(hashlib.sha256(data).digest()).rstrip(b"=").decode()

    record = "".join(f"{n},{h(b)},{len(b)}\n" for n, b in files) + f"{info}/RECORD,,\n"
    files.append((f"{info}/RECORD", record.encode("utf-8")))
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as z:
        for n, b in files:
            zi = zipfile.ZipInfo(n, date_time=(1980, 1, 1, 0, 0, 0))
            zi.compress_type = zipfile.ZIP_DEFLATED
            zi.external_attr = 0o644 << 16
            z.writestr(zi, b)
    return f"{dist}-{version}-py3-none-any.whl", base64.b64encode(buf.getvalue()).decode()


def local_code(q, code):
    """本机实操版程序：把素材文件名改写成考场路径 c:/素材/文件名（第三方包模块除外，它要 pip install 后 import）。"""
    for f in q.get("files", []):
        if f.get("wheel"):
            continue
        n = f["name"]
        for quote in ("'", '"'):
            code = code.replace(quote + n + quote, quote + "c:/素材/" + n + quote)
    return code


def attach_wheels(q):
    """files 中带 wheel 规格的模块：额外生成 whl（供本机实操包使用；网页判题仍用 .py 模块）。"""
    for f in q.get("files", []):
        w = f.get("wheel")
        if w and "whl_b64" not in w:
            w["whl_name"], w["whl_b64"] = make_wheel(f["name"], f["content"], w["dist"], w["version"])


def validate_coding(q, fname):
    n = 0
    for f in ("id", "level", "title", "desc", "tests", "ref"):
        if f not in q:
            n += err(f"{fname}: {q.get('id', '?')} 缺字段 {f}")
    if q.get("level") not in LEVEL_RANGE:
        n += err(f"{fname}: {q.get('id')} level 非法")
    if not q.get("tests"):
        n += err(f"{fname}: {q.get('id')} 缺 tests")
    if len(q.get("desc", "")) < 20:
        n += err(f"{fname}: {q.get('id')} desc 太短")
    if q.get("cat") is not None and q.get("cat") not in CODING_CATS:
        n += err(f"{fname}: {q.get('id')} cat 只能是 {sorted(CODING_CATS)}")
    attach_wheels(q)
    q["local_code"] = local_code(q, q.get("starter") or "")
    return n


ALLOWED_LESSON_KEYS = {"1", "2", "3", "4", "5", "6", "7"}


def main():
    if not os.path.isdir(SRC):
        os.makedirs(SRC)
    files = sorted(glob.glob(os.path.join(SRC, "*.json")))
    if not files:
        print("data_src/ 下没有 JSON 文件。先让内容代理写入题目 JSON。")
        sys.exit(1)

    mcq, blanks, fixes, codings = [], [], [], []
    # OOP 专项题（set="oop"）单独成池：不进关卡通关条件、不进模拟考抽题
    oop_mcq, oop_coding, outputs = [], [], []
    lessons = {}
    lesson_files = {}
    resources = []
    parsons = []
    blind = []
    official_meta = None
    nerr = 0
    seen_ids = set()

    print(f"== 读取 {len(files)} 个源文件 ==")
    for path in files:
        fname = os.path.basename(path)
        data, e = load_json(path)
        if e:
            nerr += err(f"{fname}: JSON 解析失败 {e}")
            continue
        kind = data.get("kind")
        items = data.get("items", [])
        print(f"-- {fname}: kind={kind}, {len(items)} 项")
        if kind == "mcq":
            for q in items:
                nerr += validate_mcq(q, fname)
                (oop_mcq if q.get("set") == "oop" else mcq).append(q)
        elif kind == "output":
            for q in items:
                nerr += validate_output(q, fname)
                outputs.append(q)
        elif kind == "blank":
            for q in items:
                nerr += validate_blank(q, fname)
                nerr += check_files(q, fname, 0)
                blanks.append(q)
        elif kind == "fix":
            for q in items:
                nerr += validate_fix(q, fname)
                nerr += check_files(q, fname, 0)
                fixes.append(q)
        elif kind == "coding":
            for q in items:
                nerr += validate_coding(q, fname)
                nerr += check_files(q, fname, 0)
                (oop_coding if q.get("set") == "oop" else codings).append(q)
        elif kind == "lesson":
            lv = str(data.get("level"))
            if lv not in ALLOWED_LESSON_KEYS or not data.get("md"):
                nerr += err(f"{fname}: lesson 需要 level(1-7) 与 md")
            else:
                lessons[int(lv)] = data["md"]
                if data.get("example_files"):
                    lesson_files[int(lv)] = data["example_files"]
        elif kind == "blind":
            for q in items:
                qt = q.get("type")
                if qt == "mcq":
                    nerr += validate_mcq(q, fname)
                    blind.append(q)
                elif qt == "blank":
                    nerr += validate_blank(q, fname)
                    nerr += check_files(q, fname, 0)
                    blind.append(q)
                elif qt == "fix":
                    nerr += validate_fix(q, fname)
                    nerr += check_files(q, fname, 0)
                    blind.append(q)
                elif qt == "coding":
                    nerr += validate_coding(q, fname)
                    nerr += check_files(q, fname, 0)
                    blind.append(q)
                else:
                    nerr += err(f"{fname}: {q.get('id', '?')} 未知 type {qt}")
        elif kind == "official":
            for q in items:
                nerr += validate_parsons(q, fname)
                nerr += check_files(q, fname, 0)
                parsons.append(q)
        elif kind == "official":
            meta = data.get("meta", {})
            for q in data.get("mcq", []):
                nerr += validate_mcq(q, fname)
                mcq.append(q)
            for q in data.get("blank", []):
                nerr += validate_blank(q, fname)
                nerr += check_files(q, fname, 0)
                blanks.append(q)
            for q in data.get("fix", []):
                nerr += validate_fix(q, fname)
                nerr += check_files(q, fname, 0)
                fixes.append(q)
            for q in data.get("coding", []):
                nerr += validate_coding(q, fname)
                nerr += check_files(q, fname, 0)
                codings.append(q)
            official_meta = dict(meta)
            official_meta["mcq_ids"] = [q["id"] for q in data.get("mcq", [])]
            official_meta["blank_ids"] = [q["id"] for q in data.get("blank", [])]
            official_meta["fix_ids"] = [q["id"] for q in data.get("fix", [])]
            official_meta["coding_ids"] = [q["id"] for q in data.get("coding", [])]
        elif kind == "resources":
            for r in data.get("items", []):
                if not r.get("title") or not r.get("url") or not r.get("desc"):
                    nerr += err(f"{fname}: resource 缺 title/url/desc")
                resources.append(r)
        else:
            nerr += err(f"{fname}: 未知 kind={kind}")

    # id 去重
    for lst, label in [
        (mcq, "mcq"),
        (blanks, "blank"),
        (fixes, "fix"),
        (codings, "coding"),
        (parsons, "parsons"),
        (oop_mcq, "oop mcq"),
        (oop_coding, "oop coding"),
        (outputs, "output"),
    ]:
        for q in lst:
            if q["id"] in seen_ids:
                nerr += err(f"{label} 重复 id: {q['id']}")
            seen_ids.add(q["id"])

    # 运行参考答案验证
    nrun = 0
    if not os.environ.get("SKIP_RUN"):
        print(
            f"\n== 运行参考答案验证（blank {len(blanks)} / fix {len(fixes)} / coding {len(codings)}）=="
        )
        for q in blanks:
            nrun += run_blank(q)
        for q in fixes:
            nrun += run_fix(q)
        for q in codings:
            nrun += run_coding(q)
        for q in parsons:
            nrun += run_parsons(q)
        for q in blind:
            qt = q.get("type")
            if qt == "blank":
                nrun += run_blank(q)
            elif qt == "fix":
                nrun += run_fix(q)
            elif qt == "coding":
                nrun += run_coding(q)
        print(f"== OOP 专项（单选 {len(oop_mcq)} / 读程序 {len(outputs)} / 编程 {len(oop_coding)}）==")
        for q in mcq + oop_mcq:
            nrun += run_mcq_code(q)
        for q in outputs:
            nrun += run_output(q)
        for q in oop_coding:
            nrun += run_coding(q)

    nerr += nrun
    print("\n== 汇总 ==")
    print(
        f"选择题 {len(mcq)} | 填空 {len(blanks)} | 改错 {len(fixes)} | 编程 {len(codings)} | 拼程序 {len(parsons)} | 盲测 {len(blind)} | 课程 {len(lessons)} | 资源 {len(resources)}"
    )
    print(f"OOP 专项：单选 {len(oop_mcq)} | 读程序写结果 {len(outputs)} | 编程 {len(oop_coding)}")
    print(f"错误 {nerr}")
    if nerr:
        sys.exit(1)

    # 打包
    bank = {
        "mcq": mcq,
        "blanks": blanks,
        "fixes": fixes,
        "coding": codings,
        "parsons": parsons,
        "oop": {"mcq": oop_mcq, "output": outputs, "coding": oop_coding},
        "lessons": {str(k): v for k, v in sorted(lessons.items())},
        "lessonFiles": {str(k): v for k, v in sorted(lesson_files.items())},
        "resources": resources,
    }
    if official_meta:
        bank["official"] = official_meta
    js = (
        "/* 本文件由 tools/build_data.py 自动生成，请勿手改；源数据在 data_src/ */\n"
        "window.BANK = " + json.dumps(bank, ensure_ascii=False, indent=1) + ";\n"
        "/* 本机实操包：运行时模板 + 与网站同一份的判题 harness（tools/ 原样打包） */\n"
        "window.PACK_SRC = "
        + json.dumps({
            "template": open(os.path.join(ROOT, "tools", "pack_template.py"), encoding="utf-8").read(),
            "libs": {n: open(os.path.join(ROOT, "tools", n), encoding="utf-8").read()
                     for n in ("harness.py", "py2check.py", "turtle_stub.py")},
        }, ensure_ascii=False)
        + ";\n"
        "/* 运行后检查源码（tools/py2check.py 原样打包；浏览器判题装成 py2check 模块） */\n"
        "window.PY2CHECK_SRC = "
        + json.dumps(open(os.path.join(ROOT, "tools", "py2check.py"), encoding="utf-8").read(), ensure_ascii=False)
        + ";\n"
    )
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(js)
    print(f"✓ 已生成 {OUT}（{os.path.getsize(OUT) // 1024} KB）")

    # 版本戳：更新 index.html 中的静态资源版本号，保证部署后浏览器拉到新数据
    stamp = time.strftime("%Y%m%d%H%M", time.localtime())
    index_path = os.path.join(ROOT, "index.html")
    with open(index_path, encoding="utf-8") as f:
        html = f.read()
    html2 = re.sub(r"((?:js/(?:config|core|data|util|state|runner|app)\.js|css/style\.css)\?v=)\w+", r"\g<1>" + stamp, html)
    if html2 != html:
        with open(index_path, "w", encoding="utf-8") as f:
            f.write(html2)
        print("✓ 资源版本戳已更新为", stamp)


if __name__ == "__main__":
    main()
