import type { Card } from './cards';

import { BlackjackRuleError } from './errors';
import { prepareDeck, drawCard, type RandomSource } from './deck';
import { getHandScore } from './hand';
import { type RoundOutcome } from './outcomes';
import { dealerShouldDraw } from './rules';
import { type RoundResolution, type RoundState } from './round-state';

export interface StartRoundOptions {
  bet: number;
  deck?: Card[];
  randomSource?: RandomSource;
}

const buildResolution = (outcome: RoundOutcome, bet: number, doubledDown: boolean): RoundResolution => {
  const stake = doubledDown ? bet * 2 : bet;

  switch (outcome) {
    case 'player-blackjack':
      return {
        outcome,
        payoutDelta: Math.round(bet * 1.5),
        message: 'Blackjack. You win.',
      };
    case 'dealer-blackjack':
      return {
        outcome,
        payoutDelta: -bet,
        message: 'Dealer blackjack. You lose.',
      };
    case 'player-win':
      return {
        outcome,
        payoutDelta: stake,
        message: 'You win.',
      };
    case 'dealer-win':
      return {
        outcome,
        payoutDelta: -stake,
        message: 'Dealer wins.',
      };
    case 'player-bust':
      return {
        outcome,
        payoutDelta: -stake,
        message: 'Bust. Dealer wins.',
      };
    case 'dealer-bust':
      return {
        outcome,
        payoutDelta: stake,
        message: 'Dealer busts. You win.',
      };
    case 'push':
      return {
        outcome,
        payoutDelta: 0,
        message: 'Push. Bet returned.',
      };
  }
};

const completeRound = (round: RoundState, outcome: RoundOutcome): RoundState => ({
  ...round,
  phase: 'complete',
  dealerRevealed: true,
  resolution: buildResolution(outcome, round.bet, round.doubledDown),
});

const resolveNaturals = (round: RoundState): RoundState => {
  const playerScore = getHandScore(round.playerHand);
  const dealerScore = getHandScore(round.dealerHand);

  if (playerScore.isBlackjack && dealerScore.isBlackjack) {
    return completeRound(round, 'push');
  }

  if (playerScore.isBlackjack) {
    return completeRound(round, 'player-blackjack');
  }

  if (dealerScore.isBlackjack) {
    return completeRound(round, 'dealer-blackjack');
  }

  return round;
};

export const compareHands = (playerHand: Card[], dealerHand: Card[]): RoundOutcome => {
  const playerScore = getHandScore(playerHand);
  const dealerScore = getHandScore(dealerHand);

  if (playerScore.isBust) {
    return 'player-bust';
  }

  if (dealerScore.isBust) {
    return 'dealer-bust';
  }

  if (playerScore.total > dealerScore.total) {
    return 'player-win';
  }

  if (playerScore.total < dealerScore.total) {
    return 'dealer-win';
  }

  return 'push';
};

export const settleDealerTurn = (round: RoundState): RoundState => {
  if (round.phase === 'complete') {
    return round;
  }

  let dealerHand = [...round.dealerHand];
  let deck = [...round.deck];

  while (dealerShouldDraw(dealerHand)) {
    const draw = drawCard(deck);
    dealerHand = [...dealerHand, draw.card];
    deck = draw.deck;
  }

  return completeRound({ ...round, dealerHand, deck }, compareHands(round.playerHand, dealerHand));
};

export const startRound = ({ bet, deck, randomSource }: StartRoundOptions): RoundState => {
  if (!Number.isInteger(bet) || bet <= 0) {
    throw new BlackjackRuleError('INVALID_BET', 'Bet must be a positive integer.');
  }

  let preparedDeck = prepareDeck(deck, randomSource);

  const firstPlayerDraw = drawCard(preparedDeck);
  preparedDeck = firstPlayerDraw.deck;
  const firstDealerDraw = drawCard(preparedDeck);
  preparedDeck = firstDealerDraw.deck;
  const secondPlayerDraw = drawCard(preparedDeck);
  preparedDeck = secondPlayerDraw.deck;
  const secondDealerDraw = drawCard(preparedDeck);

  const round: RoundState = {
    phase: 'playerTurn',
    bet,
    deck: secondDealerDraw.deck,
    playerHand: [firstPlayerDraw.card, secondPlayerDraw.card],
    dealerHand: [firstDealerDraw.card, secondDealerDraw.card],
    doubledDown: false,
    dealerRevealed: false,
    resolution: null,
  };

  return resolveNaturals(round);
};

