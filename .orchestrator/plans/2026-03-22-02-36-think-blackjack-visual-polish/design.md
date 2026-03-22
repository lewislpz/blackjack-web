# Design

## Architecture Impact

This planning update adds a frontend-only refinement pass. It does not change the application architecture, game rules, API shape, or domain model.

Execution order:

1. complete the baseline implementation through the playable frontend
2. run this visual polish phase on `apps/web`
3. run the strict review and hardening phase

This keeps the visual work isolated and ensures the later hardening review validates the refined UI rather than an earlier draft.

## Frontend Boundaries

The visual polish phase should stay within these areas:

- `apps/web/src/styles/*`
- `apps/web/src/app/*`
- `apps/web/src/features/blackjack/components/*`
- `apps/web/src/features/blackjack/view-models/*`
- `apps/web/src/features/blackjack/hooks/*` only when UI-facing state shaping is needed

It should not modify:

- `packages/blackjack-engine/*`
- `packages/contracts/*`
- `apps/api/*`

If a visual improvement appears to require a rule change, reject it in this phase and keep the original gameplay intact.

## Visual System Direction

Target direction:

- modern casino feel without gimmicks
- deeper visual hierarchy between dealer area, player area, controls, and history
- richer table surface using gradients, subtle texture, shadows, and framing
- card components with more deliberate rank/suit treatment and better face-down styling
- action controls with a consistent premium button system

Implementation guidance:

- centralize colors, shadows, radii, and motion timings in CSS variables or Tailwind theme tokens
- avoid adding a component library only for styling
- prefer a few strong visual primitives over many one-off classes
- keep animations CSS-driven and compatible with `prefers-reduced-motion`

## Component Responsibilities

### Table Shell

Responsibilities:

- establish page hierarchy
- frame dealer and player sections
- position controls, balance, and history clearly
- handle responsive stacking without changing domain logic

### Card Components

Responsibilities:

- render attractive face-up and face-down states
- preserve legibility at smaller sizes
- expose semantic labels when needed for accessibility and tests

### Status And Feedback Components

Responsibilities:

- make round state, result state, and empty state immediately readable
- provide stronger visual feedback for reveal, win, loss, push, and disabled actions
- stay text-first for meaning, with visuals as reinforcement

### Controls

Responsibilities:

- unify action button sizing, hover, active, disabled, and focus styles
- support mobile wrapping without unstable layout jumps
- preserve clear affordance for available versus unavailable actions

## Dependency Changes

Default recommendation: no new runtime dependency.

Optional only if the implementation would clearly simplify class composition:

- `clsx` or `tailwind-merge`

Do not add animation libraries, icon systems, or design systems unless a concrete implementation problem justifies them.

## Testing Strategy

This phase should preserve behavioral tests and add only targeted UI coverage where polish changes user-visible states.

Recommended coverage:

- component tests for clearer empty/result states
- control-state tests ensuring polished buttons still respect disabled and enabled behavior
- responsive-safe assertions that critical sections remain rendered and labeled on narrow layouts
- build verification to catch Tailwind or style-token errors

Avoid brittle assertions on exact class strings when semantic behavior can be asserted instead.
