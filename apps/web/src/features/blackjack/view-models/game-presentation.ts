import type { GameSnapshot, RoundOutcome } from '@blackjack/contracts';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export const formatChips = (value: number): string => currencyFormatter.format(value);

export const getOutcomeTone = (
  outcome: RoundOutcome | undefined,
): 'neutral' | 'success' | 'danger' | 'accent' => {
  if (!outcome) {
    return 'neutral';
  }

  if (outcome === 'player-blackjack') {
    return 'accent';
  }

  if (outcome === 'player-win' || outcome === 'dealer-bust' || outcome === 'push') {
    return 'success';
  }

  return 'danger';
};

export const getRoundActionLabel = (snapshot: GameSnapshot): string => {
  if (snapshot.bankrollExhausted) {
    return 'New Session';
  }

  if (snapshot.currentRound?.phase === 'complete') {
    return 'Restart Round';
  }

  return 'Deal Round';
};

export const getSelectionSummary = (snapshot: GameSnapshot, selectedBet: number): string => {
  if (snapshot.currentRound) {
    return `Live bet ${formatChips(snapshot.currentRound.bet)}`;
  }

  return `Selected bet ${formatChips(selectedBet)}`;
};

