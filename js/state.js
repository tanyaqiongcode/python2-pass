/* ============================================================
 * 学习进度状态（localStorage 持久化）
 * ============================================================ */

const State = {
  data: null,

  defaults() {
    return {
      version: 1,
      mcq: {},        // qid -> {choice:int, correct:bool, ts}
      blank: {},      // qid -> {passed:bool, tries:int, ts}
      fix: {},        // qid -> {passed:bool, tries:int, ts}
      coding: {},     // qid -> {passed:bool, tries:int, ts}
      lessonRead: {}, // level -> true
      mockRuns: [],   // {ts, score, grade, detail}
      settings: { examDate: null, target: 't3p' }, // 考试日期覆盖 + 目标等第
      drafts: {},     // 代码草稿 kind:qid -> code
      srs: {},        // 复习卡 qid -> {kind, interval, streak, due, last}
      diagnosis: null // 入学诊断结果 {ts, perLevel, startLevel}
    };
  },

  init() {
    this.data = Object.assign(this.defaults(), Store.load());
    const exam = this.data.settings.examDate || window.CONFIG.examDate;
    this._examDate = exam;
    return this.data;
  },

  save() { return Store.save(this.data); },

  examDate() { return this._examDate; },
  setExamDate(d) {
    this._examDate = d;
    this.data.settings.examDate = d;
    this.save();
  },

  target() { return this.data.settings.target || 't3p'; },
  setTarget(t) {
    this.data.settings.target = t;
    this.save();
  },

  draft(key) { return (this.data.drafts || {})[key] || null; },
  saveDraft(key, code) {
    if (!this.data.drafts) this.data.drafts = {};
    if (code && code.trim()) this.data.drafts[key] = code;
    else delete this.data.drafts[key];
    this.save();
  },

  /* ---- 选择题 ---- */
  answerMcq(qid, choice, correct) {
    const prev = this.data.mcq[qid];
    this.data.mcq[qid] = { choice, correct, ts: Date.now(), wrongBefore: (prev && prev.wrongBefore) || !correct };
    if (this.data.srs) this.srsUpdate('mcq', qid, correct);
    this.save();
  },
  mcqStat(qid) { return this.data.mcq[qid] || null; },

  /* ---- 代码类题目 ---- */
  recordCode(kind, qid, passed) {
    const rec = this.data[kind][qid] || { tries: 0, passed: false };
    rec.tries += 1;
    rec.passed = rec.passed || passed;
    rec.ts = Date.now();
    this.data[kind][qid] = rec;
    if (this.data.srs) this.srsUpdate(kind, qid, passed);
    this.save();
  },
  codeStat(kind, qid) { return this.data[kind][qid] || null; },

  markLessonRead(level) {
    this.data.lessonRead[level] = true;
    this.save();
  },
  lessonReadStat(level) { return !!this.data.lessonRead[level]; },

  addMockRun(run) {
    this.data.mockRuns.push(run);
    return this.save(); // 显式返回保存结果，失败时调用方保留答卷
  },

  /* ---- 错题间隔重复 ---- */
  /** 做错 → 生成/重置复习卡；此前错过而这次通过 → 阶梯晋级。一次做对不建卡 */
  srsUpdate(kind, qid, pass) {
    const card = this.data.srs[qid];
    const next = PY2CORE.srsNext(card, pass);
    if (next) {
      next.kind = kind;
      this.data.srs[qid] = next;
    } else if (card) {
      delete this.data.srs[qid]; // 已晋级出队列
    }
    this.save();
  },
  srsDueItems(now) {
    return PY2CORE.srsDue(this.data.srs, now).map(x => ({
      qid: x.qid, kind: x.card.kind, due: x.card.due, streak: x.card.streak
    }));
  },

  /* ---- 统计 ---- */
  bankStat(kind, qid) {
    if (kind === 'mcq') return this.mcqStat(qid);
    return this.codeStat(kind, qid);
  },

  /** 某关卡状态：{read, mcqDone, mcqAcc, codeDone, codeTotal, cleared} */
  levelStat(level) {
    const B = window.BANK;
    const mcqs = B.mcq.filter(q => q.level === level);
    const codeItems = [
      ...B.blanks.filter(q => q.level === level).map(q => ['blank', q]),
      ...B.fixes.filter(q => q.level === level).map(q => ['fix', q]),
      ...B.coding.filter(q => q.level === level).map(q => ['coding', q])
    ];
    let mcqDone = 0, mcqRight = 0;
    for (const q of mcqs) {
      const st = this.mcqStat(q.id);
      if (st) { mcqDone++; if (st.correct) mcqRight++; }
    }
    const codeDone = codeItems.filter(([k, q]) => {
      const st = this.codeStat(k, q.id);
      return st && st.passed;
    }).length;
    const cfg = window.CONFIG.levelClear;
    const mcqOk = mcqs.length > 0 && mcqDone >= Math.min(cfg.mcqMinCount, mcqs.length) &&
      (mcqDone === 0 || mcqRight / mcqDone >= cfg.mcqMinAcc);
    const codeOk = codeItems.every(([k, q]) => {
      const st = this.codeStat(k, q.id);
      return st && st.passed;
    });
    const read = this.lessonReadStat(level);
    return {
      read, mcqTotal: mcqs.length, mcqDone, mcqRight,
      mcqAcc: mcqDone ? mcqRight / mcqDone : 0,
      codeTotal: codeItems.length, codeDone,
      mcqOk, codeOk,
      cleared: read && mcqOk && codeOk && codeItems.length > 0
    };
  },

  /** 全站总进度（0~1）：以全部题目的完成情况计算 */
  totalProgress() {
    const B = window.BANK;
    const total = B.mcq.length + B.blanks.length + B.fixes.length + B.coding.length;
    let done = 0;
    for (const q of B.mcq) if (this.mcqStat(q.id) && this.mcqStat(q.id).correct) done++;
    for (const q of B.blanks) { const s = this.codeStat('blank', q.id); if (s && s.passed) done++; }
    for (const q of B.fixes) { const s = this.codeStat('fix', q.id); if (s && s.passed) done++; }
    for (const q of B.coding) { const s = this.codeStat('coding', q.id); if (s && s.passed) done++; }
    return total ? done / total : 0;
  },

  /* ---- 数据备份（导出/导入） ---- */
  exportData() {
    return JSON.stringify({
      app: 'py2pass', version: 1,
      exportedAt: new Date().toISOString(),
      data: this.data
    });
  },

  /** 返回 {ok, counts|error}；合并成功后自动保存 */
  importData(jsonStr) {
    let parsed;
    try { parsed = JSON.parse(jsonStr); }
    catch (e) { return { ok: false, error: '文件不是有效的 JSON' }; }
    if (!parsed || parsed.app !== 'py2pass' || !parsed.data) {
      return { ok: false, error: '这不是本站的进度备份文件' };
    }
    const r = PY2CORE.mergeProgress(this.data, parsed.data);
    this.data = r.merged;
    this.save();
    return { ok: true, counts: r.counts, exportedAt: parsed.exportedAt };
  },

  /** 错题列表 */
  wrongItems() {
    const B = window.BANK;
    const out = [];
    for (const q of B.mcq) {
      const st = this.mcqStat(q.id);
      if (st && !st.correct) out.push({ kind: 'mcq', q });
    }
    for (const [kind, arr] of [['blank', B.blanks], ['fix', B.fixes], ['coding', B.coding]]) {
      for (const q of arr) {
        const st = this.codeStat(kind, q.id);
        if (st && st.tries > 0 && !st.passed) out.push({ kind, q });
      }
    }
    return out;
  }
};
