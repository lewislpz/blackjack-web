import type { Card } from './cards';
import type { RoundOutcome } from './outcomes';

export type RoundPhase = 'playerTurn' | 'complete';

export interface RoundResolution {
  outcome: RoundOutcome;
  payoutDelta: number;
  message: string;
}

export interface RoundState {
  phase: RoundPhase;
  bet: number;
  deck: Card[];
  playerHand: Card[];
  dealerHand: Card[];
  doubledDown: boolean;
  dealerRevealed: boolean;
  resolution: RoundResolution | null;
}

