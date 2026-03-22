# Blackjack Review And Hardening Extension Plan

> Goal: append a strict reviewer-grade hardening phase to the existing Blackjack implementation plan.
> Baseline: first execute `.orchestrator/plans/2026-03-22-02-25-think-blackjack-fullstack/plan.md`.
> Extension rule: the project is not complete after the baseline plan until the hardening tasks below are also done.

## Phase 6: Technical Review And Hardening

- [x] Task 24: Reviewer checklist sweep
  Target: all implemented product modules plus `.orchestrator/plans/2026-03-22-02-32-think-blackjack-review-hardening/implementation.md`
  Action: review the finished engine, API, UI, tooling, and docs against the requested checklist: blackjack logic, edge cases, state bugs, UX, responsibilities, naming, duplication, tests, visuals, responsive behavior, accessibility, scripts, and README completeness. Record concrete findings before changing code.
  Verify: `sed -n '1,260p' .orchestrator/plans/2026-03-22-02-32-think-blackjack-review-hardening/implementation.md`

- [x] Task 25: Blackjack logic and state hardening
  Target: `packages/blackjack-engine/src/*`, `packages/blackjack-engine/src/**/*.test.ts`
  Action: fix any scoring, ace-handling, natural-blackjack, dealer-play, payout, restart, or invalid-transition defects found in review, and add regression tests for each defect class that required a code fix.
  Verify: `npm run test --workspace @blackjack/engine`

- [x] Task 26: API contract and session hardening
  Target: `apps/api/src/**/*`
  Action: fix snapshot leaks, invalid action handling, session-state inconsistencies, error-shape issues, or controller/service boundary drift found during review, then extend API coverage to lock those cases down.
  Verify: `npm run test --workspace @blackjack/api`

- [x] Task 27: UI, UX, responsive, and accessibility hardening
  Target: `apps/web/src/**/*`
  Action: fix misleading statuses, broken disabled states, inconsistent visuals, mobile layout problems, keyboard/focus issues, label/semantic gaps, and other review findings while keeping business rules out of components.
  Verify: `npm run build --workspace @blackjack/web && npm run test --workspace @blackjack/web`

- [x] Task 28: Simplification and naming pass
  Target: all touched product modules
  Action: remove duplication introduced during implementation, improve poor names, shrink oversized modules, and move misplaced logic to the correct layer where review shows unnecessary complexity.
  Verify: `npm run lint && npm run typecheck`

- [x] Task 29: Scripts and documentation hardening
  Target: root scripts, workspace scripts, `README.md`
  Action: verify the project installs and runs from the repository root exactly as documented, repair broken or awkward scripts, and update the README to reflect the final behavior and important decisions.
  Verify: `npm install && npm run lint && npm run test && npm run build`

- [x] Task 30: Final close-out summary
  Target: final `/forge` response and `.orchestrator/plans/2026-03-22-02-32-think-blackjack-review-hardening/implementation.md`
  Action: capture the concrete fixes and decisions from the hardening phase, then deliver a short final summary with improvements made, bugs fixed, important decisions, and non-essential future improvements.
  Verify: `sed -n '1,260p' .orchestrator/plans/2026-03-22-02-32-think-blackjack-review-hardening/implementation.md`
