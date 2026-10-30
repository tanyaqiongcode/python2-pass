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
    """若题目带 files，则在临时目录写入文件后 chdir 运行。"""
    files = q.get("files") or []
    if not files:
        yield
        return
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


def _run(code, stdin, q):
    with run_dir(q):
        return run_user(code, stdin)


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
    if not r["ok"] or norm(r["stdout"]) != norm(q["expected"]):
        n += err(
            f"{q['id']}: 参考答案整体运行结果与 expected 不符"
            + (
                f"（运行错误: {r['error']}）"
                if not r["ok"]
                else f"（实际: {norm(r['stdout'])[:80]!r} 期望: {norm(q['expected'])[:80]!r}）"
            )
        )
    # 逐空验证其余可接受答案（其他空用第一个答案代入）
    for b in q["blanks"]:
        for ans in b["answers"][1:]:
            filled = code
            for bb in q["blanks"]:
                repl = ans if bb["n"] == b["n"] else bb["answers"][0]
                filled = filled.replace(f"___({bb['n']})___", repl)
            r = _run(filled, stdin, q)
            if not r["ok"] or norm(r["stdout"]) != norm(q["expected"]):
                n += err(
                    f"{q['id']}: 第{b['n']}空答案 {ans!r} 未得到期望输出"
                    + (
                        f"（运行错误: {r['error']}）"
                        if not r["ok"]
                        else f"（实际: {norm(r['stdout'])[:80]!r} 期望: {norm(q['expected'])[:80]!r}）"
                    )
                )
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
    if not r["ok"] or norm(r["stdout"]) != norm(q["expected"]):
        n += err(
            f"{q['id']}: ref 运行结果与 expected 不符"
            + (
                f"（错误: {r['error']}）"
                if not r["ok"]
                else f"（实际: {norm(r['stdout'])[:80]!r} 期望: {norm(q['expected'])[:80]!r}）"
            )
        )
    rb = _run(q["buggy"], q.get("stdin", ""), q)
    if rb["ok"] and norm(rb["stdout"]) == norm(q["expected"]):
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
    for f in ("id", "level", "title", "buggy", "expected", "ref", "errors"):
        if f not in q:
            n += err(f"{fname}: {q.get('id', '?')} 缺字段 {f}")
    if q.get("level") not in LEVEL_RANGE:
        n += err(f"{fname}: {q.get('id')} level 非法")
    return n


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
        r = _run(q["ref"], t.get("stdin", ""), q)
        want = t.get("expected", "")
        if not r["ok"] or norm(r["stdout"]) != norm(want):
            n += err(
                f"{q['id']}: test#{i + 1} 参考代码输出不符"
                + (f"（错误: {r['error']}）" if not r["ok"] else
                   f"（实际: {norm(r['stdout'])[:80]!r} 期望: {norm(want)[:80]!r}）")
            )
    return n


def run_coding(q):
    n = 0
    for i, t in enumerate(q.get("tests", [])):
        r = _run(q["ref"], t.get("stdin", ""), q)
        want = t.get("expected", "")
        if t.get("expectCanvas") and not want:
            # 画布题：本地无法验证 canvas，仅验证可运行且 stdout 符合预期
            ok = r["ok"]
        else:
            ok = r["ok"] and norm(r["stdout"]) == norm(want)
        if not ok:
            n += err(
                f"{q['id']}: test#{i + 1} 参考代码输出不符"
                + (
                    f"（错误: {r['error']}）"
                    if not r["ok"]
                    else f"（实际: {norm(r['stdout'])[:80]!r} 期望: {norm(want)[:80]!r}）"
                )
            )
    return n


def check_files(q, fname, n):
    for f in q.get("files", []):
        if "name" not in f or "content" not in f:
            n += err(f"{fname}: {q.get('id')} files 项缺 name/content")
    return n


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
    lessons = {}
    resources = []
    parsons = []
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
                mcq.append(q)
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
                codings.append(q)
        elif kind == "lesson":
            lv = str(data.get("level"))
            if lv not in ALLOWED_LESSON_KEYS or not data.get("md"):
                nerr += err(f"{fname}: lesson 需要 level(1-7) 与 md")
            else:
                lessons[int(lv)] = data["md"]
        elif kind == "parsons":
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

    nerr += nrun
    print("\n== 汇总 ==")
    print(
        f"选择题 {len(mcq)} | 填空 {len(blanks)} | 改错 {len(fixes)} | 编程 {len(codings)} | 拼程序 {len(parsons)} | 课程 {len(lessons)} | 资源 {len(resources)}"
    )
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
        "lessons": {str(k): v for k, v in sorted(lessons.items())},
        "resources": resources,
    }
    if official_meta:
        bank["official"] = official_meta
    js = (
        "/* 本文件由 tools/build_data.py 自动生成，请勿手改；源数据在 data_src/ */\n"
        "window.BANK = " + json.dumps(bank, ensure_ascii=False, indent=1) + ";\n"
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
