import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';

import { server } from '@/test/server';

import BlackjackTable from './BlackjackTable';

const installMatchMedia = (matches: boolean): void => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: () => ({
      matches,
      media: '(max-width: 1023px)',
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
};

const baseSnapshot = {
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

const inRoundSnapshot = {
  ...baseSnapshot,
  tableMessage: 'Your turn. Hit, stand, or double down.',
  allowedActions: {
    canStartRound: false,
    canHit: true,
    canStand: true,
    canDoubleDown: true,
    canCreateSession: true,
  },
  currentRound: {
    roundNumber: 1,
    phase: 'playerTurn',
    bet: 20,
    doubledDown: false,
    dealerRevealed: false,
    player: {
      cards: [
        { kind: 'faceUp', id: '10-spades', rank: '10', suit: 'spades', label: '10 of spades' },
        { kind: 'faceUp', id: '9-clubs', rank: '9', suit: 'clubs', label: '9 of clubs' },
      ],
      total: 19,
      visibleTotal: 19,
      isBlackjack: false,
      isBust: false,
    },
    dealer: {
      cards: [
        { kind: 'faceUp', id: '6-hearts', rank: '6', suit: 'hearts', label: '6 of hearts' },
        { kind: 'faceDown', id: '8-diamonds-hidden', label: 'Face down card' },
      ],
      total: null,
      visibleTotal: 6,
      isBlackjack: false,
      isBust: false,
    },
    resolution: null,
  },
};

const completedSnapshot = {
  ...baseSnapshot,
  balance: 520,
  tableMessage: 'You win.',
  allowedActions: {
    canStartRound: true,
    canHit: false,
    canStand: false,
    canDoubleDown: false,
    canCreateSession: true,
  },
  currentRound: {
    ...inRoundSnapshot.currentRound,
    phase: 'complete',
    dealerRevealed: true,
    dealer: {
      cards: [
        { kind: 'faceUp', id: '6-hearts', rank: '6', suit: 'hearts', label: '6 of hearts' },
        { kind: 'faceUp', id: '8-diamonds', rank: '8', suit: 'diamonds', label: '8 of diamonds' },
        { kind: 'faceUp', id: '5-clubs', rank: '5', suit: 'clubs', label: '5 of clubs' },
      ],
      total: 19,
      visibleTotal: 19,
      isBlackjack: false,
      isBust: false,
    },
    resolution: {
      outcome: 'player-win',
      payoutDelta: 20,
      message: 'You win.',
    },
  },
  history: [
    {
      roundNumber: 1,
      outcome: 'player-win',
      bet: 20,
      payoutDelta: 20,
      balanceAfterRound: 520,
      timestamp: '2026-03-22T00:00:00.000Z',
    },
  ],
};

describe('BlackjackTable', () => {
  it('should play one round through the React UI', async () => {
    installMatchMedia(false);

    server.use(
      http.post('/api/session', () => HttpResponse.json(baseSnapshot)),
      http.post('/api/session/session-1/round', async ({ request }) => {
        const payload = (await request.json()) as { bet: number };

        expect(payload.bet).toBe(20);

        return HttpResponse.json(inRoundSnapshot);
      }),
      http.post('/api/session/session-1/action/stand', () => HttpResponse.json(completedSnapshot)),
    );

    render(<BlackjackTable />);
    const user = userEvent.setup();

    await waitFor(() => expect(screen.getByRole('button', { name: 'Deal Round' })).toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: '$20' }));
    await user.click(screen.getByRole('button', { name: 'Deal Round' }));

    await waitFor(() => expect(screen.getByRole('button', { name: 'Stand' })).toBeEnabled());
    expect(screen.getByRole('button', { name: 'Hit' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: 'Stand' }));

    await waitFor(() => expect(screen.getByText('You win.')).toBeInTheDocument());
    expect(screen.getByRole('button', { name: 'Restart Round' })).toBeEnabled();
    expect(screen.getByText('Round 1')).toBeInTheDocument();
  });

  it('should render the mobile dock and switch secondary panels without document scroll layout loss', async () => {
    installMatchMedia(true);

    server.use(http.post('/api/session', () => HttpResponse.json(baseSnapshot)));

    render(<BlackjackTable />);
    const user = userEvent.setup();

    await waitFor(() => expect(screen.getByTestId('single-page-shell')).toHaveAttribute('data-layout', 'single-page'));
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bet' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'History' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'History' }));
    expect(screen.getByText('Table ledger')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Bet' }));
    expect(screen.getByRole('button', { name: 'Deal Round' })).toBeInTheDocument();
  });
});
