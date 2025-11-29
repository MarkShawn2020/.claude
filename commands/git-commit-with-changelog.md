---
allowed-tools: [Bash, Read, Write, Edit, Grep, Glob]
description: Commit with user-focused CHANGELOG management
version: "3.0.0"
author: "公众号：手工川"
---

# Git Commit with CHANGELOG Management

You are managing git commits with user-focused CHANGELOG:
- **Auto commit**: Automatically commit without confirmation (most commits are acceptable)
- **Default language**: Chinese (中文) for commit messages
- **Conventional Commit style**: Use conventional commit format (type(scope): description)
- **User context integration**: Accept and incorporate user-provided additional context
- **CHANGELOG for end users**: Concise, high-level summaries for software users (not developers)
- **Streamlined release**: When user confirms CHANGELOG update, auto-update, amend commit, and create tag
- **Tag-based versions**: CHANGELOG only tracks git-tagged versions (real releases)

## Configuration Settings

    default_language: "zh-CN"
    commit_style: "conventional"
    types:
      - feat: 新功能
      - fix: 修复bug
      - docs: 文档更新
      - style: 代码格式调整
      - refactor: 重构
      - perf: 性能优化
      - test: 测试相关
      - build: 构建系统
      - ci: CI/CD配置
      - chore: 其他更改
      - revert: 回滚提交

## CHANGELOG Philosophy

**Target audience**: Software users (not developers)
**Content goal**: What changed for users, not how it was implemented
**Style**: Concise, high-level, abstract statements (2-5 lines per version)

**Good example:**
```
## [1.2.0] - 2025-11-23
- 新增暗色模式支持
- 提升大文件处理性能
- 修复启动时偶发崩溃问题
```

**Bad example (too detailed, developer-focused):**
```
## [1.2.0] - 2025-11-23
### Added
- feat(ui): add dark mode toggle component
- feat(ui): implement dark theme CSS variables
- feat(settings): add theme preference storage
### Fixed
- fix(startup): handle null pointer in config loader
- fix(startup): add try-catch for missing files
```

## Workflow

### Phase 1: Auto Commit (No Confirmation Needed)

1. **Analyze current changes**:
   - Run `git status` to check for uncommitted changes
   - Run `git diff --cached` to see staged changes
   - Run `git diff` to see unstaged changes
   - Identify the main type of changes and affected scope
   - If no changes, skip to Phase 2 (CHANGELOG validation only)

2. **Parse user input**:
   - Check if user provided additional context or specific requirements
   - Extract any specific commit type or scope preferences
   - Consider any attention points mentioned by the user

3. **Generate commit message**:
   - Use conventional commit format: type(scope): description
   - Write description in Chinese by default
   - Incorporate user's additional context if provided
   - Keep the subject line under 50 characters
   - Add detailed body if needed (wrapped at 72 characters)

4. **Stage and commit automatically** (NO confirmation):
   - Stage user's code changes only (exclude CHANGELOG.md)
   - Create the commit immediately - no user confirmation needed
   - Show the commit result to the user
   - **Commit is now complete** - proceed to ask about CHANGELOG

### Phase 2: CHANGELOG & Release (After Commit)

5. **Ask user about CHANGELOG update**:
   - After successful commit, ask: "是否需要更新 CHANGELOG 并发布新版本？"
   - Options:
     - **No** (default): Skip CHANGELOG, workflow ends
     - **Yes**: Proceed to release flow
   - If user says no, workflow ends here

6. **If CHANGELOG update confirmed** (auto release flow):
   - Ask user for version number (e.g., v1.2.0)
   - Ask user for concise, user-focused description (2-5 lines)
   - Check if CHANGELOG.md exists, create if missing
   - Add new version section to CHANGELOG
   - **Auto amend commit** to include CHANGELOG: `git add CHANGELOG.md && git commit --amend --no-edit`
   - **Auto create tag**: `git tag <version>`
   - Show summary: amended commit hash, version tag created

7. **Validate CHANGELOG against git tags** (if missing versions):
   - Get all git tags with `git tag -l --sort=-version:refname`
   - Filter semver tags (v1.2.3 or 1.2.3 format)
   - Parse existing CHANGELOG.md version entries
   - Compare git tags vs CHANGELOG versions
   - If missing versions found, ask user for summaries

