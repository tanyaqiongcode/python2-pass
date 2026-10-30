# 开发环境与工作流

## 环境要求
- Python ≥ 3.9（本地校验题库；matplotlib 用于带图题校验）
- Node ≥ 18（核心逻辑单测）
- 无前端构建步骤：站点为纯静态，改完即用

## 常用命令
```bash
# 1. 编辑题库/课程：data_src/*.json（规范见 data_src/SCHEMA.md）
# 2. 单元测试（判题比较、等第模型、模拟考状态机等纯逻辑）
node tools/tests.mjs
# 3. 校验并打包题库（真实运行每道题的参考答案；自动更新 index.html 资源版本戳）
python3 tools/build_data.py
# 4. 本地预览
python3 -m http.server 8642
# 5. JS 语法检查
for f in js/*.js; do node --check "$f"; done
```

## 架构速记
- `js/core.js`：无 DOM 的纯逻辑（输出比对、填空匹配、等第预估、模拟考过期判定），浏览器与 Node 测试共用
- `js/runner.js`：判题引擎。Web Worker 优先（判题不阻塞 UI、主线程可强制 terminate），主线程回退；turtle 在 Worker 内录制绘图命令、主线程回放
- `tools/harness.py` + `tools/turtle_stub.py`：本地/CI 校验用 harness，**必须与 js/runner.js 内嵌的 HARNESS_PY 行为保持一致**（改一处同步另一处）
- `js/data.js`：由 build_data.py 生成，勿手改

## 浏览器手工验收清单（发版前）
1. 首页：倒计时、诊断 CTA、关卡地图、三级里程碑
2. 判题：任一代码题"运行并判题"通过；turtle 画布题出图；官方卷 p27-c4（SQLite）判分
3. 模拟考：开考后切到别的页面再回来计时仍在；把系统时间调快过 endAt（或等超时）验证自动交卷；刷新后答卷恢复
4. 诊断：答完出现起点推荐，路径页"下一步"与之一致

## 安全说明

- `vendor/pyodide/` 内嵌的是 Pyodide v314.0.7 官方 npm 发行包（来源 registry.npmmirror.com 的 pyodide-314.0.7.tgz），**未做完整依赖漏洞审计**，请勿在任何安全敏感场景把学生代码当可信输入之外使用；升级流程：下载新版 npm tarball → 解包替换本目录 6 个文件 → `node tools/tests.mjs` + `python3 tools/build_data.py` 全过 → 浏览器按验收清单回归
- 学生代码在 Worker/主线程均通过 `settrace` 看门狗 + 主线程 deadline 双重限制执行，仅访问浏览器内存文件系统
- CI 校验依赖已锁精确版本（matplotlib 3.10.6 / openpyxl 3.1.5），与本地验证环境一致
