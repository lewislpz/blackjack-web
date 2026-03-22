# Blackjack Full-Stack App Plan

> Goal: ship a polished local Blackjack application with clean boundaries, solid rules, useful tests, and a portfolio-quality UI.
> Architecture: `npm` workspaces monorepo with `apps/web`, `apps/api`, `packages/blackjack-engine`, and `packages/contracts`.
> Execution note: for behavior changes, follow RED -> GREEN -> PASS and record progress in `implementation.md` during `/forge`.

## Phase 1: Workspace Bootstrap

- [x] Task 1: Root workspace and shared tooling
  Target: `package.json`, `tsconfig.base.json`, `eslint.config.*`, `prettier.config.*`
  Action: create the workspace layout, strict TypeScript defaults, root scripts for `dev`, `build`, `test`, `lint`, and `format`, and shared lint/format configuration.
  Verify: `npm install && npm run lint`

- [x] Task 2: Package scaffolds
  Target: `apps/web/package.json`, `apps/api/package.json`, `packages/blackjack-engine/package.json`, `packages/contracts/package.json`
  Action: scaffold each workspace with its own scripts, TypeScript config, and entry files while keeping `.codex/` untouched.
  Verify: `npm run typecheck`

## Phase 2: Shared Contracts And Engine

- [x] Task 3: Shared contract schemas
  Target: `packages/contracts/src/*`
  Action: add `zod` schemas and exported types for session creation, round start, player actions, allowed actions, card view, round snapshot, and game snapshot.
  Verify: `npm run typecheck --workspace @blackjack/contracts`

- [x] Task 4: Card and deck primitives
  Target: `packages/blackjack-engine/src/cards/*`, `packages/blackjack-engine/src/deck/*`
  Action: add card/rank/suit models, fresh deck creation, and Fisher-Yates shuffling with injectable randomness plus invariant tests.
  Verify: `npm run test --workspace @blackjack/engine -- deck`

- [x] Task 5: Hand scoring and ace handling
  Target: `packages/blackjack-engine/src/hands/*`
  Action: write failing tests for hand totals, soft totals, multiple aces, blackjack detection, and bust detection, then implement the scoring module.
  Verify: `npm run test --workspace @blackjack/engine -- hands`

- [x] Task 6: Initial round state and natural blackjack
  Target: `packages/blackjack-engine/src/round/start-round.*`, `packages/blackjack-engine/src/state/*`
  Action: model the serializable round state, initial deal, visible vs hidden dealer cards, and immediate natural-blackjack resolution.
  Verify: `npm run test --workspace @blackjack/engine -- start-round`

- [x] Task 7: Player action guards
  Target: `packages/blackjack-engine/src/rules/allowed-actions.*`, `packages/blackjack-engine/src/round/player-actions.*`
  Action: implement `hit`, `stand`, and `doubleDown` guards so invalid actions are rejected for finished rounds, non-two-card hands, or insufficient bankroll.
  Verify: `npm run test --workspace @blackjack/engine -- player-actions`

- [x] Task 8: Dealer autoplay and round settlement
  Target: `packages/blackjack-engine/src/rules/dealer-policy.*`, `packages/blackjack-engine/src/round/settlement.*`, `packages/blackjack-engine/src/bankroll/*`
  Action: implement the dealer-stands-on-soft-17 policy, autoplay loop, outcome comparison, and payout settlement including blackjack 3:2 logic.
  Verify: `npm run test --workspace @blackjack/engine -- settlement`

- [x] Task 9: Engine public surface cleanup
  Target: `packages/blackjack-engine/src/index.ts`
  Action: expose a small, coherent engine API for the backend and remove any duplicated or adapter-specific logic.
  Verify: `npm run test --workspace @blackjack/engine`

## Phase 3: API Runtime

- [x] Task 10: Express app shell
  Target: `apps/api/src/app.ts`, `apps/api/src/server.ts`, `apps/api/src/config.ts`
  Action: scaffold the API app, server bootstrap, health endpoint, JSON middleware, and typed configuration defaults for local development.
  Verify: `npm run test --workspace @blackjack/api`

