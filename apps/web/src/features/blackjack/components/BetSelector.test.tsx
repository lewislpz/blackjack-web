import { render, screen } from '@testing-library/react';

import BetSelector from './BetSelector';

const exhaustedSnapshot = {
  sessionId: 'session-1',
  balance: 0,
  minimumBet: 10,
  chipOptions: [10, 20, 50, 100],
  bankrollExhausted: true,
  tableMessage: 'Bankroll exhausted. Start a new session to keep playing.',
  allowedActions: {
    canStartRound: false,
    canHit: false,
    canStand: false,
    canDoubleDown: false,
    canCreateSession: true,
  },
  currentRound: null,
  history: [],
};

describe('BetSelector', () => {
  it('should switch the main call to action to a fresh session when the bankroll is exhausted', () => {
    render(
      <BetSelector
        snapshot={exhaustedSnapshot}
        selectedBet={10}
        isBusy={false}
        onChangeBet={() => {}}
        onStartRound={async () => {}}
      />,
    );

    expect(screen.getByRole('button', { name: 'New Session' })).toBeDisabled();
  });
});
