import type { HandSnapshot } from '@blackjack/contracts';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import PlayingCard from './PlayingCard';

interface HandPanelProps {
  title: string;
  subtitle: string;
  hand: HandSnapshot | null;
  highlight?: 'dealer' | 'player';
  compact?: boolean;
  className?: string;
}

const HandPanel = ({
  title,
  subtitle,
  hand,
  highlight = 'dealer',
  compact = false,
  className,
}: HandPanelProps) => (
  <section
    className={twMerge(
      clsx(
        'glass-panel rounded-[2rem]',
        compact ? 'p-4' : 'p-5 sm:p-6',
        highlight === 'player'
          ? 'border-emerald-300/22 bg-emerald-950/30'
          : 'bg-slate-950/18',
        className,
      ),
    )}
  >
    <div className={twMerge(clsx('flex items-start justify-between gap-4', compact ? 'mb-3' : 'mb-5'))}>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-100/60 [text-shadow:0_1px_0_rgba(0,0,0,0.55)]">
          {title}
        </p>
        <h2
          className={twMerge(
            clsx(
              'mt-2 font-bold tracking-[0.01em] text-amber-50 [text-shadow:0_1px_0_rgba(0,0,0,0.55)]',
              compact ? 'text-lg' : 'text-2xl',
            ),
          )}
        >
          {subtitle}
        </h2>
      </div>
      <div className={twMerge(clsx('status-pill rounded-full text-right', compact ? 'px-3 py-1.5' : 'px-4 py-2'))}>
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-amber-100/55">Total</p>
        <p className={twMerge(clsx('font-bold text-amber-50', compact ? 'text-base' : 'text-lg'))}>
          {hand ? hand.visibleTotal : '—'}
        </p>
      </div>
    </div>
    {hand && (
      <div className={twMerge(clsx('flex flex-wrap gap-2', compact ? 'mb-3' : 'mb-4'))}>
        {hand.isBlackjack && (
          <span className="status-pill rounded-full px-3 py-1 text-xs font-semibold text-amber-50">
            Blackjack
          </span>
        )}
        {hand.isBust && (
          <span className="status-pill rounded-full px-3 py-1 text-xs font-semibold text-rose-100">
            Busted
          </span>
        )}
        {!hand.total && (
          <span className="status-pill rounded-full px-3 py-1 text-xs font-semibold text-stone-100/75">
            Hole card live
          </span>
        )}
      </div>
    )}
    {hand ? (
      <div
        className={twMerge(
          clsx(
            'flex min-w-0 gap-3 overflow-x-auto overflow-y-hidden pb-2',
            compact ? 'min-h-[7rem]' : 'min-h-36',
          ),
        )}
      >
        {hand.cards.map((card) => (
          <PlayingCard key={card.id} card={card} compact={compact} />
        ))}
      </div>
    ) : (
      <div
        className={twMerge(
          clsx(
            'flex items-center rounded-[1.6rem] border border-dashed border-amber-100/20 bg-black/20 px-4 text-sm leading-6 text-stone-200/65',
            compact ? 'min-h-[7rem]' : 'min-h-36',
          ),
        )}
      >
        Waiting for the next deal. The cards will appear here as soon as the round starts.
      </div>
    )}
  </section>
);

export default HandPanel;
