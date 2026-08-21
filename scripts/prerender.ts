#!/usr/bin/env bun
/**
 * Prerender for GitHub Pages — 纯静态，不依赖 SSR 服务器
 *
 * 流程： vite build 产出 dist/index.html（含 <div id="root"><div id="seo-shell">…</div></div> 的手工壳）
 *        → 本脚本用 react-dom/server 将 src/prerender/MarketingShell.tsx 渲染为静态 HTML
 *        → 覆盖 dist/index.html 内 #root 的内容，确保 “源码唯一数据源” 与 “爬虫所见首帧” 完全一致
 * 兼容：产物仍是静态文件，可直接 `cp -r dist → gh-pages`，与 DEPLOY_PUSH.md 的 deploy() 零改动
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MarketingShell } from '../src/prerender/MarketingShell.tsx';

const distHtmlPath = fileURLToPath(new URL('../dist/index.html', import.meta.url));

let html: string;
try {
  html = readFileSync(distHtmlPath, 'utf-8');
} catch (e) {
  console.error(`[prerender] 未找到 ${distHtmlPath}，请先执行 vite build`);
  process.exit(1);
}

// 渲染为不含 React data 属性的静态标记
const shellHtml = renderToStaticMarkup(React.createElement(MarketingShell));

// 替换 #root 内的旧壳（兼容手工壳与空 root）
// vite build 后 dist 的结构是：<div id="root"><div id="seo-shell">…</div></div><noscript>…</noscript></body>
// script 已被 vite 注入到 <head>，不在 body 的 root 之后，因此锚点改为 <noscript> 或 </body>
const rootOpen = '<div id="root">';
const rootClose = '</div>';

const rootStart = html.indexOf(rootOpen);
if (rootStart === -1) {
  console.error('[prerender] 未找到 <div id="root"> 标记');
  process.exit(1);
}

// 优先以 <noscript> 为锚点，其次 </body>
let anchorPos = html.indexOf('<noscript', rootStart);
if (anchorPos === -1) anchorPos = html.indexOf('</body>', rootStart);
if (anchorPos === -1) {
  console.error('[prerender] 未找到 <noscript> 或 </body> 锚点');
  process.exit(1);
}

// 找到 #root 对应的闭合 </div>（在 anchor 之前最近的一个）
const rootEnd = html.lastIndexOf(rootClose, anchorPos);
if (rootEnd === -1 || rootEnd <= rootStart) {
  console.error('[prerender] 未找到 #root 的闭合标签');
  process.exit(1);
}

const before = html.slice(0, rootStart + rootOpen.length);
const after = html.slice(rootEnd);
const nextHtml = `${before}\n      ${shellHtml}\n    ${after}`;

if (nextHtml === html) {
  console.log('[prerender] 无变化，跳过写入');
  process.exit(0);
}

writeFileSync(distHtmlPath, nextHtml, 'utf-8');
console.log(`[prerender] 已注入静态壳 → ${distHtmlPath} (${Buffer.byteLength(shellHtml, 'utf-8')} bytes)`);
console.log('[prerender] 产物仍为纯静态，可直接推 gh-pages（GitHub Pages 兼容）');
