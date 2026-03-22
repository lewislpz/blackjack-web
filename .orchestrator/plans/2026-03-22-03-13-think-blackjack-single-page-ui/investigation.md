# Investigation

## Request Summary

The user wants a new UI direction for the Blackjack app:

- one single page
- no page scroll
- more visual and modern

The request explicitly invokes `/think`, so the deliverable is a planning package only.

## Current State

The current UI in `apps/web/src/features/blackjack/BlackjackTable.tsx` is visually strong but vertically stacked:

- hero block
- stat cards
- status banner
- table area
- controls
- history panel

This produces a premium layout, but it is not a strict single-screen experience. On many viewports it naturally grows beyond one screen height and relies on vertical document flow.

The styling system in `apps/web/src/styles/index.css` already has reusable visual primitives:

- glass surfaces
- felt/table textures
- premium buttons
- card styling
- status pills

That means the redesign does not need a new visual system from scratch. It needs a stronger spatial system and denser information architecture.

## Reuse Opportunities

- Reuse the existing card, hand, status, bet, action, and history components as the visual vocabulary.
- Reuse current tokens and premium surface treatments from `src/styles/index.css`.
- Reuse the current `useBlackjackGame` hook and snapshot-driven state model without changes to gameplay logic.
- Reuse current tests as the behavioral baseline, then add viewport-layout assertions only where the redesign changes structure meaningfully.

## Risks And Edge Cases

- "No scroll" is easy on desktop but becomes fragile on short laptop heights and small mobile screens.
- Forcing every panel to remain visible on very small screens risks unreadable cards, cramped controls, or inaccessible hit targets.
- Moving to a single-screen shell can accidentally hide important context such as bankroll, round result, or history if the secondary surfaces are compressed too aggressively.
- Over-optimizing for one static layout can create brittle CSS and hurt maintainability.

## Recommendation

Redesign the UI around a full-viewport shell with these principles:

- `100dvh` app shell with `overflow-hidden` at the document level
- compact top HUD instead of a large hero banner
- central table stage as the visual anchor
- right-side control rail on desktop
- docked or tabbed secondary panel on narrow screens for history and betting context
- card sizing and spacing driven by `clamp()` and viewport-aware tokens

For mobile and short heights, keep the "single page" promise by using viewport-contained panel switching instead of document scroll. That is the most realistic way to satisfy the request without making the interface cramped or illegible.
