import puppeteer from 'puppeteer-core';
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'fs';
import os from 'os';
import { join, resolve } from 'path';
import markdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';

const CHROME_PATH = process.env.CHROME_PATH ?? process.env.PUPPETEER_EXECUTABLE_PATH ?? (() => {
  const candidates = process.platform === 'win32'
    ? [
        'C:/Program Files/Google/Chrome/Application/chrome.exe',
        'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        `${process.env.LOCALAPPDATA ?? ''}/Google/Chrome/Application/chrome.exe`,
      ]
    : process.platform === 'darwin'
      ? [
          '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
          '/Applications/Chromium.app/Contents/MacOS/Chromium',
        ]
      : [
          '/usr/bin/google-chrome',
          '/usr/bin/google-chrome-stable',
          '/usr/bin/chromium',
          '/usr/bin/chromium-browser',
        ];

  const found = candidates.find((candidate) => candidate && existsSync(candidate));
  if (!found) {
    throw new Error(
      'Cannot find Chrome/Chromium. Set CHROME_PATH or PUPPETEER_EXECUTABLE_PATH to a valid browser executable.'
    );
  }

  return found;
})();
const TMP_DIR = mkdtempSync(join(os.tmpdir(), 'claude-code-guide-'));
const DOCS_DIR = resolve(import.meta.dirname, '../docs');
const OUTPUT_PDF = resolve(import.meta.dirname, '../docs/public/claude-code-complete-guide-v2.pdf');

