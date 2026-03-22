---
description: Full implementation workflow for executing an approved plan with logs and verification.
---

# Forge Workflow

Use this workflow when the user wants implementation, not just analysis.

## Preconditions

- Prefer an existing approved `plan.md` in `.orchestrator/plans/`.
- If no plan exists, create `investigation.md`, `design.md`, and `plan.md` first in the same workspace before coding.

## Setup

1. Resolve `PLAN_PATH` from the user-provided path or the newest plan directory.
2. Ensure these files exist or are created:
   - `status.md`
   - `investigation.md`
   - `design.md`
   - `plan.md`
   - `implementation.md`
3. If the workspace is a Git repo and the user explicitly wants branch isolation, create a feature branch. Otherwise continue on the current branch.

## Phase 1: Context Refresh

- Re-read the relevant parts of the plan.
- Load source-of-truth docs if they exist.
- Re-scan the touched modules before editing.

## Phase 2: Execute Tasks

For each unchecked task in `plan.md`:

1. Confirm the owned files and expected result.
2. Decide whether to do it locally or delegate to a bounded sub-agent.
3. Implement the change.
4. Run the listed verification command.
5. Update `implementation.md` with what changed and what passed.
6. Mark the task complete in `plan.md`.

## Phase 3: Verify The Whole Slice

After task execution:
- run the narrowest meaningful test/build checks
- update docs if the target repository maintains docs for changed behavior
- confirm there are no unchecked tasks left in `plan.md`

## Final Response

Report:
1. files changed
2. verification performed
3. remaining risks or follow-ups
4. whether the tree is ready for a manual `pr` or `ship` step

## Rules

- Do not commit, push, or merge unless the user explicitly asks for delivery.
- Stop after three failed attempts on the same broken check.
- Keep `implementation.md` and `plan.md` in sync with reality.
