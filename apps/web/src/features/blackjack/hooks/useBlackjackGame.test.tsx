import { renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';

import { server } from '@/test/server';

import { useBlackjackGame } from './useBlackjackGame';

describe('useBlackjackGame', () => {
  it('should create a session on mount and pick an affordable chip', async () => {
    server.use(
      http.post('/api/session', () =>
        HttpResponse.json({
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
        }),
      ),
    );

    const { result } = renderHook(() => useBlackjackGame());

    await waitFor(() => expect(result.current.snapshot?.sessionId).toBe('session-1'));
    expect(result.current.selectedBet).toBe(10);
  });
});

