import { describe, expect, it } from 'vitest';

import { startRound } from '@blackjack/engine';

import { presentGameSession } from './game-presenter';
import { type GameSession } from './session-store';

const buildSession = (): GameSession => ({
  id: 'session-1',
  balance: 500,
  minimumBet: 10,
  chipOptions: [10, 20, 50, 100],
  nextRoundNumber: 1,
  history: [],
  currentRound: {
    roundNumber: 1,
    state: startRound({
      bet: 20,
      deck: [
        { id: '10-spades', rank: '10', suit: 'spades', label: '10 of spades' },
        { id: '6-hearts', rank: '6', suit: 'hearts', label: '6 of hearts' },
        { id: '9-clubs', rank: '9', suit: 'clubs', label: '9 of clubs' },
        { id: '8-diamonds', rank: '8', suit: 'diamonds', label: '8 of diamonds' },
      ],
    }),
  },
});

describe('game presenter', () => {
  it('should keep the dealer hole card hidden during the player turn', () => {
    const snapshot = presentGameSession(buildSession());

    expect(snapshot.currentRound?.dealer.cards[1]).toEqual({
      kind: 'faceDown',
      id: '8-diamonds-hidden',
      label: 'Face down card',
    });
    expect(snapshot.currentRound?.dealer.total).toBeNull();
  });
});

