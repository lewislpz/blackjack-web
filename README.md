# Blackjack Royale

Blackjack Royale is a polished local Blackjack application built as a small TypeScript monorepo. It includes a React + Vite frontend, an Express API, a shared pure Blackjack engine, useful tests, and a premium casino-inspired interface that is ready to run locally.

## Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Shared packages: pure Blackjack engine and shared API contracts
- Testing: Vitest, Testing Library, MSW, Supertest
- Tooling: ESLint, Prettier, tsup, npm workspaces

## Features

- Classic single-player Blackjack against the dealer
- Standard 52-card deck with deterministic shuffle support in tests
- Hit, Stand, Double Down, restart round, and fresh session reset
- Bankroll and chip-based betting flow
- Natural blackjack, busts, pushes, normal wins/losses, and dealer autoplay
- Dealer stands on soft 17
- Short round history and clear round-result messaging
- Single-screen table layout with compact HUD and mobile docked controls
- Responsive UI with visible focus states and reduced-motion support

## Project Structure

```text
apps/
  api/                   Express API and in-memory session runtime
  web/                   React UI and user interactions
packages/
  blackjack-engine/      Pure Blackjack rules, scoring, and state transitions
  contracts/             Shared zod schemas and DTO types
```

## Install

```bash
npm install
```

## Run Locally

Start API and web together from the repository root:

```bash
npm run dev
```

Default local URLs:

- Web: `http://localhost:5173`
- API: `http://localhost:3001`

## Scripts

From the repository root:

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run format
```

Target a single workspace when needed:

```bash
npm run test --workspace @blackjack/engine
npm run test --workspace @blackjack/api
npm run test --workspace @blackjack/web
```

## Technical Decisions

- The Blackjack engine is framework-independent and contains the real game rules.
- The API is the runtime source of truth for session state, bankroll, and hidden dealer information.
- The frontend consumes validated snapshots and does not duplicate Blackjack rule logic.
- A fresh shuffled deck is used for each round.
- Bankroll settlement uses net round deltas:
  - natural blackjack: `+1.5x bet`
  - standard win: `+1x stake`
  - push: `0`
  - loss: `-1x stake`
- Double Down is only allowed on the initial two-card hand when the bankroll can cover the extra stake.

## Testing

Coverage focuses on behavior instead of implementation details:

- Engine tests cover scoring, aces, naturals, busts, dealer logic, and double down restrictions.
- API tests cover hidden-card projection, invalid transitions, malformed requests, and session flow.
- Web tests cover bootstrapping, round play through the UI, status messaging, and exhausted-bankroll call to action.

Run everything with:

```bash
npm run test
```

## Future Improvements

- Persistent sessions or saved bankrolls
- Split, surrender, and insurance
- Multiplayer tables or live dealer modes
- Sound design and richer animation choreography
- Server-side persistence and replayable hand histories
