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
        var better = !b ||
          (!!a.passed && !b.passed) ||
          ((a.ts || 0) > (b.ts || 0) && !!a.passed >= !!b.passed);
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
    gradeMcq: gradeMcq,
    judgeTest: judgeTest
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PY2CORE;
  }
  root.PY2CORE = PY2CORE;
})(typeof window !== 'undefined' ? window : globalThis);
