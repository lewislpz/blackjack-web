---
description: Read-only audit workflow for code quality, security, and architectural drift.
---

# Audit Workflow

Use this workflow for a structured read-only audit.

## Outcome

Create `.orchestrator/audits/<timestamp>-audit/` with:
- `status.md`
- `1-guidelines-findings.md`
- `2-security-findings.md`
- `3-architecture-findings.md`
- `audit-report.md`

## Phase 0: Setup

```bash
export AUDIT_PATH=".orchestrator/audits/$(date +'%Y-%m-%d-%H-%M')-audit"
mkdir -p "$AUDIT_PATH"
```

## Phase 1: Guidelines Check

- detect the stack and conventions
- sample representative modules
- compare them against `.codex/skills/` guidance and project-local patterns
- write concrete findings with file references

## Phase 2: Security Check

Review auth, secrets handling, validation, rate limiting, permissions, and risky configuration.

## Phase 3: Architecture Scan

Look for boundary leaks, tight coupling, contract drift, bad abstractions, and likely performance bottlenecks.

## Phase 4: Final Report

Write `audit-report.md` with:
- executive summary
- prioritized findings by severity
- actionable recommendations

## Final Response

Present findings ordered by severity and point to the report path.

## Rules

- This workflow is read-only for product code.
- Writing audit artifacts under `.orchestrator/audits/` is allowed.
- Do not commit, push, or mutate source files.
