import { useState } from 'react';

import HandPanel from './components/HandPanel';
import StatusBanner from './components/StatusBanner';
import BetSelector from './components/BetSelector';
import ActionControls from './components/ActionControls';
import RoundHistory from './components/RoundHistory';
import TableHud from './components/TableHud';
import MobileDock, { type MobileDockTab } from './components/MobileDock';
import { useBlackjackGame } from './hooks/useBlackjackGame';
import { useViewportMode } from './hooks/useViewportMode';

const BlackjackTable = () => {
  const game = useBlackjackGame();
  const isNarrowViewport = useViewportMode();
  const [manualDockTab, setManualDockTab] = useState<MobileDockTab | null>(null);

  if (!game.snapshot) {
    return (
      <main className="app-shell px-4 py-4">
        <section className="glass-panel hero-panel mx-auto flex h-full w-full max-w-5xl items-center justify-center rounded-[2rem] p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-amber-100/60 [text-shadow:0_1px_0_rgba(0,0,0,0.55)]">
            Blackjack Royale
          </p>
          <div>
            <h1 className="mt-4 text-4xl font-bold text-amber-50 [text-shadow:0_1px_0_rgba(0,0,0,0.6)]">
              Preparing the table
            </h1>
            <p className="mt-3 text-stone-200/70">
              Opening a new private session and setting the deck for the first hand.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const { snapshot } = game;
  const defaultDockTab: MobileDockTab =
    snapshot.currentRound?.phase === 'complete' ? 'history' : snapshot.currentRound ? 'play' : 'bet';
  const activeDockTab = manualDockTab ?? defaultDockTab;

  return (
    <main
      aria-busy={game.isBusy}
      data-layout="single-page"
      data-testid="single-page-shell"
      className="app-shell px-3 py-3 sm:px-4 sm:py-4 lg:px-5"
    >
      <div className="app-frame mx-auto flex h-full w-full max-w-[1600px] flex-col gap-3">
        <TableHud snapshot={snapshot} selectedBet={game.selectedBet} />
        <div className="table-grid flex min-h-0 flex-1 gap-3 lg:grid lg:grid-cols-[minmax(0,1fr)_20.5rem]">
          <section className="stage-shell min-h-0 flex-1">
            <div className="table-stage table-surface flex h-full min-h-0 flex-col rounded-[2.15rem] border border-emerald-200/10 p-3 sm:p-4">
              <div className="mb-3 inline-flex w-fit items-center rounded-full border border-amber-200/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0)_45%),linear-gradient(180deg,rgba(81,63,25,0.9),rgba(39,24,8,0.96))] px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.35em] text-amber-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_24px_rgba(0,0,0,0.18)] [text-shadow:0_1px_0_rgba(0,0,0,0.55)]">
                High-limit single table
              </div>
              <div className="stage-stack flex min-h-0 flex-1 flex-col gap-3">
                <HandPanel
                  title="Dealer"
                  subtitle={snapshot.currentRound ? 'House hand' : 'Waiting for the first deal'}
                  hand={snapshot.currentRound?.dealer ?? null}
                  compact
                  className="min-h-0 flex-1"
                />
                <StatusBanner snapshot={snapshot} error={game.error} compact className="stage-feedback" />
                <HandPanel
                  title="Player"
                  subtitle={snapshot.currentRound ? 'Your hand' : 'Choose a bet to begin'}
                  hand={snapshot.currentRound?.player ?? null}
                  highlight="player"
                  compact
                  className="min-h-0 flex-1"
                />
              </div>
            </div>
          </section>
          {isNarrowViewport ? (
            <MobileDock
              activeTab={activeDockTab}
              onTabChange={setManualDockTab}
              snapshot={snapshot}
              selectedBet={game.selectedBet}
              isBusy={game.isBusy}
              onChangeBet={game.setSelectedBet}
              onStartRound={game.startSelectedRound}
              onHit={game.hit}
              onStand={game.stand}
              onDoubleDown={game.doubleDown}
            />
          ) : (
            <aside className="utility-rail grid min-h-0 gap-3 lg:grid-rows-[auto_auto_minmax(0,1fr)]">
              <BetSelector
                snapshot={snapshot}
                selectedBet={game.selectedBet}
                isBusy={game.isBusy}
                onChangeBet={game.setSelectedBet}
                onStartRound={game.startSelectedRound}
                compact
              />
              <ActionControls
                snapshot={snapshot}
                isBusy={game.isBusy}
                onHit={game.hit}
                onStand={game.stand}
                onDoubleDown={game.doubleDown}
                compact
              />
              <RoundHistory history={snapshot.history} compact className="min-h-0" />
            </aside>
          )}
        </div>
      </div>
    </main>
  );
};

export default BlackjackTable;
