---
name: parallel-orchestration
description: Use when a task can be split into independent subproblems that benefit from parallel Codex sub-agents.
---

# Parallel Orchestration

## When To Use

Use this skill when you have distinct questions or disjoint implementation slices that can run in parallel without blocking the very next local step.

## Pattern

1. Keep the immediate blocking task in the main thread.
2. Spawn `explorer` sub-agents for bounded read-only analysis.
3. Spawn `worker` sub-agents only when file ownership is clear and disjoint.
4. Integrate results in the main thread; do not duplicate delegated work.

## Rules

- Give each sub-agent one concrete output.
- Pass owned files or directories for write tasks.
- Reuse prior findings instead of re-exploring the same area.
- Wait only when the main thread is blocked on that result.
