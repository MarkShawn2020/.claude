---
description: 超级压缩：压缩会话内容 + 自动提交 + 更新项目文件（项目感知）
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), Bash(git branch:*), Bash(git log:*), Bash(git diff:*), Edit, Write, Read, Glob
---

# SuperCompact - 超级压缩命令（项目感知版）

## 项目环境分析

### 当前状态
- Git状态: !`git status --porcelain`
- 当前分支: !`git branch --show-current`
- 最近3个提交: !`git log --oneline -3`
- 未提交的变更: !`git diff --stat`

### Git 历史分析
检测上次 SuperCompact 执行以来的变更历史：
- 上次执行记录: !`grep -r "SuperCompact" .supercompact_log CLAUDE.md 2>/dev/null | tail -1 || echo "首次执行"`
- 上次提交哈希: !`git log --grep="Generated with.*Claude Code" --oneline -1 | awk '{print $1}' || echo "未找到"`
- 期间提交历史: !`LAST_HASH=$(git log --grep="Generated with.*Claude Code" --oneline -1 | awk '{print $1}'); if [ -n "$LAST_HASH" ]; then git log --oneline $LAST_HASH..HEAD; else git log --oneline -5; fi`
- 期间文件变更: !`LAST_HASH=$(git log --grep="Generated with.*Claude Code" --oneline -1 | awk '{print $1}'); if [ -n "$LAST_HASH" ]; then git diff --name-status $LAST_HASH..HEAD; else echo "首次执行，显示最近变更"; git diff --name-status HEAD~3..HEAD 2>/dev/null || echo "无历史记录"; fi`

### 项目文档检测
自动检测当前项目中的关键文档文件，用于生成上下文感知的提交信息：
- README 文件: !`find . -maxdepth 2 -iname "readme*" -type f | head -3`
- PRD/需求文档: !`find . -maxdepth 3 -iname "*prd*" -o -iname "*requirement*" -o -iname "*spec*" | head -3`
- 项目配置: !`find . -maxdepth 2 -name "package.json" -o -name "pyproject.toml" -o -name "Cargo.toml" -o -name "pom.xml" | head -3`

## 执行任务

执行以下任务序列：

### 1. 历史感知的项目分析
在开始压缩前，先进行全面的项目和历史分析：

#### a) 上次执行状态检查
- 从 `.supercompact_log` 读取上次执行的时间和提交哈希
- 确定分析起点：如果是首次执行，分析最近5个提交；否则分析上次执行至今的所有变更

#### b) Git 历史理解
- 分析期间的提交信息，理解开发活动的性质（功能开发/bug修复/重构等）
- 统计变更文件的类型和数量
- 识别开发趋势和重点关注的模块
- 检测是否有重大架构变更或依赖更新

#### c) 项目文档分析  
- 读取 README 文件提取项目名称和描述
- 检查 PRD/需求文档了解项目目标
- 分析配置文件获取项目元信息
- 结合历史变更判断项目发展阶段

#### d) 智能决策生成
基于历史分析结果，为后续步骤提供上下文：
- 确定本次会话的主要工作类型（开发/调试/重构/文档等）
- 生成符合项目历史习惯的提交信息风格
- 优化 CLAUDE.md 更新策略

### 2. 压缩会话内容
执行标准的 `/compact` 操作来压缩当前会话历史，保留关键信息，并结合项目上下文优化压缩效果。

### 3. 更新项目管理文件

#### 更新/创建 CLAUDE.md
- 如果文件存在，在文件末尾添加SuperCompact执行记录
- 如果文件不存在，创建新文件并包含基本说明
- 根据项目文档自动调整内容格式

内容格式：
```markdown
## SuperCompact 记录

项目: [从README或package.json提取的项目名]
最后执行时间: [时间戳]
执行内容: 会话压缩 + 自动提交 + 项目文件更新
变更摘要: [基于git diff和项目上下文的智能摘要]
Git提交: [提交哈希] (如果适用)
```

