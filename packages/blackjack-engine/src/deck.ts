import { Card, RANKS, SUITS, createCard } from './cards';

export type RandomSource = () => number;

export const createStandardDeck = (): Card[] =>
  SUITS.flatMap((suit) => RANKS.map((rank) => createCard(rank, suit)));

export const shuffleDeck = (deck: Card[], randomSource: RandomSource = Math.random): Card[] => {
  const shuffled = [...deck];

  for (let currentIndex = shuffled.length - 1; currentIndex > 0; currentIndex -= 1) {
    const swapIndex = Math.floor(randomSource() * (currentIndex + 1));
    const currentCard = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[swapIndex]!;
    shuffled[swapIndex] = currentCard!;
  }

  return shuffled;
};

export const drawCard = (deck: Card[]): { card: Card; deck: Card[] } => {
  const [card, ...remainingDeck] = deck;

  if (!card) {
    throw new Error('Deck is empty.');
  }

  return { card, deck: remainingDeck };
};

export const prepareDeck = (deck?: Card[], randomSource?: RandomSource): Card[] => {
  if (deck) {
    return [...deck];
  }

  return shuffleDeck(createStandardDeck(), randomSource);
};

