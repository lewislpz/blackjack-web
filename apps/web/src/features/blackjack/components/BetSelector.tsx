import type { GameSnapshot } from '@blackjack/contracts';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { formatChips, getRoundActionLabel, getSelectionSummary } from '../view-models/game-presentation';

interface BetSelectorProps {
  snapshot: GameSnapshot;
  selectedBet: number;
  isBusy: boolean;
  onChangeBet: (value: number) => void;
  onStartRound: () => Promise<void>;
  compact?: boolean;
  className?: string;
}

const BetSelector = ({
  snapshot,
  selectedBet,
  isBusy,
  onChangeBet,
  onStartRound,
  compact = false,
  className,
}: BetSelectorProps) => {
  const canSelectBet = !snapshot.currentRound || snapshot.currentRound.phase === 'complete';

  return (
    <section className={twMerge(clsx('glass-panel rounded-[1.8rem]', compact ? 'p-4' : 'p-5', className))}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-100/60 [text-shadow:0_1px_0_rgba(0,0,0,0.55)]">
            Bankroll
          </p>
          <p
            className={twMerge(
              clsx(
                'mt-2 font-bold text-amber-50 [text-shadow:0_1px_0_rgba(0,0,0,0.55)]',
                compact ? 'text-2xl' : 'text-3xl',
              ),
            )}
          >
            {formatChips(snapshot.balance)}
          </p>
        </div>
        <div
          className={twMerge(
            clsx(
              'status-pill rounded-full text-stone-100/80',
              compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
            ),
          )}
        >
          {getSelectionSummary(snapshot, selectedBet)}
        </div>
      </div>
      <div className={twMerge(clsx('flex flex-wrap gap-2.5', compact ? 'mt-4' : 'mt-5'))}>
        {snapshot.chipOptions.map((chip) => {
          const isSelected = chip === selectedBet;
          const isDisabled = !canSelectBet || chip > snapshot.balance || isBusy;

          return (
            <button
              key={chip}
              type="button"
              aria-pressed={isSelected}
              disabled={isDisabled}
              onClick={() => onChangeBet(chip)}
              className={twMerge(
                clsx(
                  'chip-button rounded-full font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-amber-300',
                  compact ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm',
                  isSelected && 'chip-button--active',
                  isDisabled && 'chip-button--disabled',
                ),
              )}
            >
              {formatChips(chip)}
            </button>
          );
        })}
      </div>
      {!compact && (
        <p className="mt-4 text-sm leading-6 text-stone-200/70">
          Pick a clean stake before the deal. Double down is only available on the opening two-card hand
          when the bankroll can cover the extra stake.
        </p>
      )}
      <button
        type="button"
        disabled={!snapshot.allowedActions.canStartRound || isBusy}
        onClick={() => void onStartRound()}
        className={twMerge(
          clsx(
            'button-primary w-full rounded-[1.35rem] font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-amber-300 hover:brightness-105',
            compact ? 'mt-4 px-4 py-3 text-sm' : 'mt-6 px-5 py-4 text-base',
            (!snapshot.allowedActions.canStartRound || isBusy) && 'button-disabled hover:brightness-100',
          ),
        )}
      >
        {getRoundActionLabel(snapshot)}
      </button>
    </section>
  );
};

export default BetSelector;