#### 更新 .supercompact_log
创建或追加JSON格式的日志文件，记录详细的执行历史和分析结果：
```json
{
  "timestamp": "[ISO时间戳]",
  "project_name": "[项目名]",
  "branch": "[分支名]",
  "previous_execution": {
    "timestamp": "[上次执行时间]",
    "commit_hash": "[上次提交哈希]"
  },
  "period_analysis": {
    "commits_since_last": ["提交列表"],
    "files_changed_count": 数字,
    "change_categories": ["功能开发", "bug修复", "重构", "文档"],
    "major_modules_affected": ["模块列表"],
    "development_phase": "[初期开发/功能迭代/维护/重构]"
  },
  "current_execution": {
    "files_changed": ["本次变更文件列表"],
    "commit_hash": "[本次提交哈希]",
    "session_type": "[开发/调试/重构/文档]",
    "session_summary": "[基于历史的智能摘要]"
  }
}
```

### 4. 创建历史感知的智能提交
如果当前目录是Git仓库且有变更：
- 添加所有变更到暂存区 (`git add .`)
- 基于历史分析和项目上下文生成智能提交信息：

#### 提交信息模板（基于历史分析调整）：

**首次执行或无历史记录时：**
```
[项目名]: initial compact session at [时间戳]

Project: [项目名称]
Type: [项目类型]
Changes: [变更文件统计]

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**有历史记录时：**
```
[项目名]: [基于期间活动的智能描述] (compact)

Period: [上次执行时间] → [当前时间]
Development: [期间主要活动类型，如"功能开发集中期"、"bug修复阶段"等]
Commits since last: [数量] ([主要类型])
Key modules: [主要变更模块]
Current session: [本次会话类型]

Changes: [本次变更文件统计]

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

#### 智能描述生成规则：
- **功能开发期**：`feature development progress`
- **Bug修复期**：`bug fixes and stability improvements` 
- **重构期**：`code refactoring and optimization`
- **文档期**：`documentation and project setup`
- **混合期**：`development milestone` + 主要活动类型

## 执行要求

1. **有序执行**：严格按照上述1-2-3-4的顺序执行（项目分析→压缩→更新文件→智能提交）
2. **项目感知**：充分利用项目文档信息生成上下文相关的输出
3. **错误处理**：如果某一步失败，继续执行后续步骤，但记录失败原因
4. **状态反馈**：每完成一个步骤都要明确告知用户，包括项目信息
5. **智能总结**：结合项目上下文提供有意义的执行摘要

## 项目类型适配

### 前端项目 (package.json)
- 优先检查 package.json 的 name、description、scripts
- 查找 src/、components/、pages/ 等目录结构
- 关注 React/Vue/Angular 等框架特征

### 后端项目
- Python: 检查 pyproject.toml、requirements.txt、main.py
- Node.js: 检查 package.json、server.js、app.js
- Go: 检查 go.mod、main.go
- Rust: 检查 Cargo.toml、src/main.rs

### 文档项目
- 检查 docs/、README.md、mkdocs.yml 等
- 关注 .md 文件的组织结构

## 预期输出

执行完成后应输出历史感知的智能摘要：
```
🎉 SuperCompact 执行完成！

📋 项目信息:
   📁 项目名称: [从文档提取的项目名]
   🏷️  项目类型: [前端/后端/文档/其他]
   🌿 当前分支: [分支名]

📊 历史分析:
   ⏱️  上次执行: [时间] (或"首次执行")
   📈 期间提交: [数量]个提交
   🎯 主要活动: [功能开发/bug修复/重构/文档]
   📁 核心模块: [主要变更的模块/目录]
   🔄 开发阶段: [初期开发/功能迭代/维护/重构]

📊 执行摘要:
   ✅ 历史分析已完成
   ✅ 项目上下文已分析
   ✅ 会话内容已压缩（历史感知）
   ✅ Git提交已创建: [commit-hash] (如果适用)
   ✅ 项目文件已更新
   ⏰ 执行时间: [时间戳]
   
💡 智能洞察: [基于历史的项目发展趋势和建议]
```

## 开始执行

基于当前项目环境和文档，开始执行项目感知的SuperCompact流程...