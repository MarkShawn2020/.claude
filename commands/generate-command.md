---
allowed-tools: Write(*), Read(*), Bash(mkdir:*), Bash(ls:*), Bash(echo:*), Bash(cp:*), Bash(date:*)
description: Generate a new slash command with version management support and target directory awareness
version: "2.1.0"
author: markshawn2020
created: "2025-01-16"
updated: "2025-01-16"
changelog:
  - version: "2.1.0"
    date: "2025-01-16"
    changes: ["Added target directory awareness to prevent scanning current directory when generating commands for future use"]
  - version: "2.0.0"
    date: "2025-01-16"
    changes: ["Added version management features"]
---

# Generate Slash Command with Version Management

You are creating a new slash command with built-in version management and target directory awareness. Based on the user's requirements in $ARGUMENTS, generate a complete slash command file with version control.

## Important: Target Directory Awareness

When generating a command, remember that:
- The command is being generated NOW in directory B
- But it will be USED LATER in a different directory C
- DO NOT scan or analyze the current directory B unless explicitly needed
- Design the command to work on the future target directory C

## Version Management Features

This command supports:
- **Semantic versioning** (MAJOR.MINOR.PATCH)
- **Automatic backup creation** when updating existing commands
- **Version history tracking** in YAML frontmatter
- **Changelog generation** for updates

## Instructions:

1. **Parse the arguments**: The format should be `<command-name> "<description>" [project|user] [version] [additional-requirements]`
   - command-name: The name of the slash command (without /)
   - description: What the command does
   - scope: "project" (`.claude/commands/`) or "user" (`~/.claude/commands/`) - defaults to "user"
   - version: Semantic version (defaults to "1.0.0" for new commands)
   - additional-requirements: Any special features needed

2. **Version Management Process**:
   - Check if command file already exists
   - If exists: Create backup with current version number
   - Update version number (increment appropriately)
   - Add changelog entry to frontmatter

3. **Create the appropriate directory structure**:
   - For project commands: `.claude/commands/`
   - For user commands: `~/.claude/commands/`
   - Create `versions/` subdirectory for backups if needed

4. **Generate the command file** with enhanced YAML frontmatter:
   ```yaml
   ---
   allowed-tools: [appropriate tools]
   description: [command description]
   version: "X.Y.Z"
   author: markshawn2020
   created: "YYYY-MM-DD"
   updated: "YYYY-MM-DD"
   changelog:
     - version: "X.Y.Z"
       date: "YYYY-MM-DD"
       changes: ["Initial version" or specific changes]
   ---
   ```

5. **Command Design Principles**:
   - The generated command should analyze its TARGET directory when RUN
   - Do NOT include any analysis of the CURRENT directory in the generated command
   - Use placeholders or instructions for directory-specific operations
   - Include clear comments about when directory scanning should occur

6. **Backup Strategy**:
   - Before updating: `cp command-name.md command-name.v[old-version].md`
   - Keep backup files for rollback capability
   - Optional: Move backups to `versions/` subdirectory

7. **Consider these features based on requirements**:
   - Git operations: Include git-related allowed-tools
   - File operations: Include Read, Write, Edit tools
   - GitHub operations: Include Bash(gh:*) tools
   - Web operations: Include WebFetch, WebSearch tools
   - Directory operations: Include LS, Glob, Grep tools

## Example allowed-tools patterns:
- `Bash(git:*)` - for git commands
- `Bash(gh:*)` - for GitHub CLI commands  
- `Read(*)`, `Write(*)`, `Edit(*)` - for file operations
- `LS(*)`, `Glob(*)`, `Grep(*)` - for directory/search operations
- `WebFetch(*)`, `WebSearch(*)` - for web operations

## Command arguments: $ARGUMENTS

Create the slash command file now with version management, ensuring it follows best practices for Claude Code slash commands and is designed to work on future target directories.