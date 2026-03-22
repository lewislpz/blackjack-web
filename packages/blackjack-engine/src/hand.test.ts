import { describe, expect, it } from 'vitest';

import { getHandScore } from './hand';
import { makeCard } from './test-support';

describe('hand scoring', () => {
  it('should value an ace as 11 when it helps the hand', () => {
    const score = getHandScore([makeCard('A', 'spades'), makeCard('9', 'hearts')]);

    expect(score.total).toBe(20);
    expect(score.isSoft).toBe(true);
    expect(score.isBlackjack).toBe(false);
  });

  it('should handle multiple aces without busting incorrectly', () => {
    const score = getHandScore([
      makeCard('A', 'spades'),
      makeCard('A', 'hearts'),
      makeCard('9', 'clubs'),
    ]);

    expect(score.total).toBe(21);
    expect(score.isSoft).toBe(true);
  });

  it('should detect a natural blackjack', () => {
    const score = getHandScore([makeCard('A', 'spades'), makeCard('K', 'clubs')]);

    expect(score.total).toBe(21);
    expect(score.isBlackjack).toBe(true);
  });

  it('should mark busted hands correctly', () => {
    const score = getHandScore([
      makeCard('K', 'clubs'),
      makeCard('9', 'diamonds'),
      makeCard('5', 'hearts'),
    ]);

    expect(score.total).toBe(24);
    expect(score.isBust).toBe(true);
  });
});

