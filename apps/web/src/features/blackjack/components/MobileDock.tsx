import type { GameSnapshot } from '@blackjack/contracts';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import ActionControls from './ActionControls';
import BetSelector from './BetSelector';
import RoundHistory from './RoundHistory';

export type MobileDockTab = 'play' | 'bet' | 'history';

interface MobileDockProps {
  activeTab: MobileDockTab;
  onTabChange: (tab: MobileDockTab) => void;
  snapshot: GameSnapshot;
  selectedBet: number;
  isBusy: boolean;
  onChangeBet: (value: number) => void;
  onStartRound: () => Promise<void>;
  onHit: () => Promise<void>;
  onStand: () => Promise<void>;
  onDoubleDown: () => Promise<void>;
}

const tabs: Array<{ id: MobileDockTab; label: string }> = [
  { id: 'play', label: 'Play' },
  { id: 'bet', label: 'Bet' },
  { id: 'history', label: 'History' },
];

const MobileDock = ({
  activeTab,
  onTabChange,
  snapshot,
  selectedBet,
  isBusy,
  onChangeBet,
  onStartRound,
  onHit,
  onStand,
  onDoubleDown,
}: MobileDockProps) => (
  <section className="mobile-dock glass-panel rounded-[1.8rem] p-3">
    <nav aria-label="Table dock" className="grid grid-cols-3 gap-2">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onTabChange(tab.id)}
            className={twMerge(
              clsx(
                'dock-tab rounded-[1rem] px-3 py-2.5 text-sm font-semibold text-stone-100/80 transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300',
                isActive && 'dock-tab--active',
              ),
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
    <div className="mt-3">
      {activeTab === 'play' && (
        <ActionControls
          snapshot={snapshot}
          isBusy={isBusy}
          onHit={onHit}
          onStand={onStand}
          onDoubleDown={onDoubleDown}
          compact
        />
      )}
      {activeTab === 'bet' && (
        <BetSelector
          snapshot={snapshot}
          selectedBet={selectedBet}
          isBusy={isBusy}
          onChangeBet={onChangeBet}
          onStartRound={onStartRound}
          compact
        />
      )}
      {activeTab === 'history' && <RoundHistory history={snapshot.history} compact />}
    </div>
  </section>
);

export default MobileDock;
