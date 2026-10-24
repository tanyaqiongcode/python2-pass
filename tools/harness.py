"""本地判题 harness —— 与 js/runner.js 中 HARNESS_PY 行为完全一致。

约定：
- input() 的提示文字单独捕获（不进入 stdout），
- stdin_text 按行喂给 input()，
- stdout 捕获 print 输出，
- settrace 看门狗防死循环。
"""

import io
import os
import sys
import time
import builtins
import traceback


class Watchdog(Exception):
    pass


def run_user(
    code: str, stdin_text: str, timeout_s: float = 8.0, max_events: int = 2_000_000
):
    """运行用户代码，返回 dict(ok, stdout, prompts, error, tb)。

    与浏览器 HARNESS_PY 保持一致：prompt 进 prompts，不进 stdout。
    matplotlib 题自动放宽预算（与浏览器 runner.js 行为一致）。
    """
    if "matplotlib" in code:
        timeout_s = max(timeout_s, 60.0)
        max_events = max(max_events, 100_000_000)
    inputs = stdin_text.split("\n") if stdin_text != "" else []
    if inputs and inputs[-1] == "":
        inputs.pop()

    ctx = {
        "i": 0,
        "events": 0,
        "max_events": max_events,
        "deadline": time.monotonic() + timeout_s,
        "prompts": [],
    }
    out = io.StringIO()

    def _input(prompt=""):
        if prompt:
            ctx["prompts"].append(str(prompt))
        if ctx["i"] >= len(inputs):
            raise EOFError("程序请求输入，但测试输入已用完")
        v = inputs[ctx["i"]]
        ctx["i"] += 1
        return v

    def _trace(frame, event, arg):
        ctx["events"] += 1
        if ctx["events"] > ctx["max_events"] or time.monotonic() > ctx["deadline"]:
            raise Watchdog("执行超时：程序运行时间过长或存在死循环")
        return _trace

    env = {"__name__": "__main__", "input": _input, "raw_input": _input}

    # 重型库预导入：与浏览器 harness 一致，避免 import 本身触发看门狗
    try:
        if "matplotlib" in code:
            import matplotlib

            matplotlib.use("Agg")
            import numpy  # noqa
    except Exception:
        pass

    # turtle 桩：与浏览器 runner.js 注入的 turtle_shim 状态数学一致，
    # 本地/CI 校验不依赖 tkinter，判题依据的 print 状态值两端相同
    turtle_mod = None
    try:
        from turtle_stub import make_module

        turtle_mod = make_module()
        env["turtle"] = turtle_mod
        sys.modules["turtle"] = turtle_mod
    except Exception:
        turtle_mod = None

    saved_stdin, saved_stdout = sys.stdin, sys.stdout
    saved_path = sys.path[:]
    if "" not in saved_path and os.getcwd() not in saved_path:
        sys.path.insert(0, os.getcwd())  # 使数据目录中的模块可 import（如 LossRatio.py）
    sys.stdin = io.StringIO(stdin_text)
    sys.stdout = out
    old_input = builtins.input
    builtins.input = _input
    err = ""
    tb = ""
    try:
        sys.settrace(_trace)
        try:
            exec(compile(code, "<student>", "exec"), env)
        finally:
            sys.settrace(None)
    except Watchdog as w:
        err = str(w)
    except EOFError as e:
        err = "输入不足：" + str(e)
    except SystemExit:
        pass
    except BaseException as e:
        err = e.__class__.__name__ + ": " + str(e)
        tb = "".join(traceback.format_exception_only(type(e), e)).strip()
        try:
            _frames = traceback.extract_tb(sys.exc_info()[2])
            _user_frames = [f for f in _frames if f.filename == "<student>"]
            if _user_frames:
                tb = 'File "<student>", line ' + str(_user_frames[-1].lineno) + "\n" + tb
        except Exception:
            pass
    finally:
        builtins.input = old_input
        sys.stdin, sys.stdout = saved_stdin, saved_stdout
        sys.path[:] = saved_path
        if turtle_mod is not None:
            try:
                del sys.modules["turtle"]
            except Exception:
                pass

    return {
        "ok": err == "",
        "stdout": out.getvalue(),
        "prompts": "\n".join(ctx["prompts"]),
        "error": err,
        "tb": tb,
    }
