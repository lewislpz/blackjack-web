import type { GameSnapshot } from '@blackjack/contracts';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { getOutcomeTone } from '../view-models/game-presentation';

interface StatusBannerProps {
  snapshot: GameSnapshot;
  error: string | null;
  compact?: boolean;
  className?: string;
}

const StatusBanner = ({ snapshot, error, compact = false, className }: StatusBannerProps) => {
  const outcome = snapshot.currentRound?.resolution?.outcome;
  const tone = error ? 'danger' : getOutcomeTone(outcome);

  return (
    <section
      aria-live="polite"
      aria-atomic="true"
      className={twMerge(
        clsx(
          'glass-panel rounded-[1.7rem]',
          compact ? 'px-4 py-3' : 'px-5 py-4',
          tone === 'success' && 'status-banner--success',
          tone === 'danger' && 'status-banner--danger',
          tone === 'accent' && 'status-banner--accent',
          tone === 'neutral' && 'status-banner--neutral',
          className,
        ),
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-100/60 [text-shadow:0_1px_0_rgba(0,0,0,0.55)]">
          Table status
        </p>
        <span className="status-pill rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-stone-100/80">
          {error
            ? 'Issue'
            : snapshot.currentRound?.phase === 'complete'
              ? 'Round settled'
              : snapshot.currentRound
                ? 'Live hand'
                : 'Ready'}
        </span>
      </div>
      <div
        className={twMerge(
          clsx(
            'mt-2 flex flex-col gap-2',
            compact ? 'xl:flex-row xl:items-center xl:justify-between' : 'sm:flex-row sm:items-end sm:justify-between',
          ),
        )}
      >
        <p
          className={twMerge(
            clsx(
              'font-bold text-amber-50 [text-shadow:0_1px_0_rgba(0,0,0,0.55)]',
              compact ? 'text-base leading-6' : 'text-xl',
            ),
          )}
        >
          {error ?? snapshot.tableMessage}
        </p>
        <p
          className={twMerge(
            clsx('text-amber-100/58', compact ? 'text-xs uppercase tracking-[0.24em]' : 'text-sm'),
          )}
        >
          {snapshot.currentRound?.phase === 'complete'
            ? 'Round settled. Deal again when ready.'
            : 'Dealer stands on all 17 values.'}
        </p>
      </div>
    </section>
  );
};

export default StatusBanner;
