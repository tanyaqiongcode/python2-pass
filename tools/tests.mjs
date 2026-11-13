// 纯逻辑核心单测（node --test 风格，无依赖）：node tools/tests.mjs
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';

// 工作区 package.json 为 "type": "module"，用 vm 沙箱加载 UMD 核心以绕开模块系统差异
const coreSrc = fs.readFileSync(new URL('../js/core.js', import.meta.url), 'utf8');
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(coreSrc, sandbox);
const C = sandbox.PY2CORE;
assert.ok(C && typeof C.compareOutput === 'function', 'core.js 未正确暴露 PY2CORE');

test('normalizeOutput：行尾空格与尾部空行', () => {
  assert.equal(C.normalizeOutput('a  \r\nb\n\n'), 'a\nb');
  assert.equal(C.normalizeOutput(''), '');
});

test('compareOutput：严格 / 忽略整行提示 / 不一致', () => {
  assert.equal(C.compareOutput('1\n12\n', '1\n12').ok, true);
  const lenient = C.compareOutput('请输入n:\n24', '24');
  assert.equal(lenient.ok, true);
  assert.equal(lenient.strict, false);
  assert.equal(C.compareOutput('a\nb', 'a\nc').ok, false);
});

test('compareOutput：非提示行不剔除', () => {
  assert.equal(C.compareOutput('结果:24', '24').ok, false);
});

test('substituteBlanks / matchBlank', () => {
  const code = C.substituteBlanks('if ___(1)___ >= 8:\n    ___(2)___', ['len(s)', ' break ']);
  assert.equal(code, 'if len(s) >= 8:\n    break');
  assert.equal(C.matchBlank({ n: 1, answers: ['len(s)'] }, 'len( s )').ok, true);
  assert.equal(C.matchBlank({ n: 1, answers: ['break'] }, 'continue').ok, false);
  assert.equal(C.matchBlank({ n: 2, answers: ['a, b'] }, 'a,b').ok, true);
  // 评审回归：字符串字面量内部空白是内容，不同空格数不匹配
  assert.equal(C.matchBlank({ n: 1, answers: ['hello world'] }, 'helloworld').ok, false);
  assert.equal(C.matchBlank({ n: 1, answers: ['hello world'] }, 'hello  world').ok, false);
  assert.equal(C.matchBlank({ n: 1, answers: ['hello world'] }, 'hello world').ok, true);
  assert.equal(C.matchBlank({ n: 1, answers: ["'hello world'"] }, "'hello world'").ok, true);
  assert.equal(C.matchBlank({ n: 1, answers: ["'hello world'"] }, "'helloworld'").ok, false);
  assert.equal(C.matchBlank({ n: 1, answers: ["'hello world'"] }, "'hello  world'").ok, false);
  // 代码宽松仍生效
  assert.equal(C.matchBlank({ n: 1, answers: ['a, b'] }, 'a,b').ok, true);
  // 代码风格宽松仍生效
  assert.equal(C.matchBlank({ n: 1, answers: ["print('重复:', k)"] }, "print('重复:',k)").ok, true);
});

test('isTier3：L7 恒为三级题；关键词命中', () => {
  assert.equal(C.isTier3({ level: 7, topic: '', title: '' }), true);
  assert.equal(C.isTier3({ level: 4, topic: '递归', title: '' }), true);
  assert.equal(C.isTier3({ level: 3, topic: '字符串', title: '' }), false);
});

test('estimateGrade：等第边界（假时钟无关，纯函数）', () => {
  assert.equal(C.estimateGrade(89, 150, 0, 0), '不合格（参考）');
  assert.equal(C.estimateGrade(90, 150, 0, 0), '二级合格（参考）');
  assert.equal(C.estimateGrade(113, 150, 0, 0), '二级优秀（参考）');
  // 三级题得分率不足 → 不给三级
  assert.equal(C.estimateGrade(120, 150, 5, 40), '二级优秀（参考）');
  assert.equal(C.estimateGrade(120, 150, 25, 40), '三级合格（参考）');
  assert.equal(C.estimateGrade(136, 150, 33, 40), '三级优秀（参考）');
});

