import { describe, expect, it } from 'vitest';

import { doubleDownRound, standRound } from './actions';
import { startRound } from './round';
import { makeCard } from './test-support';

describe('round settlement', () => {
  it('should make the dealer stand on soft 17', () => {
    const round = startRound({
      bet: 20,
      deck: [
        makeCard('10', 'clubs'),
        makeCard('A', 'spades'),
        makeCard('7', 'diamonds'),
        makeCard('6', 'hearts'),
        makeCard('5', 'clubs'),
      ],
    });
    const settled = standRound(round, 200);

    expect(settled.dealerHand).toHaveLength(2);
    expect(settled.resolution?.outcome).toBe('push');
  });

  it('should pay a normal win when the dealer busts', () => {
    const round = startRound({
      bet: 20,
      deck: [
        makeCard('10', 'clubs'),
        makeCard('9', 'spades'),
        makeCard('7', 'diamonds'),
        makeCard('6', 'hearts'),
        makeCard('8', 'clubs'),
      ],
    });
    const settled = standRound(round, 200);

    expect(settled.resolution?.outcome).toBe('dealer-bust');
    expect(settled.resolution?.payoutDelta).toBe(20);
  });

  it('should double the stake when doubling down and winning', () => {
    const round = startRound({
      bet: 20,
      deck: [
        makeCard('6', 'clubs'),
        makeCard('7', 'spades'),
        makeCard('5', 'diamonds'),
        makeCard('8', 'hearts'),
        makeCard('10', 'clubs'),
        makeCard('9', 'clubs'),
      ],
    });
    const settled = doubleDownRound(round, 200);

    expect(settled.doubledDown).toBe(true);
    expect(settled.resolution?.outcome).toBe('dealer-bust');
    expect(settled.resolution?.payoutDelta).toBe(40);
  });
});
