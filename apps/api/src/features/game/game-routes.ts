import type { Router } from 'express';
import { CreateSessionResponseSchema, GameSnapshotSchema, StartRoundRequestSchema } from '@blackjack/contracts';
import { Router as createRouter } from 'express';

import { GameService } from './game-service';
import { presentGameSession } from './game-presenter';

export const createGameRouter = (gameService: GameService): Router => {
  const router = createRouter();

  router.post('/session', (_request, response) => {
    const snapshot = presentGameSession(gameService.createSession());
    response.status(201).json(CreateSessionResponseSchema.parse(snapshot));
  });

  router.get('/session/:sessionId', (request, response) => {
    const snapshot = presentGameSession(gameService.getSession(request.params.sessionId));
    response.json(GameSnapshotSchema.parse(snapshot));
  });

  router.post('/session/:sessionId/round', (request, response) => {
    const payload = StartRoundRequestSchema.parse(request.body);
    const snapshot = presentGameSession(gameService.startRound(request.params.sessionId, payload.bet));
    response.json(GameSnapshotSchema.parse(snapshot));
  });

  router.post('/session/:sessionId/action/hit', (request, response) => {
    const snapshot = presentGameSession(gameService.hit(request.params.sessionId));
    response.json(GameSnapshotSchema.parse(snapshot));
  });

  router.post('/session/:sessionId/action/stand', (request, response) => {
    const snapshot = presentGameSession(gameService.stand(request.params.sessionId));
    response.json(GameSnapshotSchema.parse(snapshot));
  });

  router.post('/session/:sessionId/action/double-down', (request, response) => {
    const snapshot = presentGameSession(gameService.doubleDown(request.params.sessionId));
    response.json(GameSnapshotSchema.parse(snapshot));
  });

  return router;
};
