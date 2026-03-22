# Blackjack Single-Page UI Extension Plan

> Goal: redesign the frontend into a single-screen, no-document-scroll Blackjack interface with a more modern and visual presentation.
> Architecture: frontend-only viewport shell refactor in `apps/web`.
> Ordering rule: execute this after the current baseline product exists; treat it as a focused UI redesign slice.

## Phase 7: Single-Page Viewport Redesign

- [x] Task 37: Viewport shell and layout token pass
  Target: `apps/web/src/styles/index.css`, `apps/web/src/features/blackjack/BlackjackTable.tsx`
  Action: add shell-level layout tokens and convert the current page into a `100dvh` viewport-fitted structure with no document scroll.
  Verify: `npm run build --workspace @blackjack/web`

- [x] Task 38: Replace hero layout with compact HUD
  Target: `apps/web/src/features/blackjack/BlackjackTable.tsx`, `apps/web/src/features/blackjack/components/*`
  Action: remove the tall hero-first structure and replace it with a compact top HUD that keeps brand, bankroll, stake, and round context visible without consuming excessive vertical space.
  Verify: `npm run test --workspace @blackjack/web -- blackjack-table`

- [x] Task 39: Recompose the central table stage
  Target: `apps/web/src/features/blackjack/BlackjackTable.tsx`, `apps/web/src/features/blackjack/components/HandPanel.tsx`, `apps/web/src/styles/index.css`
  Action: restructure the dealer and player areas into a tighter central stage with stronger stage framing, denser spacing, and clearer visual emphasis on the active hand.
  Verify: `npm run test --workspace @blackjack/web -- components`

- [x] Task 40: Desktop utility rail and compact secondary surfaces
  Target: `apps/web/src/features/blackjack/components/BetSelector.tsx`, `apps/web/src/features/blackjack/components/ActionControls.tsx`, `apps/web/src/features/blackjack/components/RoundHistory.tsx`
  Action: redesign betting, controls, and history into a compact right-side rail for larger screens, with reduced vertical footprint and consistent visual hierarchy.
  Verify: `npm run test --workspace @blackjack/web`

- [x] Task 41: Mobile dock or tabbed narrow-screen adaptation
  Target: `apps/web/src/features/blackjack/BlackjackTable.tsx`, `apps/web/src/features/blackjack/components/*`, optional UI-only hook module
  Action: implement a viewport-contained narrow-screen mode that avoids document scroll by switching secondary panels inside a bottom dock or tabbed tray.
  Verify: `npm run test --workspace @blackjack/web`

- [x] Task 42: Feedback and motion refinement for single-screen mode
  Target: `apps/web/src/features/blackjack/components/StatusBanner.tsx`, related stage or feedback components, `apps/web/src/styles/index.css`
  Action: convert wide feedback into compact inline or floating state indicators that suit the new single-screen composition while preserving accessibility and reduced-motion behavior.
  Verify: `npm run build --workspace @blackjack/web && npm run test --workspace @blackjack/web`

- [x] Task 43: Redesign regression checks and docs sync
  Target: `apps/web/src/**/*.test.tsx`, `README.md` if the UI description changes materially
  Action: add or update tests for the viewport shell, narrow-screen dock behavior, and persistent visibility of core game context, then sync any user-facing UI description that changed.
  Verify: `npm run test --workspace @blackjack/web && npm run build --workspace @blackjack/web`
