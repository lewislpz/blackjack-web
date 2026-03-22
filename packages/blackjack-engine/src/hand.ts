import { Card, getCardValue } from './cards';

export interface HandScore {
  total: number;
  hardTotal: number;
  softTotal: number | null;
  isSoft: boolean;
  isBlackjack: boolean;
  isBust: boolean;
}

export const getHandScore = (hand: Card[]): HandScore => {
  const hardTotal = hand.reduce((total, card) => total + getCardValue(card), 0);
  const aceCount = hand.filter((card) => card.rank === 'A').length;
  const softTotal = aceCount > 0 && hardTotal + 10 <= 21 ? hardTotal + 10 : null;
  const total = softTotal ?? hardTotal;

  return {
    total,
    hardTotal,
    softTotal,
    isSoft: softTotal !== null,
    isBlackjack: hand.length === 2 && total === 21,
    isBust: total > 21,
  };
};