test('mockExpired：假时钟下的过期判定', () => {
  const end = 1700000000000;
  assert.equal(C.mockExpired(true, end, end - 1), false);
  assert.equal(C.mockExpired(true, end, end), true);
  assert.equal(C.mockExpired(false, end, end + 9999), false);
  assert.equal(C.mockExpired(true, undefined, Date.now()), false);
});

test('gradeMcq / judgeTest', () => {
  assert.equal(C.gradeMcq({ ans: 2 }, 2), true);
  assert.equal(C.gradeMcq({ ans: 2 }, 0), false);
  assert.equal(C.judgeTest({ ok: true, stdout: 'drawn\n' }, { expected: 'drawn' }), true);
  assert.equal(C.judgeTest({ ok: true, stdout: 'drawn\n', hasCanvas: true }, { expected: 'drawn', expectCanvas: true }), true);
  assert.equal(C.judgeTest({ ok: true, stdout: 'drawn\n' }, { expected: 'drawn', expectCanvas: true }), false);
  assert.equal(C.judgeTest({ ok: false, stdout: '' }, { expected: '' }), false);
});

console.log('PY2CORE tests done');

test('mergeProgress：双向合并取更优、成绩去重', () => {
  const local = { mcq: { a: { choice: 0, correct: false, ts: 100 } }, mockRuns: [{ ts: 500, score: 90 }], lessonRead: {} };
  const imp = {
    mcq: { a: { choice: 1, correct: true, passed: true, ts: 200 }, b: { choice: 0, correct: true, ts: 300 } },
    mockRuns: [{ ts: 400, score: 60 }, { ts: 500, score: 90 }],
    lessonRead: { 1: true },
    settings: { target: 't3e' }
  };
  const r = C.mergeProgress(local, imp);
  assert.equal(r.merged.mcq.a.correct, true);   // 导入的通过记录胜出
  assert.ok(r.merged.mcq.b);                    // 本地没有的题目被并入
  assert.equal(r.merged.mockRuns.length, 2);    // 按 ts 去重
  assert.equal(r.merged.lessonRead['1'], true);
  assert.equal(r.merged.settings.target, 't3e');
  assert.equal(r.merged.mcq.a.ts, 200);
});

test('mergeProgress：空导入不破坏本地数据', () => {
  const local = { mcq: { a: { choice: 0, correct: true, ts: 1 } }, mockRuns: [{ ts: 9, score: 100 }] };
  const r = C.mergeProgress(local, {});
  assert.equal(r.merged.mcq.a.correct, true);
  assert.equal(r.merged.mockRuns.length, 1);
});

test('friendlyError：高频报错翻译成人话', () => {
  assert.ok(C.friendlyError("NameError: name 'nmae' is not defined").includes('没有定义'));
  assert.ok(C.friendlyError('SyntaxError: invalid syntax').includes('冒号'));
  assert.ok(C.friendlyError("ValueError: invalid literal for int() with base 10: '12\n'").includes('strip'));
  assert.ok(C.friendlyError('IndexError: list index out of range').includes('越界'));
  assert.ok(C.friendlyError('RecursionError: maximum recursion depth exceeded').includes('终止条件'));
  assert.equal(C.friendlyError('SomeWeirdError: blah'), null);
});

test('errorLine：从 traceback 提取学生代码行号', () => {
  const tb = 'Traceback (most recent call last):\n  File "<student>", line 7, in <module>\nNameError: x';
  assert.equal(C.errorLine(tb), 7);
  assert.equal(C.errorLine(''), null);
});

test('runner.js 内嵌 Python 源码在真实模板字面量语义下可编译（防转义回归）', () => {
  const runnerSrc = fs.readFileSync(new URL('../js/runner.js', import.meta.url), 'utf8');
  for (const name of ['HARNESS_PY', 'TURTLE_SHIM_SRC']) {
    const m = runnerSrc.match(new RegExp('const ' + name + ' = `([\\s\\S]*?)`;'));
    assert.ok(m, name + ' 未找到');
    // 用 vm 求值模板字面量，得到与浏览器一致的字符串语义
    const py = vm.runInNewContext('`' + m[1] + '`', {});
    assert.ok(py.length > 1000, name + ' 长度异常: ' + py.length);
    // 不允许出现真实换行出现在字符串字面量内部会被 python 拒绝——交给 python 编译器裁决
    fs.writeFileSync('/tmp/' + name + '.py', py);
  }
  const r = spawnSync('python3', ['-c', `
import ast
for name in ['HARNESS_PY', 'TURTLE_SHIM_SRC']:
    src = open('/tmp/' + name + '.py').read()
    ast.parse(src)
print('embedded python OK')
`], { encoding: 'utf8' });
  assert.equal(r.status, 0, '内嵌 Python 编译失败: ' + r.stderr.slice(0, 300));
});

