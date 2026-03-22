import type { GameSnapshot } from '@blackjack/contracts';
import { startTransition, useCallback, useEffect, useState } from 'react';

import { createSession, doubleDown, hit, stand, startRound } from '../api/client';

interface BlackjackGameState {
  snapshot: GameSnapshot | null;
  selectedBet: number;
  isBusy: boolean;
  error: string | null;
  createFreshSession: () => Promise<void>;
  setSelectedBet: (value: number) => void;
  startSelectedRound: () => Promise<void>;
  hit: () => Promise<void>;
  stand: () => Promise<void>;
  doubleDown: () => Promise<void>;
}

const pickAffordableChip = (snapshot: GameSnapshot, preferredChip: number | null): number => {
  const affordableChip = snapshot.chipOptions.find((chip) => chip <= snapshot.balance) ?? snapshot.chipOptions[0];

  if (!affordableChip) {
    return snapshot.minimumBet;
  }

  if (preferredChip !== null && snapshot.chipOptions.includes(preferredChip) && preferredChip <= snapshot.balance) {
    return preferredChip;
  }

  return affordableChip;
};

export const useBlackjackGame = (): BlackjackGameState => {
  const [snapshot, setSnapshot] = useState<GameSnapshot | null>(null);
  const [selectedBet, setSelectedBet] = useState(10);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applySnapshot = useCallback((nextSnapshot: GameSnapshot): void => {
    startTransition(() => {
      setSnapshot(nextSnapshot);
      setSelectedBet((currentChip) => pickAffordableChip(nextSnapshot, currentChip));
      setError(null);
    });
  }, []);

  const withMutation = async (operation: () => Promise<GameSnapshot>): Promise<void> => {
    setIsBusy(true);

    try {
      const nextSnapshot = await operation();
      applySnapshot(nextSnapshot);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unexpected request failure.');
    } finally {
      setIsBusy(false);
    }
  };

  const createFreshSession = useCallback(async (): Promise<void> => {
    setIsBusy(true);

    try {
      const nextSnapshot = await createSession();
      applySnapshot(nextSnapshot);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Unexpected request failure.');
    } finally {
      setIsBusy(false);
    }
  }, [applySnapshot]);

  useEffect(() => {
    void createFreshSession();
  }, [createFreshSession]);

  return {
    snapshot,
    selectedBet,
    isBusy,
    error,
    createFreshSession,
    setSelectedBet,
    startSelectedRound: async () => {
      if (!snapshot) {
        return;
      }

      if (snapshot.bankrollExhausted) {
        await createFreshSession();
        return;
      }

      await withMutation(() => startRound(snapshot.sessionId, selectedBet));
    },
    hit: async () => {
      if (!snapshot) {
        return;
      }

      await withMutation(() => hit(snapshot.sessionId));
    },
    stand: async () => {
      if (!snapshot) {
        return;
      }

      await withMutation(() => stand(snapshot.sessionId));
    },
    doubleDown: async () => {
      if (!snapshot) {
        return;
      }

      await withMutation(() => doubleDown(snapshot.sessionId));
    },
  };
};
