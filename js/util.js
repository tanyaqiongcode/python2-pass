/* ============================================================
 * 工具函数
 * ============================================================ */

/** 创建 DOM 元素。h('div', {class:'x', onclick: fn}, child1, child2) */
function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (v !== null && v !== undefined && v !== false) el.setAttribute(k, v);
    }
  }
  for (const c of children.flat(Infinity)) {
    if (c === null || c === undefined || c === false) continue;
    el.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return el;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* ---------- 轻量 Python 语法高亮（无依赖） ---------- */
const PY_KEYWORDS = new Set(['False','None','True','and','as','assert','async','await','break',
  'class','continue','def','del','elif','else','except','finally','for','from','global','if',
  'import','in','is','lambda','nonlocal','not','or','pass','raise','return','try','while','with','yield']);
const PY_BUILTINS = new Set(['abs','all','any','bin','bool','chr','dict','dir','divmod','enumerate',
  'eval','filter','float','format','frozenset','getattr','hex','input','int','isinstance','len',
  'list','map','max','min','next','oct','open','ord','pow','print','range','repr','reversed',
  'round','set','slice','sorted','str','sum','super','tuple','type','zip','self']);

function hlPython(code) {
  let out = '';
  let i = 0;
  const n = code.length;
  while (i < n) {
    const ch = code[i];
    // 字符串（含 f-string 前缀）
    const pref = code.slice(i, i + 2).toLowerCase();
    if (/[frb]{1,2}['"]/.test(pref) && /[frb]/i.test(ch)) {
      let j = i;
      while (j < i + 2 && j < n) j++;
      const quote = code[j];
      let k = j + 1;
      if (code.slice(j, j + 3) === quote.repeat(3)) {
        k = code.indexOf(quote.repeat(3), j + 3);
        k = k === -1 ? n : k + 3;
      } else {
        while (k < n && code[k] !== quote) { if (code[k] === '\\') k++; k++; }
        k = Math.min(k + 1, n);
      }
      out += `<span style="color:#9ecbff">${esc(code.slice(i, k))}</span>`;
      i = k; continue;
    }
    if (ch === "'" || ch === '"') {
      let k = i + 1;
      while (k < n && code[k] !== ch) { if (code[k] === '\\') k++; k++; }
      k = Math.min(k + 1, n);
      out += `<span style="color:#9ecbff">${esc(code.slice(i, k))}</span>`;
      i = k; continue;
    }
    // 注释
    if (ch === '#') {
      let k = code.indexOf('\n', i);
      k = k === -1 ? n : k;
      out += `<span style="color:#7a8ba3">${esc(code.slice(i, k))}</span>`;
      i = k; continue;
    }
    // 数字
    if (/\d/.test(ch)) {
      let k = i;
      while (k < n && /[\d.xXbBoOeE_+\-a-fA-F]/.test(code[k])) {
        if (/[+\-]/.test(code[k]) && !/[eE]/.test(code[k - 1])) break;
        k++;
      }
      out += `<span style="color:#ffd43b">${esc(code.slice(i, k))}</span>`;
      i = k; continue;
    }
    // 标识符/关键字
    if (/[A-Za-z_]/.test(ch)) {
      let k = i;
      while (k < n && /\w/.test(code[k])) k++;
      const w = code.slice(i, k);
      let cls = '';
      if (PY_KEYWORDS.has(w)) cls = 'color:#ff7ab2;font-weight:600';
      else if (PY_BUILTINS.has(w)) cls = 'color:#6ee7a0';
      else if (code[k] === '(') cls = 'color:#8ab8ff';
      out += cls ? `<span style="${cls}">${esc(w)}</span>` : esc(w);
      i = k; continue;
    }
    out += esc(ch);
    i++;
  }
  return out;
}

/* 内联 markdown：`code` 与 **粗体**；代码段先换成占位符，避免 `2**3` 里的 ** 被当成粗体 */
function mdInline(s) {
  const codes = [];
  return esc(s)
    .replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return `\uE100${codes.length - 1}\uE101`; })
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/\uE100(\d+)\uE101/g, (_, k) => `<code>${codes[Number(k)]}</code>`);
}

