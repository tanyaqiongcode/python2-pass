"""本机实操包端到端测试：按网站 js/app.js 的 buildPack 同样的方式组包，再真实执行 setup → pip install → 作答 → check。

用法：python3 tools/test_packs.py（需先运行 tools/build_data.py 生成 js/data.js）
"""
import base64
import json
import os
import re
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from build_data import local_code  # noqa: E402


def load_bank():
    src = open(os.path.join(ROOT, "js", "data.js"), encoding="utf-8").read()
    bank = json.loads(re.search(r"window\.BANK = (\{.*?\});\n", src, re.S).group(1))
    pack_src = json.loads(re.search(r"window\.PACK_SRC = (\{.*?\});\n", src, re.S).group(1))
    return bank, pack_src


BANK, PACK_SRC = load_bank()
ALL = {q["id"]: ("coding", q) for q in BANK["coding"] + BANK["oop"]["coding"]}
ALL.update({q["id"]: ("fix", q) for q in BANK["fixes"]})


def frag(kind, q, idx):
    """与 js/app.js packFragment 一致。"""
    mats, wheels, wmods = [], [], {}
    for f in q.get("files", []):
        w = f.get("wheel")
        if w:
            mats.append({"path": w["whl_name"], "content": w["whl_b64"], "b64": True})
            wheels.append(w["whl_name"])
            wmods[w["whl_name"]] = f["name"][:-3]
        else:
            mats.append({"path": f["name"], "content": f["content"], "b64": bool(f.get("b64"))})
    if kind == "fix":
        tests = [{"stdin": q.get("stdin", ""), "expected": q.get("expected", ""), "check": q.get("check"), "cleanup": q.get("cleanup")}]
        fname, points = "程序调试题{}.py".format(idx), 10
    else:
        tests = q["tests"]
        fname, points = "4_{}.py".format(idx), {"data": 17, "calc": 18, "draw": 15, "db": 12, "text": 13}.get(q.get("cat"), 15)
    return {"kind": kind, "id": q["id"], "title": q["title"], "desc": q.get("desc", ""), "points": points, "file": fname,
            "code": q["local_code"], "tests": tests, "materials": mats, "wheels": wheels, "wheels_modules": wmods}


def build_pack(ids, title="测试包", folder="实操_测试"):
    qs, nc, nf = [], 0, 0
    for qid in ids:
        kind, q = ALL[qid]
        if kind == "fix":
            nf += 1
            qs.append(frag(kind, q, nf))
        else:
            nc += 1
            qs.append(frag(kind, q, nc))
    pack = {"title": title, "folder": folder, "questions": qs}
    b64 = lambda o: base64.b64encode(json.dumps(o, ensure_ascii=False).encode("utf-8")).decode()  # noqa: E731
    return PACK_SRC["template"].replace("__PACK_B64__", b64(pack)).replace("__LIBS_B64__", b64(PACK_SRC["libs"])), pack


FAILS = 0


def ok(label, cond, extra=""):
    global FAILS
    print(("  ✓ " if cond else "  ✗ ") + label + ("" if cond else "  → " + extra))
    if not cond:
        FAILS += 1


def run_pack(src, args, env=None, cwd=None):
    d = cwd or tempfile.mkdtemp(prefix="pack_")
    p = os.path.join(d, "实操包.py")
    open(p, "w", encoding="utf-8").write(src)
    r = subprocess.run([sys.executable, p] + args, capture_output=True, text=True, env=env, cwd=d, timeout=300)
    return d, r


def score_of(out):
    m = re.search(r"合计 ([\d.]+) / ([\d.]+) 分", out)
    return (float(m.group(1)), float(m.group(2))) if m else (None, None)


IDS = ["code-t3-004", "code-t3-007", "code-t3-010", "code-t3-001", "code-l5-001", "fix-l7-002"]
# 再找一道同样用 data.csv 但内容不同的题，测试素材重名
for qid, (kind, q) in ALL.items():
    if qid != "code-l5-001" and kind == "coding" and any(f["name"] == "data.csv" for f in q.get("files", [])):
        other = next(f for f in q["files"] if f["name"] == "data.csv")
        base = next(f for f in ALL["code-l5-001"][1]["files"] if f["name"] == "data.csv")
        if other["content"] != base["content"]:
            IDS.append(qid)
            break

print("== 组包：" + "、".join(IDS))
src, pack = build_pack(IDS)
d, r = run_pack(src, [])
ok("setup 成功", r.returncode == 0, r.stderr[-300:])
root = os.path.join(d, "实操_测试")
ok("建出 ks/ 素材/ 题目.txt", all(os.path.exists(os.path.join(root, x)) for x in ("ks", "素材", "题目.txt")))
ok("素材里有 whl", os.path.exists(os.path.join(root, "素材", "growth-1.0.0-py3-none-any.whl")))
ok("素材里没有放 Growth.py（必须 pip install）", not os.path.exists(os.path.join(root, "素材", "Growth.py")))
dup = [p for p in os.listdir(os.path.join(root, "素材")) if p.startswith("题")]
ok("同名不同内容的 data.csv 放进了 题N/ 子目录", bool(dup) or len(IDS) < 7, str(os.listdir(os.path.join(root, "素材"))))

