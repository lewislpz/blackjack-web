export const ROUND_OUTCOMES = [
  'player-blackjack',
  'dealer-blackjack',
  'player-win',
  'dealer-win',
  'player-bust',
  'dealer-bust',
  'push',
] as const;

export type RoundOutcome = (typeof ROUND_OUTCOMES)[number];

