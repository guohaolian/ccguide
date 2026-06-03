# Claude Code 完全指南 V2

> 全网最详细的 Claude Code 51 万行 TypeScript 源码解读
>
> 20 篇 · 187 节 · 100+ 架构图 · 60+ 表格 · 8 个实战 Lab · 50 题自测

## 在线阅读

**[点击这里在线阅读](https://bcefghj.github.io/claude-code-complete-guide_v2)**

## 下载 PDF

**[前往 Release 页面下载 PDF（带书签，~28MB）](https://github.com/bcefghj/claude-code-complete-guide_v2/releases/tag/v2.0.0)**

PDF 版本包含全部 20 篇 187 节内容，带有完整书签目录导航、页眉页脚页码、精美封面。

也可以本地生成：

```bash
npm install puppeteer-core
npm run docs:pdf
```

## 项目简介

2026年3月31日，Claude Code v2.1.88 的 **51.2 万行 TypeScript 源码** 意外泄露。本书基于这份完整源码和全网优质解读，打造一本**零基础也能看懂**的全面学习指南。

Claude Code 不是一个简单的 CLI 工具 —— 它是一个以 LLM 为内核的操作系统。本书带你从底层理解这个系统的每一个模块。

## V2 vs V1

| 对比项 | V1 | V2 |
|--------|----|----|
| 篇章 | 12 篇 114 节 | **20 篇 187 节** |
| 文档框架 | Docsify | **VitePress**（暗色模式、全文搜索、移动适配） |
| 新增内容 | — | 提示词工程、记忆系统、隐藏功能、Hooks 生态、Token 经济学、8 个实战 Lab |
| 图表 | ~30 个 | **100+ Mermaid 图 + 60+ 数据表格** |
| 输出格式 | 网页 | **网页 + PDF + HTML 离线包** |
| 自测 | 无 | **50 题三级自测** |

## 内容架构

```
前言    — 导读、路线图、术语表、环境搭建
第1篇  — 背景故事：泄露事件始末、源码规模、社区重建
第2篇  — 小白快速上手：安装、首次对话、命令速查、省钱技巧
第3篇  — 架构全景：LLM 内核操作系统、四入口、目录结构
第4篇  — 核心循环：QueryEngine 8 步引擎（全书最重要）
第5篇  — 提示词工程：动态拼装、缓存经济学、铁血约束
第6篇  — 工具系统：42 个工具、14 步治理流水线
第7篇  — 权限与安全：六种模式、七步评估管道、沙箱
第8篇  — 上下文管理：三层压缩、永不超限
第9篇  — 记忆系统：CLAUDE.md、KAIROS 做梦机制
第10篇 — 多 Agent 系统：蜂群、Verification Agent
第11篇 — 终端 UI：自研 React/Ink 渲染器
第12篇 — Bridge 桥接：CLI 与 IDE 双向通信
第13篇 — 状态管理：createStore、持久化
第14篇 — 服务与集成：MCP、LSP、OAuth
第15篇 — 隐藏功能：Undercover Mode、Buddy Pet
第16篇 — Hooks、Skills、Plugins 生态
第17篇 — 性能与成本：Token 经济学
第18篇 — 遥测与生命周期管理
第19篇 — 实战 Lab：从零构建简化版 Agent
第20篇 — 总结与展望：AI Agent 的壁垒
附录    — 源码索引、速查表、50 题自测、推荐阅读
```

## 学习路径

| 路径 | 适合人群 | 篇章 | 预计时长 |
|------|---------|------|---------|
| 小白入门 | 编程初学者 | 前言 + 第 1-5 篇 | 8-12 小时 |
| 开发者进阶 | 有编程经验 | 第 3-10 篇 + Lab | 15-20 小时 |
| 架构师深入 | 资深工程师 | 全部 20 篇 | 30-40 小时 |

## 本地运行

```bash
git clone https://github.com/bcefghj/claude-code-complete-guide_v2.git
cd claude-code-complete-guide_v2
npm install
npm run docs:dev
# 浏览器访问 http://localhost:5173
```

## 构建与部署

```bash
# 构建静态站点
npm run docs:build

# 本地预览构建结果
npm run docs:preview
```

## 相关项目

| 项目 | 说明 |
|------|------|
| [Claude-Code-Source](https://github.com/bcefghj/Claude-Code-Source) | v2.1.88 完整 TypeScript 源码 |
| [Claude-Code-Source-Analysis](https://github.com/bcefghj/Claude-Code-Source-Analysis) | 全网源码解读资料收集 |
| [claude-code-complete-guide](https://github.com/bcefghj/claude-code-complete-guide) | V1 版本（12 篇 114 节） |

## 参考资源

- [Anthropic Claude Code 官方](https://github.com/anthropics/claude-code)
- [sanbuphy/claude-code-source-code](https://github.com/sanbuphy/claude-code-source-code) — 10.9K stars 深度分析
- [claude-code-ultimate-guide](https://github.com/FlorianBruniaux/claude-code-ultimate-guide) — 2.6K stars 全面指南
- [claude-howto](https://github.com/luongnv89/claude-howto) — 16K stars 周末精通

## 声明

本项目仅用于教育学习目的。Claude Code 源码版权归 Anthropic, PBC 所有。

## License

MIT
