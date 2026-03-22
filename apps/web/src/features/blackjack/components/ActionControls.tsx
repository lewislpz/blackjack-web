import type { GameSnapshot } from '@blackjack/contracts';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ActionControlsProps {
  snapshot: GameSnapshot;
  isBusy: boolean;
  onHit: () => Promise<void>;
  onStand: () => Promise<void>;
  onDoubleDown: () => Promise<void>;
  compact?: boolean;
  className?: string;
}

const buttonBaseClassName =
  'rounded-[1.3rem] px-4 py-4 text-base font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-amber-300';

const ActionControls = ({
  snapshot,
  isBusy,
  onHit,
  onStand,
  onDoubleDown,
  compact = false,
  className,
}: ActionControlsProps) => {
  const buttons = [
    {
      label: 'Hit',
      disabled: !snapshot.allowedActions.canHit || isBusy,
      onClick: onHit,
    },
    {
      label: 'Stand',
      disabled: !snapshot.allowedActions.canStand || isBusy,
      onClick: onStand,
    },
    {
      label: 'Double Down',
      disabled: !snapshot.allowedActions.canDoubleDown || isBusy,
      onClick: onDoubleDown,
    },
  ];

  return (
    <section className={twMerge(clsx('glass-panel rounded-[1.8rem]', compact ? 'p-4' : 'p-5', className))}>
      <p className="text-xs font-bold uppercase tracking-[0.35em] text-amber-100/60 [text-shadow:0_1px_0_rgba(0,0,0,0.55)]">
        Actions
      </p>
      <div className={twMerge(clsx('mt-4 grid gap-2.5', compact ? 'grid-cols-1' : 'sm:grid-cols-3'))}>
        {buttons.map((button) => (
          <button
            key={button.label}
            type="button"
            disabled={button.disabled}
            onClick={() => void button.onClick()}
            className={twMerge(
              clsx(
                buttonBaseClassName,
                compact ? 'px-4 py-3 text-sm' : '',
                button.label === 'Hit' && 'button-secondary',
                button.label === 'Stand' && 'button-accent',
                button.label === 'Double Down' && 'button-muted',
                button.disabled && 'button-disabled',
              ),
            )}
          >
            {button.label}
          </button>
        ))}
      </div>
      {!compact && (
        <p className="mt-4 text-sm leading-6 text-stone-200/70">
          Controls lock automatically when the hand is settled, doubledown is no longer legal, or the
          bankroll cannot support the move.
        </p>
      )}
    </section>
  );
};

export default ActionControls;
