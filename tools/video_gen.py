#!/usr/bin/env python3
"""教育动画视频生成器：PIL 渲染帧 → ffmpeg 编码 MP4"""
import os, subprocess, math
from PIL import Image, ImageDraw, ImageFont

# ── 常量 ──
W, H = 1280, 720
FPS = 24
BG = (30, 30, 46)          # #1E1E2E
FG = (205, 214, 244)       # #CDD6F4
DIM = (108, 112, 134)      # #6C7086
ACCENT = (249, 226, 175)   # #F9E2AF
RED = (243, 139, 168)      # #F38BA8
GREEN = (166, 227, 161)    # #A6E3A1
BLUE = (137, 180, 250)     # #89B4FA
YELLOW = (250, 179, 135)   # #FAB387
HL_BG = (69, 71, 90)       # #45475A
PANEL = (49, 50, 68)       # #313244
CODE_BG = (17, 17, 27)     # #11111B

FONT_DIR = '/System/Library/Fonts'
FONT_CODE = f'{FONT_DIR}/Hiragino Sans GB.ttc'
FONT_CN = f'{FONT_DIR}/Hiragino Sans GB.ttc'

_cache = {}
def font(size, mono=True):
    key = (size, mono)
    if key not in _cache:
        path = FONT_CODE if mono else FONT_CN
        _cache[key] = ImageFont.truetype(path, size)
    return _cache[key]