function codeBlock(code, cls) {
  const pre = h('pre', { class: cls || 'codeblock' });
  pre.innerHTML = hlPython(code);
  return pre;
}

/* 程序填空题题干代码：___(n)___ 先换成单字符占位，高亮后再还原成醒目的空位标记，避免打乱分词 */
function blankCodeBlock(code) {
  const pre = h('pre', { class: 'codeblock' });
  const marked = String(code || '').replace(/___\((\d+)\)___/g, (_, n) => String.fromCharCode(0xE000 + Number(n)));
  pre.innerHTML = hlPython(marked).replace(/[\uE000-\uE0FF]/g,
    c => `<span class="blank-slot">___(${c.charCodeAt(0) - 0xE000})___</span>`);
  return pre;
}

/* ---------- 存储 ---------- */
const Store = {
  key: 'py2pass_v1',
  load() {
    try { return JSON.parse(localStorage.getItem(this.key)) || {}; }
    catch (e) { return {}; }
  },
  save(state) {
    try { localStorage.setItem(this.key, JSON.stringify(state)); return true; }
    catch (e) { console.warn('存储失败', e); return false; }
  }
};

/* ---------- 时间 ---------- */
function fmtCountdown(target) {
  const ms = new Date(target).getTime() - Date.now();
  if (isNaN(ms)) return { d: '--', text: '日期未设置' };
  if (ms <= 0) return { d: 0, text: '考试周已到，全力以赴！' };
  const d = Math.floor(ms / 86400000);
  const hh = Math.floor(ms % 86400000 / 3600000);
  return { d, text: `${d} 天 ${hh} 小时` };
}

function fmtMMSS(sec) {
  sec = Math.max(0, Math.floor(sec));
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/* ---------- 输出比较（实现移至 js/core.js，浏览器与 Node 测试共用） ---------- */
const normalizeOutput = PY2CORE.normalizeOutput;
const stripPrompts = PY2CORE.stripPrompts;
const compareOutput = PY2CORE.compareOutput;

/* ---------- 简单 Markdown → HTML（课程内容用，仅支持有限标签） ---------- */
function miniMd(src) {
  const lines = String(src).split('\n');
  const out = [];
  let inCode = false, inUl = false, inTable = false, buf = [];
  const flushUl = () => { if (inUl) { out.push('<ul>' + buf.join('') + '</ul>'); buf = []; inUl = false; } };
  const flushTable = () => {
    if (inTable) {
      const rows = buf.map(r => r.split('|').map(c => c.trim()));
      let html = '<table>';
      rows.forEach((r, i) => {
        html += '<tr>' + r.map(c => `<${i === 0 ? 'th' : 'td'}>${inline(c)}</${i === 0 ? 'th' : 'td'}>`).join('') + '</tr>';
      });
      out.push(html + '</table>');
      buf = []; inTable = false;
    }
  };
  const inline = mdInline;
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');
    if (line.startsWith('```')) {
      if (inCode) { out.push('<pre><code>' + esc(buf.join('\n')) + '</code></pre>'); buf = []; inCode = false; }
      else { flushUl(); flushTable(); inCode = true; }
      continue;
    }
    if (inCode) { buf.push(line); continue; }
    if (/^\s*[-*] /.test(line)) { flushTable(); inUl = true; buf.push('<li>' + inline(line.replace(/^\s*[-*] /, '')) + '</li>'); continue; }
    if (line.startsWith('|')) {
      flushUl();
      if (!inTable) inTable = true;
      if (/^\|[\s:|-]+\|$/.test(line)) continue; // 分隔行
      buf.push(line);
      continue;
    }
    flushUl(); flushTable();
    const mH = line.match(/^(#{1,4})\s+(.*)/);
    if (mH) { out.push(`<h${mH[1].length + 2}>${inline(mH[2])}</h${mH[1].length + 2}>`); continue; }
    if (line.trim() === '') continue;
    out.push('<p>' + inline(line) + '</p>');
  }
  flushUl(); flushTable();
  if (inCode && buf.length) out.push('<pre><code>' + esc(buf.join('\n')) + '</code></pre>');
  return out.join('\n');
}
