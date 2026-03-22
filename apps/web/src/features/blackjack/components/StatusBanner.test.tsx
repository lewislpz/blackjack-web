import { render, screen } from '@testing-library/react';

import StatusBanner from './StatusBanner';

const snapshot = {
  sessionId: 'session-1',
  balance: 500,
  minimumBet: 10,
  chipOptions: [10, 20, 50, 100],
  bankrollExhausted: false,
  tableMessage: 'Choose a chip and start the round.',
  allowedActions: {
    canStartRound: true,
    canHit: false,
    canStand: false,
    canDoubleDown: false,
    canCreateSession: true,
  },
  currentRound: null,
  history: [],
};

describe('StatusBanner', () => {
  it('should render the current table message', () => {
    render(<StatusBanner snapshot={snapshot} error={null} />);

    expect(screen.getByText('Choose a chip and start the round.')).toBeInTheDocument();
    expect(screen.getByText('Dealer stands on all 17 values.')).toBeInTheDocument();
  });
});