const SIDEBAR_ORDER = [
  { title: '前言', dir: 'part00-preface', sections: ['index', 'roadmap', 'glossary', 'setup'] },
  { title: '第1篇：背景故事', dir: 'part01-background', sections: ['index', '02-source-overview', '03-community', '04-why-learn', '05-legal-ethics'] },
  { title: '第2篇：小白快速上手', dir: 'part02-quickstart', sections: ['index', '02-installation', '03-first-chat', '04-edit-files', '05-run-commands', '06-git-workflow', '07-cheatsheet', '08-cost-tips'] },
  { title: '第3篇：架构全景', dir: 'part03-architecture', sections: ['index', '02-four-entries', '03-directory-structure', '04-data-flow', '05-tech-stack', '06-comparison', '07-startup', '08-main-entry', '09-dependencies', '10-philosophy'] },
  { title: '第4篇：核心循环', dir: 'part04-queryengine', sections: ['index', '02-eight-steps', '03-source-walkthrough', '04-message-preparation', '05-api-streaming', '06-tool-collection', '07-silent-error-handling', '08-budget-checks', '09-termination', '10-thinking-mode', '11-parallel-executor', '12-ecosystem'] },
  { title: '第5篇：提示词工程', dir: 'part05-prompt-engineering', sections: ['index', '02-static-constitution', '03-dynamic-policy', '04-cache-boundary', '05-token-economics', '06-cache-pitfalls', '07-behavior-constraints', '08-tool-manuals', '09-comparison', '10-practice'] },
  { title: '第6篇：工具系统', dir: 'part06-tool-system', sections: ['index', '02-tool-interface', '03-governance-pipeline', '04-bash-tool', '05-file-tools', '06-search-tools', '07-agent-tool', '08-external-tools', '09-mcp-tools', '10-fail-closed', '11-lazy-loading', '12-practice'] },
  { title: '第7篇：权限与安全', dir: 'part07-permissions', sections: ['index', '02-six-modes', '03-basic-modes', '04-auto-mode', '05-advanced-modes', '06-evaluation-pipeline', '07-bash-ast', '08-sandbox', '09-fail-closed', '10-practice'] },
  { title: '第8篇：上下文管理', dir: 'part08-context-management', sections: ['index', '02-three-tiers', '03-micro-compaction', '04-auto-compaction', '05-full-compaction', '06-cache-aware', '07-api-compaction', '08-manual-compact', '09-cost-analysis', '10-best-practices'] },
  { title: '第9篇：记忆系统', dir: 'part09-memory-system', sections: ['index', '02-claude-md', '03-auto-extraction', '04-dual-model-retrieval', '05-precision-first', '06-kairos-dreaming', '07-dream-distillation', '08-memory-context', '09-persistence', '10-practice'] },
  { title: '第10篇：多Agent系统', dir: 'part10-multi-agent', sections: ['index', '02-six-agents', '03-explore-agent', '04-plan-agent', '05-coordinator', '06-anti-lazy', '07-verification-agent', '08-cache-optimization', '09-anti-recursion', '10-message-routing', '11-swarm-vs-coordinator', '12-practice'] },
  { title: '第11篇：终端UI', dir: 'part11-terminal-ui', sections: ['index', '02-yoga-layout', '03-react-fiber', '04-streaming-render', '05-input-handling', '06-virtual-scroll', '07-vim-mode', '08-diff-display', '09-mouse-hyperlinks', '10-design-system'] },
  { title: '第12篇：Bridge桥接', dir: 'part12-bridge', sections: ['index', '02-ipc', '03-bridge-main', '04-protocol', '05-jwt-auth', '06-session-runner', '07-transport', '08-ide-integration', '09-bounded-uuid-set', '10-summary'] },
  { title: '第13篇：状态管理', dir: 'part13-state-management', sections: ['index', '02-app-state', '03-side-effects', '04-memdir', '05-history', '06-migrations', '07-persistence', '08-overview'] },
  { title: '第14篇：服务与集成', dir: 'part14-services', sections: ['index', '02-error-handling', '03-mcp-protocol', '04-mcp-transport', '05-lsp', '06-oauth', '07-feature-flags', '08-summary'] },
  { title: '第15篇：隐藏功能', dir: 'part15-hidden-features', sections: ['index', '02-undercover-mode', '03-buddy-pet', '04-anti-cheat', '05-deep-planning', '06-internal-easter-eggs'] },
  { title: '第16篇：Hooks/Skills/Plugins', dir: 'part16-hooks-skills-plugins', sections: ['index', '02-pre-tool-use', '03-skills', '04-plugins', '05-mcp-injection', '06-custom-commands', '07-defer-loading', '08-practice'] },
  { title: '第17篇：性能与成本', dir: 'part17-performance-cost', sections: ['index', '02-prompt-caching', '03-parallel-prefetch', '04-lazy-loading', '05-sub-agent-cache', '06-render-performance', '07-streaming-pipeline', '08-cost-cheatsheet'] },
  { title: '第18篇：遥测与生命周期', dir: 'part18-telemetry-lifecycle', sections: ['index', '02-perfetto', '03-telemetry', '04-resource-cleanup', '05-error-recovery', '06-best-practices'] },
  { title: '第19篇：实战Lab', dir: 'part19-labs', sections: ['index', '02-tool-registry', '03-permissions', '04-streaming', '05-mcp-server', '06-multi-agent', '07-context-compaction', '08-full-integration'] },
  { title: '第20篇：总结与展望', dir: 'part20-summary', sections: ['index', '02-comparison', '03-future', '04-insights', '05-learning-path', '06-conclusion'] },
  { title: '附录', dir: 'appendix', sections: ['source-index', 'cheatsheet', 'quiz', 'further-reading', 'glossary-en-zh'] },
];

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
}).use(anchor, {
  permalink: false,
  slugify: (s) => s.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fff-]/g, ''),
});

function stripFrontmatter(text) {
  if (text.startsWith('---')) {
    const end = text.indexOf('---', 3);
    if (end !== -1) return text.slice(end + 3).trim();
  }
  return text.trim();
}

function stripMermaid(text) {
  return text.replace(/```mermaid[\s\S]*?```/g,
    '\n> *[Mermaid 图表 — 请在在线版本中查看]*\n');
}