class Frame:
    """一帧动画画面"""
    def __init__(self, duration=2.5):
        self.img = Image.new('RGB', (W, H), BG)
        self.draw = ImageDraw.Draw(self.img)
        self.duration = duration

    def title(self, text, sub=''):
        self.draw.text((60, 28), text, fill=FG, font=font(34, mono=False))
        if sub:
            self.draw.text((60, 76), sub, fill=DIM, font=font(22, mono=False))
        self.draw.line([(60, 110), (W - 60, 110)], fill=(88, 89, 112), width=2)
        return self

    def code_panel(self, lines, hl_line=-1, x=60, y=140, w=680, line_h=36, font_size=24):
        """绘制代码面板，hl_line 为高亮行号（0-based）"""
        # 背景
        self.draw.rounded_rectangle([x, y, x + w, y + line_h * len(lines) + 20], 12, fill=CODE_BG)
        for i, line in enumerate(lines):
            ly = y + 14 + i * line_h
            if i == hl_line:
                self.draw.rounded_rectangle([x + 8, ly - 4, x + w - 8, ly + line_h - 8], 6, fill=HL_BG)
                # 左侧箭头
                self.draw.polygon([(x + 2, ly + line_h // 2 - 8), (x + 2, ly + line_h // 2 + 8),
                                   (x + 14, ly + line_h // 2)], fill=ACCENT)
            # 行号
            self.draw.text((x + 18, ly), f'{i+1}', fill=DIM, font=font(18))
            # 代码（带简易语法高亮）
            self._draw_code(x + 56, ly, line, font_size)
        return self

    def _draw_code(self, x, y, text, size=24):
        f = font(size)
        cx = x
        for token, color in self._tokenize(text):
            self.draw.text((cx, y), token, fill=color, font=f)
            bbox = f.getbbox(token)
            cx += (bbox[2] - bbox[0]) if bbox else len(token) * size * 0.6

    @staticmethod
    def _tokenize(line):
        """简易 Python 语法着色"""
        KEYWORDS = {'for', 'in', 'if', 'else', 'elif', 'while', 'def', 'return',
                    'import', 'from', 'print', 'range', 'True', 'False', 'None',
                    'not', 'and', 'or', 'is', 'len', 'int', 'float', 'str', 'type'}
        tokens = []
        buf = ''
        i = 0
        while i < len(line):
            c = line[i]
            if c in '\'"':
                # 字符串
                j = i + 1
                while j < len(line) and line[j] != c:
                    if line[j] == '\\': j += 1
                    j += 1
                tokens.append((line[i:j+1], GREEN)); i = j + 1; continue
            if c == '#':
                tokens.append((line[i:], (108, 112, 134))); break
            if c.isalpha() or c == '_':
                buf = ''
                while i < len(line) and (line[i].isalnum() or line[i] == '_'):
                    buf += line[i]; i += 1
                color = RED if buf in KEYWORDS else (BLUE if buf[0].isupper() else FG)
                tokens.append((buf, color)); continue
            if c.isdigit():
                buf = ''
                while i < len(line) and (line[i].isdigit() or line[i] == '.'):
                    buf += line[i]; i += 1
                tokens.append((buf, YELLOW)); continue
            tokens.append((c, FG)); i += 1
        return tokens

    def vars_panel(self, pairs, x=760, y=140, w=460, title='变量'):
        """绘制变量状态面板，pairs = [(name, value, changed?)]"""
        self.draw.rounded_rectangle([x, y, x + w, y + 40 + len(pairs) * 44], 12, fill=PANEL)
        self.draw.text((x + 16, y + 10), title, fill=DIM, font=font(20, mono=False))
        for i, (name, val, changed) in enumerate(pairs):
            vy = y + 48 + i * 44
            color = ACCENT if changed else FG
            self.draw.text((x + 16, vy), f'{name} = {val}', fill=color, font=font(24))
        return self

    def output_panel(self, lines, x=60, y=500, w=680, title='输出'):
        self.draw.rounded_rectangle([x, y, x + w, y + 36 + len(lines) * 34], 12, fill=CODE_BG)
        self.draw.text((x + 16, y + 8), title, fill=DIM, font=font(18, mono=False))
        for i, line in enumerate(lines):
            self.draw.text((x + 16, y + 38 + i * 34), line, fill=GREEN, font=font(22))
        return self

    def note(self, text, y=620, color=ACCENT):
        """底部注释"""
        self.draw.rounded_rectangle([60, y, W - 60, y + 52], 10, fill=(49, 50, 68))
        self.draw.text((80, y + 10), text, fill=color, font=font(24, mono=False))
        return self

    def annotation(self, x, y, text, color=ACCENT, size=22):
        """代码区旁注"""
        self.draw.text((x, y), text, fill=color, font=font(size, mono=False))
        return self

    def arrow_right(self, x, y, text, w=400):
        """右侧说明框"""
        self.draw.rounded_rectangle([x, y, x + w, y + 72], 10, fill=PANEL)
        self.draw.text((x + 16, y + 12), text, fill=ACCENT, font=font(24, mono=False))
        # 箭头
        self.draw.text((x - 30, y + 20), '←', fill=ACCENT, font=font(28))
        return self

    def highlight_box(self, x, y, w, h, color=ACCENT, label=''):
        self.draw.rounded_rectangle([x, y, x + w, y + h], 8, outline=color, width=3)
        if label:
            self.draw.text((x + w + 10, y + h // 2 - 14), label, fill=color, font=font(22, mono=False))
        return self

    def progress_bar(self, step, total):
        """底部进度条"""
        bar_w = (W - 120) * step / max(total, 1)
        self.draw.rounded_rectangle([60, H - 16, 60 + bar_w, H - 8], 4, fill=BLUE)
        return self

    def save(self, path):
        self.img.save(path)
        return path


def encode(frames_dir, output, fps=2, duration_per_frame=None):
    """用 ffmpeg 将帧序列编码为 MP4"""
    frames = sorted(f for f in os.listdir(frames_dir) if f.endswith('.png'))
    if not frames:
        print(f'无帧文件: {frames_dir}'); return
    # 生成 concat 文件（每帧不同持续时间）
    concat_file = os.path.join(frames_dir, 'concat.txt')
    with open(concat_file, 'w') as f:
        for frame in frames:
            dur = duration_per_frame if duration_per_frame else 2.5
            f.write(f"file '{frame}'\nduration {dur}\n")
    # 最后一个帧需要重复
    last = frames[-1]
    with open(concat_file, 'a') as f:
        f.write(f"file '{last}'\n")

    os.makedirs(os.path.dirname(output) or '.', exist_ok=True)
    cmd = ['ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', concat_file,
           '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-r', str(FPS),
           '-vf', 'scale=1280:720', '-movflags', '+faststart', output]
    subprocess.run(cmd, capture_output=True)
    size = os.path.getsize(output) / 1024 / 1024
    print(f'✓ {output} ({size:.1f} MB, {len(frames)} 帧)')


if __name__ == '__main__':
    import sys
    print('视频生成器框架加载成功')
    print(f'帧尺寸: {W}×{H}, FPS: {FPS}')
