import { describe, expect, it } from 'vitest';

import { doubleDownRound, hitRound } from './actions';
import { BlackjackRuleError } from './errors';
import { startRound } from './round';
import { makeCard } from './test-support';

describe('player actions', () => {
  it('should reject hit when the round is already complete', () => {
    const round = startRound({
      bet: 20,
      deck: [
        makeCard('A', 'spades'),
        makeCard('9', 'hearts'),
        makeCard('K', 'clubs'),
        makeCard('7', 'diamonds'),
      ],
    });

    expect(() => hitRound(round, 200)).toThrow(BlackjackRuleError);
  });

  it('should reject double down after the player has already hit', () => {
    const round = startRound({
      bet: 20,
      deck: [
        makeCard('5', 'spades'),
        makeCard('6', 'hearts'),
        makeCard('4', 'clubs'),
        makeCard('8', 'diamonds'),
        makeCard('2', 'clubs'),
      ],
    });
    const hitRoundState = hitRound(round, 200);

    expect(() => doubleDownRound(hitRoundState, 200)).toThrow(BlackjackRuleError);
  });

  it('should reject double down when the bankroll cannot cover it', () => {
    const round = startRound({
      bet: 50,
      deck: [
        makeCard('5', 'spades'),
        makeCard('6', 'hearts'),
        makeCard('4', 'clubs'),
        makeCard('8', 'diamonds'),
      ],
    });

    expect(() => doubleDownRound(round, 50)).toThrowErrorMatchingInlineSnapshot(
      '[BlackjackRuleError: Not enough balance to double down.]',
    );
  });
});

