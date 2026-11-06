# 题库编写规范（data_src/SCHEMA.md）

本目录下每个 JSON 文件结构：`{"kind": "...", "items": [...]}` 或 `{"kind": "lesson", "level": N, "md": "..."}`。
kind 取值：`mcq`（单选）| `blank`（程序填空）| `fix`（调试改错）| `coding`（编程题）| `lesson`（关卡知识点）| `resources`（资源链接）。

## 通用硬性规则（违反会被构建工具拒绝）

1. **id 全局唯一**，格式 `<类型缩写>-l<关卡>-<三位序号>`，如 `mcq-l1-001`、`blk-l3-004`、`fix-l2-002`、`code-l5-001`。
2. `level` 为 1–7 整数，对应关卡：
   - L1 基础语法与数据类型（语法元素、input/print/eval、六大基本类型、变量与类型转换、运算符与表达式、优先级）
   - L2 控制流程与异常（if/elif/else、while/for/range、嵌套循环、break/continue、try-except【知道】、经典小算法：素数/水仙花/斐波那契/累加累乘/最值/计数/乘法表/图形打印）
   - L3 组合数据类型（字符串方法与切片、% 和 format 和 f-string 格式化、列表增删改排/列表解析/深浅复制/enumerate、元组、字典分类计数、集合去重）
   - L4 函数与代码复用（定义/返回值、位置/默认/关键字/可变参数、作用域、lambda、map/filter/sorted、递归【理解】、生成器/装饰器【知道】）
   - L5 文件与数据分析（文本/二进制、编码 UTF-8/GBK、open 读写追加、指针 seek、with、CSV 逐行处理、词频统计）
   - L6 常用库与生态（import/from/as/with、pip/whl 安装、random/math/calendar/time、turtle、jieba/wordcloud/openpyxl/Pillow/matplotlib【理解层面】、tkinter GUI【理解层面】）
   - L7 冲刺三级（正则 re、SQLite、面向对象、JSON、RESTful/FastAPI/Flask【理解层面】、matplotlib 数据可视化）
