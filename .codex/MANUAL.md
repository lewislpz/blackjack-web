# Codex Workflow Manual

This repository uses `.codex/` as a local operating system for Codex. These files are playbooks and role cards, not executable slash commands. Codex should follow them when the user explicitly asks for a workflow or when the task clearly matches one.

## Directory Map

- `agents/`: role briefs for architecture, planning, backend, and frontend work
- `rules/`: global constraints, delivery safety, and role boundaries
- `workflows/`: reusable operating procedures for analysis, implementation, testing, audit, PR, and ship
- `skills/`: focused reference packs for architecture, testing, code quality, and delegation
- `contexts/`: behavior overlays for research, implementation, and review

## How To Invoke This In Codex

Use natural prompts that point at the workflow you want. Examples:

- `Use .codex/workflows/think.md to analyze and plan this feature.`
- `Follow .codex/workflows/forge.md and execute the latest approved plan.`
- `Run a read-only audit using .codex/workflows/audit.md.`
- `Use .codex/workflows/test.md to add coverage for this module.`
- `Follow .codex/workflows/pr.md to prepare a PR.`

The workflow files are instructions for Codex to interpret, not commands that a runner parses.

When a user invokes an alias from `.codex/prompts/`, Codex should:

1. open the matching prompt file in `.codex/prompts/`
2. follow any referenced workflow in `.codex/workflows/`
3. treat that workflow as the operational source of truth, not as an optional hint

## Preferred Flow

1. `audit`: read-only health check for an existing codebase
2. `think`: investigation, design, and plan without product code changes
3. `forge`: execute an approved plan and keep an implementation log
4. `test`: build or expand a test matrix with TDD discipline
5. `pr` or `ship`: only on explicit user request

For non-trivial work, store artifacts in `.orchestrator/`:

- `.orchestrator/plans/<timestamp>-<slug>/`
- `.orchestrator/audits/<timestamp>-audit/`

## Source Of Truth

When a target repository provides `docs/00-general-docs.md`, start there and follow linked documents. If that index does not exist, fall back in this order:

1. `README.md` and repository docs
2. configuration files such as `package.json`, `pyproject.toml`, `pom.xml`, `Dockerfile`
3. the source tree and existing tests

If docs are missing or stale, record that gap in the plan and treat code plus config as provisional truth.

## Role Model

The files in `agents/` define reasoning lenses that Codex can use directly or via sub-agents:

- `architect`: system design, contracts, data model, security posture
- `doc-planner`: plan authoring, scope control, docs synchronization
- `backend`: business logic, validation, persistence, service boundaries
- `frontend`: UI, state, accessibility, visual consistency

## SDD In Codex

This setup keeps the Sub-Agent Driven Development idea, but adapts it to Codex:

- keep the immediate blocking task in the main thread
- delegate only bounded side tasks to sub-agents
- pass task text and file ownership, not a vague objective
- update `plan.md` and `implementation.md` after each completed task
- abort after three failed fix attempts on the same issue

## Git And Delivery

`pr` and `ship` are manual workflows. Codex should never commit, push, merge, or delete branches unless the user explicitly asks. If the workspace is not a Git repository, skip Git steps and continue with local analysis or implementation.
