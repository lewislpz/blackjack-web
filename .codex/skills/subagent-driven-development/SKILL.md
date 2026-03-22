---
name: subagent-driven-development
description: Use when executing an approved plan and some tasks can be delegated safely to bounded Codex sub-agents.
---

# Sub-Agent Driven Development

## Execution Loop

1. Pick the next unchecked task from `plan.md`.
2. Decide whether the task is small enough to do locally or worth delegating.
3. If delegating, pass the exact task text, owned files, and verification command.
4. Review the result against the plan and boundary rules.
5. Update `implementation.md` and mark the task in `plan.md`.

## Rules

- One sub-agent per task.
- Give task text, not a vague reference to the whole plan.
- Keep write scopes disjoint.
- Re-review fixes with the same criteria that failed previously.
- Abort after three failed fix attempts on the same task.
