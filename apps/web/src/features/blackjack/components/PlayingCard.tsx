import type { CardView } from '@blackjack/contracts';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface PlayingCardProps {
  card: CardView;
  compact?: boolean;
}

const suitGlyph: Record<'clubs' | 'diamonds' | 'hearts' | 'spades', string> = {
  clubs: '♣',
  diamonds: '♦',
  hearts: '♥',
  spades: '♠',
};

const PlayingCard = ({ card, compact = false }: PlayingCardProps) => {
  if (card.kind === 'faceDown') {
    return (
      <article
        aria-label={card.label}
        className={twMerge(
          clsx(
            'card-back relative flex items-center justify-center overflow-hidden rounded-[1.6rem] border border-amber-100/30 text-amber-100 shadow-[0_24px_60px_rgba(0,0,0,0.42)] ring-1 ring-amber-100/10',
            compact ? 'h-[5.9rem] w-[4.15rem] sm:h-[6.6rem] sm:w-[4.6rem]' : 'h-32 w-24 sm:h-36 sm:w-28',
          ),
        )}
      >
        <div className="absolute inset-3 rounded-[1.15rem] border border-amber-100/35 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_45%)]" />
        <div className="card-back-grid absolute inset-0 opacity-70" />
        <div className="relative text-2xl font-black tracking-[0.36em] text-amber-100/85 [text-shadow:0_1px_0_rgba(0,0,0,0.65)]">
          BJ
        </div>
      </article>
    );
  }

  const isRedSuit = card.suit === 'hearts' || card.suit === 'diamonds';
  const suit = suitGlyph[card.suit];

  return (
    <article
      aria-label={card.label}
      className={twMerge(
        clsx(
          'card-enter card-face relative flex flex-col justify-between rounded-[1.6rem] border border-amber-900/20 p-3 text-slate-900 shadow-[0_24px_60px_rgba(0,0,0,0.42)]',
          compact ? 'h-[5.9rem] w-[4.15rem] p-2.5 sm:h-[6.6rem] sm:w-[4.6rem]' : 'h-32 w-24 sm:h-36 sm:w-28',
        ),
      )}
    >
      <div
        className={twMerge(
          clsx(
            compact ? 'flex flex-col font-serif text-[0.78rem] font-semibold leading-none' : 'flex flex-col font-serif text-sm font-semibold leading-none',
            isRedSuit ? 'text-rose-600' : 'text-slate-900',
          ),
        )}
      >
        <span>{card.rank}</span>
        <span className={compact ? 'text-base' : 'text-lg'}>{suit}</span>
      </div>
      <div
        className={twMerge(
          clsx(
            compact
              ? 'absolute inset-0 flex items-center justify-center font-serif text-[2.2rem] opacity-90'
              : 'absolute inset-0 flex items-center justify-center font-serif text-4xl opacity-90',
            isRedSuit ? 'text-rose-500' : 'text-slate-800',
          ),
        )}
      >
        {suit}
      </div>
      <div
        className={twMerge(
          clsx(
            compact
              ? 'ml-auto flex rotate-180 flex-col text-right font-serif text-[0.78rem] font-semibold leading-none'
              : 'ml-auto flex rotate-180 flex-col text-right font-serif text-sm font-semibold leading-none',
            isRedSuit ? 'text-rose-600' : 'text-slate-900',
          ),
        )}
      >
        <span>{card.rank}</span>
        <span className={compact ? 'text-base' : 'text-lg'}>{suit}</span>
      </div>
    </article>
  );
};

export default PlayingCard;
