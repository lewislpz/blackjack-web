# Practical Usage Guide

This `.codex/` directory turns the repository into an operating system for Codex. You do not use special commands. You ask Codex, in natural language, what you want it to do.

You also have saved prompts in [`.codex/prompts/README.md`](/Users/lewis/0-dev/active/codex-dotfile/.codex/prompts/README.md) with slash-style aliases such as `/think`, `/forge`, `/test`, `/audit`, `/pr`, `/ship`, and `/resume`.

## Quick Idea

- `think`: analyze and plan without changing product code
- `forge`: implement a task or execute an approved plan
- `test`: create or expand tests with a TDD mindset
- `audit`: run a read-only audit
- `pr`: prepare branch delivery
- `ship`: merge or release, only when explicitly requested

## How To Ask

Use direct, concrete prompts. Examples:

```text
Use .codex/workflows/think.md to analyze this feature and create a plan.
```

```text
Follow .codex/workflows/forge.md and execute the latest approved plan.
```

```text
Run a read-only audit with .codex/workflows/audit.md.
```

```text
Use .codex/workflows/test.md to cover this module with tests.
```

## Saved Slash Aliases

There is no native slash-command parser in this environment, but there is a useful convention:

- `/think` -> [`.codex/prompts/think.md`](/Users/lewis/0-dev/active/codex-dotfile/.codex/prompts/think.md)
- `/forge` -> [`.codex/prompts/forge.md`](/Users/lewis/0-dev/active/codex-dotfile/.codex/prompts/forge.md)
- `/test` -> [`.codex/prompts/test.md`](/Users/lewis/0-dev/active/codex-dotfile/.codex/prompts/test.md)
- `/audit` -> [`.codex/prompts/audit.md`](/Users/lewis/0-dev/active/codex-dotfile/.codex/prompts/audit.md)
- `/pr` -> [`.codex/prompts/pr.md`](/Users/lewis/0-dev/active/codex-dotfile/.codex/prompts/pr.md)
- `/ship` -> [`.codex/prompts/ship.md`](/Users/lewis/0-dev/active/codex-dotfile/.codex/prompts/ship.md)
- `/resume` -> [`.codex/prompts/resume.md`](/Users/lewis/0-dev/active/codex-dotfile/.codex/prompts/resume.md)

Examples:

```text
Use /think to analyze this feature and create a plan.
```

```text
Use /forge on the latest approved plan and do not commit.
```

## Recommended Flow

1. Start with `think` if the task is not yet clear.
2. Review the plan in `.orchestrator/plans/...`.
3. Use `forge` to implement.
4. Use `test` if coverage is missing or you want to close regressions.
5. Use `pr` or `ship` only at the end and only when you really want Git delivery steps.

## What Codex May Create

For medium or large tasks, Codex may create:

- `.orchestrator/plans/<date>-<slug>/investigation.md`
- `.orchestrator/plans/<date>-<slug>/design.md`
- `.orchestrator/plans/<date>-<slug>/plan.md`
- `.orchestrator/plans/<date>-<slug>/implementation.md`
- `.orchestrator/audits/<date>-audit/`

This provides traceability and makes it easier to resume work later.

## How To Ask Better

- State the goal: what you want to achieve.
- State the scope: which files, module, or feature it affects.
- State the constraints: no Git changes, no large refactor, include tests, and so on.
- If a plan already exists, provide the exact path.

Example:

```text
Use .codex/workflows/forge.md to implement the plan at
.orchestrator/plans/2026-03-19-auth-fix/plan.md without committing and validate with tests.
```

## Practical Rule

If you want to think, ask for `think`.
If you want to build, ask for `forge`.
If you want to validate, ask for `test` or `audit`.
If you want Git delivery steps, ask for `pr` or `ship`.
