# Investigation

## Request Summary

The user wants a complete, polished Blackjack application built from scratch with:

- React + TypeScript + Vite
- Tailwind CSS
- Node.js + Express + TypeScript
- Vitest, Testing Library, ESLint, and Prettier

The feature set must cover a playable single-player Blackjack experience against the dealer, clean architecture, useful tests, documentation, and production-quality structure. The current request explicitly invokes `/think`, so the required output is analysis and an execution plan only.

## Current State

- `docs/00-general-docs.md` does not exist.
- `README.md` is a one-line placeholder.
- There is no `package.json`, no `src/`, no frontend runtime, no backend runtime, and no test harness.
- The repository currently contains workflow and guidance files under `.codex/`.
- Git status is clean.

This is effectively a greenfield implementation inside a repository that currently acts as a Codex workflow package rather than an application.

## Reuse Opportunities

- The repository already defines a clear `think -> forge -> test` operating model.
- `.codex/workflows/forge.md` can execute the implementation plan later without inventing a new process.
- `.codex/agents/architect.md` and `.codex/agents/doc-planner.md` align well with this project because the main need right now is structure, boundaries, and traceable decisions.
- The root repository can host a workspace-based application without disturbing `.codex/` as long as runtime files are added in dedicated top-level directories.

## Risks And Edge Cases

- Hand evaluation must handle multiple aces correctly across hit, stand, dealer play, and double down.
- Natural blackjack must resolve immediately and correctly distinguish push vs player-only blackjack vs dealer-only blackjack.
- Dealer behavior must stay consistent; the soft-17 rule has to be explicit and tested.
- Double down must be disallowed after the initial decision or when bankroll is insufficient.
- The API must not leak the dealer's hidden card before reveal.
- Shuffle logic should be robust and testable, which means randomization needs to be injectable or otherwise controllable in tests.
- UI motion should not make component tests flaky.
- Starting from an empty repo means setup work can grow quickly unless the architecture is intentionally narrow.

## Recommendation

Build the project as a small monorepo with strict boundaries:

- `apps/web`: React + Vite + Tailwind UI
- `apps/api`: Express API that owns round/session state
- `packages/blackjack-engine`: pure blackjack rules and state transitions
- `packages/contracts`: shared API schemas and DTO types

This keeps the game engine framework-agnostic, lets the backend remain the source of truth for game state, and still gives the frontend a simple snapshot-driven model. It also prepares the codebase for future persistence or multiplayer work without forcing a database into the first version.

Scope recommendation for the first implementation:

- Include chips/bankroll, pre-round betting, short round history, smooth dealing/reveal animations, and responsive UI.
- Exclude split, surrender, insurance, audio, and persistent storage from the first cut.
- Use a fresh shuffled single deck per round.
- Use a dealer-stands-on-soft-17 rule.
- Use a 3:2 payout for natural blackjack when bankroll mode is enabled.
