# Think Status

- Request: redesign the Blackjack UI into a single-screen, no-document-scroll experience with a more modern visual direction.
- Workflow: `.codex/workflows/think.md`
- Workspace: `.orchestrator/plans/2026-03-22-03-13-think-blackjack-single-page-ui/`
- Depends on:
  - `.orchestrator/plans/2026-03-22-02-25-think-blackjack-fullstack/`
  - `.orchestrator/plans/2026-03-22-02-36-think-blackjack-visual-polish/`
  - `.orchestrator/plans/2026-03-22-02-32-think-blackjack-review-hardening/`
- Product code modified: No

## Phases

- [x] Investigation
- [x] Design
- [x] Plan

## Key Decisions

- Interpret "one page without scroll" as no document scroll, not necessarily all content always visible in one static column.
- Keep gameplay logic, contracts, and API untouched; redesign only `apps/web`.
- Replace the current stacked landing-plus-table composition with a viewport-fitted shell.
- Use compact information hierarchy, responsive rails, and tabbed/docked secondary content on narrow screens.