3. **判题型代码题（blank/fix/coding）可用能力**（浏览器 Pyodide 3.14，已验证）：csv、re、json、math、random（须 seed）、time、collections、string、**sqlite3**、**turtle**（站内有画布模拟，支持 forward/right/left/goto/penup/pendown/circle/pencolor/write/heading 等）、**matplotlib**（须 `matplotlib.use('Agg')`，判题靠 print 数据不靠图）。需要数据文件用题内 `files` 提供（二进制如 .db 用 `"b64": true`）。**仍不可用**：tkinter、PIL/Pillow、wordcloud、jieba、openpyxl（概念题除外）、真实路径操作。
4. **input() 一律不带提示文字**（写 `input()`，提示语写进 desc）。输出只打印题目要求的数据行，不要装饰性文字（除非题目明确要求格式）。
5. **禁止随机性**：判题型题目不得依赖 random 未定种子结果；如需随机必须 `random.seed(...)` 固定。
6. 题目文本全中文，代码中的变量名/输出内容可用英文。文本中的代码用反引号包裹（如 \`len(s)\`）。
7. 期望输出必须与你本地实际运行参考代码的结果**逐字符一致**（构建工具会逐一复核）。写完每道代码题，用以下命令自测：
   ```bash
   python3 - <<'EOF'
   import sys; sys.path.insert(0, 'tools')
   from harness import run_user
   code = open('/tmp/your_ref.py').read()   # 或直接贴字符串
   print(repr(run_user(code, "测试输入").get('stdout')))
   EOF
   ```
8. 难度定位：二级为主（80%），20% 可达三级难度（仅 L4 递归、L7）。题干表述贴近真题风格。

## mcq 单选题

```json
{
  "kind": "mcq",
  "items": [
    {
      "id": "mcq-l1-001",
      "level": 1,
      "topic": "标识符与关键字",
      "q": "下列选项中，不能作为 Python 变量名的是____。",
      "opts": ["_score", "2nd_name", "myVar", "姓名"],
      "ans": 1,
      "exp": "变量名不能以数字开头。2nd_name 以数字 2 开头，非法；下划线和中文都可以作变量名。",
      "difficulty": 1
    }
  ]
}
```

- `q` 是题干（可以含代码段：用 \`\`\`python ... \`\`\` 不支持——请把代码放进题干文本并用换行描述，或把代码作为 opts 的一部分；如需多行代码题干，写在 `q` 里用 `\n` 表示换行）。
- `ans` 是正确选项的 **0 基索引**。
- `exp` 必须讲清为什么对、其他选项为什么错（1–3 句）。
- `difficulty`: 1 简单 / 2 中等 / 3 较难。

## blank 程序填空题

代码模板中空位用 `___(1)___` `___(2)___` 标记（注意是三个下划线+括号数字+三个下划线）。

```json
{
  "kind": "blank",
  "items": [
    {
      "id": "blk-l2-001",
      "level": 2,
      "title": "密码强度判断",
      "desc": "输入一串字符作为密码，判断其强度：位数不少于8位记1分，含数字记1分，含大写字母记1分，含小写字母记1分；1-2分为弱，3分为中，4分为强。",
      "code": "def judge(passwd):\n    plen = 0\n    if ___(1)___ >= 8:\n        plen = 1\n    pnum, pupper, plower = False, False, False\n    for ch in passwd:\n        if ch in '0123456789':\n            pnum = True\n        if 'A' <= ch <= 'Z':\n            pupper = True\n        if 'a' <= ch <= 'z':\n            plower = True\n    result = plen + pnum + pupper + plower\n    return result\n\nwhile True:\n    pw = input()\n    if pw == '':\n        ___(2)___\n    s = judge(pw)\n    if s <= 2:\n        print('弱密码')\n    elif s == 3:\n        print('中等密码')\n    else:\n        print('强密码')",
      "blanks": [
        {"n": 1, "answers": ["len(passwd)"], "hint": "求密码长度"},
        {"n": 2, "answers": ["break"], "hint": "空串直接退出循环"}
      ],
      "stdin": "Abc12345\n",
      "expected": "强密码",
      "ref": "（完整可运行的参考代码，空已填好）",
      "hint": "布尔值参与加法时 True 算 1",
      "exp": "考查 len()、break、布尔累加、if-elif 分支。"
    }
  ]
}
```

- `code` 中每个 `___(n)___` 必须与 `blanks` 的 n 一一对应；每空 3–4 个为宜，最多 5 空。
- `stdin` 提供一组能让输出唯一的输入（含结尾换行）。**注意：若程序以空串作为结束标志（如 `while True` + `if s == '': break`），stdin 必须以一个空行结尾**，即 stdin 字符串以 `\n\n` 结束。`expected` 是参考代码在该输入下的完整 stdout。
- `answers` 是该空所有可接受写法（构建工具会把每个答案逐一代入验证输出一致）。
- 其他空不影响当前空验证：构建时其他空代入其第一个答案。**因此第一个答案必须与其他空兼容成完整正确程序。**

## fix 调试改错题

```json
{
  "kind": "fix",
  "items": [
    {
      "id": "fix-l2-001",
      "level": 2,
      "title": "打印数字三角形",
      "desc": "输入 1-9 之间的正整数 n，打印 n 行数字三角形，第 m 行输出 1..m。若 n 超出范围则提示。",
      "buggy": "line = input()\nn = int(line)\nif n > 9:\n    for m in range(1, n + 1):\n        for i in range(1, m + 1):\n            print(i, end='')\n        print()\nelse:\n    print('输入的行数不能超过9！')",
      "stdin": "4\n",
      "expected": "1\n12\n123\n1234",
      "errors": [
        {"line": 3, "hint": "题目要求 1-9 之间打印三角形，n>9 时才提示，条件写反了"}
      ],
      "ref": "line = input()\nn = int(line)\nif n <= 9:\n    for m in range(1, n + 1):\n        for i in range(1, m + 1):\n            print(i, end='')\n        print()\nelse:\n    print('输入的行数不能超过9！')",
      "exp": "考查 if 条件、range、嵌套循环与 end 参数。"
    }
  ]
}
```

- 3–4 处错误；**buggy 代码运行结果必须与 expected 不同或报错**（构建工具强制检查）。
- 每处错误给 `line`（1 基行号，指 buggy 代码中的行）与 `hint`。
- 题目遵循真题约定：不增删语句，只修改错误。

## coding 编程题

```json
{
  "kind": "coding",
  "items": [
    {
      "id": "code-l5-001",
      "level": 5,
      "title": "书籍评论数统计",
      "desc": "data.csv 存放了书籍数据（首行为标题行，UTF-8 编码），列依次为：书名,作者,出版年,价格,出版社,评论数。输入一个评论数阈值，列出评论数不小于该阈值的书籍的书名和评论数（用空格分隔），最后输出一行：共N本。",
      "files": [
        {"name": "data.csv", "content": "书名,作者,出版年,价格,出版社,评论数\n人工智能基础,张三,2019,59,清华出版社,1200\nPython入门,李四,2020,49,电子出版社,800\n深度学习,王五,2018,89,机械出版社,2500\n数据挖掘,赵六,2021,69,人民邮电出版社,900\n"}
      ],
      "starter": "",
      "tests": [
        {"stdin": "1000\n", "expected": "人工智能基础 1200\n深度学习 2500\n共2本"}
      ],
      "ref": "f = open('data.csv', 'r', encoding='utf-8')\nnext(f)\nn = int(input())\ntotal = 0\nfor line in f:\n    parts = line.strip().split(',')\n    comment = int(parts[5])\n    if comment >= n:\n        total += 1\n        print(parts[0], comment)\nf.close()\nprint('共{}本'.format(total))",
      "hint": "先 next(f) 或读后删掉标题行；注意 strip() 去换行",
      "exp": "考查文件读取、split、类型转换、计数与格式化输出。",
      "tags": ["文件", "字符串", "循环"]
    }
  ]
}
```

- `tests` 数组 2–3 组输入输出（覆盖典型与边界）；无输入的题 stdin 为空串。
- 需要 data 文件的用 `files` 内嵌（构建工具会写入临时目录再运行；浏览器端判题同样会自动创建）。
- `desc` 要完整自包含：数据格式、编码、输出格式全部写明。
- 编程题适当给出 `starter`（含函数框架的半成品）或留空让学生全写。

## lesson 关卡知识点

```json
{"kind": "lesson", "level": 1, "md": "### 标识符与关键字\n\n正文…\n\n```python\nx = 1\n```\n\n| 运算符 | 含义 |\n| --- | --- |\n| ** | 幂 |"}
```

- 只用受限 Markdown：`###`/`####` 标题、段落、`-` 列表、表格、\`\`\`python 代码块、`**加粗**`、`` `行内代码` ``。
- 每关结构固定：开头一段"本关在考试中的地位"；然后 4–8 个 `###` 小节覆盖本关全部考点（速查表风格，紧凑、可扫读）；末尾必含两个小节：`### 必背清单`（本关必须默写的函数/方法/语法）与 `### 易错点`（考试常见的坑，逐条列出）。
- 长度 150–300 行 md，代码示例优先用真题风格短程序。
- 含 `print` 的代码块在页面上带"▶ 运行"按钮。代码里有 `input()` 时会出现输入框，默认每次 `input()` 填一行：注释里写了"输入 X"就用 X，否则用 12。
- 可选 `example_files: [{"name", "content"}]`：本关示例运行时用到的素材（如 `data.csv`），每次运行前放进工作目录。

