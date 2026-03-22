import type { RoundHistoryEntry } from '@blackjack/contracts';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { formatChips } from '../view-models/game-presentation';

interface RoundHistoryProps {
  history: RoundHistoryEntry[];
  compact?: boolean;
  className?: string;
}

const RoundHistory = ({ history, compact = false, className }: RoundHistoryProps) => (
  <section className={twMerge(clsx('glass-panel rounded-[1.8rem]', compact ? 'p-4' : 'p-5', className))}>
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-100/60 [text-shadow:0_1px_0_rgba(0,0,0,0.55)]">
          Recent hands
        </p>
        <h2
          className={twMerge(
            clsx(
              'mt-2 font-bold text-amber-50 [text-shadow:0_1px_0_rgba(0,0,0,0.55)]',
              compact ? 'text-lg' : 'text-xl',
            ),
          )}
        >
          Table ledger
        </h2>
      </div>
      <span className="status-pill rounded-full px-3 py-1 text-xs font-semibold text-stone-100/78">
        {history.length} rounds
      </span>
    </div>
    <div className={twMerge(clsx('space-y-3', compact ? 'mt-4 max-h-[16rem] overflow-auto pr-1' : 'mt-5'))}>
      {history.length === 0 ? (
        <div
          className={twMerge(
            clsx(
              'rounded-[1.5rem] border border-dashed border-amber-100/18 bg-black/20 px-4 text-sm text-stone-200/65',
              compact ? 'py-4' : 'py-6',
            ),
          )}
        >
          No completed hands yet. Deal the first round to start your table history.
        </div>
      ) : (
        history.map((entry) => (
          <article
            key={`${entry.roundNumber}-${entry.timestamp}`}
            className={twMerge(
              clsx(
                'history-entry rounded-[1.4rem] px-4 py-3',
                entry.payoutDelta > 0 && 'history-entry--positive',
                entry.payoutDelta < 0 && 'history-entry--negative',
              ),
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className={twMerge(clsx('font-bold text-amber-50', compact ? 'text-xs' : 'text-sm'))}>
                  Round {entry.roundNumber}
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-100/58">
                  {entry.outcome}
                </p>
              </div>
              <div className="text-right">
                <p className={twMerge(clsx('font-bold text-amber-50', compact ? 'text-xs' : 'text-sm'))}>
                  {formatChips(entry.payoutDelta)}
                </p>
                <p className="text-xs text-stone-200/60">Bankroll {formatChips(entry.balanceAfterRound)}</p>
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  </section>
);

export default RoundHistory;
