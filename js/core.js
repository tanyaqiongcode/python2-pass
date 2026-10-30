/* ============================================================
 * Py2 通关 · 纯逻辑核心（无 DOM 依赖）
 * 浏览器与 Node 测试共用：window.PY2CORE / module.exports
 * ============================================================ */
(function (root) {
  'use strict';

  /* ---------- 输出比较（判题核心） ---------- */
  function normalizeOutput(s) {
    return String(s).replace(/\r\n?/g, '\n').split('\n')
      .map(function (l) { return l.replace(/[ \t]+$/g, ''); })
      .join('\n').replace(/\n+$/g, '');
  }

  var PROMPT_RE = /^(请输入|输入|请给出|请键入|enter)[^\n]*[:：]\s*$/i;
  function stripPrompts(s) {
    return normalizeOutput(s).split('\n')
      .filter(function (l) { return !PROMPT_RE.test(l.trim()); }).join('\n');
  }

  /** 严格比较失败后，再按"去掉输入提示行"宽容比较一次 */
  function compareOutput(actual, expected) {
    var a = normalizeOutput(actual);
    var e = normalizeOutput(expected);
    if (a === e) return { ok: true, strict: true, msg: '输出完全一致' };
    if (stripPrompts(a) === stripPrompts(e)) {
      return { ok: true, strict: false, msg: '通过（忽略输入提示文字的差异）' };
    }
    return { ok: false, strict: false, msg: '输出不一致' };
  }

  /* ---------- 填空 ---------- */
  function substituteBlanks(template, answers) {
    var code = template;
    answers.forEach(function (a, i) {
      code = code.split('___(' + (i + 1) + ')___').join(String(a).trim());
    });
    return code;
  }

  function normAnswer(s) {
    return String(s).replace(/\s+/g, ' ').trim();
  }

  /** 代码答案比较：先按空白折叠比较，再按"去掉全部空格"比较（'len( s )' ≈ 'len(s)'） */
  function matchBlank(blank, answer) {
    var norm = normAnswer(answer);
    var squeeze = function (x) { return String(x).replace(/\s+/g, ''); };
    var ans = squeeze(answer);
    var ok = (blank.answers || []).some(function (a) {
      return normAnswer(a) === norm || squeeze(a) === ans;
    });
    return { n: blank.n, ok: ok };
  }

  /* ---------- 三级体系 ---------- */
  var T3_RE = /递归|正则|数据库|SQLite|sqlite|可视化|matplotlib|面向对象|JSON|API/i;
  function isTier3(q) {
    if (q.level === 7) return true;
    var t = [q.topic, q.title, (q.tags || []).join(' ')].join(' ');
    return T3_RE.test(t);
  }

  function targetLabel(t) {
    return { t2p: '二级合格', t2e: '二级优秀', t3p: '三级合格', t3e: '三级优秀' }[t] || '三级合格';
  }

  /** 等第预估：官方分数线不公布，此为公开透明的自估模型 */
  function estimateGrade(score, full, t3Score, t3Full) {
    var r = full ? score / full : 0;
    var t3 = t3Full ? t3Score / t3Full : 0;
    if (r >= 0.9 && t3 >= 0.8) return '三级优秀（参考）';
    if (r >= 0.75 && t3 >= 0.6) return '三级合格（参考）';
    if (r >= 0.75) return '二级优秀（参考）';
    if (r >= 0.6) return '二级合格（参考）';
    return '不合格（参考）';
  }

  /* ---------- 模拟考状态机 ---------- */
  /** 与页面解耦的过期判定：true = 应自动交卷 */
  function mockExpired(active, endAt, now) {
    return !!(active && typeof endAt === 'number' && isFinite(endAt) && now >= endAt);
  }

  /* ---------- 错误信息人话化（借鉴 futurecoder 的 friendly traceback 思路） ---------- */
  var FRIENDLY_ERRORS = [
    { re: /NameError: name ['"]?(.+?)['"]? is not defined/,
      cn: function (m) { return '变量或函数「' + m[1] + '」没有定义——检查拼写、是否忘记先定义，或字符串忘了加引号'; } },
    { re: /IndentationError|expected an indented block|unindent does not match|unexpected indent/,
      cn: function () { return '缩进错误——Python 用缩进表示代码块，同一块内缩进必须一致（建议一律 4 个空格）'; } },
    { re: /SyntaxError: invalid syntax/,
      cn: function () { return '语法错误——最常见原因：if/for/while/def 行末少了冒号、括号没配对、用了中文标点（：（）"")'; } },
    { re: /SyntaxError: '(.+?)' is an invalid syntax|cannot assign to/,
      cn: function (m) { return '「' + (m[1] || '表达式') + '」写法不合法——检查运算符、关键字拼写或赋值目标'; } },
    { re: /TypeError: '(.+?)' object is not subscriptable/,
      cn: function (m) { return m[1] + ' 类型不能用下标访问（比如 int/float 没有 s[0] 这种用法），先转成 str/list'; } },
    { re: /TypeError: '(.+?)' object is not callable/,
      cn: function (m) { return m[1] + ' 类型不能当函数调用——常见于把变量名和函数名写重，或对 sort() 这类返回 None 的结果继续调用'; } },
    { re: /TypeError: '(.+?)' object is not iterable/,
      cn: function (m) { return m[1] + ' 类型不能被 for 遍历——数字要先转 range(n) 或放进列表'; } },
    { re: /IndexError: (.*)index out of range/,
      cn: function () { return '下标越界——先 len() 看长度，最大合法下标是 长度-1；切片越界不报错但会截短'; } },
    { re: /KeyError: (.+)/,
      cn: function (m) { return '字典里没有键 ' + m[1] + '——用 d.get(k, 默认值) 或先 k in d 判断'; } },
    { re: /ValueError: invalid literal for int\(\) with base 10: ['"]?([\s\S]*?)['"]?\s*$/m,
      cn: function (m) { return 'int() 无法把 ' + (m[1] ? '"' + m[1] + '"' : '该字符串') + ' 转成整数——多半是输入带了换行/空格（先 strip()），或这行不是纯数字'; } },
    { re: /ValueError: (?:too many values to unpack|not enough values to unpack)/,
      cn: function () { return '解包个数不匹配——左边变量个数要和右边元素个数一致'; } },
    { re: /ZeroDivisionError/,
      cn: function () { return '除数为 0——分母可能来自输入或空列表的平均值，先判断再除'; } },
    { re: /EOFError/,
      cn: function () { return '程序请求输入，但测试输入已经用完——检查 input() 调用次数是否与题目输入一致'; } },
    { re: /ModuleNotFoundError: No module named ['"]?(.+?)['"]?/,
      cn: function (m) { return '模块 ' + m[1] + ' 在当前环境不可用——标准库检查拼写，第三方库需要先安装'; } },
    { re: /AttributeError: '(.+?)' object has no attribute '(.+?)'/,
      cn: function (m) { return m[1] + ' 类型没有 ' + m[2] + ' 方法/属性——比如元组没有 append，字符串排序要用 sorted()'; } },
    { re: /RecursionError/,
      cn: function () { return '递归深度超限——检查是否漏了终止条件（基例），或递归参数没有向基例收敛'; } },
    { re: /unsupported operand type\(s\) for \+: 'int' and 'str'/,
      cn: function () { return '数字和字符串不能直接相加——用 str() 或 int()/float() 统一类型'; } }
  ];

  /** 把 Python 报错翻译成中文提示；无匹配返回 null */
  function friendlyError(err) {
    var text = String(err || '');
    for (var i = 0; i < FRIENDLY_ERRORS.length; i++) {
      var m = text.match(FRIENDLY_ERRORS[i].re);
      if (m) return FRIENDLY_ERRORS[i].cn(m);
    }
    return null;
  }

  /** 从 traceback 文本提取出错行号（harness 会给 <student> 文件名） */
  function errorLine(tb) {
    var m = String(tb || '').match(/File "<student>", line (\d+)/);
    return m ? parseInt(m[1], 10) : null;
  }

  /** 学习进度合并：本地与导入文件取更优记录，成绩按时间去重拼接 */
  function mergeProgress(local, imported) {
    var out = JSON.parse(JSON.stringify(local || {}));
    var imp = imported || {};
    var counts = { questions: 0, mocks: 0 };
    var kinds = ['mcq', 'blank', 'fix', 'coding'];
    kinds.forEach(function (k) {
      var src = imp[k] || {};
      out[k] = out[k] || {};
      Object.keys(src).forEach(function (qid) {
        var a = src[qid];
        var b = out[k][qid];
        // 单选用 correct，代码题用 passed——两者都视为“通过”标记，
        // 合并永不倒退：通过记录不会被更新的未通过记录覆盖
        var aPassed = a.correct === true || a.passed === true;
        var bPassed = !!b && (b.correct === true || b.passed === true);
        var better = !b ||
          (aPassed && !bPassed) ||
          ((a.ts || 0) >= (b.ts || 0) && aPassed === bPassed);
        if (better) { out[k][qid] = a; counts.questions++; }
      });
    });
    out.lessonRead = Object.assign({}, out.lessonRead || {}, imp.lessonRead || {});
    out.drafts = Object.assign({}, out.drafts || {}, imp.drafts || {});
    var runs = (out.mockRuns || []).concat(imp.mockRuns || []);
    runs.sort(function (x, y) { return (x.ts || 0) - (y.ts || 0); });
    var seen = {}; var dedup = [];
    runs.forEach(function (r) {
      var key = (r.ts || 0) + ':' + (r.score || 0);
      if (!seen[key]) { seen[key] = true; dedup.push(r); }
    });
    counts.mocks = dedup.length - (out.mockRuns || []).length;
    out.mockRuns = dedup;
    if (imp.diagnosis) out.diagnosis = imp.diagnosis;
    if (imp.settings) out.settings = Object.assign({}, out.settings || {}, imp.settings);
    out.version = out.version || 1;
    return { merged: out, counts: counts };
  }

  /** 单选题判分（mock 与练习共用） */
  function gradeMcq(q, choice) {
    return choice === q.ans;
  }

  /** 编程题单个测试点判定 */
  function judgeTest(r, t) {
    if (!r || !r.ok) return false;
    var cmp = compareOutput(r.stdout, t.expected || '');
    if (t.expectCanvas) {
      return !!r.hasCanvas && (!t.expected || cmp.ok);
    }
    return cmp.ok;
  }

  var PY2CORE = {
    normalizeOutput: normalizeOutput,
    stripPrompts: stripPrompts,
    compareOutput: compareOutput,
    substituteBlanks: substituteBlanks,
    normAnswer: normAnswer,
    matchBlank: matchBlank,
    isTier3: isTier3,
    T3_RE: T3_RE,
    targetLabel: targetLabel,
    estimateGrade: estimateGrade,
    mockExpired: mockExpired,
    mergeProgress: mergeProgress,
    friendlyError: friendlyError,
    errorLine: errorLine,
    gradeMcq: gradeMcq,
    judgeTest: judgeTest
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PY2CORE;
  }
  root.PY2CORE = PY2CORE;
})(typeof window !== 'undefined' ? window : globalThis);