print("== 起始代码直接 check：编程题应 0 分")
_, r = run_pack(src, ["check"], cwd=d)
got, full = score_of(r.stdout)
ok("起始代码得分低（只有改错题原代码也不得分）", got == 0, r.stdout[-600:])
ok("提示要先 pip install", "pip install" in r.stdout)

print("== pip install whl 后写入参考答案：应满分")
site = os.path.join(d, "site")
pip = subprocess.run([sys.executable, "-m", "pip", "install", "--no-index", "--target", site,
                      os.path.join(root, "素材", "growth-1.0.0-py3-none-any.whl")], capture_output=True, text=True)
ok("pip install growth whl", pip.returncode == 0, pip.stderr[-200:])
env = dict(os.environ, PYTHONPATH=site)
layout_q = {q["id"]: q for q in pack["questions"]}
for q in pack["questions"]:
    kind, orig = ALL[q["id"]]
    ans = local_code(orig, orig["ref"])
    if kind == "fix":
        buggy = q["code"].split("\n")
        lines = ans.split("\n")
        ans = "\n".join(l + ("  ####" if i < len(buggy) and l.rstrip() != buggy[i].rstrip() else "") for i, l in enumerate(lines))
    # 重名素材：答案里的路径同样改写到 题N/
    for p in dup:
        pass
    open(os.path.join(root, "ks", q["file"]), "w", encoding="utf-8").write(ans)
# 与 layout() 一致：对重名素材的题，把答案里的 c:/素材/data.csv 改到 题N/data.csv
if dup:
    idx = IDS.index(IDS[-1]) + 1
    qf = pack["questions"][idx - 1]["file"]
    pth = os.path.join(root, "ks", qf)
    s = open(pth, encoding="utf-8").read().replace("c:/素材/data.csv", "c:/素材/题{}/data.csv".format(idx))
    open(pth, "w", encoding="utf-8").write(s)
_, r = run_pack(src, ["check"], env=env, cwd=d)
got, full = score_of(r.stdout)
ok("参考答案满分 {}/{}".format(got, full), got == full and full, r.stdout[-900:])

print("== 改错题：改对但没加 ####、或增删语句，都不得分")
kind, fx = ALL["fix-l7-002"]
fq = next(q for q in pack["questions"] if q["id"] == "fix-l7-002")
fixed = local_code(fx, fx["ref"])
open(os.path.join(root, "ks", fq["file"]), "w", encoding="utf-8").write(fixed)
_, r = run_pack(src, ["check"], env=env, cwd=d)
ok("没加 #### 判 0 分并提示", "没有加 #### 标记" in r.stdout and score_of(r.stdout)[0] == full - fq["points"], r.stdout[-500:])
open(os.path.join(root, "ks", fq["file"]), "w", encoding="utf-8").write(fixed + "\nprint('多加一句')\n")
_, r = run_pack(src, ["check"], env=env, cwd=d)
ok("增加语句判 0 分并提示", "不增删语句" in r.stdout, r.stdout[-500:])

print("== 编程题：只 print 不写程序逻辑也不得分（数据库题检查库里有没有提交）")
dbq = next(q for q in pack["questions"] if q["id"] == "code-t3-007")
kind, dbo = ALL["code-t3-007"]
nocommit = local_code(dbo, dbo["ref"]).replace("    conn.commit()\n", "")
open(os.path.join(root, "ks", dbq["file"]), "w", encoding="utf-8").write(nocommit)
_, r = run_pack(src, ["check"], env=env, cwd=d)
ok("数据库题忘了 commit 扣分", "commit" in r.stdout and score_of(r.stdout)[0] < full, r.stdout[-500:])

print("== env 环境检查")
_, r = run_pack(src, ["env"], cwd=d)
ok("env 输出 Python 版本与 sqlite3", "Python" in r.stdout and "sqlite3" in r.stdout, r.stdout)

print("== 生成的包能被 Python 3.8 语法解析（考场版本）")
import ast  # noqa: E402
try:
    ast.parse(src, feature_version=(3, 8))
    for n, lib in PACK_SRC["libs"].items():
        ast.parse(lib, feature_version=(3, 8))
    ok("模板与 harness/py2check/turtle_stub 均为 3.8 语法", True)
except SyntaxError as e:
    ok("3.8 语法", False, str(e))

print("\n本机实操包测试：" + ("全部通过" if not FAILS else "{} 项失败".format(FAILS)))
sys.exit(1 if FAILS else 0)
