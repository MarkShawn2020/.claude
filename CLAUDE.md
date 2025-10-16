# 手工川高质量代码开发通用框架 V0.8.0

本框架定义了所有项目应遵循的核心准则。具体技术栈的实现应在此框架下进行。

### I. 核心原则 (Core Principles)

- **单一职责 (SRP)**: 每个单元（函数、类、模块）只负责单一、明确的职责。
- **避免重复 (DRY)**: 抽象并复用通用逻辑，禁止复制代码。
- **保持简单 (KISS)**: 优先采用最简单、清晰的方案，避免过度工程化。

### II. 通用编码规范 (General Coding Standards)

- **配置 (Configuration)**: 禁止硬编码。配置项（密钥、URL）必须来自环境变量或配置文件。
- **异常 (Exceptions)**: 精准处理，禁止静默忽略。异常必须被记录或向上层抛出。
- **异步 (Asynchronicity)**: 必须使用现代异步模式（如 `async/await`），禁止手动延时。
- **测试 (Testing)**: 必须为核心逻辑和边界情况编写有意义的、可维护的测试。
- **文档 (Documentation)**: 必须为公共 API 和复杂逻辑编写清晰的文档（如 JSDoc, Docstrings）。
- **根源解决 (Root Cause)**: 禁止使用临时方案 (Workarounds)；必须分析并解决问题的根本原因。

### III. 技术栈规范 (Technology Stack Guidelines)

#### TypeScript (TS)
- **TS | 严格模式**: `tsconfig.json` 必须启用 `strict: true`。
- **TS | 类型安全**: 严禁使用 `any`；必须优先使用 `unknown` 进行类型收窄。
- **TS | 不可变性**: 优先使用 `readonly` 关键字来创建不可变数据，以减少副作用。

#### Python (Py)
- **Py | 代码风格**: 必须使用 `black` 和 `isort` 自动格式化所有代码。
- **Py | 类型检查**: 新代码必须全面使用类型提示，并通过 `mypy` 静态检查。
- **Py | 日志**: 应用代码必须使用 `logging` 模块，严禁使用 `print()` 函数。

#### macOS 扩展 (macOS Extensions)
- **macOS | 正确的技术栈**: **必须**使用原生的 **Finder Sync Extension** 框架，严禁使用 Automator 或 Shell 脚本作为右键菜单的实现方式。
- **macOS | 极致响应**: 任何 I/O 或耗时操作**必须**在后台线程执行（如 `DispatchQueue.global().async`），确保 UI 主线程绝不被阻塞。
- **macOS | 上下文感知**: 扩展**必须**在显示前验证上下文（如文件类型、数量、位置），仅在相关时才显示菜单项。
- **macOS | 资源节制**: 扩展**必须**轻量，严格控制内存和 CPU 占用，避免影响宿主应用（如 Finder）的性能。
- **macOS | 安全沙箱**: **必须**严格遵守 App Sandboxing 规则，仅在 `Info.plist` 中请求完成功能所必需的最小权限。

### IV. 项目工作流 (Project Workflow)

- **版本控制 (VCS)**: Git 提交信息必须遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范。
- **依赖管理 (Dependencies)**: 必须使用指定的包管理器并提交锁文件（TS: `pnpm`, Py: `uv`）。
- **自动化 (Automation)**: 必须通过 Git Hooks (如 Husky) 在代码提交前自动执行代码检查、格式化和测试。
- **安全 (Security)**: 严禁在代码库中存储任何敏感信息；必须定期扫描依赖漏洞。

### 回复遵循
- 如果修改了用户的代码，则在任务完成之后，额外给出一份 git semantic commit 的建议（尽可能简短准确）