## Example Usage

When the user runs `/git-commit-with-changelog`, you should:

**Scenario 1: Normal development commit (most common)**
1. Check git status - uncommitted changes found
2. Generate conventional commit message
3. **Auto commit** - no confirmation needed
4. Ask: "是否需要更新 CHANGELOG 并发布新版本？"
5. User says no (default)
6. Workflow ends - commit complete

**Scenario 2: Commit with release**
1. Check git status - uncommitted changes found
2. Generate conventional commit message
3. **Auto commit** - no confirmation needed
4. Ask: "是否需要更新 CHANGELOG 并发布新版本？"
5. User says yes
6. Ask for version (e.g., v1.2.0) and description
7. Update CHANGELOG
8. **Auto amend commit** to include CHANGELOG
9. **Auto create tag** (v1.2.0)
10. Done - show summary with commit hash and tag

## CHANGELOG Format

**Simplified format for end users** (not traditional Keep a Changelog):

    # Changelog

    ## [Unreleased]
    - (optional, manually added items only)

    ## [1.2.0] - 2025-11-23
    - 新增暗色模式支持
    - 提升大文件处理性能
    - 修复启动时偶发崩溃问题

    ## [1.1.0] - 2025-11-22
    - 新增 OAuth 登录支持
    - 改进仪表盘界面
    - 修复 API 超时问题

    ## [1.0.0] - 2025-11-20
    - 初始版本发布

**Key principles**:
- Simple bullet points (no Added/Fixed/Changed subsections)
- User-facing language (not developer jargon)
- 2-5 concise lines per version
- Focus on what matters to users

## Important Notes

- **AUTO COMMIT**: Commit automatically without confirmation - most commits are acceptable
- **CHANGELOG is optional**: Most commits don't need CHANGELOG updates
- **CHANGELOG is for users, not developers**: High-level summaries, not commit logs
- **Manual curation required**: Ask user to provide summaries, don't auto-generate from commits
- **CHANGELOG reflects releases**: Only git-tagged versions appear as versioned sections
- **Streamlined release**: When user confirms, auto-update CHANGELOG, amend commit, and create tag
- Always analyze the TARGET directory where the command is run
- Do NOT assume anything about the current directory structure
- Support both staged and unstaged changes
- Allow user to override language or commit style if specified
- Ensure commit messages are meaningful and descriptive
- **Concise entries**: 2-5 lines per version maximum
- **User-facing language**: "新增暗色模式" not "feat(ui): add dark mode toggle"
- Use `git tag -l --sort=-version:refname` to find latest semver tags
- Strip "v" prefix from git tags when parsing version (v1.2.3 → 1.2.3)
- **Show commits as reference only**: When asking user to write summary for missing versions
- **Amend for CHANGELOG**: Use `git commit --amend --no-edit` to include CHANGELOG in same commit

## User Input Parameters

The user can provide additional context in several ways:
- Direct description: Additional text after `/git-commit-with-changelog`
- Type override: Specify a different commit type
- Language override: Request English or other language
- Scope specification: Define a specific scope for the commit

## Command Behavior

This command will:
1. **AUTO COMMIT**: Commit automatically without asking for confirmation
2. **Ask about release after commit**: "是否需要更新 CHANGELOG 并发布新版本？"
3. **Most commits**: Just auto-commit, skip CHANGELOG (default)
4. **If release requested**: Auto-update CHANGELOG, amend commit, create tag

## Version Workflow

**Development flow:**
```
Day 1-10: Normal development
- Run command → auto commit → "发布新版本?" → No → Done
- Fast and simple for daily work

Day 11: Ready to release
- Run command → auto commit → "发布新版本?" → Yes
- Provide version: "v1.2.0"
- Provide summary: "新增暗色模式\n提升性能\n修复崩溃"
- Command auto-updates CHANGELOG, amends commit, creates tag
- Done! No additional manual steps needed
```

**Key principle: Auto commit + streamlined release**
```
1. git add + git commit (auto, no confirmation)
2. Ask user: release new version?
3. If yes: update CHANGELOG → amend commit → create tag (all auto)
```

Generate appropriate conventional commit messages based on the actual changes in the target repository.