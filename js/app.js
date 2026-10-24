/* ============================================================
 * Py2 通关 · 主应用（hash 路由 SPA）
 * ============================================================ */

const LEVEL_META = [
  { no: 1,  title: '基础语法与数据类型', sub: '语法元素 · 输入输出 · 运算符 · 六大基本类型' },
  { no: 2,  title: '控制流程与异常',     sub: 'if 分支 · while/for 循环 · break/continue · 异常' },
  { no: 3,  title: '组合数据类型',       sub: '字符串 · 列表 · 元组 · 字典 · 集合' },
  { no: 4,  title: '函数与代码复用',     sub: '参数传递 · 作用域 · 高阶函数 · 递归' },
  { no: 5,  title: '文件与数据分析',     sub: '文件读写 · 编码 · CSV · 词频统计' },
  { no: 6,  title: '常用库与生态',       sub: 'random/math/time · turtle · jieba · 第三方库' },
  { no: 7,  title: '冲刺三级',   sub: '正则 · SQLite · 面向对象 · GUI · 数据可视化' }
];

const PLAN = [
  { w: 1, date: '第1周', goal: 'L1+L2 基础语法与控制流程', items: ['过一遍 L1、L2 知识点速览并标记已读', '刷完两关全部选择题（目标正确率 ≥80%）', '完成两关全部代码题，重点：input/print、if-elif、while/for、九九乘法表、素数判断'] },
  { w: 2, date: '第2周', goal: 'L3 组合数据类型（重中之重）', items: ['字符串切片/方法、列表增删改排、字典计数、集合去重逐个吃透', '刷完 L3 选择题 + 代码题', '自测：不查资料默写 10 个常用字符串方法'] },
  { w: 3, date: '第3周', goal: 'L4 函数 + 第一次模拟考', items: ['函数定义/参数/作用域/高阶函数全部通关', '完成第一次 150 分钟全真模拟（#mock）', '错题本清零'] },
  { w: 4, date: '第4周', goal: 'L5 文件与数据分析（编程大题主战场）', items: ['文件读写、with 语句、编码、CSV 逐行处理全部通关', '练熟“读文件→split→统计→输出”套路', '每天 1 道文件编程题保持手感'] },
  { w: 5, date: '第5周', goal: 'L6 常用库 + 第二次模拟考', items: ['random/math/time/calendar、turtle 绘图通关', 'jieba/wordcloud 文本分析代码过一遍（能默写套路）', '完成第二次全真模拟'] },
  { w: 6, date: '第6周', goal: 'L7 三级增量主攻 + 官方模拟卷', items: ['正则、SQLite、面向对象、可视化全部通关（三级必修）', '做一遍官方 A 卷（#mock 选“官方 A 卷”），对照错题复盘', '错题本全部重做至通过'] },
  { w: 7, date: '第7周', goal: '考前保温：三级冲刺卷轮回', items: ['只做错题与已通过题目快速复写', '每两天一场“三级冲刺卷”模拟考，盯紧三级题得分率 ≥80%', '考前一天：休息，检查准考证与考试环境'] }
];

