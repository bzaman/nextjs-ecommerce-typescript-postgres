---
description: Generate PR description from branch commits
---

Generate a concise PR description from this branch's commit history.

## Setup

!`git rev-parse --git-dir`
!`git branch --show-current`
!`git log $(git merge-base HEAD main 2>/dev/null || git merge-base HEAD master 2>/dev/null)..HEAD --pretty=format:"%s"`

## Process

1. Exit with error if not in a git repo or no commits found on branch
2. Detect base branch — try `main`, fallback to `master`
3. Scan commits for fix keywords (fix, fixup, bugfix, hotfix, patch) → use "fixes", otherwise "implements"
4. Generate one clear paragraph starting with "This PR {TYPE}..."
5. If `$ARGUMENTS` provided, use as additional context

## Output

Return only the PR description paragraph. No intro, no explanation, no markdown wrapper.