function extractFirstHeading(text) {
  const m = text.match(/^#\s+(.+)/m);
  return m ? m[1].replace(/[*`]/g, '') : null;
}

function makeSlug(text) {
  return text.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u4e00-\u9fff-]/g, '');
}

function buildContent() {
  const tocEntries = [];
  const bodyParts = [];

  for (const part of SIDEBAR_ORDER) {
    const partSlug = makeSlug(part.title);
    tocEntries.push({ level: 'part', title: part.title, slug: partSlug });

    let partMd = `\n\n# ${part.title}\n\n`;

    for (const sec of part.sections) {
      const filePath = join(DOCS_DIR, part.dir, `${sec}.md`);
      try {
        let content = readFileSync(filePath, 'utf-8');
        content = stripFrontmatter(content);
        content = stripMermaid(content);

        const heading = extractFirstHeading(content);
        if (heading) {
          const slug = makeSlug(`${part.dir}-${heading}`);
          tocEntries.push({ level: 'section', title: heading, slug });
        }

        partMd += `\n\n${content}\n\n---\n\n`;
      } catch {
        partMd += `\n\n> 内容待补充: ${sec}\n\n---\n\n`;
      }
    }

    bodyParts.push(partMd);
  }

  return { tocEntries, bodyParts };
}

function buildTocHtml(tocEntries) {
  let html = '<div class="toc"><h1>目 录</h1>\n';
  for (const entry of tocEntries) {
    if (entry.level === 'part') {
      html += `<div class="toc-part"><a href="#${entry.slug}">${entry.title}</a></div>\n`;
    } else {
      html += `<div class="toc-section"><a href="#${entry.slug}">${entry.title}</a></div>\n`;
    }
  }
  html += '</div>';
  return html;
}

function renderBodyHtml(bodyParts) {
  let allMd = bodyParts.join('\n\n<div class="page-break"></div>\n\n');
  return md.render(allMd);
}

const CSS = `
  @page { margin: 2cm 1.8cm; size: A4; }
  body {
    font-family: "PingFang SC", "Noto Sans SC", "Microsoft YaHei", -apple-system, sans-serif;
    font-size: 11pt; line-height: 1.75; color: #1a1a1a;
  }
  h1 { font-size: 20pt; color: #c4623e; border-bottom: 2px solid #c4623e; padding-bottom: 6px; margin-top: 28px; page-break-after: avoid; }
  h2 { font-size: 15pt; color: #2c3e50; border-bottom: 1px solid #ddd; padding-bottom: 4px; margin-top: 22px; page-break-after: avoid; }
  h3 { font-size: 12.5pt; color: #34495e; margin-top: 16px; page-break-after: avoid; }
  h4 { font-size: 11pt; color: #555; margin-top: 12px; page-break-after: avoid; }

  code {
    background: #f3f4f6; border-radius: 3px;
    padding: 1px 5px; font-family: "SF Mono", "Fira Code", Menlo, Consolas, monospace;
    font-size: 9pt; color: #c4623e;
  }
  pre {
    background: #1e1e2e; color: #cdd6f4; border-radius: 6px;
    padding: 14px 18px; overflow-x: auto; font-size: 8.5pt; line-height: 1.5;
    page-break-inside: avoid;
  }
  pre code { background: none; color: inherit; padding: 0; font-size: inherit; }

  table { border-collapse: collapse; width: 100%; margin: 12px 0; font-size: 9.5pt; page-break-inside: avoid; }
  th { background: #f0f0f0; font-weight: 600; text-align: left; padding: 7px 10px; border: 1px solid #d0d0d0; }
  td { padding: 5px 10px; border: 1px solid #d0d0d0; }
  tr:nth-child(even) td { background: #fafafa; }

  blockquote {
    border-left: 4px solid #c4623e; margin: 14px 0; padding: 8px 16px;
    background: #fff8f5; color: #555;
  }
  blockquote em { font-style: normal; color: #888; }

  a { color: #c4623e; text-decoration: underline; }
  hr { border: none; border-top: 1px solid #e5e5e5; margin: 18px 0; }
  li { margin: 2px 0; }
  strong { color: #2c3e50; }
  img { max-width: 100%; }
  p { margin: 6px 0 10px; }
  .page-break { page-break-before: always; }

  /* Cover */
  .cover { text-align: center; padding: 140px 0 60px; page-break-after: always; }
  .cover h1 { font-size: 30pt; border: none; color: #c4623e; margin-bottom: 16px; }
  .cover .subtitle { font-size: 14pt; color: #666; margin: 8px 0; }
  .cover .badges { margin-top: 32px; }
  .cover .badge { display: inline-block; background: #c4623e; color: white; padding: 5px 14px; border-radius: 14px; font-size: 10pt; margin: 4px; }
  .cover .meta { margin-top: 50px; font-size: 10pt; color: #aaa; }

  /* TOC */
  .toc { page-break-after: always; }
  .toc h1 { text-align: center; font-size: 22pt; border: none; margin-bottom: 24px; }
  .toc a { color: #1a1a1a; text-decoration: none; }
  .toc a:hover { color: #c4623e; }
  .toc-part { font-size: 12pt; font-weight: 700; color: #c4623e; margin-top: 14px; padding: 4px 0; border-bottom: 1px solid #eee; }
  .toc-section { font-size: 10pt; color: #444; padding: 2px 0 2px 24px; }
`;

const COVER = `
<div class="cover">
  <h1>Claude Code 完全指南 V2</h1>
  <p class="subtitle">全网最详细的 Claude Code 51万行 TypeScript 源码解读</p>
  <div class="badges">
    <span class="badge">20 篇</span>
    <span class="badge">187 节</span>
    <span class="badge">44,600+ 行</span>
    <span class="badge">100+ 架构图</span>
    <span class="badge">8 个实战 Lab</span>
  </div>
  <div class="meta">
    <p>在线版（含交互 Mermaid 图表）</p>
    <p><a href="https://bcefghj.github.io/claude-code-complete-guide_v2/" style="color:#c4623e;">https://bcefghj.github.io/claude-code-complete-guide_v2/</a></p>
    <p style="margin-top:20px;">2026 年 4 月</p>
  </div>
</div>
`;

async function generatePdf() {
  console.log('Step 1/4: Reading and combining all sections...');
  const { tocEntries, bodyParts } = buildContent();
  console.log(`  ${tocEntries.length} TOC entries from ${SIDEBAR_ORDER.length} parts`);

  console.log('Step 2/4: Rendering Markdown -> HTML with markdown-it...');
  const tocHtml = buildTocHtml(tocEntries);
  const bodyHtml = renderBodyHtml(bodyParts);

  const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>Claude Code 完全指南 V2</title>
<style>${CSS}</style>
</head>
<body>
${COVER}
${tocHtml}
${bodyHtml}
<div style="text-align:center; margin-top:60px; padding-top:20px; border-top:1px solid #ddd; color:#999; font-size:8pt;">
  <p>Claude Code 完全指南 V2 | 仅用于教育学习目的</p>
  <p>Claude Code 源码版权归 Anthropic, PBC 所有 | MIT License</p>
  <p><a href="https://github.com/bcefghj/claude-code-complete-guide_v2">https://github.com/bcefghj/claude-code-complete-guide_v2</a></p>
</div>
</body>
</html>`;

  const htmlPath = join(TMP_DIR, 'combined-guide-v2.html');
  writeFileSync(htmlPath, fullHtml);
  console.log(`  HTML output: ${(fullHtml.length / 1024).toFixed(0)} KB`);

  console.log('Step 3/4: Launching Chrome for PDF generation...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: 'networkidle0', timeout: 120000 });

  console.log('Step 4/4: Generating PDF (bookmarks + hyperlinks)...');
  await page.pdf({
    path: OUTPUT_PDF,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `<div style="font-size:7pt; color:#bbb; width:100%; text-align:center; padding:0 2cm;">
      Claude Code 完全指南 V2
    </div>`,
    footerTemplate: `<div style="font-size:7pt; color:#bbb; width:100%; text-align:center; padding:0 2cm;">
      第 <span class="pageNumber"></span> 页 / 共 <span class="totalPages"></span> 页
    </div>`,
    margin: { top: '2cm', bottom: '2cm', left: '1.8cm', right: '1.8cm' },
    tagged: true,
    outline: true,
  });

  await browser.close();

  const { size } = await import('fs').then(fs => fs.statSync(OUTPUT_PDF));
  console.log(`\nDone! PDF: ${OUTPUT_PDF}`);
  console.log(`Size: ${(size / 1024 / 1024).toFixed(1)} MB`);
}

generatePdf().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
