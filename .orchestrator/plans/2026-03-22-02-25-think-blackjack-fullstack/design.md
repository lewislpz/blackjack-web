# Design

## Architecture Impact

This change introduces the first runnable product code into a repository that currently only contains workflow material. The implementation should therefore keep product runtime code clearly separated from `.codex/` and `.orchestrator/`.

The recommended shape is an `npm` workspaces monorepo:

```text
.
├── apps/
│   ├── api/
│   └── web/
├── packages/
│   ├── blackjack-engine/
│   └── contracts/
├── .codex/
└── .orchestrator/
```

## Module Boundaries

### `packages/blackjack-engine`

Purpose: framework-independent domain model and game rules.

Suggested internal modules:

- `cards/`: suit, rank, card factories
- `deck/`: deck creation and Fisher-Yates shuffle with injectable RNG
- `hands/`: scoring, soft/hard totals, blackjack and bust checks
- `rules/`: dealer policy, double-down guard, allowed-actions logic
- `round/`: initial deal, player actions, dealer autoplay, settlement
- `bankroll/`: bet validation, 1:1 wins, 3:2 blackjack payout, push refund
- `state/`: serializable game/round state types

Constraints:

- Pure functions only where possible
- No React, Express, HTTP, or storage concerns
- Deterministic tests by controlling randomness

### `packages/contracts`

Purpose: shared request/response schemas between API and web.

Suggested exports:

- `GameSnapshot`
- `RoundSnapshot`
- `CardView`
- `AllowedActions`
- `CreateSessionResponse`
- `StartRoundRequest`
- `PlayerActionRequest`
- `RoundHistoryEntry`

Use `zod` so the API validates inputs and the frontend consumes generated TypeScript types.

### `apps/api`

Purpose: transport adapter and authoritative runtime state.

Suggested modules:

- `src/app.ts`: Express app wiring
- `src/server.ts`: local boot entry
- `src/config.ts`: ports and environment defaults
- `src/features/game/session-store.ts`: in-memory session map
- `src/features/game/game-service.ts`: orchestrates engine transitions per session
- `src/features/game/game-presenter.ts`: maps private engine state to public snapshot without leaking hidden dealer data
- `src/features/game/game-routes.ts`: session, round, and action endpoints
- `src/middleware/error-handler.ts`: typed API errors

Rules:

- API owns session lifecycle and bankroll state
- Hidden dealer card stays hidden in public snapshots until reveal
- No blackjack rules duplicated in controllers

### `apps/web`

Purpose: UI, interaction flow, and presentation-only state.

Suggested modules:

- `src/main.tsx`: app bootstrap
- `src/app/App.tsx`: page shell
- `src/styles/index.css`: Tailwind entry and theme variables
- `src/features/blackjack/api/client.ts`: fetch wrapper
- `src/features/blackjack/hooks/useBlackjackGame.ts`: async orchestration, loading/error state, session bootstrap
- `src/features/blackjack/components/`: table, hand, card, action bar, betting bar, history, status banner
- `src/features/blackjack/view-models/`: optional presentational mapping helpers

Frontend separation:

- The hook handles requests, optimistic disable states, and transient UI loading state.
- Presentational components render props only.
- Tailwind classes and CSS variables define the visual system.

## Game Rules Decisions

- Deck model: one fresh 52-card deck per round
- Dealer rule: stand on all 17 values, including soft 17
- Double down: allowed only on the initial two-card player hand, only before any hit, and only if bankroll covers the extra stake
- Natural blackjack: detected immediately after the initial deal
- Payouts:
  - natural blackjack: 3:2
  - normal win: 1:1
  - push: original bet returned
  - loss or bust: bet lost
- Out of scope for first implementation: split, surrender, insurance, multi-hand play, persistence, multiplayer

## API Contract Shape

Recommended endpoints:

- `POST /api/session`
- `GET /api/session/:sessionId`
- `POST /api/session/:sessionId/round`
- `POST /api/session/:sessionId/action/hit`
- `POST /api/session/:sessionId/action/stand`
- `POST /api/session/:sessionId/action/double-down`

Snapshot model:

- The API returns a full `GameSnapshot` after every mutation.
- The dealer hidden card is represented as a face-down placeholder card until the reveal phase.
- Allowed actions are explicit booleans so the UI never has to infer rule legality.
- History is part of the snapshot so the UI can stay stateless relative to previous rounds.

## Dependency Changes

Root:

- `typescript`
- `eslint`
- `prettier`
- `concurrently`

Shared:

- `zod`
- `vitest`

API:

- `express`
- `supertest`
- `tsx`

Web:

- `react`
- `react-dom`
- `vite`
- `tailwindcss`
- `@testing-library/react`
- `@testing-library/user-event`
- `jsdom`
- `msw`

## Testing Strategy

### Engine

- Unit-test all scoring and state transitions directly in `packages/blackjack-engine`.
- Cover multiple aces, blackjack, bust, push, dealer autoplay, double-down restrictions, and payout math.
- Test shuffle invariants with deterministic RNG injection.

### API

- Use `supertest` against the Express app.
- Verify input validation, invalid action handling, session lifecycle, hidden-card projection, and snapshot responses.

### Web

- Use Testing Library with `msw`.
- Cover loading state, action enable/disable behavior, round result messaging, and at least one full happy-path round flow.
- Keep animations CSS-driven and respect reduced motion so tests can assert stable DOM states.

## Documentation Expectations

- `README.md` should describe setup, scripts, architecture, gameplay rules, and future improvements.
- Important decisions should also stay visible in `.orchestrator/plans/...` so the later `/forge` session has a stable source of truth.