test('mergeProgress：较新的错误单选不得倒退覆盖已有正确记录（评审回归）', () => {
  const local = { mcq: { q1: { choice: 2, correct: true, ts: 1000 } } };
  const imp = { mcq: { q1: { choice: 0, correct: false, ts: 2000 } } };  // 更新但答错
  const r = C.mergeProgress(local, imp);
  assert.equal(r.merged.mcq.q1.correct, true, '正确记录被倒退覆盖');
  assert.equal(r.merged.mcq.q1.ts, 1000);
  // 反向：导入的是更晚的正确记录 → 采用
  const r2 = C.mergeProgress({ mcq: { q1: { choice: 0, correct: false, ts: 1000 } } },
    { mcq: { q1: { choice: 2, correct: true, ts: 2000 } } });
  assert.equal(r2.merged.mcq.q1.correct, true);
  // 代码题 passed 语义不受影响
  const r3 = C.mergeProgress({ coding: { c1: { passed: true, ts: 1000 } } },
    { coding: { c1: { passed: false, ts: 2000 } } });
  assert.equal(r3.merged.coding.c1.passed, true);
});

test('srsNext：阶梯间隔与失败重置', () => {
  const now = 1700000000000, DAY = 86400000;
  // 首次做错 → 明天复习
  const c1 = C.srsNext(null, false, now);
  assert.equal(c1.due, now + DAY);
  assert.equal(c1.streak, 0);
  // 连续答对走阶梯 1→2→4→7→15→30
  let card = c1;
  const expect = [1, 2, 4, 7, 15, 30, 30];
  expect.forEach((d, i) => {
    card = C.srsNext(card, true, now + i * DAY);
    assert.equal(card.interval, d, '第' + (i + 1) + '次答对间隔应为' + d + '天');
  });
  // 中途又错 → 重置回明天、清零
  const reset = C.srsNext(card, false, now);
  assert.equal(reset.interval, 0);
  assert.equal(reset.streak, 0);
  // 一次做对的题不生成复习卡
  assert.equal(C.srsNext(null, true, now), null);
});

test('srsDue：到期队列排序', () => {
  const now = 1700000000000;
  const cards = {
    a: { due: now - 2000, streak: 1 },
    b: { due: now - 1000, streak: 2 },
    c: { due: now + 5000, streak: 1 }
  };
  const due = C.srsDue(cards, now);
  assert.deepEqual([...due.map(x => x.qid)], ['a', 'b']); // c 未到期（展开为当前 realm 数组）
});

test('judgeTest：带运行后检查时必须 checkOk === true', () => {
  const t = { expected: 'drawn', check: 'check_polygon(segs, 4, 100, "red")' };
  assert.equal(C.judgeTest({ ok: true, stdout: 'drawn', checkOk: true }, t), true);
  assert.equal(C.judgeTest({ ok: true, stdout: 'drawn', checkOk: false }, t), false, '输出对但图画错 → 不通过');
  assert.equal(C.judgeTest({ ok: true, stdout: 'drawn' }, t), false, '检查没跑（旧引擎）→ 不通过');
  assert.equal(C.judgeTest({ ok: true, stdout: 'x', checkOk: true }, t), false, '图对但输出错 → 不通过');
  // 带 check、无 expected：不比对输出
  assert.equal(C.judgeTest({ ok: true, stdout: 'anything', checkOk: true }, { check: 'x' }), true);
  // 旧式画布题仍可用
  assert.equal(C.judgeTest({ ok: true, stdout: '', hasCanvas: true }, { expectCanvas: true }), true);
  assert.equal(C.judgeTest({ ok: true, stdout: '', hasCanvas: false }, { expectCanvas: true }), false);
  // check 优先于 expectCanvas：有画布但检查失败 → 不通过
  assert.equal(C.judgeTest({ ok: true, stdout: '', hasCanvas: true, checkOk: false }, { expectCanvas: true, check: 'x' }), false);
  assert.equal(C.judgeTest({ ok: false, stdout: '', checkOk: true }, { check: 'x' }), false);
});

