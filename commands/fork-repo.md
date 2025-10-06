---
allowed-tools:
  - Bash(git:*)
  - Bash(gh:*)
  - Read(*)
  - LS(*)
  - Grep(*)
description: "Convert a cloned repository into your own and push to GitHub to appear as a fork"
version: "1.1.0"
created: "2025-07-13"
updated: "2025-07-13"
changelog:
  - version: "1.1.0"
    date: "2025-07-13"
    changes: ["Added version management support"]
  - version: "1.0.0"
    date: "2025-07-13"
    changes: ["Initial version"]
---

# Fork Repository Command

This command automates the process of converting a cloned repository into your own GitHub repository that appears as a fork of the original.

## Usage

    /fork-repo [new-repo-name] [description]

## Process

1. **Verify current repository status**
   - Check if we're in a git repository
   - Get the current remote origin URL
   - Verify the repository has commits

2. **Extract original repository information**
   - Get the original GitHub repository from current remote
   - Parse owner and repository name

3. **Create proper fork**
   - Use `gh repo fork` to create a true fork relationship
   - Delete any existing repository if needed

4. **Update local repository configuration**
   - Update origin remote to point to the new fork
   - Push all branches and tags to fork repository

## Arguments
- `new-repo-name` (optional): Name for the new repository. Defaults to current directory name
- `description` (optional): Description for the new repository

## Instructions

Please follow these steps:

1. First, verify we're in a git repository and check current status:

       git status
       git remote -v
       git log --oneline -5

2. Extract original repository information from current remote:

       ORIGINAL_REMOTE=$(git remote get-url origin)
       # Parse GitHub repository from the remote URL

3. Check if target fork already exists and delete if needed:

       # Extract repo name from arguments or use current directory
       REPO_NAME=${1:-$(basename $(pwd))}
       # Check if fork already exists
       if gh repo view $REPO_NAME 2>/dev/null; then
           echo "Repository already exists, deleting..."
           gh repo delete $REPO_NAME --yes
       fi

4. Create proper fork using GitHub CLI:

       # Extract owner/repo from original remote URL
       gh repo fork $ORIGINAL_OWNER/$ORIGINAL_REPO --clone=false

5. Update local repository to point to the fork:

       git remote set-url origin git@github.com:$(gh auth status | grep 'Account:' | awk '{print $2}')/$REPO_NAME.git

6. Push all content to the fork:

       git push -u origin main
       git push origin --tags

7. Provide final status and repository URL

## Notes
- Ensure you have GitHub CLI (`gh`) installed and authenticated
- This method creates a true GitHub fork relationship, not just a copy
- The original repository's history will be preserved
- All branches and tags will be copied to the fork repository
- The fork relationship properly maintains attribution to the original project
- If a repository with the same name already exists, it will be deleted first

Arguments received: $ARGUMENTS