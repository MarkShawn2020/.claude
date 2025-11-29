---
allowed-tools: [Bash, Read, Write, Edit, Grep, Glob]
description: Commit with user-focused CHANGELOG management
version: "2.3.0"
author: "公众号：手工川"
---

# Git Commit with CHANGELOG Management

You are managing git commits with user-focused CHANGELOG:
- **Commit first**: Always complete the code commit before any CHANGELOG operations
- **Default language**: Chinese (中文) for commit messages
- **Conventional Commit style**: Use conventional commit format (type(scope): description)
- **User context integration**: Accept and incorporate user-provided additional context
- **CHANGELOG for end users**: Concise, high-level summaries for software users (not developers)
- **Manual curation**: Human-written summaries, not automatic commit duplication
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

### Phase 1: Commit First (Primary Task)

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

4. **Stage and commit** (WITHOUT CHANGELOG):
   - Stage user's code changes only (exclude CHANGELOG.md)
   - Create the commit with the generated message
   - Show the commit result to the user
   - **Commit is now complete** - user's code is safely committed

### Phase 2: CHANGELOG Management (After Commit)

5. **Ask user about CHANGELOG update**:
   - After successful commit, ask: "是否需要更新 CHANGELOG？"
   - Options:
     - **No** (default for most commits): Skip CHANGELOG entirely
     - **Yes, add to [Unreleased]**: Add entry to [Unreleased] section
     - **Yes, prepare release**: Create new version section
   - If user says no, workflow ends here

6. **If CHANGELOG update requested**:
   - Check if CHANGELOG.md exists, create if missing
   - Ask user for concise, user-focused description (2-5 lines)
   - Add to appropriate section ([Unreleased] or new version)
   - Create separate commit for CHANGELOG update

7. **Validate CHANGELOG against git tags** (if releasing):
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
3. Stage and commit user's code changes
4. **After commit succeeds**, ask: "是否需要更新 CHANGELOG？"
5. User says no (default)
6. Workflow ends - commit complete

**Scenario 2: Commit with CHANGELOG update**
1. Check git status - uncommitted changes found
2. Generate conventional commit message
3. Stage and commit user's code changes
4. **After commit succeeds**, ask: "是否需要更新 CHANGELOG？"
5. User says yes, wants to add to [Unreleased]
6. Ask user for concise description
7. Update CHANGELOG and create separate commit

**Scenario 3: Release preparation**
1. User has already committed all code
2. User runs command with intent to release
3. Ask for version number and CHANGELOG summary
4. Check for any missing versions in CHANGELOG (validate against tags)
5. Update CHANGELOG with new version section
6. Commit CHANGELOG
7. User creates tag: `git tag v1.2.0`

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

- **COMMIT FIRST**: Always complete the code commit before asking about CHANGELOG
- **CHANGELOG is optional**: Most commits don't need CHANGELOG updates
- **CHANGELOG is for users, not developers**: High-level summaries, not commit logs
- **Manual curation required**: Ask user to provide summaries, don't auto-generate from commits
- **CHANGELOG reflects releases**: Only git-tagged versions appear as versioned sections
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
- If CHANGELOG is updated, commit it separately from code changes

## User Input Parameters

The user can provide additional context in several ways:
- Direct description: Additional text after `/git-commit-with-changelog`
- Type override: Specify a different commit type
- Language override: Request English or other language
- Scope specification: Define a specific scope for the commit

## Command Behavior

This command will:
1. **COMMIT FIRST**: Always complete code commit before any CHANGELOG operations
2. **Ask about CHANGELOG after commit**: "是否需要更新 CHANGELOG？"
3. **Most commits**: Just create conventional commit, skip CHANGELOG (default)
4. **If CHANGELOG requested**: Create separate commit for CHANGELOG updates
5. **Release time**: Validate CHANGELOG against tags, ask for missing version summaries

## Version Workflow

**Development flow:**
```
Day 1-10: Normal development
- Run command → commit code → "更新 CHANGELOG?" → No → Done
- Fast and simple for daily work

Day 11: Ready to release
- Run command → commit code → "更新 CHANGELOG?" → Yes, prepare release
- Provide version: "v1.2.0"
- Provide summary: "新增暗色模式\n提升性能\n修复崩溃"
- Command updates CHANGELOG and commits
- User creates tag: git tag v1.2.0
```

**Key principle: Commit first, CHANGELOG second**
```
1. git add + git commit (code changes)
2. Ask user: CHANGELOG update needed?
3. If yes: separate git commit (CHANGELOG only)
```

Generate appropriate conventional commit messages based on the actual changes in the target repository.