const App = {
  current: '',

  init() {
    State.init();
    window.addEventListener('hashchange', () => this.render());
    this.render();
    // 空闲 3 秒后自动预热判题引擎（不阻塞浏览）
    setTimeout(() => { Engine.ensure(); }, 3000);
    this._tick = setInterval(() => this.updateCountdown(), 30000);
  },

  /* ---------- 路由 ---------- */
  parse() {
    const hash = location.hash.replace(/^#/, '') || 'home';
    return hash.split('/');
  },

  render() {
    const app = document.getElementById('app');
    const parts = this.parse();
    this.current = parts[0];
    document.querySelectorAll('#mainnav a').forEach(a => {
      a.classList.toggle('active', a.dataset.nav === parts[0]);
    });
    this.updateCountdown();
    window.scrollTo(0, 0);
    try {
      if (parts[0] === 'home') return this.viewHome(app);
      if (parts[0] === 'plan') return this.viewPlan(app);
      if (parts[0] === 'path') return this.viewPath(app);
      if (parts[0] === 'diagnostic') return this.viewDiagnostic(app);
      if (parts[0] === 'bank') return this.viewBank(app);
      if (parts[0] === 'level' && parts[1]) return this.viewLevel(app, +parts[1], parts[2] || 'lesson');
      if (parts[0] === 'mock') return this.viewMock(app);
      if (parts[0] === 'wrong') return this.viewWrong(app);
      if (parts[0] === 'resources') return this.viewResources(app);
      if (parts[0] === 'about') return this.viewAbout(app);
      app.innerHTML = '';
      app.append(h('div', { class: 'card' }, '页面不存在，', h('a', { href: '#home' }, '返回首页')));
    } catch (e) {
      console.error(e);
      app.innerHTML = '';
      app.append(h('div', { class: 'card' }, '页面渲染出错：', String(e.message || e)));
    }
  },

  updateCountdown() {
    const el = document.getElementById('countdown-chip');
    if (!el) return;
    const cd = fmtCountdown(State.examDate());
    el.textContent = `⏳ 距考试 ${cd.text}`;
    const d = new Date(State.examDate());
    el.title = `考试时间：${d.toLocaleString('zh-CN')}（可在首页修改倒计时目标）`;
  },

  /* ============================================================
   * 首页
   * ============================================================ */
  viewHome(app) {
    app.innerHTML = '';
    const prog = State.totalProgress();
    const cleared = LEVEL_META.filter(m => State.levelStat(m.no).cleared).length;

    const hero = h('div', { class: 'hero' },
      h('div', { class: 'hero-main' },
        h('h1', null, '通关这本网站，冲上 Python 三级'),
        h('p', null, '依据《上海市高等学校信息技术水平考试大纲（2025年版）》制作：7 个关卡覆盖二级全部考点 + 三级增量（递归/正则/SQLite/可视化），浏览器内在线判题（无需装 Python），支持官方模拟卷与三级冲刺卷。二三级同卷同场，分数够高自动拿三级。')
      ),
      h('div', { class: 'hero-count' },
        h('div', { class: 'lbl' }, '距离考试'),
        h('div', { class: 'num' }, String(fmtCountdown(State.examDate()).d)),
        h('div', { class: 'lbl' }, '天'),
        h('div', { class: 'date' }, new Date(State.examDate()).toLocaleDateString('zh-CN') + ' · 点此', h('a', { href: 'javascript:App.askExamDate()', style: 'color:inherit' }, '修改')),
        h('div', { style: 'margin-top:10px' }, h('a', { class: 'btn btn-sm', href: '#mock' }, '直接开一场模拟考'))
      )
    );

    const progCard = h('div', { class: 'card' },
      h('h2', null, '总进度'),
      h('div', { class: 'progressbar' }, h('div', { style: `width:${(prog * 100).toFixed(1)}%` })),
      h('div', { class: 'progress-meta' },
        h('span', null, `已通过 ${Math.round(prog * 100)}%`),
        h('span', null, `已通关 ${cleared}/${LEVEL_META.length} 关`)
      )
    );

    const map = h('div', { class: 'levelmap' });
    for (const m of LEVEL_META) {
      const st = State.levelStat(m.no);
      const B = window.BANK;
      const mcqN = B.mcq.filter(q => q.level === m.no).length;
      const codeN = B.blanks.filter(q => q.level === m.no).length +
        B.fixes.filter(q => q.level === m.no).length +
        B.coding.filter(q => q.level === m.no).length;
      map.append(
        h('a', { class: 'levelcard' + (st.cleared ? ' done' : ''), href: `#level/${m.no}/lesson` },
          h('div', { class: 'lv-no' }, '0' + m.no),
          h('h3', null, m.title),
          h('div', { class: 'lv-sub' }, m.sub),
          h('div', { class: 'lv-stats' },
            h('span', null, '速览 ', h('b', null, st.read ? '✓' : '○')),
            h('span', null, `选择 ${st.mcqDone}/${mcqN}`),
            h('span', null, `代码 ${st.codeDone}/${codeN}`)
          )
        )
      );
    }

    const ns = computeNextStep();
    const nextCard = h('div', { class: 'card', style: 'display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;border-color:#bfe3cd;background:linear-gradient(180deg,#f2fbf5,#fff)' },
      h('div', null,
        h('b', { style: 'font-size:16px' }, '▶ 下一步：' + ns.title),
        h('div', { class: 'muted small' }, ns.desc)),
      h('a', { class: 'btn btn-green', href: ns.href }, ns.cta));

    const tgtCard = h('div', { class: 'card' },
      h('h2', null, '🎯 目标等第'),
      h('div', { class: 'muted small', style: 'margin-bottom:8px' },
        '二三级同卷同场，按分数划档（不合格 / 二级合格 / 二级优秀 / 三级合格 / 三级优秀）。目标越高，通关要求越严。'),
      h('div', { style: 'display:flex;gap:8px;flex-wrap:wrap' },
        ['t2p', 't2e', 't3p', 't3e'].map(t =>
          h('button', { class: 'sec-tab' + (State.target() === t ? ' active' : ''), onclick: () => {
            State.setTarget(t); App.render();
          } }, targetLabel(t))
        )),
      State.target().startsWith('t3')
        ? h('div', { class: 'tip', style: 'margin-top:10px' },
            '🎓 三级模式已开启：第 7 关（递归/正则/SQLite/可视化/OOP）为必修关，模拟考建议使用三级冲刺卷或官方 A 卷。')
        : h('div', { class: 'notice', style: 'margin-top:10px' },
            '提示：以三级为目标性价比最高——同样一场考试，分数够高自动拿三级证书。')
    );

    // 三级里程碑：四大增量域
    const domains = [
      { key: '递归', re: /递归|汉诺塔|斐波那契/ },
      { key: '正则表达式', re: /正则|提取/ },
      { key: 'SQLite 数据库', re: /SQLite|数据库|数据表/ },
      { key: '数据可视化', re: /matplotlib|可视化|绘制/ }
    ];
    const B2 = window.BANK;
    const milestone = h('div', { class: 'card' },
      h('h2', null, '🎓 三级增量里程碑'),
      h('div', { class: 'muted small', style: 'margin-bottom:8px' }, '三级 = 二级全部内容 + 以下四个增量域。每格显示该域编程题的通过情况。'),
      h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px' },
        domains.map(dm => {
          const qs = B2.coding.filter(q => dm.re.test(q.title + ' ' + (q.tags || []).join(' ') + ' ' + (q.desc || '').slice(0, 60)));
          const done = qs.filter(q => { const st = State.codeStat('coding', q.id); return st && st.passed; }).length;
          return h('div', { class: 'stat-box' },
            h('div', { class: 'v' }, `${done}/${qs.length}`),
            h('div', { class: 'k' }, dm.key + (done === qs.length && qs.length ? ' ✓' : '')));
        }))
    );

    const quick = h('div', { class: 'card' },
      h('h2', null, '快捷入口'),
      h('div', { style: 'display:flex;gap:10px;flex-wrap:wrap' },
        h('a', { class: 'btn', href: '#level/1/lesson' }, '从第 1 关开始'),
        h('a', { class: 'btn btn-ghost', href: '#bank' }, '按题型刷题'),
        h('a', { class: 'btn btn-ghost', href: '#mock' }, '全真模拟考'),
        h('a', { class: 'btn btn-ghost', href: '#wrong' }, '错题本'),
        h('a', { class: 'btn btn-ghost', href: '#resources' }, '资源库'),
        h('a', { class: 'btn btn-ghost', href: '#about' }, '考试说明')
      )
    );

    app.append(hero, nextCard, tgtCard, progCard,
      h('h2', { style: 'margin:18px 0 10px' }, '关卡地图'), map,
      milestone, quick);
  },

  askExamDate() {
    const cur = State.examDate().slice(0, 10);
    const v = prompt('设置考试日期（用于倒计时），格式 2026-11-28：', cur);
    if (v && /^\d{4}-\d{2}-\d{2}/.test(v.trim())) {
      State.setExamDate(v.trim() + ' 09:00');
      this.updateCountdown();
      this.render();
    }
  },

  /* ============================================================
   * 备考计划
   * ============================================================ */
  viewPlan(app) {
    app.innerHTML = '';
    app.append(h('h1', { class: 'page-title' }, '🗓 七周备考计划'), h('p', { class: 'page-sub' }, '从今天到考试日的节奏表：每周一个主攻关卡 + 一场模拟考。可与关卡地图配合使用。'));
    for (const p of PLAN) {
      app.append(h('div', { class: 'plan-week' },
        h('div', { class: 'wk' }, p.date, h('small', null, p.goal.split(' ')[0])),
        h('div', { class: 'wk-body' }, h('b', null, p.goal), h('ul', { style: 'margin:6px 0 0;padding-left:20px' }, p.items.map(i => h('li', null, i))))
      ));
    }
    app.append(h('div', { class: 'notice' }, h('b', null, '提示：'),
      ' 二三级同卷同场、按分数划档：总分率 ≥60% 二级合格参考，≥75% 且三级题得分率 ≥60% 三级合格参考，≥90% 且三级题 ≥80% 三级优秀参考。目标定三级——同样的考试，分数够高自动拿三级证书。'));
  },

  /* ---- 数据备份 ---- */
  exportProgress() {
    const blob = new Blob([State.exportData()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const d = new Date();
    a.download = `py2pass-backup-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  },

  importProgress(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const r = State.importData(String(reader.result));
      if (!r.ok) { alert('导入失败：' + r.error); return; }
      alert(`导入成功：合并 ${r.counts.questions} 条答题记录、新增 ${r.counts.mocks} 场模拟考成绩。`);
      this.render();
    };
    reader.readAsText(file);
  },

  clearProgress() {
    if (!confirm('确定清空全部学习进度吗？此操作不可撤销（建议先导出备份）。')) return;
    if (!confirm('再次确认：真的要清空吗？')) return;
    localStorage.removeItem(Store.key);
    localStorage.removeItem(Mock.KEY);
    State.init();
    this.render();
  },

  /* ============================================================
   * 学习路径（难度递进 + 状态驱动）
   * ============================================================ */
  viewPath(app) {
    app.innerHTML = '';
    const ns = computeNextStep();
    const diag = State.data.diagnosis;
    app.append(
      h('h1', { class: 'page-title' }, '🧭 学习路径'),
      h('p', { class: 'page-sub' }, '按难度递进设计：诊断定起点 → 语法筑基 → 数据结构 → 函数与文件 → 库与工具 → 三级增量 → 综合冲刺。每一站都由你的实际进度驱动。'),
      h('div', { class: 'card', style: 'display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;border-color:#bfe3cd;background:linear-gradient(180deg,#f2fbf5,#fff)' },
        h('div', null, h('b', { style: 'font-size:16px' }, '▶ 下一步：' + ns.title), h('div', { class: 'muted small' }, ns.desc)),
        h('a', { class: 'btn btn-green', href: ns.href }, ns.cta)
      )
    );

    const phase = (no, name, goal, levels, extra) => {
      const B = window.BANK;
      const lvCards = levels.map(no2 => {
        const st = State.levelStat(no2);
        return h('a', { class: 'levelcard' + (st.cleared ? ' done' : ''), href: `#level/${no2}/lesson`, style: 'min-width:210px' },
          h('h3', null, `第 ${no2} 关 · ${LEVEL_META.find(m2 => m2.no === no2).title}`),
          h('div', { class: 'lv-stats' },
            h('span', null, '速览 ', h('b', null, st.read ? '✓' : '○')),
            h('span', null, `选择 ${st.mcqDone}/${st.mcqTotal}`),
            h('span', null, `代码 ${st.codeDone}/${st.codeTotal}`)));
      });
      return h('div', { class: 'card' },
        h('h2', null, `阶段 ${no} · ${name}`, extra || null),
        h('div', { class: 'muted small', style: 'margin-bottom:8px' }, goal),
        h('div', { style: 'display:flex;gap:12px;flex-wrap:wrap' }, lvCards));
    };

    const mockRuns = State.data.mockRuns;
    const lastMock = mockRuns[mockRuns.length - 1];
    app.append(
      phase(0, '入学诊断', '14 道跨关卡快题，测出起点与薄弱关（不计入进度）', [],
        h('span', { class: 'badge' + (diag ? ' badge-master' : '') }, diag ? '已完成 · 建议从第 ' + diag.startLevel + ' 关开始' : '未开始')),
      phase(1, '语法筑基 ★', '变量、类型、输入输出、分支与循环——一切的地基', [1, 2]),
      phase(2, '数据结构 ★★', '字符串/列表/元组/字典/集合，等级考试的重头戏', [3]),
      phase(3, '函数与文件 ★★', '函数参数与作用域、文件读写与数据分析（编程大题主战场）', [4, 5]),
      phase(4, '库与工具 ★★', 'random/math/time、turtle 绘图、第三方库生态', [6]),
      phase(5, '三级增量 ★★★ 🎓', '正则、SQLite 数据库、面向对象、数据可视化——三级与二级的分水岭', [7]),
      h('div', { class: 'card' },
        h('h2', null, '阶段 6 · 综合冲刺 🎓'),
        h('div', { class: 'muted small', style: 'margin-bottom:8px' }, '模拟考轮回 + 错题清零。三级题得分率 ≥80% 即达到三级优秀参考线。'),
        h('div', { style: 'display:flex;gap:10px;flex-wrap:wrap;align-items:center' },
          h('a', { class: 'btn', href: '#mock' }, '模拟考'),
          h('a', { class: 'btn btn-ghost', href: '#wrong' }, '错题本'),
          lastMock ? h('span', { class: 'muted small' },
            '最近一场：' + ({ standard: '标准卷', tier3: '三级冲刺卷', official: '官方A卷' }[lastMock.variant || 'standard'])
            + ` ${lastMock.score} 分 · ${lastMock.grade}`) : null)
      ),
      diag ? h('div', { style: 'margin-top:6px' },
        h('button', { class: 'btn btn-ghost btn-sm', onclick: () => { State.data.diagnosis = null; State.save(); App._diagAnswers = null; App._diagDone = false; App.render(); } }, '重做入学诊断')) : null
    );
  },

  /* ============================================================
   * 入学诊断（14 题定起点，不计入进度与错题本）
   * ============================================================ */
  viewDiagnostic(app) {
    app.innerHTML = '';
    const diag = State.data.diagnosis;
    if (this._diagAnswers && this._diagDone && State.data.diagnosis) {
      return this.renderDiagResult(app);
    }
    if (!this._diagAnswers) {
      // 确定性抽题：每关 2 题（先易后中）
      const B = window.BANK;
      const picks = [];
      for (let lv = 1; lv <= 7; lv++) {
        const pool = B.mcq.filter(q => q.level === lv).sort((a, b) => (a.difficulty || 2) - (b.difficulty || 2));
        if (pool[0]) picks.push(pool[0]);
        const mid = pool.find(q => (q.difficulty || 2) >= 2 && !picks.includes(q));
        if (mid) picks.push(mid); else if (pool[1]) picks.push(pool[1]);
      }
      this._diagAnswers = { qs: picks, ans: {} };
    }
    const D = this._diagAnswers;
    app.append(
      h('h1', { class: 'page-title' }, '🧭 入学诊断'),
      h('p', { class: 'page-sub' }, `共 ${D.qs.length} 题（每关 2 题），不计入进度与错题本。凭第一感觉作答，答完给出起点建议与各关掌握度。`));
    D.qs.forEach((q, i) => {
        const letters = ['A', 'B', 'C', 'D'];
        const opts = h('div', { class: 'opts' });
        q.opts.forEach((o, j) => {
          opts.append(h('div', { class: 'opt' + (D.ans[q.id] === j ? ' selected' : ''), onclick: () => {
            D.ans[q.id] = j;
            opts.querySelectorAll('.opt').forEach((e, jj) => e.classList.toggle('selected', jj === j));
          } }, h('span', { class: 'opt-key' }, letters[j] + '.'), h('span', null, o)));
        });
        app.append(h('div', { class: 'qcard' },
          h('div', { class: 'qhead' }, h('span', { class: 'qno' }, `${i + 1}. `), h('span', { class: 'qtag' }, `第 ${q.level} 关 · ${q.topic || ''}`)),
          h('div', { class: 'qtext', html: miniMdInline(q.q) }), opts));
    });
    app.append(
      h('div', { style: 'text-align:center;margin:20px 0' },
        h('button', { class: 'btn btn-green', style: 'font-size:16px;padding:12px 40px', onclick: () => {
          const unanswered = D.qs.filter(q => D.ans[q.id] === undefined).length;
          if (unanswered && !confirm(`还有 ${unanswered} 题未作答，未答题按错误计。提交诊断？`)) return;
          App.gradeDiagnostic();
        } }, '提交诊断，看我的起点'),
        ' ',
        h('button', { class: 'btn btn-ghost', onclick: () => { App._diagAnswers = null; App._diagDone = false; App.render(); } }, '放弃')
      )
    );
  },

  gradeDiagnostic() {
    const D = this._diagAnswers;
    const perLevel = {};
    D.qs.forEach(q => {
      const lv = perLevel[q.level] = perLevel[q.level] || { right: 0, total: 0 };
      lv.total++;
      if (D.ans[q.id] === q.ans) lv.right++;
    });
    let startLevel = 7;
    for (let lv = 1; lv <= 7; lv++) {
      const st = perLevel[lv];
      if (!st || st.right / st.total < 0.5) { startLevel = lv; break; }
      if (st.right / st.total < 1) startLevel = Math.min(startLevel, lv);
    }
    State.data.diagnosis = { ts: Date.now(), perLevel, startLevel };
    State.save();
    this._diagDone = true;
    this.render();
  },

  renderDiagResult(app) {
    const D = this._diagAnswers;
    const diag = State.data.diagnosis;
    const per = diag.perLevel;
    app.innerHTML = '';
    const desc = diag.startLevel === 7
      ? '基础非常扎实！直接主攻第 7 关三级增量（正则/SQLite/OOP/可视化），配合三级冲刺卷与官方 A 卷。'
      : `建议从第 ${diag.startLevel} 关开始：前面的关卡你已基本掌握，第 ${diag.startLevel} 关及之后需要系统过一遍。`;
    app.append(
      h('h1', { class: 'page-title' }, '🧭 诊断结果'),
      h('div', { class: 'card score-hero' },
        h('div', { class: 'big' }, '第 ' + diag.startLevel + ' 关'),
        h('div', { class: 'muted' }, '推荐起点'),
        h('p', { style: 'max-width:52ch;margin:10px auto 0' }, desc),
        h('div', { style: 'margin-top:14px' },
          h('a', { class: 'btn btn-green', href: '#level/' + diag.startLevel + '/lesson' }, '按推荐开始学习'),
          ' ',
          h('a', { class: 'btn btn-ghost', href: '#path' }, '查看完整学习路径'))),
      h('div', { class: 'card' },
        h('h2', null, '各关掌握度'),
        h('table', { class: 'testtable' },
          h('tr', null, h('th', null, '关卡'), h('th', null, '答对'), h('th', null, '掌握度'), h('th', null, '判断')),
          LEVEL_META.map(m => {
            const st = per[m.no] || { right: 0, total: 0 };
            const pct = st.total ? Math.round(st.right / st.total * 100) : 0;
            const verdict = st.total === 0 ? '—' : (pct === 100 ? '✓ 已掌握' : (pct >= 50 ? '△ 半熟' : '✗ 薄弱'));
            return h('tr', null,
              h('td', null, `第 ${m.no} 关 · ${m.title}`),
              h('td', null, `${st.right}/${st.total}`),
              h('td', null, pct + '%'),
              h('td', null, h('span', { class: pct === 100 ? 'pass-cell' : (pct >= 50 ? '' : 'fail-cell') }, verdict)));
          })),
        h('p', { class: 'muted small' }, '诊断只反映选择题手感，代码能力以各关代码题实测为准。'),
        h('div', { style: 'margin-top:8px' },
          h('button', { class: 'btn btn-ghost btn-sm', onclick: () => { App._diagAnswers = null; App._diagDone = false; App.render(); } }, '重新诊断'))
      )
    );
  },

  /* ============================================================
   * 题库总览
   * ============================================================ */
  viewBank(app) {
    app.innerHTML = '';
    const B = window.BANK;
    app.append(h('h1', { class: 'page-title' }, '📚 题库刷题'), h('p', { class: 'page-sub' },
      `共 ${B.mcq.length} 道单选 · ${B.blanks.length} 道程序填空 · ${B.fixes.length} 道调试改错 · ${B.coding.length} 道编程题`));
    const grid = h('div', { class: 'levelmap' });
    for (const m of LEVEL_META) {
      const st = State.levelStat(m.no);
      grid.append(h('a', { class: 'levelcard' + (st.cleared ? ' done' : ''), href: `#level/${m.no}/mcq` },
        h('h3', null, `第 ${m.no} 关 · ${m.title}`),
        h('div', { class: 'lv-sub' }, m.sub),
        h('div', { class: 'lv-stats' }, h('span', null, `正确率 ${(st.mcqAcc * 100).toFixed(0)}%`), h('span', null, `代码通过 ${st.codeDone}/${st.codeTotal}`))
      ));
    }
    app.append(grid);
  },

  /* ============================================================
   * 关卡页（tabs：知识点 / 单选 / 填空 / 改错 / 编程）
   * ============================================================ */
  viewLevel(app, level, tab) {
    app.innerHTML = '';
    const meta = LEVEL_META.find(m => m.no === level);
    if (!meta) { app.append(h('div', { class: 'card' }, '关卡不存在')); return; }
    const B = window.BANK;
    const st = State.levelStat(level);
    const counts = {
      lesson: st.read ? '✓' : '',
      mcq: B.mcq.filter(q => q.level === level).length,
      blank: B.blanks.filter(q => q.level === level).length,
      fix: B.fixes.filter(q => q.level === level).length,
      coding: B.coding.filter(q => q.level === level).length
    };
    const tabs = h('div', { class: 'tabs' },
      h('a', { href: `#level/${level}/lesson`, class: tab === 'lesson' ? 'active' : '' }, '📖 知识点速览 ', counts.lesson ? h('span', { class: 'done-tick' }, counts.lesson) : ''),
      h('a', { href: `#level/${level}/mcq`, class: tab === 'mcq' ? 'active' : '' }, `✅ 单选题（${counts.mcq}）`),
      counts.blank ? h('a', { href: `#level/${level}/blank`, class: tab === 'blank' ? 'active' : '' }, `✏️ 程序填空（${counts.blank}）`) : null,
      counts.fix ? h('a', { href: `#level/${level}/fix`, class: tab === 'fix' ? 'active' : '' }, `🐞 调试改错（${counts.fix}）`) : null,
      counts.coding ? h('a', { href: `#level/${level}/coding`, class: tab === 'coding' ? 'active' : '' }, `💻 编程题（${counts.coding}）`) : null
    );
    app.append(
      h('h1', { class: 'page-title' }, `第 ${meta.no} 关 · ${meta.title}`),
      h('p', { class: 'page-sub' }, meta.sub, meta.no === 7 && State.target().startsWith('t3') ? h('b', null, '　（三级必修关）') : null),
      tabs
    );
    const box = h('div');
    app.append(box);
    if (tab === 'lesson') this.renderLesson(box, level);
    if (tab === 'mcq') this.renderMcqs(box, level);
    if (tab === 'blank') this.renderCodeTasks(box, 'blank', B.blanks.filter(q => q.level === level));
    if (tab === 'fix') this.renderCodeTasks(box, 'fix', B.fixes.filter(q => q.level === level));
    if (tab === 'coding') this.renderCodeTasks(box, 'coding', B.coding.filter(q => q.level === level));

    // 关底导航
    const next = LEVEL_META.find(m => m.no === level + 1);
    const foot = h('div', { class: 'pagination' });
    if (level > 1) foot.append(h('a', { class: 'btn btn-ghost', href: `#level/${level - 1}/lesson` }, `← 第 ${level - 1} 关`));
    const clearedBanner = st.cleared
      ? h('div', { class: 'tip' }, '🎉 本关已通关！继续保持，前往下一关或直接来一场模拟考检验（', h('a', { href: '#mock' }, '#mock'), '）')
      : h('div', { class: 'notice' }, h('b', null, '通关条件：'), '阅读速览（点“标记已读”）+ 单选题正确率 ≥80% + 本关全部代码题通过。');
    foot.append(next ? h('a', { class: 'btn', href: `#level/${next.no}/lesson` }, `第 ${next.no} 关 →`) : h('a', { class: 'btn', href: '#mock' }, '去模拟考 →'));
    app.append(clearedBanner, foot);
  },

  renderLesson(box, level) {
    const md = window.BANK.lessons[level];
    if (!md) { box.append(h('div', { class: 'card' }, '本关知识点整理中…')); return; }
    const wrap = h('div', { class: 'card lesson' });
    wrap.innerHTML = miniMd(md);
    // 给可运行的 python 代码块加"▶ 运行"按钮（turtle/matplotlib 会显示画布）
    wrap.querySelectorAll('pre').forEach(pre => {
      const codeText = pre.textContent;
      if (!codeText.includes('print') || codeText.includes('…') || codeText.length > 1500) return;
      const runArea = h('div');
      const btn = h('button', { class: 'btn btn-ghost btn-sm', style: 'margin:4px 0' }, '▶ 运行这段代码');
      btn.addEventListener('click', async () => {
        btn.disabled = true; btn.textContent = '⏳ 运行中…';
        runArea.innerHTML = '';
        const canvasBox = h('div', { class: 'canvas-box' });
        const r = await Engine.run(codeText, { mount: canvasBox });
        runArea.append(canvasBox);
        const out = h('pre', { class: 'output' });
        out.textContent = r.stdout || '（无输出）';
        runArea.append(out);
        if (!r.ok) {
          runArea.append(h('pre', { class: 'output' }, h('span', { class: 'out-err' }, '⚠ ' + r.error)));
          const hint = PY2CORE.friendlyError(r.error);
          if (hint) runArea.append(h('div', { class: 'tip' }, '💡 ' + hint));
        }
        btn.disabled = false; btn.textContent = '▶ 再运行一次';
      });
      pre.after(btn, runArea);
    });
    box.append(wrap);
    box.append(h('div', { style: 'margin:6px 0 20px' },
      h('button', { class: 'btn btn-green', onclick: () => { State.markLessonRead(level); App.render(); } }, State.lessonReadStat(level) ? '✓ 已标记已读（再点一次重新渲染）' : '我已读完本关速览，标记已读')
    ));
  },

  /* ---------- 单选题渲染 ---------- */
  renderMcqs(box, level) {
    const qs = window.BANK.mcq.filter(q => q.level === level)
      .sort((a, b) => (a.difficulty || 2) - (b.difficulty || 2) || a.id.localeCompare(b.id));
    if (!qs.length) { box.append(h('div', { class: 'card' }, '本关暂无选择题')); return; }
    let done = 0, idx = 0, lastDiff = 0;
    const stageName = { 1: '★ 基础', 2: '★★ 进阶', 3: '★★★ 挑战' };
    qs.forEach((q) => {
      idx++;
      const diff = q.difficulty || 2;
      if (diff !== lastDiff) {
        lastDiff = diff;
        box.append(h('h3', { style: 'margin:18px 0 8px;color:var(--blue-dark)' },
          stageName[diff] || '★★ 进阶',
          h('span', { class: 'muted small', style: 'font-weight:400;margin-left:8px' },
            diff === 1 ? '先把地基打牢' : diff === 2 ? '考试主力题型' : '拉开差距的题')));
      }
      const st = State.mcqStat(q.id);
      box.append(this.mcqCard(q, idx, st));
      if (st && st.correct) done++;
    });
    box.append(h('p', { class: 'muted small' }, `已答对 ${done}/${qs.length} · 答错的题答对后自动从错题本移出`));
  },

  mcqCard(q, no, st) {
    const letters = ['A', 'B', 'C', 'D', 'E'];
    const card = h('div', { class: 'qcard' });
    card.append(h('div', { class: 'qhead' },
      h('span', { class: 'qno' }, `${no}. `),
      h('span', null,
        isTier3(q) ? h('span', { class: 'badge badge-master', title: '三级重点题' }, '🎓 三级') : null,
        q.difficulty ? h('span', { class: 'muted small' }, '★'.repeat(q.difficulty)) : null),
      h('span', { class: 'qtag' }, q.topic || '')
    ));
    card.append(h('div', { class: 'qtext', html: miniMdInline(q.q) }));
    const opts = h('div', { class: 'opts' });
    const locked = !!(st && st.correct);   // 答对锁定；答错可重试
    const attempted = !!st;                 // 有作答记录就给即时反馈
    q.opts.forEach((optText, i) => {
      const cls = ['opt'];
      if (locked) {
        cls.push('disabled');
        if (i === q.ans) cls.push('right');
        if (st.choice === i && !st.correct) cls.push('wrong');
      } else if (st && st.choice === i) cls.push('selected');
      const opt = h('div', { class: cls.join(' '), onclick: () => {
        if (locked) return;
        const correct = i === q.ans;
        State.answerMcq(q.id, i, correct);
        // 重绘本题（答错保留反馈并允许再试）
        const nc = App.mcqCard(q, no, State.mcqStat(q.id));
        card.replaceWith(nc);
      } },
        h('span', { class: 'opt-key' }, letters[i] + '.'),
        h('span', { html: miniMdInline(optText) })
      );
      opts.append(opt);
    });
    card.append(opts);
    if (attempted) {
      if (st.correct) {
        card.append(h('div', { class: 'explain' },
          h('span', { class: 'verdict ok' }, '✓ 回答正确　'),
          h('span', { class: 'muted' }, `正确答案：${letters[q.ans]}`),
          h('div', { html: miniMdInline(q.exp || '') })
        ));
      } else {
        // 答错：立即提示，解析与正确答案点按钮后才展开（保留再试的价值）
        const reveal = h('div', { class: 'explain', style: 'display:none' },
          h('span', { class: 'muted' }, `正确答案：${letters[q.ans]}　`),
          h('div', { html: miniMdInline(q.exp || '') }));
        card.append(h('div', { class: 'explain' },
          h('span', { class: 'verdict no' }, '✗ 回答错误，再试一次　'),
          h('button', { class: 'btn btn-ghost btn-sm', onclick: (e) => {
            reveal.style.display = reveal.style.display === 'none' ? 'block' : 'none';
            e.target.textContent = reveal.style.display === 'none' ? '看解析' : '收起解析';
          } }, '看解析')),
          reveal);
      }
    }
    return card;
  },

  /* ---------- 代码题（填空/改错/编程）渲染 ---------- */
  renderCodeTasks(box, kind, qs) {
    if (!qs.length) { box.append(h('div', { class: 'card' }, '本类题目整理中…')); return; }
    const kindName = { blank: '程序填空', fix: '调试改错', coding: '编程题' }[kind];
    box.append(h('div', { class: 'notice' },
      h('b', null, '判题说明：'),
      ' 代码在浏览器内真实运行（首次判题会加载引擎，约 10~20MB，需联网）。程序请求输入时，测试输入会自动喂给 input()；',
      '比对输出时空行与行尾空格会被忽略。若引擎加载失败，可展开参考答案对照自评。🎓 = 三级重点题。'));
    const sorted = qs.slice().sort((a, b) => (a.difficulty || 2) - (b.difficulty || 2) || a.id.localeCompare(b.id));
    let lastDiff = 0;
    const stageName = { 1: '★ 基础', 2: '★★ 进阶', 3: '★★★ 挑战' };
    sorted.forEach((q, idx) => {
      const diff = q.difficulty || 2;
      if (diff !== lastDiff) {
        lastDiff = diff;
        box.append(h('h3', { style: 'margin:18px 0 8px;color:var(--blue-dark)' },
          stageName[diff] || '★★ 进阶',
          h('span', { class: 'muted small', style: 'font-weight:400;margin-left:8px' },
            diff === 1 ? '照着套路写' : diff === 2 ? '考试主力' : '冲三级优秀')));
      }
      box.append(this.codeCard(kind, q, idx + 1));
    });
  },

  codeCard(kind, q, no) {
    const kindName = { blank: '程序填空', fix: '调试改错', coding: '编程题' }[kind];
    const st = State.codeStat(kind, q.id);
    const card = h('div', { class: 'qcard' });
    const badges = [];
    if (isTier3(q)) badges.push(h('span', { class: 'badge badge-master', title: '三级重点题' }, '🎓 三级'));
    const diff = q.difficulty;
    if (diff) badges.push(h('span', { class: 'muted small' }, '★'.repeat(diff)));
    card.append(h('div', { class: 'qhead' },
      h('span', { class: 'qno' }, `${no}. ${q.title || ''}`),
      h('span', null, ...badges, ' ', h('span', { class: 'qtag' }, kindName + (st && st.passed ? ' · 已通过 ✓' : '')))
    ));
    if (q.desc) card.append(h('div', { class: 'qtext', html: miniMdInline(q.desc) }));

    /* 填空题：题干代码 + 空白输入框（答案按空保存为草稿，刷新不丢） */
    let blankInputs = [];
    if (kind === 'blank') {
      card.append(h('div', { class: 'io-label' }, '程序代码（黄色标记处即第 n 空）：'), blankCodeBlock(q.code));
      const wrap = h('div', { style: 'margin:8px 0' });
      (q.blanks || []).forEach(b => {
        const key = `blank:${q.id}:${b.n}`;
        const inp = h('input', { class: 'blank-input', 'data-n': b.n, placeholder: '在此填写代码，如 len(s)', style: 'flex:1;padding:7px 10px;border:1.5px solid var(--line);border-radius:8px;font-family:var(--mono);font-size:13.5px' });
        inp.value = State.draft(key) || '';
        inp.addEventListener('input', () => State.saveDraft(key, inp.value));
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); runBtn.click(); } });
        wrap.append(h('div', { style: 'display:flex;gap:8px;align-items:center;margin:4px 0' },
          h('span', { class: 'inline-code', style: 'min-width:52px;text-align:center' }, `第${b.n}空`), inp));
      });
      card.append(wrap);
      blankInputs = Array.from(card.querySelectorAll('.blank-input'));
    }

    /* 代码编辑器 */
    let editor = null;
    if (kind !== 'blank') {
      const base = kind === 'fix' ? q.buggy : (q.starter || `# ${q.title || '在此编写代码'}\n`);
      const draft = State.draft(kind + ':' + q.id);
      const initial = draft !== null ? draft : base;
      editor = h('textarea', { class: 'code-editor', spellcheck: 'false' });
      editor.value = initial;
      editor.addEventListener('keydown', e => {
        if (e.key === 'Tab') {
          e.preventDefault();
          const s2 = editor.selectionStart, epos = editor.selectionEnd;
          editor.value = editor.value.slice(0, s2) + '    ' + editor.value.slice(epos);
          editor.selectionStart = editor.selectionEnd = s2 + 4;
        } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          runBtn.click();
        }
      });
      editor.addEventListener('input', () => State.saveDraft(kind + ':' + q.id, editor.value));
      card.append(h('div', { class: 'editor-wrap' }, editor));
    }

    /* 测试输入预览 */
    const tests = kind === 'coding' ? (q.tests || [{ stdin: q.stdin || '', expected: q.expected || '' }]) : [{ stdin: q.stdin || '', expected: q.expected || '' }];
    if (tests.some(t => t.stdin)) {
      card.append(h('div', { class: 'io-label' }, '测试输入（自动喂给 input()）：'));
      tests.forEach(t => { if (t.stdin) card.append(h('pre', { class: 'output' }, t.stdin)); });
    }

    const outBox = h('div');
    card.append(outBox);

    const btnRow = h('div', { style: 'display:flex;gap:10px;margin-top:10px;flex-wrap:wrap' });
    const runBtn = h('button', { class: 'btn btn-green' }, st && st.passed ? '▶ 重新运行判题' : '▶ 运行并判题');
    const showRefBtn = h('button', { class: 'btn btn-ghost btn-sm', style: 'display:none' }, '显示参考答案');
    const refBox = h('div', { style: 'display:none;margin-top:10px' });
    btnRow.append(runBtn, showRefBtn);
    card.append(btnRow, refBox);

    showRefBtn.addEventListener('click', () => {
      if (refBox.style.display === 'none') {
        refBox.style.display = 'block';
        refBox.innerHTML = '';
        refBox.append(h('div', { class: 'io-label' }, '参考答案：'), codeBlock(q.ref || '# 无'));
        if (kind === 'fix' && q.errors) {
          refBox.append(h('div', { class: 'io-label' }, '错误点提示：'));
          q.errors.forEach(e => refBox.append(h('div', { class: 'pitfall' }, `第 ${e.line} 行：${e.hint}`)));
        }
        showRefBtn.textContent = '收起参考答案';
      } else {
        refBox.style.display = 'none';
        showRefBtn.textContent = '显示参考答案';
      }
    });

    runBtn.addEventListener('click', async () => {
      outBox.innerHTML = '';
      runBtn.disabled = true;
      runBtn.textContent = '⏳ 运行中…';
      const canvasBox = h('div', { class: 'canvas-box' });
      let code = '', passes = [], details = [];
      try {
        if (kind === 'blank') {
          const answers = blankInputs.map(inp => inp.value);
          if (answers.some(a => !a.trim())) {
            outBox.append(h('div', { class: 'result-banner fail' }, '请先填写所有空白（每一空都要填）'));
            runBtn.disabled = false; runBtn.textContent = '▶ 运行并判题'; return;
          }
          code = substituteBlanks(q.code, answers);
          outBox.append(canvasBox);
          const r = await Engine.run(code, { stdin: q.stdin || '', files: q.files, mount: canvasBox });
          passes = [r.ok && compareOutput(r.stdout, q.expected || '').ok];
          // 逐空反馈
          const perBlank = (q.blanks || []).map((b, i) => matchBlank(b, answers[i]));
          renderResult(outBox, r, q.expected || '', passes[0], perBlank);
        } else {
          code = editor.value;
          let allPass = true;
          outBox.append(canvasBox);
          for (const t of tests) {
            const r = await Engine.run(code, { stdin: t.stdin || '', files: q.files, mount: canvasBox });
            const cmp = compareOutput(r.stdout, t.expected || '');
            const pass = r.ok && (t.expectCanvas ? (r.hasCanvas && (!t.expected || cmp.ok)) : cmp.ok);
            passes.push(pass);
            if (!pass) allPass = false;
            details.push({ r, t, cmp, pass });
          }
          renderResult(outBox, null, '', allPass, null, details);
        }
        const passed = passes.every(Boolean);
        State.recordCode(kind, q.id, passed);
        if (passed) showRefBtn.style.display = 'inline-block';
        else if ((State.codeStat(kind, q.id) || {}).tries >= 2) showRefBtn.style.display = 'inline-block';
        // 更新题头状态
        const tag = card.querySelector('.qtag');
        if (tag && passed) tag.textContent = tag.textContent.replace(' · 已通过 ✓', '') + ' · 已通过 ✓';
      } finally {
        runBtn.disabled = false;
        runBtn.textContent = '▶ 重新运行判题';
      }
    });

    return card;
  },

  /* ============================================================
   * 模拟考试
   * ============================================================ */
  viewMock(app) {
    app.innerHTML = '';
    const draft = Mock.load();
    if (Mock.active && draft) return Mock.renderRunning(app);
    if (Mock.lastResult) {
      const r = Mock.lastResult;
      Mock.lastResult = null;
      return Mock.renderResult(app, r);
    }
    const runs = State.data.mockRuns.slice(-8).reverse();
    const hist = runs.length ? h('div', { class: 'card' },
      h('h2', null, '历史成绩'),
      h('table', { class: 'testtable' },
        h('tr', null, h('th', null, '时间'), h('th', null, '卷型'), h('th', null, '得分'), h('th', null, '三级题得分率'), h('th', null, '预估等第')),
        runs.map(r => h('tr', null,
          h('td', null, new Date(r.ts).toLocaleString('zh-CN')),
          h('td', null, { standard: '标准卷', tier3: '三级冲刺卷', official: '官方A卷' }[r.variant || 'standard']),
          h('td', null, String(r.score)),
          h('td', null, r.t3Full ? Math.round(r.t3Score / r.t3Full * 100) + '%' : '—'),
          h('td', null, r.grade)
        ))
      )) : null;

    const variants = [
      { key: 'standard', name: '标准卷', desc: '按关卡比例均衡抽题，适合每周例行检查' },
      { key: 'tier3', name: '三级冲刺卷', desc: '60%+ 名额来自三级重点题（递归/正则/SQLite/可视化/OOP），冲刺三级的首选' },
      { key: 'official', name: '官方 A 卷（27A）', desc: '2026 年官方模拟卷整卷还原（含 SQLite 数据库题、图形绘制题），判分标准同官方' }
    ];
    const picker = h('div', { class: 'card' },
      h('h2', null, '选择卷型'),
      h('div', { class: 'res-list' },
        variants.map(v => h('div', { class: 'res-item', style: 'cursor:pointer', onclick: () => {
          if (confirm(`开始 ${v.name}？计时 ${window.CONFIG.mockMinutes} 分钟。`) ) Mock.start(v.key);
        } },
          h('span', { class: 'res-ico' }, '📝'),
          h('span', null, h('b', null, v.name), h('div', { class: 'res-desc' }, v.desc))
        ))));

    app.append(
      h('h1', { class: 'page-title' }, '📝 全真模拟考试'),
      h('p', { class: 'page-sub' }, '按 2025 版大纲试卷结构：单选 10 题 15 分 · 程序填空 3 题 30 分 · 调试改错 3 题 30 分 · 编程 5 题 75 分，150 分钟限时。'),
      picker,
      h('div', { class: 'card' },
        h('h2', null, '等第怎么估'),
        h('p', { class: 'small', style: 'margin:6px 0' },
          '官方等第线不公布。本站用公开透明的自估模型：总分率 ≥60% 二级合格参考 / ≥75% 二级优秀参考 / 总分率≥75% 且三级重点题得分率≥60% 三级合格参考 / 总分率≥90% 且三级题≥80% 三级优秀参考。三级题 = 递归、正则、SQLite、数据可视化、面向对象、JSON 等。'),
        h('p', { class: 'muted small', style: 'margin-bottom:0' },
          '官方模拟卷 PDF：', h('a', { href: 'docs/official/27A.pdf', target: '_blank', rel: 'noopener' }, '27A.pdf（考试院官网下载）'), '，判题素材已内置。'))
      ,
      hist
    );
  },

  /* ============================================================
   * 错题本
   * ============================================================ */
  viewWrong(app) {
    app.innerHTML = '';
    const items = State.wrongItems();
    app.append(h('h1', { class: 'page-title' }, '📕 错题本'),
      h('p', { class: 'page-sub' }, '做错或尚未通过的题目会出现在这里，通过后自动移出。'));
    if (!items.length) {
      app.append(h('div', { class: 'card', style: 'text-align:center;padding:40px' },
        h('div', { style: 'font-size:40px' }, '🎉'), h('p', null, '错题本是空的，继续保持！')));
      return;
    }
    const B = window.BANK;
    const byKind = { mcq: [], blank: [], fix: [], coding: [] };
    items.forEach(it => byKind[it.kind].push(it.q));
    if (byKind.mcq.length) {
      app.append(h('h2', null, `单选题（${byKind.mcq.length}）`));
      byKind.mcq.forEach((q, i) => app.append(this.mcqCard(q, i + 1, State.mcqStat(q.id))));
    }
    for (const [kind, label] of [['blank', '程序填空'], ['fix', '调试改错'], ['coding', '编程题']]) {
      if (byKind[kind].length) {
        app.append(h('h2', null, `${label}（${byKind[kind].length}）`));
        this.renderCodeTasks(app, kind, byKind[kind]);
      }
    }
  },

  /* ============================================================
   * 资源库
   * ============================================================ */
  viewResources(app) {
    app.innerHTML = '';
    const res = window.BANK.resources || [];
    app.append(h('h1', { class: 'page-title' }, '🔗 资源库'),
      h('p', { class: 'page-sub' }, '全网优质资源精选整合：官方渠道、GitHub 项目、教程与视频。点击直接跳转。'));
    const icons = { official: '🏛', github: '🐙', tutorial: '📖', video: '🎬', tool: '🛠', paper: '📄' };
    const groups = {};
    res.forEach(r => { (groups[r.cat || 'other'] = groups[r.cat || 'other'] || []).push(r); });
    const catNames = { official: '官方渠道', github: 'GitHub 项目', tutorial: '教程与文档', video: '视频课程', tool: '实用工具', paper: '真题与试卷', other: '其他' };
    for (const [cat, items] of Object.entries(groups)) {
      app.append(h('h2', null, `${icons[cat] || '📌'} ${catNames[cat] || cat}`));
      const list = h('div', { class: 'res-list' });
      items.forEach(r => list.append(h('a', { class: 'res-item', href: r.url, target: '_blank', rel: 'noopener' },
        h('span', { class: 'res-ico' }, icons[cat] || '📌'),
        h('span', null, h('b', null, r.title), h('div', { class: 'res-desc' }, r.desc))
      )));
      app.append(list);
    }
  },

  /* ============================================================
   * 关于（考试说明）
   * ============================================================ */
  viewAbout(app) {
    app.innerHTML = '';
    app.append(
      h('h1', { class: 'page-title' }, 'ℹ️ 考试说明与网站使用'),
      h('div', { class: 'card lesson' },
        h('h2', null, '考试基本信息（依据 2025 版考试大纲）'),
        h('table', null,
          h('tr', null, h('th', null, '项目'), h('th', null, '内容')),
          h('tr', null, h('td', null, '考试全称'), h('td', null, '上海市高等学校信息技术水平考试（SCITE）· Python 程序设计及应用（二级）')),
          h('tr', null, h('td', null, '考试方式'), h('td', null, '无纸化上机考试，150 分钟，满分 150 分')),
          h('tr', null, h('td', null, '考试环境'), h('td', null, 'Windows 10 中文版 + Python 3.x（建议 3.8 或 Anaconda3）')),
          h('tr', null, h('td', null, '试卷结构'), h('td', null, '单选 10 题 15 分 · 程序填空 3 题 30 分 · 调试改错 3 题 30 分 · 编程题 5 题 75 分')),
          h('tr', null, h('td', null, '等第'), h('td', null, '不合格 / 二级合格 / 二级优秀 / 三级合格 / 三级优秀（分数线由考委会划定）')),
          h('tr', null, h('td', null, '参考教材'), h('td', null, '李东方等主编《Python 程序设计基础（第3版）》电子工业出版社 2023'))
        ),
        h('h2', null, '二级与三级的分界（重要）'),
        h('p', { html: miniMdInline('**二三级是同一张卷子、同一场考试**，报名科目即“Python 程序设计及应用（二三级）”。成绩划为五档：不合格 / 二级合格 / 二级优秀 / 三级合格 / 三级优秀，分数线由考委会划定——分数够高直接拿三级，无需另外报名或加试。') }),
        h('p', null, '二级要求：数据类型、基本语句、模块化程序设计、常用算法、函数、文件与基于文本文件的数据分析（大纲要求层级：知道/理解/掌握）。'),
        h('p', { html: miniMdInline('**三级增量（大纲要求全部为“掌握”）**：递归、数据库应用（SQLite）、数据可视化、文本信息正则提取，以及综合应用能力。本站第 7 关即对准这些增量考点，三级目标下为必修关。') }),
        h('h2', null, '本站判题与真实考试的差异'),
        h('ul', null,
          h('li', null, '真实考试在 Windows + IDLE/PyCharm 等环境中作答，本站在浏览器内运行 Python（Pyodide），个别第三方库（如 wordcloud）浏览器端不支持，相关题目以理解代码为主。'),
          h('li', null, '真实考试改错题要求在修改行尾加 ####### 标记，本站以运行结果判分，不强制标记。'),
          h('li', null, '本站判题对输出做行尾空格/空行宽容处理，并忽略 input 提示文字差异。'),
          h('li', null, '真题回忆与官方模拟卷见资源库。')
        ),
        h('h2', null, '如何使用本站'),
        h('ul', null,
          h('li', null, '按关卡顺序学习：速览 → 单选 → 填空 → 改错 → 编程，全绿即通关。'),
          h('li', null, '进度保存在浏览器本地（localStorage），建议定期用下方按钮导出备份。'),
          h('li', null, '考前两周重点：错题本清零 + 每周一场全真模拟。')
        ),
        h('h2', null, '数据备份'),
        h('p', null, '导出全部学习进度（答题记录、错题本、模拟考成绩、诊断结果）为一个 JSON 文件；导入时与当前进度智能合并（通过的记录优先，成绩按时间去重）。'),
        h('div', { style: 'display:flex;gap:10px;flex-wrap:wrap;align-items:center' },
          h('button', { class: 'btn', onclick: () => App.exportProgress() }, '⬇ 导出进度备份'),
          h('button', { class: 'btn btn-ghost', onclick: () => document.getElementById('import-file').click() }, '⬆ 导入进度备份'),
          h('input', { type: 'file', id: 'import-file', accept: '.json,application/json', style: 'display:none', onchange: (e) => App.importProgress(e) }),
          h('button', { class: 'btn btn-danger', onclick: () => App.clearProgress() }, '清空全部数据')
        )
      )
    );
  }
};

