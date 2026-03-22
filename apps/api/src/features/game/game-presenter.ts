import type { CardView, GameSnapshot, RoundSnapshot } from '@blackjack/contracts';
import { getHandScore, getAllowedRoundActions, type Card } from '@blackjack/engine';

import type { ActiveRound, GameSession } from './session-store';

const toFaceUpCard = (card: Card): CardView => ({
  kind: 'faceUp',
  id: card.id,
  rank: card.rank,
  suit: card.suit,
  label: card.label,
});

const toDealerCards = (round: ActiveRound): CardView[] =>
  round.state.dealerHand.map((card, index) => {
    if (!round.state.dealerRevealed && index === 1) {
      return {
        kind: 'faceDown',
        id: `${card.id}-hidden`,
        label: 'Face down card',
      };
    }

    return toFaceUpCard(card);
  });

const getVisibleDealerTotal = (round: ActiveRound): number => {
  const visibleCards = round.state.dealerRevealed ? round.state.dealerHand : round.state.dealerHand.slice(0, 1);

  return getHandScore(visibleCards).total;
};

const presentRound = (round: ActiveRound): RoundSnapshot => {
  const playerScore = getHandScore(round.state.playerHand);
  const dealerScore = getHandScore(round.state.dealerHand);
  const dealerRevealed = round.state.dealerRevealed;

  return {
    roundNumber: round.roundNumber,
    phase: round.state.phase,
    bet: round.state.bet,
    doubledDown: round.state.doubledDown,
    dealerRevealed,
    player: {
      cards: round.state.playerHand.map(toFaceUpCard),
      total: playerScore.total,
      visibleTotal: playerScore.total,
      isBlackjack: playerScore.isBlackjack,
      isBust: playerScore.isBust,
    },
    dealer: {
      cards: toDealerCards(round),
      total: dealerRevealed ? dealerScore.total : null,
      visibleTotal: getVisibleDealerTotal(round),
      isBlackjack: dealerRevealed && dealerScore.isBlackjack,
      isBust: dealerRevealed && dealerScore.isBust,
    },
    resolution: round.state.resolution,
  };
};

const getTableMessage = (session: GameSession): string => {
  const round = session.currentRound;

  if (!round) {
    if (session.balance < session.minimumBet) {
      return 'Bankroll exhausted. Start a new session to keep playing.';
    }

    return 'Choose a chip and start the round.';
  }

  if (round.state.phase === 'complete') {
    return round.state.resolution?.message ?? 'Round complete.';
  }

  return 'Your turn. Hit, stand, or double down.';
};

const getAllowedActions = (session: GameSession) => {
  const round = session.currentRound;
  const canStartRound =
    (!round || round.state.phase === 'complete') && session.balance >= session.minimumBet;

  if (!round) {
    return {
      canStartRound,
      canHit: false,
      canStand: false,
      canDoubleDown: false,
      canCreateSession: true,
    };
  }

  const roundActions = getAllowedRoundActions(round.state, session.balance);

  return {
    canStartRound,
    canHit: roundActions.canHit,
    canStand: roundActions.canStand,
    canDoubleDown: roundActions.canDoubleDown,
    canCreateSession: true,
  };
};

export const presentGameSession = (session: GameSession): GameSnapshot => ({
  sessionId: session.id,
  balance: session.balance,
  minimumBet: session.minimumBet,
  chipOptions: [...session.chipOptions],
  bankrollExhausted:
    session.balance < session.minimumBet &&
    (!session.currentRound || session.currentRound.state.phase === 'complete'),
  tableMessage: getTableMessage(session),
  allowedActions: getAllowedActions(session),
  currentRound: session.currentRound ? presentRound(session.currentRound) : null,
  history: session.history,
});
