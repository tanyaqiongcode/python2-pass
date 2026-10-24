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
