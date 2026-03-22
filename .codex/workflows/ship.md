---
description: Manual release workflow for committing, merging to main, and pushing only on explicit user request.
---

# Ship Workflow

Use this workflow only when the user explicitly asks to merge or release.

## Preconditions

- the workspace must be a Git repository
- the current branch must not be `main`
- the user must confirm the commit message if one was not supplied
- build or test verification must pass before any merge step

## Steps

1. Check branch and working tree state.
2. Run the relevant validation commands.
3. Confirm docs drift is resolved.
4. Commit outstanding changes with a Conventional Commit message.
5. Update `main` from `origin`.
6. Merge the current branch into `main` using the repository's agreed strategy.
7. Push `main`.
8. Optionally delete the feature branch if the user wants cleanup.

## Failure Conditions

Abort and report if:
- the repo is not under Git
- the current branch is already `main`
- validation fails
- merge conflicts occur
- push fails

## Final Response

Report the merge result, commit message, push result, and any rollback guidance that fits the repo strategy.

## Rules

- Never run this workflow automatically.
- Never force-push.
- Do not delete branches unless the user asked for cleanup.