- [x] Task 11: Session store and game service
  Target: `apps/api/src/features/game/session-store.ts`, `apps/api/src/features/game/game-service.ts`
  Action: add an in-memory session store, bankroll initialization, round history tracking, and engine-driven state transitions.
  Verify: `npm run test --workspace @blackjack/api -- game-service`

- [x] Task 12: Public snapshot presenter
  Target: `apps/api/src/features/game/game-presenter.ts`
  Action: map internal engine state to contract-compliant snapshots and guarantee the hidden dealer card is not exposed before reveal.
  Verify: `npm run test --workspace @blackjack/api -- game-presenter`

- [x] Task 13: Game routes and error handling
  Target: `apps/api/src/features/game/game-routes.ts`, `apps/api/src/middleware/error-handler.ts`
  Action: implement session, round, hit, stand, and double-down routes with schema validation and typed error responses.
  Verify: `npm run test --workspace @blackjack/api -- routes`

- [x] Task 14: API integration coverage
  Target: `apps/api/src/**/*.test.ts`
  Action: add `supertest` coverage for happy paths and invalid-action scenarios, including natural blackjack, bust, and push responses.
  Verify: `npm run test --workspace @blackjack/api`

## Phase 4: Frontend UI

- [x] Task 15: Vite app shell and Tailwind theme
  Target: `apps/web/src/main.tsx`, `apps/web/src/app/App.tsx`, `apps/web/src/styles/*`, `apps/web/tailwind.config.*`
  Action: build the page shell, theme variables, typography, and responsive table layout with a modern casino visual direction.
  Verify: `npm run build --workspace @blackjack/web`

- [x] Task 16: Core presentational components
  Target: `apps/web/src/features/blackjack/components/*`
  Action: implement reusable card, hand, table, chip selector, action bar, result banner, and history components with visible focus states and clear labeling.
  Verify: `npm run test --workspace @blackjack/web -- components`

- [x] Task 17: API client and game hook
  Target: `apps/web/src/features/blackjack/api/client.ts`, `apps/web/src/features/blackjack/hooks/useBlackjackGame.ts`
  Action: create the session bootstrap flow, mutation helpers, loading/error handling, and a frontend view model that consumes API snapshots without rule duplication.
  Verify: `npm run test --workspace @blackjack/web -- hook`

- [x] Task 18: Full gameplay screen wiring
  Target: `apps/web/src/features/blackjack/BlackjackTable.tsx` and related modules
  Action: connect betting, round start, hit, stand, double down, restart, bankroll display, and history rendering into a complete playable screen.
  Verify: `npm run test --workspace @blackjack/web -- blackjack-table`

- [x] Task 19: Motion, accessibility, and responsive polish
  Target: `apps/web/src/features/blackjack/components/*`, `apps/web/src/styles/*`
  Action: add deal/reveal transitions, reduced-motion handling, mobile layout adjustments, contrast checks, and disabled-state clarity without introducing flaky timing logic.
  Verify: `npm run build --workspace @blackjack/web && npm run test --workspace @blackjack/web`

- [x] Task 20: Frontend integration coverage
  Target: `apps/web/src/**/*.test.tsx`
  Action: add Testing Library + `msw` scenarios for control-state restrictions, round-result messaging, and at least one end-to-end round through the React UI.
  Verify: `npm run test --workspace @blackjack/web`

## Phase 5: Review, Docs, And Final Checks

- [x] Task 21: Refactor and consistency review
  Target: all modified product modules
  Action: remove dead code, tighten names, confirm UI/domain/service boundaries, and ensure no impossible states leak through the engine or API.
  Verify: `npm run lint && npm run test`

- [x] Task 22: README and local run guidance
  Target: `README.md`
  Action: document the stack, rules, setup, scripts, technical decisions, and future improvements, including explicit dealer soft-17 behavior.
  Verify: `sed -n '1,220p' README.md`

- [x] Task 23: Final full-project verification
  Target: entire workspace
  Action: run the complete quality gate, check referenced paths, and confirm the app boots cleanly in local development.
  Verify: `npm run lint && npm run test && npm run build`
