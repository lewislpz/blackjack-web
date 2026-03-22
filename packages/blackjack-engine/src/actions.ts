import { BlackjackRuleError } from './errors';
import { drawCard } from './deck';
import { getHandScore } from './hand';
import { settleDealerTurn } from './round';
import { getAllowedRoundActions } from './rules';
import { type RoundState } from './round-state';

const ensureRoundInProgress = (round: RoundState): void => {
  if (round.phase === 'complete') {
    throw new BlackjackRuleError('ROUND_COMPLETE', 'The round has already finished.');
  }
};

const completePlayerBust = (round: RoundState): RoundState => ({
  ...round,
  phase: 'complete',
  dealerRevealed: true,
  resolution: {
    outcome: 'player-bust',
    payoutDelta: round.doubledDown ? -round.bet * 2 : -round.bet,
    message: 'Bust. Dealer wins.',
  },
});

export const hitRound = (round: RoundState, availableBalance: number): RoundState => {
  ensureRoundInProgress(round);

  if (!getAllowedRoundActions(round, availableBalance).canHit) {
    throw new BlackjackRuleError('ACTION_NOT_ALLOWED', 'Hit is not allowed right now.');
  }

  const draw = drawCard(round.deck);
  const nextRound: RoundState = {
    ...round,
    deck: draw.deck,
    playerHand: [...round.playerHand, draw.card],
  };
  const playerScore = getHandScore(nextRound.playerHand);

  if (playerScore.isBust) {
    return completePlayerBust(nextRound);
  }

  if (playerScore.total === 21) {
    return settleDealerTurn(nextRound);
  }

  return nextRound;
};

export const standRound = (round: RoundState, availableBalance: number): RoundState => {
  ensureRoundInProgress(round);

  if (!getAllowedRoundActions(round, availableBalance).canStand) {
    throw new BlackjackRuleError('ACTION_NOT_ALLOWED', 'Stand is not allowed right now.');
  }

  return settleDealerTurn(round);
};

export const doubleDownRound = (round: RoundState, availableBalance: number): RoundState => {
  ensureRoundInProgress(round);

  const allowedActions = getAllowedRoundActions(round, availableBalance);

  if (!allowedActions.canDoubleDown) {
    const errorCode = availableBalance < round.bet * 2 ? 'INSUFFICIENT_BALANCE' : 'ACTION_NOT_ALLOWED';
    const message =
      errorCode === 'INSUFFICIENT_BALANCE'
        ? 'Not enough balance to double down.'
        : 'Double down is not allowed right now.';

    throw new BlackjackRuleError(errorCode, message);
  }

  const draw = drawCard(round.deck);
  const nextRound: RoundState = {
    ...round,
    deck: draw.deck,
    doubledDown: true,
    playerHand: [...round.playerHand, draw.card],
  };
  const playerScore = getHandScore(nextRound.playerHand);

  if (playerScore.isBust) {
    return completePlayerBust(nextRound);
  }

  return settleDealerTurn(nextRound);
};

