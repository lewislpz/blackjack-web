import cors from 'cors';
import express from 'express';

import { errorHandler } from './middleware/error-handler';
import { createGameRouter } from './features/game/game-routes';
import { GameService } from './features/game/game-service';

export interface CreateAppOptions {
  gameService?: GameService;
}

export const createApp = ({ gameService = new GameService() }: CreateAppOptions = {}) => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get('/health', (_request, response) => {
    response.json({ status: 'ok' });
  });

  app.use('/api', createGameRouter(gameService));
  app.use(errorHandler);

  return app;
};

