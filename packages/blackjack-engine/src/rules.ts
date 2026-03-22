import type { Card } from './cards';
import type { RoundState } from './round-state';

import { getHandScore } from './hand';

export interface AllowedRoundActions {
  canHit: boolean;
  canStand: boolean;
  canDoubleDown: boolean;
}

export const dealerShouldDraw = (dealerHand: Card[]): boolean => getHandScore(dealerHand).total < 17;

export const getAllowedRoundActions = (
  round: RoundState,
  availableBalance: number,
): AllowedRoundActions => {
  const playerScore = getHandScore(round.playerHand);

  if (round.phase === 'complete') {
    return {
      canHit: false,
      canStand: false,
      canDoubleDown: false,
    };
  }

  return {
    canHit: playerScore.total < 21,
    canStand: playerScore.total <= 21,
    canDoubleDown:
      round.playerHand.length === 2 &&
      !round.doubledDown &&
      playerScore.total < 21 &&
      availableBalance >= round.bet * 2,
  };
};

