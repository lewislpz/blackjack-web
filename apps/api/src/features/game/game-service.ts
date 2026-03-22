import type { RoundHistoryEntry } from '@blackjack/contracts';
import {
  BlackjackRuleError,
  doubleDownRound,
  hitRound,
  standRound,
  startRound,
  type Card,
  type RoundState,
} from '@blackjack/engine';
import { randomUUID } from 'node:crypto';

import { MAX_HISTORY_ITEMS } from '../../config';
import { ApiRequestError } from '../../middleware/error-handler';
import { GameSessionStore, type ActiveRound, type GameSession } from './session-store';

export interface GameServiceOptions {
  deckFactory?: () => Card[] | undefined;
  now?: () => string;
  sessionStore?: GameSessionStore;
}

export class GameService {
  private readonly deckFactory: (() => Card[] | undefined) | undefined;
  private readonly now: () => string;
  private readonly sessionStore: GameSessionStore;

  constructor({ deckFactory, now, sessionStore }: GameServiceOptions = {}) {
    this.deckFactory = deckFactory;
    this.now = now ?? (() => new Date().toISOString());
    this.sessionStore = sessionStore ?? new GameSessionStore();
  }

  createSession(): GameSession {
    return this.sessionStore.createSession(randomUUID());
  }

  getSession(sessionId: string): GameSession {
    const session = this.sessionStore.getSession(sessionId);

    if (!session) {
      throw new ApiRequestError(404, 'SESSION_NOT_FOUND', 'Session was not found.');
    }

    return session;
  }

  startRound(sessionId: string, bet: number): GameSession {
    const session = this.getSession(sessionId);

    this.assertCanStartRound(session);
    this.assertValidBet(session, bet);

    const roundNumber = session.nextRoundNumber;
    const deck = this.deckFactory?.();
    const state = deck ? startRound({ bet, deck }) : startRound({ bet });

    session.currentRound = {
      roundNumber,
      state,
    };

    if (state.phase === 'complete') {
      this.finalizeRound(session, session.currentRound);
    }

    return session;
  }

  hit(sessionId: string): GameSession {
    const session = this.getSession(sessionId);
    const round = this.requireActiveRound(session);

    session.currentRound = {
      ...round,
      state: this.applyAction(() => hitRound(round.state, session.balance)),
    };

    this.finalizeIfComplete(session);

    return session;
  }

  stand(sessionId: string): GameSession {
    const session = this.getSession(sessionId);
    const round = this.requireActiveRound(session);

    session.currentRound = {
      ...round,
      state: this.applyAction(() => standRound(round.state, session.balance)),
    };

    this.finalizeIfComplete(session);

    return session;
  }

  doubleDown(sessionId: string): GameSession {
    const session = this.getSession(sessionId);
    const round = this.requireActiveRound(session);

    session.currentRound = {
      ...round,
      state: this.applyAction(() => doubleDownRound(round.state, session.balance)),
    };

    this.finalizeIfComplete(session);

    return session;
  }

  private applyAction(action: () => RoundState): RoundState {
    try {
      return action();
    } catch (error) {
      if (error instanceof BlackjackRuleError) {
        const statusCode =
          error.code === 'INSUFFICIENT_BALANCE' ? 400 : error.code === 'ROUND_COMPLETE' ? 409 : 409;

        throw new ApiRequestError(statusCode, error.code, error.message);
      }

      throw error;
    }
  }

  private requireActiveRound(session: GameSession): ActiveRound {
    if (!session.currentRound) {
      throw new ApiRequestError(409, 'ROUND_NOT_STARTED', 'Start a round before taking actions.');
    }

    if (session.currentRound.state.phase === 'complete') {
      throw new ApiRequestError(409, 'ROUND_COMPLETE', 'Start a new round to keep playing.');
    }

    return session.currentRound;
  }

  private assertCanStartRound(session: GameSession): void {
    if (session.currentRound?.state.phase === 'playerTurn') {
      throw new ApiRequestError(409, 'ROUND_IN_PROGRESS', 'Finish the current round first.');
    }

    if (session.balance < session.minimumBet) {
      throw new ApiRequestError(400, 'BANKROLL_EXHAUSTED', 'Not enough balance to start a round.');
    }
  }

  private assertValidBet(session: GameSession, bet: number): void {
    if (!Number.isInteger(bet) || bet <= 0) {
      throw new ApiRequestError(400, 'INVALID_BET', 'Bet must be a positive integer.');
    }

    if (!session.chipOptions.includes(bet)) {
      throw new ApiRequestError(400, 'INVALID_BET', 'Bet must match one of the available chip values.');
    }

    if (bet > session.balance) {
      throw new ApiRequestError(400, 'INVALID_BET', 'Bet cannot exceed the current balance.');
    }
  }

  private finalizeIfComplete(session: GameSession): void {
    if (session.currentRound?.state.phase === 'complete') {
      this.finalizeRound(session, session.currentRound);
    }
  }

  private finalizeRound(session: GameSession, round: ActiveRound): void {
    const resolution = round.state.resolution;

    if (!resolution) {
      throw new ApiRequestError(500, 'ROUND_NOT_SETTLED', 'The round ended without a resolution.');
    }

    session.balance = Math.max(0, session.balance + resolution.payoutDelta);
    session.history = [
      this.buildHistoryEntry(round, session.balance),
      ...session.history,
    ].slice(0, MAX_HISTORY_ITEMS);
    session.nextRoundNumber = round.roundNumber + 1;
  }

  private buildHistoryEntry(round: ActiveRound, balanceAfterRound: number): RoundHistoryEntry {
    const resolution = round.state.resolution;

    if (!resolution) {
      throw new ApiRequestError(500, 'ROUND_NOT_SETTLED', 'The round ended without a resolution.');
    }

    return {
      roundNumber: round.roundNumber,
      outcome: resolution.outcome,
      bet: round.state.bet,
      payoutDelta: resolution.payoutDelta,
      balanceAfterRound,
      timestamp: this.now(),
    };
  }
}
