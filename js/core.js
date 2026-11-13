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

  /** 代码答案的结构归一化：只删除紧邻标点/符号（非字母数字）的空格。
   *  'len( s )' ≈ 'len(s)'、'a, b' ≈ 'a,b'；而 'hello world' 的词间空格
   *  会被保留——文本答案不会被误合并为 'helloworld'。 */
  function codeNorm(x) {
    var st = String(x).trim();
    var out = '';
    for (var i = 0; i < st.length; i++) {
      var c = st[i];
      if (c === ' ' || c === '\t') {
        var pv = i > 0 ? st[i - 1] : '';
        var nx = i + 1 < st.length ? st[i + 1] : '';
        var pp = pv && pv !== ' ' && pv !== '\t' && !/\w/.test(pv);
        var np = nx && nx !== ' ' && nx !== '\t' && !/\w/.test(nx);
        if (pp || np) continue;
      }
      out += c;
    }
    return out;
  }

  function matchBlank(blank, answer) {
    var ansCode = codeNorm(answer);
    var ok = (blank.answers || []).some(function (a) {
      return codeNorm(a) === ansCode;
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
  /** 知识点示例的默认输入：每次 input() 调用一行。优先用注释里写的"输入 X"，否则填 12；
   *  以空串作结束标志的 while True 循环再补一个空行。不调用 input() 返回 null。 */
  function sampleStdin(code) {
    const lines = [];
    let sentinel = false;
    String(code).split('\n').forEach(ln => {
      const n = (ln.match(/\binput\s*\(/g) || []).length;
      if (!n) return;
      const m = ln.match(/#.*?输入\s*([^\s，,。；;）)]+)/);
      for (let i = 0; i < n; i++) lines.push(m ? m[1] : '12');
    });
    if (!lines.length) return null;
    if (/while\s+True/.test(code) && /==\s*(''|"")/.test(code)) sentinel = true;
    return lines.join('\n') + (sentinel ? '\n\n' : '\n');
  }

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

  /* ---------- 错题间隔重复（SM-2 简化阶梯，无外部依赖） ---------- */
  var SRS_LADDER = [1, 2, 4, 7, 15, 30]; // 天

  /** 计算复习卡片的下一次调度。card 可为 null（首次做错）。
   *  pass=true 且无旧卡 → 不生成卡片（掌握的题不进复习队列） */
  function srsNext(card, pass, now) {
    var t = now || Date.now();
    var DAY = 86400000;
    if (!pass) {
      return { interval: 0, streak: 0, due: t + DAY, last: t }; // 明天再来
    }
    if (!card) return null; // 一次做对的题不需要复习
    var streak = (card.streak || 0) + 1;
    var interval = SRS_LADDER[Math.min(streak - 1, SRS_LADDER.length - 1)];
    return { interval: interval, streak: streak, due: t + interval * DAY, last: t };
  }

  /** 到期复习队列：due <= now 的卡片按到期时间升序 */
  function srsDue(cards, now) {
    var t = now || Date.now();
    return Object.keys(cards || {})
      .filter(function (qid) { return cards[qid] && cards[qid].due <= t; })
      .sort(function (a, b) { return cards[a].due - cards[b].due; })
      .map(function (qid) { return { qid: qid, card: cards[qid] }; });
  }

  /** 学习进度合并：本地与导入文件取更优记录，成绩按时间去重拼接 */
  function mergeProgress(local, imported) {
    var out = JSON.parse(JSON.stringify(local || {}));
    var imp = imported || {};
    var counts = { questions: 0, mocks: 0 };
    var kinds = ['mcq', 'blank', 'fix', 'coding', 'parsons', 'output'];
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
    out.srs = Object.assign({}, out.srs || {}, imp.srs || {}); // 复习卡：导入并集（同卡取后写入者，导出文件通常更新）
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

  /** 编程题单个测试点判定
   *  t.check：运行后检查（绘图线段 / matplotlib 数据 / 输出文件，见 tools/py2check.py），
   *           必须 r.checkOk === true；带 check 且无 expected 时不比对输出。
   *  t.expectCanvas：旧式"画出画布即可"判定（仅在无 check 时生效）。 */
  function judgeTest(r, t) {
    t = t || {};
    if (!r || !r.ok) return false;
    var outOk = (t.check && !t.expected) ? true : compareOutput(r.stdout, t.expected || '').ok;
    if (t.check) return outOk && r.checkOk === true;
    if (t.expectCanvas) return !!r.hasCanvas && (!t.expected || outOk);
    return outOk;
  }

  /* ---------- 倒排备考计划（按剩余天数生成，纯函数便于测试） ---------- */
  var DAY_MS = 86400000;
  function dayStart(v) {
    var d = new Date(v);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  }
  function ymd(ms) {
    var d = new Date(ms);
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }

  /** 把 S 个学习日分给各关：天数充足时每关至少 1 天、按工作量加权；不足时相邻关合并 */
  function allocLevelDays(levels, weights, S) {
    var total = levels.reduce(function (a, L) { return a + weights[L]; }, 0) || 1;
    if (S >= levels.length) {
      var alloc = levels.map(function () { return 1; });
      var spare = S - levels.length;
      var exact = levels.map(function (L) { return weights[L] / total * spare; });
      var base = exact.map(Math.floor);
      var left = spare - base.reduce(function (a, b) { return a + b; }, 0);
      var order = exact.map(function (v, i) { return [v - base[i], i]; }).sort(function (a, b) { return b[0] - a[0]; });
      for (var j = 0; j < left; j++) base[order[j][1]] += 1;
      return levels.map(function (L, i) { return { levels: [L], days: alloc[i] + base[i] }; });
    }
    // 天数少于关卡数：按累计工作量把相邻关卡装进 S 个桶
    var buckets = [];
    var acc = 0;
    var cur = [];
    levels.forEach(function (L, i) {
      cur.push(L);
      acc += weights[L];
      var remainingLevels = levels.length - i - 1;
      var remainingBuckets = S - buckets.length - 1;
      if (remainingBuckets > 0 && (acc >= total / S * (buckets.length + 1) || remainingLevels === remainingBuckets)) {
        buckets.push({ levels: cur, days: 1 });
        cur = [];
      }
    });
    if (cur.length) buckets.push({ levels: cur, days: 1 });
    return buckets;
  }

  /**
   * 生成从 today 到考试前一天的逐日计划。
   * o = { today, exam, target: 't2p'|'t2e'|'t3p'|'t3e', startLevel: 1..7,
   *       counts: { L: { mcq, code } }, levelNames: { L: '名称' } }
   * 返回 { totalDays, longPlan, days: [{ date, kind, title, tasks: [{ text, href }] , levels }] }
   *   kind: study | mock | offline | review | rest
   * 剩余超过 49 天时 longPlan=true（沿用七周计划）。
   */
  function buildCountdownPlan(o) {
    var t0 = dayStart(o.today);
    var D = Math.round((dayStart(o.exam) - t0) / DAY_MS);
    if (D <= 0) return { totalDays: 0, longPlan: false, days: [] };
    if (D > 49) return { totalDays: D, longPlan: true, days: [] };
    var t3 = /^t3/.test(o.target || 't3p');
    var names = o.levelNames || {};
    var counts = o.counts || {};
    var lastLevel = t3 ? 7 : 6;
    var start = Math.min(Math.max(o.startLevel || 1, 1), lastLevel);
    var levels = [];
    for (var L = start; L <= lastLevel; L++) levels.push(L);
    var weights = {};
    levels.forEach(function (L) {
      var c = counts[L] || { mcq: 20, code: 10 };
      weights[L] = (c.code || 0) + (c.mcq || 0) / 4 + 1;
    });

    var offlineN = D >= 10 ? (t3 ? 2 : 1) : (D >= 5 ? 1 : 0);
    var mockN = D >= 10 ? 2 : (D >= 4 ? 1 : 0);
    var sprintN = D >= 12 ? Math.max(2, Math.round(D * 0.18)) : (D >= 8 ? 1 : 0);
    var S = D - 1 - offlineN - mockN - sprintN;
    while (S < 1 && (sprintN || offlineN || mockN)) {
      if (sprintN) sprintN--; else if (offlineN) offlineN--; else mockN--;
      S = D - 1 - offlineN - mockN - sprintN;
    }
    if (D === 1) S = 0;

    var seq = [];
    var buckets = S > 0 ? allocLevelDays(levels, weights, S) : [];
    var lastDayOf = {};
    buckets.forEach(function (b) {
      for (var k = 0; k < b.days; k++) {
        var tasks = [];
        var merged = b.levels.length > 1;
        b.levels.forEach(function (L) {
          var c = counts[L] || { mcq: 0, code: 0 };
          var nm = names[L] ? '第 ' + L + ' 关' + names[L] : '第 ' + L + ' 关';
          if (k === 0) tasks.push({ text: nm + '：读知识点速览', href: '#level/' + L + '/lesson' });
          var m = Math.ceil((c.mcq || 0) / b.days);
          var cd = Math.ceil((c.code || 0) / b.days);
          if (merged) {
            tasks.push({ text: nm + '：单选全刷（' + (c.mcq || 0) + ' 题，错的进错题本）', href: '#level/' + L + '/mcq' });
            tasks.push({ text: nm + '：代码题挑 ★/★★ 的做 ' + Math.min(cd, 4) + ' 道（填空→改错→编程）', href: '#level/' + L });
          } else {
            if (m) tasks.push({ text: nm + '：单选 ' + m + ' 题（正确率目标 80%）', href: '#level/' + L + '/mcq' });
            if (cd) tasks.push({ text: nm + '：代码题 ' + cd + ' 道（按难度：填空→改错→编程）', href: '#level/' + L });
          }
        });
        var title = b.levels.map(function (L) { return '第 ' + L + ' 关' + (names[L] ? ' · ' + names[L] : ''); }).join(' + ');
        if (b.days > 1) title += '（' + (k + 1) + '/' + b.days + '）';
        seq.push({ kind: 'study', title: title, tasks: tasks, levels: b.levels.slice() });
        b.levels.forEach(function (L) { lastDayOf[L] = seq.length - 1; });
      }
    });

    var mockDay = function (variant, label) {
      return { kind: 'mock', title: '全真模拟 · ' + label, levels: [], tasks: [
        { text: '150 分钟限时做一场' + label + '（中途不查资料）', href: '#mock' },
        { text: '交卷后当天复盘：错题本里本场错题全部重做', href: '#wrong' }] };
    };
    var offlineDay = function (n) {
      return { kind: 'offline', title: '本机实操日' + (n > 1 ? ' ' + n : '') + '（考场环境）', levels: [], tasks: n === 1 ? [
        { text: '在电脑上用 IDLE/Anaconda（考场环境是 Windows + Python 3.8/Anaconda3）新建 c:/ks、c:/素材 文件夹，把 2 道文件编程题在本机写一遍', href: '#level/5/coding' },
        { text: '练 pip install 本地 .whl 文件并截图保存（官方卷编程 2 的第一步，浏览器里练不到）', href: '#level/6/mcq' },
        { text: '按考场要求保存：程序存为 c:/ks/4_1.py 这种文件名；改错题改过的行末加 ####', href: '#level/2/fix' }] : [
        { text: '本机练 SQLite：用 sqlite3 打开 .db 文件，先查询、不存在再 INSERT，最后 commit', href: '#level/7/coding' },
        { text: '本机练正则 + 写文件：读 html，re.findall 提取，open(..., "w", encoding="gbk") 写 CSV', href: '#level/7/coding' },
        { text: '本机用 turtle 或 matplotlib 画一遍官方卷的函数图像（坐标轴 + 放大 30 倍）', href: '#mock' }] };
    };

    // 插入模拟考与实操日
    var insertAfter = function (idx, item) { seq.splice(Math.min(idx + 1, seq.length), 0, item); };
    if (mockN >= 2) {
      var m1 = lastDayOf[4] !== undefined && lastDayOf[4] < seq.length - 1 ? lastDayOf[4] : Math.floor(seq.length / 2) - 1;
      insertAfter(m1, mockDay('standard', '标准卷'));
      for (var key in lastDayOf) if (lastDayOf[key] > m1) lastDayOf[key]++;
    }
    if (offlineN >= 1) {
      var o1 = lastDayOf[5] !== undefined ? lastDayOf[5] : Math.floor(seq.length / 2);
      insertAfter(o1, offlineDay(1));
      for (var key2 in lastDayOf) if (lastDayOf[key2] > o1) lastDayOf[key2]++;
    }
    if (offlineN >= 2) seq.push(offlineDay(2));
    if (mockN >= 1) seq.push(mockDay('official', '官方 A 卷（27A）'));
    for (var s = 0; s < sprintN; s++) {
      if (s % 2 === 1) {
        seq.push(mockDay(t3 ? 'tier3' : 'standard', t3 ? '三级冲刺卷' : '标准卷'));
      } else {
        seq.push({ kind: 'review', title: '错题清零' + (t3 ? ' + 三级题' : ''), levels: [], tasks: [
          { text: '错题本：今日到期的复习题全部做完', href: '#wrong' },
          { text: t3 ? '三级四域（递归/正则/SQLite/可视化）各重写 1 道编程题' : '文件数据分析编程题重写 2 道（编程大题主战场）', href: t3 ? '#level/7/coding' : '#level/5/coding' }] });
      }
    }
    seq.push({ kind: 'rest', title: '考前一天：休息与检查', levels: [], tasks: [
      { text: '不做新题，只翻错题本和知识点速览', href: '#wrong' },
      { text: '确认准考证、考场位置；本机 Python 能正常运行', href: '#about' }] });

    var days = seq.slice(0, D).map(function (d, i) {
      d.date = ymd(t0 + i * DAY_MS);
      d.index = i + 1;
      return d;
    });
    assignLocal(days, o.localPool, t3);
    return { totalDays: D, longPlan: false, days: days };
  }

  /** 读程序写运行结果：逐行严格比对（只忽略行尾空格和末尾空行；不像编程题那样剔除提示行）。
   *  返回 { ok, line, want, got }：line 为第一处不同的行号（1 起），ok 时为 0 */
  function judgeOutputAnswer(answer, expected) {
    var norm = function (s) {
      var lines = String(s || '').replace(/\r\n?/g, '\n').split('\n').map(function (l) { return l.replace(/\s+$/, ''); });
      while (lines.length && lines[lines.length - 1] === '') lines.pop();
      while (lines.length && lines[0] === '') lines.shift();
      return lines;
    };
    var a = norm(answer);
    var e = norm(expected);
    var n = Math.max(a.length, e.length);
    for (var i = 0; i < n; i++) {
      if (a[i] !== e[i]) {
        return { ok: false, line: i + 1, want: e[i] === undefined ? null : e[i], got: a[i] === undefined ? null : a[i] };
      }
    }
    return { ok: true, line: 0, want: null, got: null };
  }

  /* ---------- 编程题按官方五类组卷 ---------- */
  /** 官方 27A 编程题顺序与分值：数据分析 17 / 运算（第三方包）18 / 图形绘制 15 / 数据库 12 / 文本正则 13，共 75 */
  var FIVE_CATS = [
    { cat: 'data', name: '数据分析', score: 17 },
    { cat: 'calc', name: '运算（第三方包）', score: 18 },
    { cat: 'draw', name: '图形绘制', score: 15 },
    { cat: 'db', name: '数据库应用', score: 12 },
    { cat: 'text', name: '文本正则', score: 13 }
  ];
  /** 每类各抽 1 道（按 seed 确定，同 seed 同卷）；官方卷原题（p27-）留给"官方 A 卷"，不参与随机组卷 */
  function pickFiveCats(coding, seed) {
    var out = [];
    FIVE_CATS.forEach(function (c, i) {
      var pool = coding.filter(function (q) { return q.cat === c.cat && !/^p27-/.test(q.id); });
      if (!pool.length) pool = coding.filter(function (q) { return q.cat === c.cat; });
      if (pool.length) out.push(pool[Math.abs(seed * 7 + i * 13) % pool.length]);
    });
    return out;
  }
  function catScore(cat) {
    for (var i = 0; i < FIVE_CATS.length; i++) if (FIVE_CATS[i].cat === cat) return FIVE_CATS[i].score;
    return 0;
  }

  /**
   * 每天的本机实操（在 IDLE/Anaconda 里按考场目录 c:/ks、c:/素材 完成，下载的实操包可自动判分）。
   * pool = { byLevel: { L: { fix: [id], coding: [id] } }, byCat: { data|calc|draw|db|text: [id] } }
   * 给每天加 d.local = { kind: 'ids'|'paper'|'env', ids, label }，并在任务列表末尾加一条本机任务。
   */
  function assignLocal(days, pool, t3) {
    if (!pool) return;
    var cursor = {};
    var take = function (key, arr, n) {
      var out = [];
      if (!arr || !arr.length) return out;
      var c = cursor[key] || 0;
      for (var i = 0; i < n && i < arr.length; i++) out.push(arr[(c + i) % arr.length]);
      cursor[key] = c + n;
      return out;
    };
    var cats = t3 ? ['db', 'text', 'draw', 'calc'] : ['data', 'calc', 'draw', 'text'];
    var offlineN = 0;
    var reviewN = 0;
    days.forEach(function (d) {
      var loc = null;
      if (d.kind === 'study') {
        var L = d.levels[0];
        var lv = (pool.byLevel || {})[L] || {};
        var ids = take('f' + L, lv.fix, 1).concat(take('c' + L, lv.coding, d.levels.length > 1 ? 1 : 1));
        if (d.levels.length > 1) {
          var L2 = d.levels[d.levels.length - 1];
          ids = ids.concat(take('c' + L2, ((pool.byLevel || {})[L2] || {}).coding, 1));
        }
        if (ids.length) loc = { kind: 'ids', ids: ids, label: '本机实操：第 ' + d.levels.join('、') + ' 关 ' + ids.length + ' 题（改错 + 编程）' };
      } else if (d.kind === 'mock') {
        loc = { kind: 'paper', ids: [], label: '本机模拟卷：调试改错 3 + 编程 5（按官方五类，105 分）在 IDLE 里限时完成' };
      } else if (d.kind === 'offline') {
        offlineN++;
        var want = offlineN === 1 ? ['data', 'calc'] : ['db', 'text', 'draw'];
        var oids = [];
        want.forEach(function (c) { oids = oids.concat(take('k' + c, (pool.byCat || {})[c], 1)); });
        if (oids.length) loc = { kind: 'ids', ids: oids, label: '本机实操包：' + want.map(function (c) { return CAT_NAME[c]; }).join(' + ') + '（含 whl 安装 / 考场目录）' };
      } else if (d.kind === 'review') {
        var c1 = cats[(reviewN * 2) % cats.length];
        var c2 = cats[(reviewN * 2 + 1) % cats.length];
        reviewN++;
        var rids = take('k' + c1, (pool.byCat || {})[c1], 1).concat(take('k' + c2, (pool.byCat || {})[c2], 1));
        if (rids.length) loc = { kind: 'ids', ids: rids, label: '本机实操：' + CAT_NAME[c1] + ' + ' + CAT_NAME[c2] + ' 各 1 题' };
      } else if (d.kind === 'rest') {
        loc = { kind: 'env', ids: [], label: '本机环境检查：Python 版本、matplotlib、sqlite3、pip 是否可用' };
      }
      if (loc) {
        d.local = loc;
        d.tasks.push({ text: '💻 ' + loc.label, href: '#local/' + (loc.kind === 'ids' ? 'ids=' + loc.ids.join(',') : loc.kind), local: true });
      }
    });
  }
  var CAT_NAME = { data: '数据分析', calc: '运算（第三方包）', draw: '图形绘制', db: '数据库', text: '文本正则' };

  /** 一道题在模拟考中"浏览器判不了"的分值（如 whl 安装截图），不计入得分与满分 */
  function unjudgedPoints(q) {
    var u = q && q.unjudged;
    return u && u.points > 0 ? Number(u.points) : 0;
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
    sampleStdin: sampleStdin,
    srsNext: srsNext,
    srsDue: srsDue,
    SRS_LADDER: SRS_LADDER,
    errorLine: errorLine,
    gradeMcq: gradeMcq,
    judgeTest: judgeTest,
    unjudgedPoints: unjudgedPoints,
    judgeOutputAnswer: judgeOutputAnswer,
    FIVE_CATS: FIVE_CATS,
    pickFiveCats: pickFiveCats,
    catScore: catScore,
    buildCountdownPlan: buildCountdownPlan,
    ymd: ymd
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PY2CORE;
  }
  root.PY2CORE = PY2CORE;
})(typeof window !== 'undefined' ? window : globalThis);