test('unjudgedPoints：只认正数分值', () => {
  assert.equal(C.unjudgedPoints({ unjudged: { points: 3, note: 'whl' } }), 3);
  assert.equal(C.unjudgedPoints({}), 0);
  assert.equal(C.unjudgedPoints({ unjudged: { points: 0 } }), 0);
});

const PLAN_COUNTS = { 1: { mcq: 26, code: 8 }, 2: { mcq: 26, code: 25 }, 3: { mcq: 26, code: 23 }, 4: { mcq: 28, code: 17 },
  5: { mcq: 20, code: 19 }, 6: { mcq: 26, code: 10 }, 7: { mcq: 38, code: 28 } };
const plan = (days, target, startLevel) => C.buildCountdownPlan({
  today: new Date(2026, 10, 6, 15, 30).getTime(), exam: new Date(2026, 10, 6 + days, 9, 0).getTime(),
  target, startLevel, counts: PLAN_COUNTS });

test('buildCountdownPlan：22 天冲三级', () => {
  const p = plan(22, 't3p', 1);
  assert.equal(p.longPlan, false);
  assert.equal(p.days.length, 22, '每天一张卡，排到考前一天');
  assert.equal(p.days[0].date, '2026-11-06');
  assert.equal(p.days[21].date, '2026-11-27');
  assert.equal(p.days[21].kind, 'rest', '最后一天休息');
  const kinds = p.days.map(d => d.kind);
  assert.equal(kinds.filter(k => k === 'mock').length >= 3, true, '至少 3 场模拟');
  assert.equal(kinds.filter(k => k === 'offline').length, 2, '三级目标 2 个本机实操日');
  const studied = new Set(p.days.filter(d => d.kind === 'study').flatMap(d => [...d.levels]));
  assert.deepEqual([...studied].sort(), [1, 2, 3, 4, 5, 6, 7], '七关全部排到');
  const official = p.days.findIndex(d => d.kind === 'mock' && d.title.includes('官方'));
  const lastStudy = kinds.lastIndexOf('study');
  assert.ok(official > lastStudy, '官方卷排在学完所有关之后');
  // 关卡按顺序推进
  const order = Array.from(p.days.filter(d => d.kind === 'study'), d => d.levels[0]);
  assert.deepEqual(order, [...order].sort((a, b) => a - b));
});

test('buildCountdownPlan：二级目标不排第 7 关、诊断起点跳过已掌握关', () => {
  const p = plan(22, 't2p', 3);
  const studied = new Set(p.days.filter(d => d.kind === 'study').flatMap(d => [...d.levels]));
  assert.deepEqual([...studied].sort(), [3, 4, 5, 6]);
  assert.equal(p.days.length, 22);
});

test('buildCountdownPlan：天数少时合并关卡、天数为 0 或过多', () => {
  for (const n of [1, 2, 3, 5, 8, 10, 12, 30, 49]) {
    const p = plan(n, 't3p', 1);
    assert.equal(p.days.length, n, n + ' 天应排 ' + n + ' 张卡');
    assert.equal(p.days[n - 1].kind, 'rest');
    if (n >= 3) {
      const studied = new Set(p.days.filter(d => d.kind === 'study').flatMap(d => [...d.levels]));
      assert.equal(studied.size, 7, n + ' 天也要覆盖全部 7 关（合并）');
    }
  }
  assert.equal(plan(0, 't3p', 1).days.length, 0);
  assert.equal(plan(50, 't3p', 1).longPlan, true);
});

