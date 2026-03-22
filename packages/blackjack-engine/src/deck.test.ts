import { describe, expect, it } from 'vitest';

import { createStandardDeck, shuffleDeck } from './deck';

describe('deck', () => {
  it('should create a standard 52-card deck with unique ids', () => {
    const deck = createStandardDeck();

    expect(deck).toHaveLength(52);
    expect(new Set(deck.map((card) => card.id)).size).toBe(52);
  });

  it('should shuffle cards without losing any of them', () => {
    const deck = createStandardDeck();
    const randomValues = [0.1, 0.7, 0.2, 0.9, 0.4, 0.3, 0.8, 0.6, 0.5];
    let randomIndex = 0;
    const shuffled = shuffleDeck(deck, () => randomValues[randomIndex++ % randomValues.length]!);

    expect(shuffled).toHaveLength(deck.length);
    expect(shuffled.map((card) => card.id).sort()).toEqual(deck.map((card) => card.id).sort());
    expect(shuffled).not.toEqual(deck);
  });
});

