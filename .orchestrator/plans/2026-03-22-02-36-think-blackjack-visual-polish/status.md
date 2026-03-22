# Think Status

- Request: extend the Blackjack roadmap with a visual-only polish and UX refinement phase.
- Workflow: `.codex/workflows/think.md`
- Workspace: `.orchestrator/plans/2026-03-22-02-36-think-blackjack-visual-polish/`
- Depends on:
  - `.orchestrator/plans/2026-03-22-02-25-think-blackjack-fullstack/`
  - `.orchestrator/plans/2026-03-22-02-32-think-blackjack-review-hardening/`
- Product code modified: No

## Phases

- [x] Investigation
- [x] Design
- [x] Plan

## Key Decisions

- Restrict this extension to `apps/web` presentation, layout, and styling work.
- Do not change blackjack rules, API contracts, or engine logic in this phase.
- Prefer Tailwind tokens, CSS variables, and component refactors over new heavy UI dependencies.
- Run this visual polish after the baseline frontend is playable and before the strict hardening review.