## resources 资源

```json
{"kind": "resources", "items": [
  {"cat": "github", "title": "Python-100-Days", "url": "https://github.com/jackfrued/Python-100-Days", "desc": "…"}
]}
```

cat 取值：official / github / tutorial / video / tool / paper。

## OOP 专项（`"set": "oop"`）与 output 读程序写结果题

- 带 `"set": "oop"` 的 mcq / coding 题打包进 `BANK.oop`（`oop.mcq` / `oop.coding`），在 `#oop` 专项页练习，**不计入关卡通关条件、不进模拟考抽题**。
- mcq 可带 `code`（题干代码块）。带 code 的代码阅读题必须给出 `run_expected`（程序真实输出）或 `run_error`（如 `"TypeError"`），构建工具会真实运行核对。`sub` 取 `code`（代码阅读）或 `concept`（概念）。
- `kind: "output"`（读程序写运行结果）：`{id, level, set, title, code, expected, exp, difficulty, tags}`；代码不得有 `input()`，`expected` 必须与真实运行结果一致（构建时核对）。作答比对只忽略行尾空格与末尾空行。
- OOP 编程题的每个测试点用 `check_class(user, '类名', methods=[...], base='父类')` 检查学生确实定义了类、构造方法和方法（见 `tools/py2check.py`），防止不写类直接 print 也能通过。
- 代码题以 class / `__init__` / self / 实例方法为主；标 `继承` 的少量题按 2025 大纲"三级全部为掌握"（含创建子类）补充。
