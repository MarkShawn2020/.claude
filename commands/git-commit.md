---
allowed-tools: [Bash(git:*), Read(*), Write(*), Edit(*), Grep(*), Glob(*)]
description: Add and commit with conventional style and CHANGELOG
version: "1.2.0"
author: "公众号：手工川"
---

# Intelligent Git Commit Command

You are creating a git commit with the following features:
- **Default language**: Chinese (中文) for commit messages
- **Conventional Commit style**: Use conventional commit format (type(scope): description)
- **User context integration**: Accept and incorporate user-provided additional context
- **CHANGELOG management**: Auto-update CHANGELOG.md with semantic versioning

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

## Workflow

1. **Analyze current changes**:
   - Run `git status` to check for uncommitted changes
   - Run `git diff --cached` to see staged changes
   - Run `git diff` to see unstaged changes
   - Identify the main type of changes and affected scope

2. **Parse user input**:
   - Check if user provided additional context or specific requirements
   - Extract any specific commit type or scope preferences
   - Consider any attention points mentioned by the user

3. **Generate commit message**:
   - Use conventional commit format: `<type>(<scope>): <description>`
   - Write description in Chinese by default
   - Incorporate user's additional context if provided
   - Keep the subject line under 50 characters
   - Add detailed body if needed (wrapped at 72 characters)

4. **Update CHANGELOG.md**:
   - Search for CHANGELOG.md in repository root
   - If not exists, create with standard format
   - Determine version bump based on commit type:
     - `feat`: minor version (x.Y.0)
     - `fix`: patch version (x.y.Z)
     - `BREAKING CHANGE` or `!`: major version (X.0.0)
   - Add entry under "## [Unreleased]" or new version section
   - Keep entries concise: `- <type>(<scope>): <description>`
   - Include date in format: `## [x.y.z] - YYYY-MM-DD`

5. **Stage and commit**:
   - Stage user's changes
   - Stage updated CHANGELOG.md
   - Create the commit with the generated message
   - Show the commit result to the user

## Example Usage

When the user runs `/git-commit`, you should:

1. First check the git status and changes
2. Analyze what type of changes were made
3. Generate an appropriate conventional commit message in Chinese
4. If the user provided additional context like "注意性能优化部分", incorporate it
5. Create the commit

## CHANGELOG Format

Use [Keep a Changelog](https://keepachangelog.com/) format:

    # Changelog

    ## [Unreleased]

    ## [1.1.0] - 2025-11-22
    ### Added
    - feat(auth): 新增用户认证功能

    ### Fixed
    - fix(api): 修复API响应超时问题

    ## [1.0.0] - 2025-11-20
    ### Added
    - 初始版本发布

**Sections**: Added, Changed, Deprecated, Removed, Fixed, Security

## Important Notes

- Always analyze the TARGET directory where the command is run
- Do NOT assume anything about the current directory structure
- Support both staged and unstaged changes
- Allow user to override language or commit style if specified
- Ensure commit messages are meaningful and descriptive
- CHANGELOG entries should be concise but informative
- Auto-detect existing version from CHANGELOG or default to 0.1.0

## User Input Parameters

The user can provide additional context in several ways:
- Direct description: Additional text after `/git-commit`
- Type override: Specify a different commit type
- Language override: Request English or other language
- Scope specification: Define a specific scope for the commit

Generate appropriate conventional commit messages based on the actual changes in the target repository.