export const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'] as const;
export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'] as const;

export type Suit = (typeof SUITS)[number];
export type Rank = (typeof RANKS)[number];

export interface Card {
  id: string;
  rank: Rank;
  suit: Suit;
  label: string;
}

const CARD_VALUES: Record<Rank, number> = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  J: 10,
  Q: 10,
  K: 10,
  A: 1,
};

export const createCard = (rank: Rank, suit: Suit): Card => ({
  id: `${rank}-${suit}`,
  rank,
  suit,
  label: `${rank} of ${suit}`,
});

export const getCardValue = (card: Card): number => CARD_VALUES[card.rank];

