# Investigation

## Request Summary

The user wants a new planning increment focused only on the visual layer and UX of the Blackjack project.

Requested outcomes:

- more premium and modern look
- stronger visual hierarchy
- more attractive cards
- more believable table presentation
- better user feedback
- improved responsive behavior
- smoother microinteractions
- clearer empty and final states
- more elegant and consistent buttons

Explicit constraints:

- do not change game rules
- do not break tests
- do not add unnecessary complexity
- keep reasonable accessibility
- keep the code clean

The current prompt explicitly invokes `/think`, so this session must only update planning artifacts.

## Current State

- The repository still contains planning artifacts only; there is no implemented product code yet.
- The baseline build plan already includes a frontend implementation phase in `.orchestrator/plans/2026-03-22-02-25-think-blackjack-fullstack/plan.md`.
- A later hardening phase already exists in `.orchestrator/plans/2026-03-22-02-32-think-blackjack-review-hardening/plan.md`.
- The base plan includes some motion and responsive work, but not a dedicated premium visual polish pass.

## Reuse Opportunities

- Reuse the existing React + Tailwind frontend boundary from the baseline design.
- Extend the frontend-only tasks rather than pushing visual concerns into the engine or API.
- Reuse the existing component split around cards, table layout, controls, status, and history.
- Reuse the future hardening phase to validate that the visual polish did not regress accessibility, responsive behavior, or tests.

## Risks And Edge Cases

- Visual polish can accidentally smuggle game-state logic into presentational components.
- More elaborate card styling and table visuals can create inconsistent spacing or overflow on mobile.
- Animations can easily make tests flaky or reduce clarity for keyboard users if reduced-motion support is skipped.
- Premium styling often drifts into arbitrary one-off values unless design tokens are centralized.
- Feedback states can become visually rich but semantically weak if status messaging and focus order are not preserved.

## Recommendation

Add a dedicated `Visual Polish And UX Refinement` phase that runs after the frontend is functionally complete and before the strict technical hardening review.

That phase should:

- improve the visual system through shared tokens rather than ad hoc class growth
- refine the table shell, cards, controls, and result states without changing game behavior
- improve mobile layout, spacing, and information hierarchy
- add CSS-driven microinteractions with reduced-motion handling
- strengthen UX clarity for empty, loading, and round-result states
- keep verification focused on existing tests, targeted UI tests, and frontend build stability

This preserves the architecture already chosen while giving the UI a distinct, portfolio-grade finish.
