import type { GameSnapshot } from '@blackjack/contracts';

import { formatChips } from '../view-models/game-presentation';

interface TableHudProps {
  snapshot: GameSnapshot;
  selectedBet: number;
}

const TableHud = ({ snapshot, selectedBet }: TableHudProps) => {
  const stats = [
    { label: 'Bankroll', value: formatChips(snapshot.balance) },
    {
      label: 'Stake',
      value: snapshot.currentRound ? formatChips(snapshot.currentRound.bet) : formatChips(selectedBet),
    },
    { label: 'Rounds', value: String(snapshot.history.length) },
    {
      label: 'State',
      value: snapshot.currentRound?.phase === 'complete' ? 'Settled' : snapshot.currentRound ? 'Live' : 'Ready',
    },
  ];

  return (
    <header className="table-hud glass-panel rounded-[1.8rem] p-4">
      <div className="flex min-w-0 items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.4em] text-amber-100/60 [text-shadow:0_1px_0_rgba(0,0,0,0.55)]">
            Blackjack Royale
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h1 className="truncate text-xl font-bold tracking-tight text-amber-50 [text-shadow:0_1px_0_rgba(0,0,0,0.55)] sm:text-2xl">
              Single-table casino mode
            </h1>
            <span className="status-pill hidden rounded-full px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-stone-100/80 md:inline-flex">
              One-screen layout
            </span>
          </div>
        </div>
        <div className="hidden items-center gap-2 xl:flex">
          {['Single deck', '3:2 blackjack', 'Soft 17 stands'].map((rule) => (
            <span key={rule} className="status-pill rounded-full px-3 py-1 text-xs font-semibold text-stone-100/80">
              {rule}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="hud-stat rounded-[1.2rem] px-3 py-2.5">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-amber-100/58">{stat.label}</p>
            <p className="mt-1 text-base font-bold text-amber-50 [text-shadow:0_1px_0_rgba(0,0,0,0.45)] sm:text-lg">
              {stat.value}
            </p>
          </article>
        ))}
      </div>
    </header>
  );
};

export default TableHud;
