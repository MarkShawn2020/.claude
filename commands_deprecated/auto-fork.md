---
allowed-tools: Bash(git:*), Bash(gh:*), Bash(which:*), Bash(curl:*)
description: Automatically fork a repository and configure git remotes when working on someone else's repo
---

# Auto Fork Repository

Automatically detect if the current repository needs to be forked and set up proper git configuration.

## Pre-checks

- Current directory git status: !`git status --porcelain`
- Current git remote origin: !`git remote get-url origin 2>/dev/null || echo "No origin remote found"`
- Current GitHub user: !`gh api user --jq .login 2>/dev/null || echo "Not logged in to GitHub"`
- Check if gh CLI is installed: !`which gh || echo "GitHub CLI not installed"`

## Detection Logic

This command will:

1. **Verify prerequisites**:
   - Check if current directory is a git repository
   - Verify GitHub CLI (gh) is installed and authenticated
   - Get current user's GitHub username

2. **Analyze repository ownership**:
   - Extract repository owner from remote origin URL
   - Compare with current user's GitHub username (should be markshawn2020)
   - Determine if fork is needed

3. **Auto-fork process** (if repo doesn't belong to current user):
   - Create fork using `gh repo fork`
   - Update local git configuration:
     - Set origin to point to the forked repository
     - Add upstream remote pointing to original repository
     - Configure default push target to fork

4. **Provide status feedback**:
   - Show current remote configuration
   - Confirm fork creation and git setup
   - Display next steps for the user

## Error Handling

- If `gh` is not installed: Provide installation instructions
- If not authenticated: Provide authentication instructions  
- If not in a git repository: Show helpful error message
- If already owns the repository: Skip fork process

Execute the auto-fork process now based on the current repository state.