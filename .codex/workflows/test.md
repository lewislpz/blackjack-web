---
description: Testing workflow for building a test matrix and executing a TDD loop.
---

# Test Workflow

Use this workflow to add or improve coverage with explicit RED-GREEN-REFACTOR discipline.

## Setup

Create or reuse `.orchestrator/plans/<timestamp>-test-<slug>/` with:
- `status.md`
- `test-matrix.md`
- `implementation.md`

If the repository is under Git and the user explicitly wants a branch, create one. Otherwise stay on the current branch.

## Phase 1: Test Matrix

Write `test-matrix.md` with:
- requirements under test
- happy paths
- edge cases and failure cases
- intended test level: unit, integration, or e2e

## Phase 2: Infrastructure Review

Check what already exists:
- current test framework
- factories, fixtures, mocks, or test helpers
- coverage tooling if present

Reuse existing patterns before adding new helpers.

## Phase 3: TDD Loop

For each scenario:
1. write or update the failing test
2. run it and confirm the failure is meaningful
3. implement the smallest change that makes it pass
4. refactor if needed
5. rerun the relevant checks

## Phase 4: Quality Gate

- run the narrowest reliable suite that covers the changed behavior
- collect coverage if the repo already supports it
- update docs if testing standards changed

## Final Response

Report pass/fail status, coverage if available, bugs fixed during the cycle, and any remaining gaps.

## Rules

- Never skip the failing-test phase unless the task is explicitly about repairing broken tests.
- Mock external systems in unit and integration tests.
- Stop after three failed fix attempts on the same test issue.
- Do not commit or push unless the user explicitly asks for delivery.
