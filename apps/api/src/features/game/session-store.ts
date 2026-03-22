import type { RoundHistoryEntry } from '@blackjack/contracts';
import type { RoundState } from '@blackjack/engine';

import { CHIP_OPTIONS, INITIAL_BALANCE, MINIMUM_BET } from '../../config';

export interface ActiveRound {
  roundNumber: number;
  state: RoundState;
}

export interface GameSession {
  id: string;
  balance: number;
  minimumBet: number;
  chipOptions: readonly number[];
  nextRoundNumber: number;
  history: RoundHistoryEntry[];
  currentRound: ActiveRound | null;
}

export class GameSessionStore {
  readonly sessions = new Map<string, GameSession>();

  createSession(sessionId: string): GameSession {
    const session: GameSession = {
      id: sessionId,
      balance: INITIAL_BALANCE,
      minimumBet: MINIMUM_BET,
      chipOptions: CHIP_OPTIONS,
      nextRoundNumber: 1,
      history: [],
      currentRound: null,
    };

    this.sessions.set(session.id, session);

    return session;
  }

  getSession(sessionId: string): GameSession | undefined {
    return this.sessions.get(sessionId);
  }
}