/* ============================================================
 * 三级目标体系（实现移至 js/core.js，浏览器与 Node 测试共用）
 * ============================================================ */
const T3_RE = PY2CORE.T3_RE;
const isTier3 = PY2CORE.isTier3;
const estimateGrade = PY2CORE.estimateGrade;
const targetLabel = PY2CORE.targetLabel;

/* 状态驱动的"下一步"：诊断 → 速览 → 单选 → 代码（难度递进）→ 下一关 → 模拟考 */
function computeNextStep() {
  if (!State.data.diagnosis) {
    return { title: '入学诊断', desc: '14 道快题测出你的起点关卡（约 10 分钟，不计入进度）', href: '#diagnostic', cta: '开始诊断' };
  }
  const B = window.BANK;
  const floor = (State.data.diagnosis && State.data.diagnosis.startLevel) || 1;
  for (const m of LEVEL_META) {
    if (m.no < floor) continue; // 诊断判定已掌握的关卡直接跳过
    const st = State.levelStat(m.no);
    if (!st.read) {
      return { title: `第 ${m.no} 关 · ${m.title}`, desc: '本关第一站：读知识点速览，标记已读', href: `#level/${m.no}/lesson`, cta: '去读速览' };
    }
    if (!st.mcqOk) {
      return { title: `第 ${m.no} 关 · ${m.title}`, desc: `刷单选题（已对 ${st.mcqRight}/${st.mcqTotal}，目标正确率 80%）`, href: `#level/${m.no}/mcq`, cta: '去刷题' };
    }
    const items = [];
    for (const q of B.blanks) if (q.level === m.no) items.push(['blank', q]);
    for (const q of B.fixes) if (q.level === m.no) items.push(['fix', q]);
    for (const q of B.coding) if (q.level === m.no) items.push(['coding', q]);
    items.sort((a, b) => (a[1].difficulty || 2) - (b[1].difficulty || 2));
    for (const [kind, q] of items) {
      const stc = State.codeStat(kind, q.id);
      if (!stc || !stc.passed) {
        const kindCn = { blank: '程序填空', fix: '调试改错', coding: '编程题' }[kind];
        return { title: `第 ${m.no} 关 · ${q.title || kindCn}`, desc: `下一道代码题（${kindCn}，按难度递进）`, href: `#level/${m.no}/${kind}`, cta: '去写代码' };
      }
    }
  }
  return { title: '全真模拟考', desc: '七个关卡全部通关！用模拟考检验三级成色（推荐三级冲刺卷/官方 A 卷）', href: '#mock', cta: '去模拟考' };
}

