---
description: Manual delivery workflow for committing, pushing a feature branch, and producing a pull request link.
---

# PR Workflow

Use this workflow only when the user explicitly asks for a PR-style delivery step.

## Preconditions

- the workspace must be a Git repository
- the current branch must not be `main`
- a remote named `origin` should exist
- the user must confirm the commit message if one was not supplied

## Steps

1. Check branch and working tree state.
2. Run a relevant build or test command when the repository has one.
3. Confirm docs drift is resolved for changed APIs, schemas, or dependencies.
4. Stage and commit using a Conventional Commit message.
5. Push the current branch to `origin`.
6. Build a GitHub compare URL when the remote format allows it.

## Failure Conditions

Abort and report if:
- the repo is not under Git
- the branch is `main`
- build verification fails
- push fails
- no remote is configured

## Final Response

Report the branch, commit message, push result, and PR link when available.

## Rules

- Never run this workflow automatically.
- Never force-push.
- If the repository does not support one of these steps, stop and say exactly why.
