# Blackjack Visual Polish Extension Plan

> Goal: improve the visual quality and UX of the Blackjack frontend without changing gameplay logic.
> Baseline: execute `.orchestrator/plans/2026-03-22-02-25-think-blackjack-fullstack/plan.md` through Task 20 first.
> Ordering rule: execute this extension before `.orchestrator/plans/2026-03-22-02-32-think-blackjack-review-hardening/plan.md`.

## Phase 5A: Visual Polish And UX Refinement

- [x] Task 31: Visual token pass
  Target: `apps/web/src/styles/*`, `apps/web/tailwind.config.*`
  Action: introduce or refine theme tokens for color, shadows, radii, spacing, and motion so the Blackjack UI has a premium, consistent visual foundation without scattering arbitrary values across components.
  Verify: `npm run build --workspace @blackjack/web`

- [x] Task 32: Table hierarchy and layout polish
  Target: `apps/web/src/app/*`, `apps/web/src/features/blackjack/components/*`
  Action: improve the page shell and table composition so dealer, player, betting, controls, and history have clearer hierarchy, stronger framing, and more believable table presentation on desktop and mobile.
  Verify: `npm run test --workspace @blackjack/web -- components`

- [x] Task 33: Card and button refinement
  Target: `apps/web/src/features/blackjack/components/*`
  Action: refine card visuals, face-down treatment, chip or balance presentation, and action button styling so controls feel elegant and cards look intentionally designed while preserving semantics and test stability.
  Verify: `npm run test --workspace @blackjack/web -- blackjack-table`

- [x] Task 34: Feedback and end-state clarity
  Target: `apps/web/src/features/blackjack/components/*`, `apps/web/src/features/blackjack/view-models/*`
  Action: improve result banners, empty states, round transition feedback, and disabled-state clarity so the user can always understand what happened and what can happen next.
  Verify: `npm run test --workspace @blackjack/web -- hook`

- [x] Task 35: Motion, responsive, and accessibility pass
  Target: `apps/web/src/styles/*`, `apps/web/src/features/blackjack/components/*`
  Action: add subtle CSS-driven microinteractions, tighten mobile spacing and wrapping, preserve visible focus states, respect reduced-motion preferences, and confirm the polished UI remains reasonably accessible.
  Verify: `npm run build --workspace @blackjack/web && npm run test --workspace @blackjack/web`

- [x] Task 36: Visual regression-safe coverage and handoff
  Target: `apps/web/src/**/*.test.tsx`, `README.md` if visual behavior or controls documentation changed
  Action: add or adjust lightweight UI tests where polish changed meaningful states, then note any user-visible visual decisions that should remain explicit for the later hardening pass.
  Verify: `npm run test --workspace @blackjack/web && sed -n '1,240p' README.md`