/* ---------- 内联 markdown（题目文本用：仅 `code` 与 **b**） ---------- */
function miniMdInline(s) {
  return mdInline(s);
}

/* ---------- 填空工具（实现移至 js/core.js） ---------- */
const substituteBlanks = PY2CORE.substituteBlanks;
const normAnswer = PY2CORE.normAnswer;
const matchBlank = PY2CORE.matchBlank;

/* ---------- 运行结果渲染 ---------- */
function renderResult(outBox, r, expected, passed, perBlank, details) {
  outBox.innerHTML = '';
  outBox.append(h('div', { class: 'result-banner ' + (passed ? 'pass' : 'fail') },
    passed ? '✅ 通过！运行结果与期望一致。' : '❌ 未通过，请对照下方输出检查。'));
  if (details && details.length > 1) {
    const tb = h('table', { class: 'testtable' },
      h('tr', null, h('th', null, '测试点'), h('th', null, '输入'), h('th', null, '期望输出'), h('th', null, '实际输出'), h('th', null, '结果')));
    details.forEach((d, i) => {
      const okv = d.pass !== undefined ? d.pass : d.cmp.ok;
      tb.append(h('tr', null,
        h('td', null, `#${i + 1}`),
        h('td', null, h('pre', { class: 'output', style: 'max-width:160px' }, d.t.stdin || '（无）')),
        h('td', null, h('pre', { class: 'output', style: 'max-width:200px' }, d.t.expected || (d.t.expectCanvas ? '（运行并画出画布）' : ''))),
        h('td', null, h('pre', { class: 'output', style: 'max-width:200px' }, d.r.stdout || '')),
        h('td', null, h('span', { class: okv ? 'pass-cell' : 'fail-cell' }, okv ? '✓' : '✗'))
      ));
    });
    outBox.append(tb);
    // 失败测试点的报错人话提示（去重，最多 2 条）
    const seenHints = {};
    let shown = 0;
    details.forEach(d => {
      if (shown >= 2 || (d.pass !== undefined ? d.pass : d.cmp.ok) || !d.r || !d.r.error) return;
      const lineNo = PY2CORE.errorLine(d.r.tb || '');
      const hint = PY2CORE.friendlyError(d.r.error);
      const key = hint || d.r.error;
      if (seenHints[key]) return;
      seenHints[key] = true;
      const parts = [];
      if (lineNo) parts.push('💡 出错位置大约在第 ' + lineNo + ' 行。');
      if (hint) parts.push('💡 ' + hint);
      if (parts.length) { outBox.append(h('div', { class: 'tip' }, parts.join(' '))); shown++; }
    });
  } else {
    const d = (details && details[0]) || (r ? { r, t: { stdin: '', expected } } : null);
    if (d) {
      outBox.append(h('div', { class: 'io-label' }, '程序输出：'));
      const pre = h('pre', { class: 'output' });
      pre.textContent = d.r.stdout || (d.r.error ? '' : '（无输出）');
      outBox.append(pre);
      if (d.r.error) {
        outBox.append(h('pre', { class: 'output' }, h('span', { class: 'out-err' }, '⚠ ' + d.r.error)));
        const lineNo = PY2CORE.errorLine(d.r.tb || '');
        const hint = PY2CORE.friendlyError(d.r.error);
        const parts = [];
        if (lineNo) parts.push('💡 出错位置大约在第 ' + lineNo + ' 行（从 1 数起）。');
        if (hint) parts.push('💡 ' + hint);
        if (parts.length) outBox.append(h('div', { class: 'tip' }, parts.join(' ')));
      }
      if (d.t.expected) {
        outBox.append(h('div', { class: 'io-label' }, '期望输出：'));
        outBox.append(h('pre', { class: 'output' }, d.t.expected));
      }
    }
    if (perBlank) {
      outBox.append(h('div', { style: 'margin-top:8px' },
        perBlank.map(pb => h('span', { style: 'margin-right:12px', class: pb.ok ? 'pass-cell' : 'fail-cell' },
          `第${pb.n}空 ${pb.ok ? '✓' : '✗（可能正确，以整体输出为准）'}`))));
    }
  }
}

