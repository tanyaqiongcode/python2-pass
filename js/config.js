/* ============================================================
 * 全局配置 —— 只需改这里
 * ============================================================ */
window.CONFIG = {
  /* 考试日期（用于首页倒计时）。官网/学校通告：2026 年二三四级考试为 11 月 28 日；
     如准考证显示其他时间，改这一行或点首页倒计时修改。 */
  examDate: '2026-11-28 09:00',

  /* 考试名称（显示在页面标题） */
  examName: '上海市高等学校信息技术水平考试 · Python 程序设计及应用（二级）',

  /* 模拟考计时（分钟），正式考试为 150 分钟 */
  mockMinutes: 150,

  /* 模拟考各题型分值（依据 2025 版考试大纲试卷结构） */
  mockStructure: {
    mcq:   { count: 10, perScore: 1.5, label: '单选题' },   // 10 题 15 分
    blank: { count: 3,  perScore: 10,  label: '程序填空题' }, // 3 题 30 分
    fix:   { count: 3,  perScore: 10,  label: '调试改错题' }, // 3 题 30 分
    coding:{ count: 5,  perScore: 15,  label: '编程题' }     // 5 题 75 分
  },

  /* 等第参考线（官方分数线不公布，此为备考自估线） */
  gradeLine: { pass: 90, excellent: 128 },

  /* 通关条件：每关选择题需尝试且正确率达标 */
  levelClear: { mcqMinCount: 8, mcqMinAcc: 0.8 },

  /* Pyodide 判题引擎加载源（全部锁 v314.0.7）。
     'LOCAL' 是仓库内 vendor/pyodide/（与站点同源，站点能打开引擎就能用）；
     jsdelivr 作为兜底（外部 CDN，matplotlib 等动态包仍走它）。 */
  pyodideCDNs: [
    'LOCAL',
    'https://cdn.jsdelivr.net/pyodide/v314.0.7/full/'
  ],

  /* 动态安装的第三方包版本锁定（micropip） */
  packagePins: {
    openpyxl: '3.1.5'
  }
};
