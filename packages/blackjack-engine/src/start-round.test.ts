import { describe, expect, it } from 'vitest';

import { startRound } from './round';
import { makeCard } from './test-support';

describe('startRound', () => {
  it('should deal player-dealer-player-dealer from the top of the deck', () => {
    const round = startRound({
      bet: 20,
      deck: [
        makeCard('10', 'spades'),
        makeCard('6', 'hearts'),
        makeCard('9', 'clubs'),
        makeCard('8', 'diamonds'),
        makeCard('2', 'clubs'),
      ],
    });

    expect(round.playerHand.map((card) => card.id)).toEqual(['10-spades', '9-clubs']);
    expect(round.dealerHand.map((card) => card.id)).toEqual(['6-hearts', '8-diamonds']);
    expect(round.phase).toBe('playerTurn');
    expect(round.dealerRevealed).toBe(false);
  });

  it('should resolve player blackjack immediately', () => {
    const round = startRound({
      bet: 20,
      deck: [
        makeCard('A', 'spades'),
        makeCard('9', 'hearts'),
        makeCard('K', 'clubs'),
        makeCard('7', 'diamonds'),
      ],
    });

    expect(round.phase).toBe('complete');
    expect(round.dealerRevealed).toBe(true);
    expect(round.resolution?.outcome).toBe('player-blackjack');
    expect(round.resolution?.payoutDelta).toBe(30);
  });
});

