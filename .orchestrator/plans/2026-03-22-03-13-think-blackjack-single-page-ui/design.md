# Design

## Architecture Impact

This update is a frontend-only redesign. It does not change:

- blackjack rules
- API contracts
- session behavior
- engine logic

It changes the composition of the React UI so the app behaves like a full-screen table application rather than a vertically flowing page.

## Frontend Boundaries

Primary files likely affected:

- `apps/web/src/features/blackjack/BlackjackTable.tsx`
- `apps/web/src/features/blackjack/components/*`
- `apps/web/src/features/blackjack/view-models/*`
- `apps/web/src/styles/index.css`

Optional only if the narrow-screen dock needs local UI state:

- `apps/web/src/features/blackjack/hooks/*`

Do not modify:

- `packages/blackjack-engine/*`
- `packages/contracts/*`
- `apps/api/*`

## Layout Direction

### Desktop And Large Laptop

Recommended shell:

- top HUD strip with brand, bankroll, stake, round status, and compact rule chips
- center area split into:
  - main table stage
  - right utility rail

Main table stage:

- dealer row
- center feedback or reveal banner
- player row

Right utility rail:

- primary CTA and betting chips
- action controls
- compact round history

This keeps all key interactions visible in one viewport while making the table the dominant visual object.

### Tablet And Narrow Laptop

Recommended adaptation:

- reduce HUD height
- tighten table padding
- move utility rail below or beside the table in a two-row grid
- compress history into a denser module

The page should still remain `100dvh` with no document scroll.

### Mobile

Recommended adaptation:

- full-height app shell
- compact HUD
- table stage centered vertically
- bottom dock with tabbed views such as:
  - `Play`
  - `Bet`
  - `History`

Only one dock panel is visible at a time, but the document itself does not scroll. This is the practical way to preserve usability and readability on small screens.

## Presentation Responsibilities

### `BlackjackTable`

Responsibility:

- own the viewport shell
- compose HUD, stage, rail, and mobile dock
- decide which secondary panel is visible on narrow screens

### New Or Refined Presentational Units

Suggested boundaries:

- `TableHud`
- `TableStageFrame`
- `UtilityRail`
- `MobileDock`
- `RoundFeedbackBadge`
- `CompactHistoryList`

This avoids one oversized `BlackjackTable` component and keeps the redesign maintainable.

### Existing Components

Expected changes:

- `HandPanel`: denser vertical rhythm and more compact headers
- `BetSelector`: compact mode support
- `ActionControls`: stacked or dock mode support
- `RoundHistory`: compact mode and mobile mode
- `StatusBanner`: convert from wide banner to inline feedback badge or floating state module

## Styling Strategy

Use the existing tokenized styling system, but extend it toward viewport control:

- shell height tokens based on `100dvh`
- compact paddings and gaps using `clamp()`
- card sizing tokens for short heights
- dock and rail primitives
- fewer large decorative blocks at the top

Recommended CSS additions:

- `app-shell`
- `table-hud`
- `table-grid`
- `utility-rail`
- `mobile-dock`
- `compact-*` variants for existing panels

Avoid introducing a new design system or animation library.

## Testing Strategy

Behavioral tests should remain the baseline. Add targeted UI coverage for the redesign:

- root shell renders with viewport-fit classes or attributes
- main play controls remain reachable in the single-screen layout
- mobile dock tab switching works without losing round context
- status and bankroll remain visible in the compact HUD
- build and existing integration tests still pass

Do not test exact visual class strings when structure, labels, and state visibility are enough.