test('judgeOutputAnswer：读程序写结果逐行严格比对', () => {
  assert.equal(C.judgeOutputAnswer('24\n20', '24\n20').ok, true);
  assert.equal(C.judgeOutputAnswer('24  \r\n20\n\n', '24\n20').ok, true, '行尾空格、\\r\\n、末尾空行忽略');
  assert.equal(C.judgeOutputAnswer('优 中 中 差', '优 中 中 差 ').ok, true, 'end=" " 留下的行尾空格忽略');
  const wrong = C.judgeOutputAnswer('24\n21', '24\n20');
  assert.equal(wrong.ok, false);
  assert.equal(wrong.line, 2);
  assert.equal(C.judgeOutputAnswer('20\n24', '24\n20').ok, false, '顺序必须一致');
  assert.equal(C.judgeOutputAnswer('24', '24\n20').got, null, '少写一行');
  assert.equal(C.judgeOutputAnswer('24\n20\nNone', '24\n20').want, null, '多写一行');
  assert.equal(C.judgeOutputAnswer('结果:24', '24').ok, false, '不剔除提示行（与编程题不同）');
  assert.equal(C.judgeOutputAnswer('3 1', '3  1').ok, false, '行内空格要一致');
});

test('buildCountdownPlan：每天都有本机实操', () => {
  const pool = { byLevel: {}, byCat: { data: ['d1', 'd2'], calc: ['c1'], draw: ['g1', 'g2'], db: ['b1', 'b2'], text: ['t1', 't2'] } };
  for (let L = 1; L <= 7; L++) pool.byLevel[L] = { fix: ['f' + L + 'a', 'f' + L + 'b'], coding: ['k' + L + 'a', 'k' + L + 'b', 'k' + L + 'c'] };
  for (const [n, tgt] of [[22, 't3p'], [22, 't2p'], [10, 't3p'], [3, 't2p'], [1, 't3p']]) {
    const p = C.buildCountdownPlan({ today: new Date(2026, 10, 6).getTime(), exam: new Date(2026, 10, 6 + n, 9).getTime(),
      target: tgt, startLevel: 1, counts: PLAN_COUNTS, localPool: pool });
    p.days.forEach(d => {
      assert.ok(d.local, `${n}天 第${d.index}天(${d.kind}) 缺本机实操`);
      assert.ok(d.tasks.some(t => t.local && t.href.startsWith('#local/')), '任务列表里有本机实操链接');
    });
    const study = p.days.filter(d => d.kind === 'study');
    study.forEach(d => assert.ok(d.local.ids.some(id => id.startsWith('f')) && d.local.ids.some(id => id.startsWith('k')), '学习日 = 改错 + 编程'));
    if (study.length >= 2 && study[0].levels[0] === study[1].levels[0]) {
      assert.notDeepEqual(Array.from(study[0].local.ids), Array.from(study[1].local.ids), '同一关的两天题目不同');
    }
    p.days.filter(d => d.kind === 'mock').forEach(d => assert.equal(d.local.kind, 'paper'));
    p.days.filter(d => d.kind === 'rest').forEach(d => assert.equal(d.local.kind, 'env'));
  }
});

test('pickFiveCats：按官方五类各 1 道、官方原题不参与、顺序与分值同官方卷', () => {
  const coding = [];
  for (const cat of ['data', 'calc', 'draw', 'db', 'text']) for (let i = 0; i < 3; i++) coding.push({ id: `x-${cat}-${i}`, cat });
  coding.push({ id: 'p27-c1', cat: 'data' }, { id: 'none-1' });
  for (const seed of [0, 1, 7, 999]) {
    const got = C.pickFiveCats(coding, seed);
    assert.deepEqual(Array.from(got, q => q.cat), ['data', 'calc', 'draw', 'db', 'text']);
    assert.ok(!got.some(q => q.id.startsWith('p27-')));
  }
  assert.notDeepEqual(Array.from(C.pickFiveCats(coding, 1), q => q.id), Array.from(C.pickFiveCats(coding, 2), q => q.id), '换 seed 换题');
  assert.equal(['data', 'calc', 'draw', 'db', 'text'].reduce((a, c) => a + C.catScore(c), 0), 75);
});

test('sampleStdin：知识点示例按 input() 次数给默认输入，取注释里的值，空行结束的循环补空行', () => {
  assert.equal(C.sampleStdin("print(1)"), null);
  assert.equal(C.sampleStdin("a = input()   # 输入 12，a 是字符串\nprint(a + '5')\nn = eval(input())  # 输入 7，n 是整数"), '12\n7\n');
  assert.equal(C.sampleStdin("m, n = int(input()), int(input())"), '12\n12\n');
  assert.equal(C.sampleStdin("while True:\n    line = input()\n    if line == '':\n        break"), '12\n\n');
});
