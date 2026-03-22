# Design

## Architecture Impact

This planning update does not change the target architecture of the Blackjack application. It changes the delivery process by adding a mandatory hardening pass after the first implementation is complete.

The execution model becomes:

1. implement the application from the baseline plan
2. run a strict cross-layer review
3. fix issues directly in code
4. add or strengthen tests that cover discovered risks
5. rerun the full verification suite
6. produce a brief final implementation summary

## Review Boundaries

### Domain And Engine Review

Review focus:

- hand scoring correctness
- natural blackjack resolution
- multiple-ace handling
- dealer autoplay and soft-17 behavior
- double-down legality
- payout correctness
- impossible-state prevention

Expected outputs during `/forge`:

- engine code fixes where needed
- new regression tests tied to concrete defect classes

### API Review

Review focus:

- hidden-card protection
- invalid transition handling
- session and round state consistency
- schema validation coverage
- route ergonomics and error clarity

Expected outputs during `/forge`:

- service or presenter simplification if controllers are doing too much
- route and service tests for invalid and edge-case flows

### Frontend Review

Review focus:

- invalid action disabling
- result-state clarity
- async loading/error handling
- responsive layout quality
- accessibility basics: focus, labels, semantics, contrast
- visual consistency between dealer, player, controls, and history areas

Expected outputs during `/forge`:

- component or hook refactors where responsibilities drift
- UI tests for critical control-state and round-result behavior

### Tooling And Documentation Review

Review focus:

- script correctness from a clean checkout
- workspace command consistency
- README accuracy
- completeness of setup instructions
- visibility of important technical decisions

Expected outputs during `/forge`:

- repaired scripts
- updated README
- final verification from the repository root

## File And Module Boundaries

The hardening phase should preserve the previously planned boundaries:

- blackjack rules stay in `packages/blackjack-engine`
- transport and session state stay in `apps/api`
- view composition and async UI state stay in `apps/web`
- shared schemas stay in `packages/contracts`

If review finds boundary violations, fix them by moving logic down into the correct layer rather than patching around them in place.

## Testing Strategy

The review phase should add tests only where they close a concrete quality gap.

Required review-driven coverage categories:

- engine regression tests for any discovered blackjack-rule edge case
- API tests for invalid actions and hidden-card projection
- web tests for disabled controls, result messaging, and one responsive or accessibility-sensitive flow
- root-level verification of `lint`, `test`, and `build`

## Summary Output Contract

The final `/forge` response should be concise and include exactly these categories:

- improvements made
- bugs fixed
- important decisions
- possible future non-essential improvements

That summary should be derived from actual changes landed during the hardening phase, not from generic commentary.
