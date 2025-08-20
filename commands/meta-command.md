---
allowed-tools: Write(*), Read(*), Edit(*), Append(*), Bash(ls:*), Bash(date:*)
description: Generate optimized slash commands
version: "3.2.0"
author: "公众号：手工川"
---

# Meta Command

Create slash commands using two-file architecture.

## Files to Generate

For command `XX`:
- **XX.md** - Command file
- **XX.changelog** - Version history

## Arguments Format
`<name> "<description>" [project|user] [requirements]`

## Process

1. Check if command exists:
```bash
ls ~/.claude/commands/XX.md
```

2. Generate **XX.md**:
```yaml
---
allowed-tools: [required tools]
description: one-line description
version: "1.0.0"
author: "公众号：手工川"
---
# Command logic
```

3. Generate **XX.changelog**:
```markdown
# Changelog for XX

## v1.0.0 - YYYY-MM-DD
- Initial version

Author: 公众号：手工川
Created: YYYY-MM-DD
```

## Version Rules
- New: v1.0.0
- Patch: Bug fixes (1.0.1)
- Minor: Features (1.1.0)
- Major: Breaking (2.0.0)

## Tool Selection
- Git: `Bash(git:*)`
- GitHub: `Bash(gh:*)`
- Files: `Read(*)`, `Write(*)`, `Edit(*)`
- Search: `Glob(*)`, `Grep(*)`
- Web: `WebFetch(*)`, `WebSearch(*)`

Execute: `/meta-command <name> "<desc>" [options]`