/* ============================================================
 * 模拟考控制器：标准卷 / 三级冲刺卷 / 官方A卷
 * ============================================================ */
const Mock = {
  active: false,
  variant: 'standard',
  qs: null,
  answers: null,
  endAt: 0,
  timer: null,
  lastResult: null,
  KEY: 'py2pass_mock_v1',

  _pick(arr, n, offset) {
    const out = [];
    if (!arr.length) return out;
    for (let i = 0; i < n * 20 && out.length < n; i++) {
      const q = arr[(offset * 31 + i * 7 + i * i) % arr.length];
      if (!out.includes(q)) out.push(q);
    }
    return out.slice(0, n);
  },

  sample(variant, seed) {
    const B = window.BANK;
    const cfg = window.CONFIG.mockStructure;
    const split = (arr) => {
      const t3 = arr.filter(q => isTier3(q));
      const rest = arr.filter(q => !isTier3(q));
      return [t3, rest];
    };
    if (variant === 'official') {
      const O = B.official;
      const byId = (arr, ids) => ids.map(id => arr.find(q => q.id === id)).filter(Boolean);
      return {
        mcq: byId(B.mcq, O.mcq_ids || []),
        blank: byId(B.blanks, O.blank_ids || []),
        fix: byId(B.fixes, O.fix_ids || []),
        coding: byId(B.coding, O.coding_ids || [])
      };
    }
    if (variant === 'tier3') {
      const [mt3, mo] = split(B.mcq);
      const [bt3, bo] = split(B.blanks);
      const [ft3, fo] = split(B.fixes);
      const [ct3, co] = split(B.coding);
      return {
        mcq: this._pick(mt3, 6, seed).concat(this._pick(mo, cfg.mcq.count - 6, seed + 11)),
        blank: this._pick(bt3, 2, seed + 1).concat(this._pick(bo, 1, seed + 12)),
        fix: this._pick(ft3, 2, seed + 2).concat(this._pick(fo, 1, seed + 13)),
        coding: this._pick(ct3, 3, seed + 3).concat(this._pick(co, 2, seed + 14))
      };
    }
    // 标准：按关卡比例均衡
    const pickL = (arr, n, off) => {
      const byLevel = {}; // 每种题型单独分组，避免后面的题型混入前面题型的题
      arr.forEach(q => { (byLevel[q.level] = byLevel[q.level] || []).push(q); });
      const levels = Object.keys(byLevel).map(Number).sort((a, b) => a - b);
      const out = [];
      let i = 0;
      while (out.length < n && i < n * 30) {
        const lv = levels[(off + i) % levels.length];
        const pool = byLevel[lv].filter(q => !out.includes(q));
        if (pool.length) out.push(pool[(off * 7 + i * 3) % pool.length]);
        i++;
      }
      return out.slice(0, n);
    };
    return {
      mcq: pickL(B.mcq, cfg.mcq.count, seed),
      blank: pickL(B.blanks, cfg.blank.count, seed + 1),
      fix: pickL(B.fixes, cfg.fix.count, seed + 2),
      coding: pickL(B.coding, cfg.coding.count, seed + 3)
    };
  },

  start(variant) {
    localStorage.removeItem(this.KEY); // 清掉可能的遗留草稿
    this._submitting = false;
    this.variant = variant || 'standard';
    const seed = Math.floor(Date.now() / 1000) % 9973;
    this.qs = this.sample(this.variant, seed);
    this.answers = { mcq: {}, blank: {}, fix: {}, coding: {} };
    this.endAt = Date.now() + window.CONFIG.mockMinutes * 60000;
    this.active = true;
    this.seed = seed;
    this.persist();
    App.render();
    this.timer = setInterval(() => this.tick(), 1000);
  },

  persist() {
    try {
      localStorage.setItem(this.KEY, JSON.stringify({
        active: this.active, seed: this.seed, endAt: this.endAt, variant: this.variant,
        qs: this.qs, answers: this.answers
      }));
    } catch (e) { /* 存储超限时忽略 */ }
  },

  load() {
    try { return JSON.parse(localStorage.getItem(this.KEY)); } catch (e) { return null; }
  },

  resume() {
    const d = this.load();
    if (!d || !d.active) return false;
    // 恢复试卷状态（无论是否已过期，先保住答卷）
    this.qs = d.qs; this.answers = d.answers;
    this.endAt = d.endAt; this.seed = d.seed; this.variant = d.variant || 'standard';
    if (d.endAt > Date.now()) {
      this.active = true;
      this.timer = setInterval(() => this.tick(), 1000);
      return true;
    }
    // 已过期：自动交卷评分，避免失卷（评分完成后才清理草稿）
    this.active = true;
    const go = async () => {
      await Engine.ensure();
      this.submit(true);
    };
    go();
    return true;
  },

  tick() {
    if (!this.active) return;
    const now = Date.now();
    // DOM 更新是尽力而为；超时判定与页面解耦（离开模拟考页也要照常交卷）
    const el = document.getElementById('mock-timer-num');
    if (el) {
      el.textContent = fmtMMSS((this.endAt - now) / 1000);
      const bar = document.getElementById('mock-timer');
      if (bar) bar.classList.toggle('urgent', this.endAt - now < 300000);
    }
    if (PY2CORE.mockExpired(this.active, this.endAt, now)) {
      this.submit(true); // 时间到自动交卷
    }
  },

  abort() {
    if (!confirm('确定放弃本次模拟考吗？进度将清空。')) return;
    this.active = false;
    clearInterval(this.timer);
    this.timer = null;
    localStorage.removeItem(this.KEY);
    App.render();
  },

  /* ---- 渲染进行中的考试 ---- */
  renderRunning(app) {
    const s = window.CONFIG.mockStructure;
    const vName = { standard: '标准卷', tier3: '三级冲刺卷', official: '官方 A 卷' }[this.variant];
    app.innerHTML = '';
    const secOf = { mcq: '一、单选题', blank: '二、程序填空题', fix: '三、调试改错题', coding: '四、编程题' };
    app.append(h('div', { class: 'mock-timer', id: 'mock-timer' },
      h('span', null, `${vName} · 剩余时间`),
      h('span', { class: 't', id: 'mock-timer-num' }, fmtMMSS((this.endAt - Date.now()) / 1000)),
      h('button', { class: 'btn btn-danger btn-sm', onclick: () => Mock.submit(false) }, '交卷')
    ));
    const secTabs = h('div', { class: 'sec-tabs' });
    [['mcq', `单选×${this.qs.mcq.length}`], ['blank', `填空×${this.qs.blank.length}`],
     ['fix', `改错×${this.qs.fix.length}`], ['coding', `编程×${this.qs.coding.length}`]].forEach(([k, label]) => {
      secTabs.append(h('div', { class: 'sec-tab', onclick: () => document.getElementById('sec-' + k).scrollIntoView({ behavior: 'smooth' }) }, label));
    });
    app.append(secTabs);

    app.append(h('h2', { id: 'sec-mcq' }, secOf.mcq));
    this.qs.mcq.forEach((q, i) => {
      const letters = ['A', 'B', 'C', 'D'];
      const card = h('div', { class: 'qcard' },
        h('div', { class: 'qno' }, `${i + 1}.`),
        h('div', { class: 'qtext', html: miniMdInline(q.q) }));
      const opts = h('div', { class: 'opts' });
      q.opts.forEach((o, j) => {
        const opt = h('div', { class: 'opt' + (this.answers.mcq[q.id] === j ? ' selected' : ''), onclick: () => {
          this.answers.mcq[q.id] = j;
          this.persist();
          opts.querySelectorAll('.opt').forEach((e, jj) => e.classList.toggle('selected', jj === j));
        } }, h('span', { class: 'opt-key' }, letters[j] + '.'), h('span', { html: miniMdInline(o) }));
        opts.append(opt);
      });
      card.append(opts);
      app.append(card);
    });

    app.append(h('h2', { id: 'sec-blank' }, secOf.blank));
    this.qs.blank.forEach((q, i) => {
      const card = h('div', { class: 'qcard' },
        h('div', { class: 'qno' }, `${i + 1}. ${q.title || ''}`),
        q.desc ? h('div', { class: 'qtext', html: miniMdInline(q.desc) }) : null,
        blankCodeBlock(q.code));
      const grid = h('div');
      (q.blanks || []).forEach(b => {
        grid.append(h('div', { style: 'display:flex;gap:8px;align-items:center;margin:4px 0' },
          h('span', { class: 'inline-code' }, `第${b.n}空`),
          h('input', { value: this.answers.blank[q.id + '_' + b.n] || '', oninput: (e) => {
            this.answers.blank[q.id + '_' + b.n] = e.target.value;
            this.persist();
          }, style: 'flex:1;padding:6px 10px;border:1.5px solid var(--line);border-radius:8px;font-family:var(--mono);font-size:13.5px' })));
      });
      card.append(grid);
      app.append(card);
    });

    app.append(h('h2', { id: 'sec-fix' }, secOf.fix));
    this.qs.fix.forEach((q, i) => {
      const ta = h('textarea', { class: 'code-editor' });
      ta.value = this.answers.fix[q.id] !== undefined ? this.answers.fix[q.id] : q.buggy;
      ta.addEventListener('input', () => { this.answers.fix[q.id] = ta.value; this.persist(); });
      app.append(h('div', { class: 'qcard' },
        h('div', { class: 'qno' }, `${i + 1}. ${q.title || ''}`),
        q.desc ? h('div', { class: 'qtext', html: miniMdInline(q.desc) }) : null,
        h('div', { class: 'io-label' }, '在下方修改代码（不增删语句，直接改错）：'),
        ta,
        q.stdin ? [h('div', { class: 'io-label' }, '测试输入：'), h('pre', { class: 'output' }, q.stdin)] : null));
    });

    app.append(h('h2', { id: 'sec-coding' }, secOf.coding));
    this.qs.coding.forEach((q, i) => {
      const ta = h('textarea', { class: 'code-editor', style: 'min-height:220px' });
      ta.value = this.answers.coding[q.id] !== undefined ? this.answers.coding[q.id] : (q.starter || '# ' + (q.title || '') + '\n');
      ta.addEventListener('input', () => { this.answers.coding[q.id] = ta.value; this.persist(); });
      app.append(h('div', { class: 'qcard' },
        h('div', { class: 'qno' }, `${i + 1}. ${q.title || ''}　`, h('span', { class: 'badge' }, (q.score || window.CONFIG.mockStructure.coding.perScore) + '分')),
        h('div', { class: 'qtext', html: miniMdInline(q.desc || '') }),
        ta,
        q.tests && q.tests.some(t2 => t2.stdin) ? [h('div', { class: 'io-label' }, '测试输入样例：'), h('pre', { class: 'output' }, q.tests.filter(t2 => t2.stdin).map(t2 => t2.stdin).join('---\n'))] : null));
    });

    app.append(h('div', { style: 'text-align:center;margin:24px 0' },
      h('button', { class: 'btn btn-green', style: 'font-size:16px;padding:12px 40px', onclick: () => Mock.submit(false) }, '交卷并评分'),
      ' ',
      h('button', { class: 'btn btn-ghost', onclick: () => Mock.abort() }, '放弃本次')
    ));
    if (!this.timer) this.timer = setInterval(() => this.tick(), 1000);
  },

  /* ---- 评分 ---- */
  async submit(auto) {
    if (this._submitting) return; // 防止计时器与手动交卷双触发
    if (auto !== true && !confirm('确定交卷并评分吗？代码题将自动判题，请保持页面打开。')) return;
    this._submitting = true;
    clearInterval(this.timer); this.timer = null;
    this.active = false;
    // 注意：此时不删草稿 —— 评分成功并落盘后才清理（见函数末尾），
    // 判题中途崩溃/关页可由 resume() 恢复过期草稿重新评分
    const s = window.CONFIG.mockStructure;
    const official = this.variant === 'official';
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.append(h('h1', { class: 'page-title' }, '正在评分…'),
      h('p', { class: 'page-sub' }, '编程题需要在浏览器内真实运行判题，请保持页面打开，约需 1~2 分钟。'));

    let score = 0, t3Score = 0, t3Full = 0;
    const detail = [];

    const judgeCode = async (kind, q, userCode, full, perTestScore) => {
      const tests = q.tests && q.tests.length ? q.tests : [{ stdin: q.stdin || '', expected: q.expected || '' }];
      let got = 0;
      const rows = [];
      // 隐藏挂载点：turtle 画布题需要真实 DOM 容器才能生成画布
      const mount = document.createElement('div');
      mount.style.display = 'none';
      document.body.appendChild(mount);
      try {
        for (const t of tests) {
          const r = await Engine.run(userCode, { stdin: t.stdin || '', files: q.files, mount });
          const cmp = compareOutput(r.stdout, t.expected || '');
          const pass = r.ok && (t.expectCanvas ? (r.hasCanvas && (!t.expected || cmp.ok)) : cmp.ok);
          if (pass) got += perTestScore;
          rows.push({ i: rows.length + 1, pass, stdin: t.stdin || '', expected: t.expected || '', got: r.stdout || '', err: r.error || '' });
        }
      } finally {
        mount.remove();
      }
      return { got: Math.round(got * 10) / 10, rows };
    };

    // 单选
    const mcqPer = official ? 1.5 : s.mcq.perScore;
    for (const q of this.qs.mcq) {
      const a = this.answers.mcq[q.id];
      const right = a === q.ans;
      if (right) { score += mcqPer; if (isTier3(q)) t3Score += mcqPer; }
      if (isTier3(q)) t3Full += mcqPer;
      State.answerMcq(q.id, a === undefined ? -1 : a, right);
      detail.push({ kind: '单选', level: q.level, tier3: isTier3(q), title: (q.topic || '') + ' ' + q.q.slice(0, 18), score: right ? mcqPer : 0, full: mcqPer });
    }

    // 填空（逐空给分）
    for (const q of this.qs.blank) {
      const blanks = q.blanks || [];
      const per = official ? 2.5 : s.blank.perScore / blanks.length;
      let got = 0;
      blanks.forEach(b => {
        const a = this.answers.blank[q.id + '_' + b.n] || '';
        if (matchBlank(b, a).ok) got += per;
      });
      got = Math.round(got * 10) / 10;
      score += got;
      if (isTier3(q)) { t3Score += got; t3Full += per * blanks.length; }
      detail.push({ kind: '填空', level: q.level, tier3: isTier3(q), title: q.title || '', score: got, full: per * blanks.length });
    }

    // 改错（输出比对）
    for (const q of this.qs.fix) {
      const code = this.answers.fix[q.id] !== undefined ? this.answers.fix[q.id] : q.buggy;
      const { got } = await judgeCode('fix', q, code, official ? 10 : s.fix.perScore, official ? 10 : s.fix.perScore);
      score += got;
      if (isTier3(q)) { t3Score += got; t3Full += official ? 10 : s.fix.perScore; }
      detail.push({ kind: '改错', level: q.level, tier3: isTier3(q), title: q.title || '', score: got, full: official ? 10 : s.fix.perScore });
    }

    // 编程（按测试点比例，官方卷按题分值）
    for (const q of this.qs.coding) {
      const full = official ? (q.score || 15) : s.coding.perScore;
      const code = this.answers.coding[q.id] !== undefined ? this.answers.coding[q.id] : (q.starter || '');
      const tests = q.tests && q.tests.length ? q.tests : [{ stdin: q.stdin || '', expected: q.expected || '' }];
      const { got } = await judgeCode('coding', q, code, full, full / tests.length);
      score += got;
      if (isTier3(q)) { t3Score += got; t3Full += full; }
      detail.push({ kind: '编程', level: q.level, tier3: isTier3(q), title: q.title || '', score: got, full });
    }

    score = Math.round(score * 10) / 10;
    const grade = estimateGrade(score, 150, t3Score, t3Full);
    const byLevel = {};
    detail.forEach(d => {
      const lv = byLevel[d.level] = byLevel[d.level] || { got: 0, full: 0 };
      lv.got += d.score; lv.full += d.full;
    });
    const run = { ts: Date.now(), score, grade, variant: this.variant, t3Score: Math.round(t3Score * 10) / 10, t3Full: Math.round(t3Full * 10) / 10, byLevel, detail };
    State.addMockRun(run);   // 成绩落盘成功
    localStorage.removeItem(this.KEY);  // 此后才清理答卷草稿
    this._submitting = false;
    this.lastResult = run;
    if (App.parse()[0] !== 'mock') location.hash = '#mock'; // 交卷后回到结果页
    App.render();
  },

  /* ---- 结果页 ---- */
  renderResult(app, r) {
    app.innerHTML = '';
    const vName = { standard: '标准卷', tier3: '三级冲刺卷', official: '官方 A 卷' }[r.variant || 'standard'];
    const t3r = r.t3Full ? Math.round(r.t3Score / r.t3Full * 100) : null;
    app.append(
      h('div', { class: 'card score-hero' },
        h('div', { class: 'muted' }, vName + ' · ' + new Date(r.ts).toLocaleString('zh-CN')),
        h('div', { class: 'big' }, String(r.score)),
        h('div', { class: 'muted' }, '/ 150 分'),
        h('div', null, h('span', { class: 'grade-tag ' + (r.grade.startsWith('不合格') ? 'fail' : 'pass') }, r.grade)),
        h('div', { class: 'muted small', style: 'margin-top:6px' },
          `三级题得分率：${t3r === null ? '（本卷无三级重点题）' : t3r + '%'} · 预估模型：总分率≥60% 二级合格 / ≥75% 二级优秀 / 总分率≥75%且三级题≥60% 三级合格 / ≥90%且≥80% 三级优秀`),
        h('div', { style: 'margin-top:14px' },
          h('a', { class: 'btn', href: '#wrong' }, '去错题本复盘'),
          ' ',
          h('a', { class: 'btn btn-ghost', href: '#mock' }, '再来一场'))
      ),
      h('div', { class: 'card' },
        h('h2', null, '分关卡得分'),
        h('table', { class: 'testtable' },
          h('tr', null, h('th', null, '关卡'), h('th', null, '得分'), h('th', null, '满分'), h('th', null, '得分率'), h('th', null, '')),
          Object.entries(r.byLevel || {}).sort((a, b) => a[0] - b[0]).map(([lv, v]) => {
            const pct = v.full ? Math.round(v.got / v.full * 100) : 0;
            return h('tr', null,
              h('td', null, `第 ${lv} 关`),
              h('td', null, String(Math.round(v.got * 10) / 10)),
              h('td', null, String(Math.round(v.full * 10) / 10)),
              h('td', null, pct + '%'),
              h('td', null, pct < 60 && v.full >= 10 ? h('span', { class: 'fail-cell' }, '薄弱') : (pct >= 90 ? h('span', { class: 'pass-cell' }, '优势') : '')));
          })),
        h('h2', { style: 'margin-top:14px' }, '逐题得分'),
        h('table', { class: 'testtable' },
          h('tr', null, h('th', null, '题型'), h('th', null, '题目'), h('th', null, '得分'), h('th', null, '满分')),
          (r.detail || []).map(d => h('tr', null,
            h('td', null, d.kind + (d.tier3 ? ' 🎓' : '')),
            h('td', null, d.title),
            h('td', null, String(Math.round(d.score * 10) / 10)),
            h('td', null, String(d.full))))
        ),
        h('p', { class: 'muted small' }, '🎓 = 三级重点题（递归/正则/数据库/可视化/OOP 等）。三级题得分率低时优先复盘这些题。')
      )
    );
  }
};

/* ---------- 启动 ---------- */
document.addEventListener('DOMContentLoaded', () => {
  App.init();
  // 若有进行中的模拟考，恢复之
  if (Mock.resume() && App.current === 'mock') {
    App.render();
  }
});
