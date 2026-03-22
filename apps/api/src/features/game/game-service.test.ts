import { describe, expect, it } from 'vitest';

import { GameService } from './game-service';

describe('game service', () => {
  it('should settle a natural blackjack immediately and update balance and history', () => {
    const service = new GameService({
      deckFactory: () => [
        { id: 'A-spades', rank: 'A', suit: 'spades', label: 'A of spades' },
        { id: '9-hearts', rank: '9', suit: 'hearts', label: '9 of hearts' },
        { id: 'K-clubs', rank: 'K', suit: 'clubs', label: 'K of clubs' },
        { id: '7-diamonds', rank: '7', suit: 'diamonds', label: '7 of diamonds' },
      ],
      now: () => '2026-03-22T00:00:00.000Z',
    });
    const session = service.createSession();
    const updatedSession = service.startRound(session.id, 20);

    expect(updatedSession.balance).toBe(530);
    expect(updatedSession.currentRound?.state.resolution?.outcome).toBe('player-blackjack');
    expect(updatedSession.history).toHaveLength(1);
  });
});

