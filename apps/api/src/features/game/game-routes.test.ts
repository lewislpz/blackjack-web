import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../../app';
import { GameService } from './game-service';

describe('game routes', () => {
  it('should create a session and start a round with a hidden dealer card', async () => {
    const gameService = new GameService({
      deckFactory: () => [
        { id: '10-spades', rank: '10', suit: 'spades', label: '10 of spades' },
        { id: '6-hearts', rank: '6', suit: 'hearts', label: '6 of hearts' },
        { id: '9-clubs', rank: '9', suit: 'clubs', label: '9 of clubs' },
        { id: '8-diamonds', rank: '8', suit: 'diamonds', label: '8 of diamonds' },
        { id: '5-spades', rank: '5', suit: 'spades', label: '5 of spades' },
      ],
    });
    const app = createApp({ gameService });
    const createSessionResponse = await request(app).post('/api/session').expect(201);
    const sessionId = createSessionResponse.body.sessionId as string;
    const startRoundResponse = await request(app)
      .post(`/api/session/${sessionId}/round`)
      .send({ bet: 20 })
      .expect(200);

    expect(startRoundResponse.body.currentRound.dealer.cards[1]).toEqual({
      kind: 'faceDown',
      id: '8-diamonds-hidden',
      label: 'Face down card',
    });
  });

  it('should reject invalid action transitions', async () => {
    const gameService = new GameService({
      deckFactory: () => [
        { id: '5-spades', rank: '5', suit: 'spades', label: '5 of spades' },
        { id: '6-hearts', rank: '6', suit: 'hearts', label: '6 of hearts' },
        { id: '4-clubs', rank: '4', suit: 'clubs', label: '4 of clubs' },
        { id: '8-diamonds', rank: '8', suit: 'diamonds', label: '8 of diamonds' },
        { id: '2-clubs', rank: '2', suit: 'clubs', label: '2 of clubs' },
        { id: '10-hearts', rank: '10', suit: 'hearts', label: '10 of hearts' },
      ],
    });
    const app = createApp({ gameService });
    const createSessionResponse = await request(app).post('/api/session').expect(201);
    const sessionId = createSessionResponse.body.sessionId as string;

    await request(app).post(`/api/session/${sessionId}/round`).send({ bet: 20 }).expect(200);
    await request(app).post(`/api/session/${sessionId}/action/hit`).expect(200);
    const invalidDoubleDownResponse = await request(app)
      .post(`/api/session/${sessionId}/action/double-down`)
      .expect(409);

    expect(invalidDoubleDownResponse.body).toEqual({
      code: 'ACTION_NOT_ALLOWED',
      message: 'Double down is not allowed right now.',
    });
  });

  it('should validate round bets', async () => {
    const app = createApp();
    const createSessionResponse = await request(app).post('/api/session').expect(201);
    const sessionId = createSessionResponse.body.sessionId as string;
    const invalidBetResponse = await request(app)
      .post(`/api/session/${sessionId}/round`)
      .send({ bet: 15 })
      .expect(400);

    expect(invalidBetResponse.body.code).toBe('INVALID_BET');
  });

  it('should return a 400 for malformed round payloads', async () => {
    const app = createApp();
    const createSessionResponse = await request(app).post('/api/session').expect(201);
    const sessionId = createSessionResponse.body.sessionId as string;
    const invalidPayloadResponse = await request(app)
      .post(`/api/session/${sessionId}/round`)
      .send({ bet: 'twenty' })
      .expect(400);

    expect(invalidPayloadResponse.body).toEqual({
      code: 'INVALID_REQUEST',
      message: 'Request payload is invalid.',
    });
  });
});
