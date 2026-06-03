import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'Claude Code 完全指南 V2',
    description: '全网最详细的 Claude Code 51万行源码解读',
    lang: 'zh-CN',
    base: '/claude-code-complete-guide_v2/',
    lastUpdated: true,

    markdown: {
      languageAlias: {
        gitignore: 'shellscript',
        logql: 'sql',
        promql: 'sql',
      },
    },

    head: [
      ['meta', { name: 'author', content: 'bcefghj' }],
      ['meta', { name: 'keywords', content: 'Claude Code, 源码解读, TypeScript, AI Agent, Anthropic' }],
    ],

    themeConfig: {
      logo: '/images/logo.svg',
      nav: [
        { text: '首页', link: '/' },
        { text: '开始阅读', link: '/part00-preface/' },
        {
          text: '快速导航',
          items: [
            { text: '背景故事', link: '/part01-background/' },
            { text: '小白快速上手', link: '/part02-quickstart/' },
            { text: '架构全景', link: '/part03-architecture/' },
            { text: '核心循环', link: '/part04-queryengine/' },
            { text: '提示词工程', link: '/part05-prompt-engineering/' },
            { text: '工具系统', link: '/part06-tool-system/' },
            { text: '权限与安全', link: '/part07-permissions/' },
            { text: '多Agent系统', link: '/part10-multi-agent/' },
            { text: '隐藏功能', link: '/part15-hidden-features/' },
            { text: '实战Lab', link: '/part19-labs/' },
          ]
        },
        { text: '下载PDF', link: '/download' },
        {
          text: '相关项目',
          items: [
            { text: 'V1 版本', link: 'https://github.com/bcefghj/claude-code-complete-guide' },
            { text: '源码仓库', link: 'https://github.com/bcefghj/Claude-Code-Source' },
            { text: '解读收集', link: 'https://github.com/bcefghj/Claude-Code-Source-Analysis' },
          ]
        }
      ],

      sidebar: {
        '/': [
          {
            text: '前言',
            collapsed: false,
            items: [
              { text: '关于本书', link: '/part00-preface/' },
              { text: '学习路线图', link: '/part00-preface/roadmap' },
              { text: '术语表', link: '/part00-preface/glossary' },
              { text: '环境搭建', link: '/part00-preface/setup' },
            ]
          },
          {
            text: '第1篇：背景故事',
            collapsed: true,
            items: [
              { text: '1.1 泄露事件始末', link: '/part01-background/' },
              { text: '1.2 源码规模全貌', link: '/part01-background/02-source-overview' },
              { text: '1.3 社区反应与重建', link: '/part01-background/03-community' },
              { text: '1.4 为什么值得学', link: '/part01-background/04-why-learn' },
              { text: '1.5 法律与伦理', link: '/part01-background/05-legal-ethics' },
            ]
          },
          {
            text: '第2篇：小白快速上手',
            collapsed: true,
            items: [
              { text: '2.1 什么是AI编程助手', link: '/part02-quickstart/' },
              { text: '2.2 安装全流程', link: '/part02-quickstart/02-installation' },
              { text: '2.3 第一次对话', link: '/part02-quickstart/03-first-chat' },
              { text: '2.4 编辑文件实操', link: '/part02-quickstart/04-edit-files' },
              { text: '2.5 运行命令实操', link: '/part02-quickstart/05-run-commands' },
              { text: '2.6 Git工作流', link: '/part02-quickstart/06-git-workflow' },
              { text: '2.7 命令速查表', link: '/part02-quickstart/07-cheatsheet' },
              { text: '2.8 费用与省钱技巧', link: '/part02-quickstart/08-cost-tips' },
            ]
          },
          {
            text: '第3篇：架构全景',
            collapsed: true,
            items: [
              { text: '3.1 不是CLI是操作系统', link: '/part03-architecture/' },
              { text: '3.2 四个独立入口', link: '/part03-architecture/02-four-entries' },
              { text: '3.3 目录结构全景', link: '/part03-architecture/03-directory-structure' },
              { text: '3.4 数据流全景图', link: '/part03-architecture/04-data-flow' },
              { text: '3.5 技术栈深度解析', link: '/part03-architecture/05-tech-stack' },
              { text: '3.6 架构对比', link: '/part03-architecture/06-comparison' },
              { text: '3.7 启动流程详解', link: '/part03-architecture/07-startup' },
              { text: '3.8 main.tsx入口分析', link: '/part03-architecture/08-main-entry' },
              { text: '3.9 模块依赖关系', link: '/part03-architecture/09-dependencies' },
              { text: '3.10 设计哲学总结', link: '/part03-architecture/10-philosophy' },
            ]
          },
          {
            text: '第4篇：核心循环',
            collapsed: true,
            items: [
              { text: '4.1 QueryEngine是什么', link: '/part04-queryengine/' },
              { text: '4.2 8步循环流程图', link: '/part04-queryengine/02-eight-steps' },
              { text: '4.3 query.ts逐段解析', link: '/part04-queryengine/03-source-walkthrough' },
              { text: '4.4 消息准备与历史', link: '/part04-queryengine/04-message-preparation' },
              { text: '4.5 API调用与流式响应', link: '/part04-queryengine/05-api-streaming' },
              { text: '4.6 工具请求收集', link: '/part04-queryengine/06-tool-collection' },
              { text: '4.7 静默错误修复', link: '/part04-queryengine/07-silent-error-handling' },
              { text: '4.8 预算三重关卡', link: '/part04-queryengine/08-budget-checks' },
              { text: '4.9 循环终止条件', link: '/part04-queryengine/09-termination' },
              { text: '4.10 Thinking模式', link: '/part04-queryengine/10-thinking-mode' },
              { text: '4.11 并行工具执行器', link: '/part04-queryengine/11-parallel-executor' },
              { text: '4.12 协作全景图', link: '/part04-queryengine/12-ecosystem' },
            ]
          },
          {
            text: '第5篇：提示词工程',
            collapsed: true,
            items: [
              { text: '5.1 动态拼装机制', link: '/part05-prompt-engineering/' },
              { text: '5.2 静态部分：系统宪法', link: '/part05-prompt-engineering/02-static-constitution' },
              { text: '5.3 动态部分：当期政策', link: '/part05-prompt-engineering/03-dynamic-policy' },
              { text: '5.4 缓存边界设计', link: '/part05-prompt-engineering/04-cache-boundary' },
              { text: '5.5 Token缓存经济学', link: '/part05-prompt-engineering/05-token-economics' },
              { text: '5.6 缓存失效7大陷阱', link: '/part05-prompt-engineering/06-cache-pitfalls' },
              { text: '5.7 铁血行为约束', link: '/part05-prompt-engineering/07-behavior-constraints' },
              { text: '5.8 工具使用手册', link: '/part05-prompt-engineering/08-tool-manuals' },
              { text: '5.9 策略对比', link: '/part05-prompt-engineering/09-comparison' },
              { text: '5.10 实践设计提示词', link: '/part05-prompt-engineering/10-practice' },
            ]
          },
          {
            text: '第6篇：工具系统',
            collapsed: true,
            items: [
              { text: '6.1 42个工具全景', link: '/part06-tool-system/' },
              { text: '6.2 Tool接口设计', link: '/part06-tool-system/02-tool-interface' },
              { text: '6.3 14步治理流水线', link: '/part06-tool-system/03-governance-pipeline' },
              { text: '6.4 BashTool深度解析', link: '/part06-tool-system/04-bash-tool' },
              { text: '6.5 文件操作工具', link: '/part06-tool-system/05-file-tools' },
              { text: '6.6 搜索工具族', link: '/part06-tool-system/06-search-tools' },
              { text: '6.7 AgentTool子代理', link: '/part06-tool-system/07-agent-tool' },
              { text: '6.8 外部工具', link: '/part06-tool-system/08-external-tools' },
              { text: '6.9 MCP工具集成', link: '/part06-tool-system/09-mcp-tools' },
              { text: '6.10 Fail-closed设计', link: '/part06-tool-system/10-fail-closed' },
              { text: '6.11 延迟加载', link: '/part06-tool-system/11-lazy-loading' },
              { text: '6.12 实践构建工具', link: '/part06-tool-system/12-practice' },
            ]
          },
          {
            text: '第7篇：权限与安全',
            collapsed: true,
            items: [
              { text: '7.1 为什么需要权限', link: '/part07-permissions/' },
              { text: '7.2 六种模式对比', link: '/part07-permissions/02-six-modes' },
              { text: '7.3 Default/acceptEdits/Plan', link: '/part07-permissions/03-basic-modes' },
              { text: '7.4 Auto模式分类器', link: '/part07-permissions/04-auto-mode' },
              { text: '7.5 dontAsk/bypass模式', link: '/part07-permissions/05-advanced-modes' },
              { text: '7.6 七步评估管道', link: '/part07-permissions/06-evaluation-pipeline' },
              { text: '7.7 BashTool AST分析', link: '/part07-permissions/07-bash-ast' },
              { text: '7.8 沙箱执行', link: '/part07-permissions/08-sandbox' },
              { text: '7.9 Fail-closed哲学', link: '/part07-permissions/09-fail-closed' },
              { text: '7.10 实践配置权限', link: '/part07-permissions/10-practice' },
            ]
          },
          {
            text: '第8篇：上下文管理',
            collapsed: true,
            items: [
              { text: '8.1 200K Token预算', link: '/part08-context-management/' },
              { text: '8.2 三层压缩全景', link: '/part08-context-management/02-three-tiers' },
              { text: '8.3 微压缩', link: '/part08-context-management/03-micro-compaction' },
              { text: '8.4 自动压缩', link: '/part08-context-management/04-auto-compaction' },
              { text: '8.5 完全压缩', link: '/part08-context-management/05-full-compaction' },
              { text: '8.6 缓存感知压缩', link: '/part08-context-management/06-cache-aware' },
              { text: '8.7 API层compaction', link: '/part08-context-management/07-api-compaction' },
              { text: '8.8 手动压缩命令', link: '/part08-context-management/08-manual-compact' },
              { text: '8.9 成本分析', link: '/part08-context-management/09-cost-analysis' },
              { text: '8.10 最佳实践', link: '/part08-context-management/10-best-practices' },
            ]
          },
          {
            text: '第9篇：记忆系统',
            collapsed: true,
            items: [
              { text: '9.1 三层记忆架构', link: '/part09-memory-system/' },
              { text: '9.2 CLAUDE.md层级', link: '/part09-memory-system/02-claude-md' },
              { text: '9.3 自动记忆提取', link: '/part09-memory-system/03-auto-extraction' },
              { text: '9.4 双模型检索', link: '/part09-memory-system/04-dual-model-retrieval' },
              { text: '9.5 精确度优先策略', link: '/part09-memory-system/05-precision-first' },
              { text: '9.6 KAIROS做梦机制', link: '/part09-memory-system/06-kairos-dreaming' },
              { text: '9.7 /dream蒸馏', link: '/part09-memory-system/07-dream-distillation' },
              { text: '9.8 记忆与上下文', link: '/part09-memory-system/08-memory-context' },
              { text: '9.9 跨会话持久化', link: '/part09-memory-system/09-persistence' },
              { text: '9.10 优化CLAUDE.md', link: '/part09-memory-system/10-practice' },
            ]
          },
          {
            text: '第10篇：多Agent系统',
            collapsed: true,
            items: [
              { text: '10.1 蜂群作战', link: '/part10-multi-agent/' },
              { text: '10.2 六个Agent角色', link: '/part10-multi-agent/02-six-agents' },
              { text: '10.3 Explore探索专家', link: '/part10-multi-agent/03-explore-agent' },
              { text: '10.4 Plan规划专家', link: '/part10-multi-agent/04-plan-agent' },
              { text: '10.5 Coordinator协调器', link: '/part10-multi-agent/05-coordinator' },
              { text: '10.6 反偷懒机制', link: '/part10-multi-agent/06-anti-lazy' },
              { text: '10.7 Verification验证专家', link: '/part10-multi-agent/07-verification-agent' },
              { text: '10.8 缓存优化技巧', link: '/part10-multi-agent/08-cache-optimization' },
              { text: '10.9 防无限递归', link: '/part10-multi-agent/09-anti-recursion' },
              { text: '10.10 消息路由', link: '/part10-multi-agent/10-message-routing' },
              { text: '10.11 Swarm vs Coordinator', link: '/part10-multi-agent/11-swarm-vs-coordinator' },
              { text: '10.12 实践设计工作流', link: '/part10-multi-agent/12-practice' },
            ]
          },
          {
            text: '第11篇：终端UI',
            collapsed: true,
            items: [
              { text: '11.1 自研渲染器', link: '/part11-terminal-ui/' },
              { text: '11.2 Yoga布局引擎', link: '/part11-terminal-ui/02-yoga-layout' },
              { text: '11.3 React Fiber', link: '/part11-terminal-ui/03-react-fiber' },
              { text: '11.4 流式渲染', link: '/part11-terminal-ui/04-streaming-render' },
              { text: '11.5 高级输入处理', link: '/part11-terminal-ui/05-input-handling' },
              { text: '11.6 虚拟滚动', link: '/part11-terminal-ui/06-virtual-scroll' },
              { text: '11.7 Vim模式', link: '/part11-terminal-ui/07-vim-mode' },
              { text: '11.8 Diff展示', link: '/part11-terminal-ui/08-diff-display' },
              { text: '11.9 鼠标与超链接', link: '/part11-terminal-ui/09-mouse-hyperlinks' },
              { text: '11.10 设计系统', link: '/part11-terminal-ui/10-design-system' },
            ]
          },
          {
            text: '第12篇：Bridge桥接',
            collapsed: true,
            items: [
              { text: '12.1 CLI与IDE通道', link: '/part12-bridge/' },
              { text: '12.2 跨进程通信', link: '/part12-bridge/02-ipc' },
              { text: '12.3 bridgeMain主循环', link: '/part12-bridge/03-bridge-main' },
              { text: '12.4 消息协议', link: '/part12-bridge/04-protocol' },
              { text: '12.5 JWT认证', link: '/part12-bridge/05-jwt-auth' },
              { text: '12.6 会话管理', link: '/part12-bridge/06-session-runner' },
              { text: '12.7 传输层抽象', link: '/part12-bridge/07-transport' },
              { text: '12.8 IDE集成实践', link: '/part12-bridge/08-ide-integration' },
              { text: '12.9 BoundedUUIDSet', link: '/part12-bridge/09-bounded-uuid-set' },
              { text: '12.10 架构总结', link: '/part12-bridge/10-summary' },
            ]
          },
          {
            text: '第13篇：状态管理',
            collapsed: true,
            items: [
              { text: '13.1 createStore', link: '/part13-state-management/' },
              { text: '13.2 AppState组织', link: '/part13-state-management/02-app-state' },
              { text: '13.3 副作用同步', link: '/part13-state-management/03-side-effects' },
              { text: '13.4 Memdir记忆', link: '/part13-state-management/04-memdir' },
              { text: '13.5 会话历史', link: '/part13-state-management/05-history' },
              { text: '13.6 版本迁移', link: '/part13-state-management/06-migrations' },
              { text: '13.7 持久化策略', link: '/part13-state-management/07-persistence' },
              { text: '13.8 架构全景', link: '/part13-state-management/08-overview' },
            ]
          },
          {
            text: '第14篇：服务与集成',
            collapsed: true,
            items: [
              { text: '14.1 API客户端', link: '/part14-services/' },
              { text: '14.2 错误与降级', link: '/part14-services/02-error-handling' },
              { text: '14.3 MCP协议', link: '/part14-services/03-mcp-protocol' },
              { text: '14.4 MCP传输与发现', link: '/part14-services/04-mcp-transport' },
              { text: '14.5 LSP集成', link: '/part14-services/05-lsp' },
              { text: '14.6 OAuth 2.0+PKCE', link: '/part14-services/06-oauth' },
              { text: '14.7 特性标志与遥测', link: '/part14-services/07-feature-flags' },
              { text: '14.8 服务层总结', link: '/part14-services/08-summary' },
            ]
          },
          {
            text: '第15篇：隐藏功能',
            collapsed: true,
            items: [
              { text: '15.1 90+ Feature Flags', link: '/part15-hidden-features/' },
              { text: '15.2 Undercover Mode', link: '/part15-hidden-features/02-undercover-mode' },
              { text: '15.3 Buddy Pet宠物', link: '/part15-hidden-features/03-buddy-pet' },
              { text: '15.4 反作弊机制', link: '/part15-hidden-features/04-anti-cheat' },
              { text: '15.5 Deep Planning', link: '/part15-hidden-features/05-deep-planning' },
              { text: '15.6 内部员工彩蛋', link: '/part15-hidden-features/06-internal-easter-eggs' },
            ]
          },
          {
            text: '第16篇：Hooks/Skills/Plugins',
            collapsed: true,
            items: [
              { text: '16.1 Hooks事件系统', link: '/part16-hooks-skills-plugins/' },
              { text: '16.2 PreToolUse拦截', link: '/part16-hooks-skills-plugins/02-pre-tool-use' },
              { text: '16.3 Skills工作流', link: '/part16-hooks-skills-plugins/03-skills' },
              { text: '16.4 Plugins插件', link: '/part16-hooks-skills-plugins/04-plugins' },
              { text: '16.5 MCP指令注入', link: '/part16-hooks-skills-plugins/05-mcp-injection' },
              { text: '16.6 自定义命令', link: '/part16-hooks-skills-plugins/06-custom-commands' },
              { text: '16.7 延迟加载', link: '/part16-hooks-skills-plugins/07-defer-loading' },
              { text: '16.8 实践构建生态', link: '/part16-hooks-skills-plugins/08-practice' },
            ]
          },
          {
            text: '第17篇：性能与成本',
            collapsed: true,
            items: [
              { text: '17.1 Token经济学', link: '/part17-performance-cost/' },
              { text: '17.2 Prompt缓存策略', link: '/part17-performance-cost/02-prompt-caching' },
              { text: '17.3 并行预取', link: '/part17-performance-cost/03-parallel-prefetch' },
              { text: '17.4 懒加载优化', link: '/part17-performance-cost/04-lazy-loading' },
              { text: '17.5 子Agent缓存', link: '/part17-performance-cost/05-sub-agent-cache' },
              { text: '17.6 渲染性能', link: '/part17-performance-cost/06-render-performance' },
              { text: '17.7 流式管道', link: '/part17-performance-cost/07-streaming-pipeline' },
              { text: '17.8 省钱速查表', link: '/part17-performance-cost/08-cost-cheatsheet' },
            ]
          },
          {
            text: '第18篇：遥测与生命周期',
            collapsed: true,
            items: [
              { text: '18.1 进程状态调度', link: '/part18-telemetry-lifecycle/' },
              { text: '18.2 Perfetto追踪', link: '/part18-telemetry-lifecycle/02-perfetto' },
              { text: '18.3 遥测日志', link: '/part18-telemetry-lifecycle/03-telemetry' },
              { text: '18.4 资源清理', link: '/part18-telemetry-lifecycle/04-resource-cleanup' },
              { text: '18.5 错误恢复', link: '/part18-telemetry-lifecycle/05-error-recovery' },
              { text: '18.6 生产最佳实践', link: '/part18-telemetry-lifecycle/06-best-practices' },
            ]
          },
          {
            text: '第19篇：实战Lab',
            collapsed: true,
            items: [
              { text: 'Lab 1: 最简Agent Loop', link: '/part19-labs/' },
              { text: 'Lab 2: 工具注册执行', link: '/part19-labs/02-tool-registry' },
              { text: 'Lab 3: 权限控制', link: '/part19-labs/03-permissions' },
              { text: 'Lab 4: 流式响应', link: '/part19-labs/04-streaming' },
              { text: 'Lab 5: MCP服务器', link: '/part19-labs/05-mcp-server' },
              { text: 'Lab 6: 多Agent协调', link: '/part19-labs/06-multi-agent' },
              { text: 'Lab 7: 上下文压缩', link: '/part19-labs/07-context-compaction' },
              { text: 'Lab 8: 完整整合', link: '/part19-labs/08-full-integration' },
            ]
          },
          {
            text: '第20篇：总结与展望',
            collapsed: true,
            items: [
              { text: '20.1 壁垒在哪里', link: '/part20-summary/' },
              { text: '20.2 深度对比', link: '/part20-summary/02-comparison' },
              { text: '20.3 未来趋势', link: '/part20-summary/03-future' },
              { text: '20.4 开发者启示', link: '/part20-summary/04-insights' },
              { text: '20.5 学习路径', link: '/part20-summary/05-learning-path' },
              { text: '20.6 结语', link: '/part20-summary/06-conclusion' },
            ]
          },
          {
            text: '附录',
            collapsed: true,
            items: [
              { text: '源码文件索引', link: '/appendix/source-index' },
              { text: '命令速查表', link: '/appendix/cheatsheet' },
              { text: '自测题', link: '/appendix/quiz' },
              { text: '推荐阅读', link: '/appendix/further-reading' },
              { text: '中英术语对照', link: '/appendix/glossary-en-zh' },
            ]
          },
        ]
      },

      outline: {
        level: [2, 3],
        label: '本页目录'
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/bcefghj/claude-code-complete-guide_v2' }
      ],

      editLink: {
        pattern: 'https://github.com/bcefghj/claude-code-complete-guide_v2/edit/main/docs/:path',
        text: '在 GitHub 上编辑此页'
      },

      lastUpdated: {
        text: '最后更新于'
      },

      footer: {
        message: '本项目仅用于教育学习目的。Claude Code 源码版权归 Anthropic, PBC 所有。',
        copyright: 'MIT License | Made with VitePress'
      },

      search: {
        provider: 'local',
        options: {
          translations: {
            button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
            modal: {
              noResultsText: '没有找到结果',
              resetButtonTitle: '清除搜索',
              footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
            }
          }
        }
      },

      docFooter: {
        prev: '上一篇',
        next: '下一篇'
      },

      darkModeSwitchLabel: '深色模式',
      sidebarMenuLabel: '菜单',
      returnToTopLabel: '回到顶部',
    },

    mermaid: {},
    mermaidPlugin: {
      class: 'mermaid',
    },
  })
)
