import { type Rank, type Suit, createCard } from './cards';

export const makeCard = (rank: Rank, suit: Suit) => createCard(rank, suit);

