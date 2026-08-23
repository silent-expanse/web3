import styled from 'styled-components';
import { useGameStore } from '../hooks/useGameStore';
import { useI18n } from '../hooks/useI18n';
import { THEME } from '../theme';
import { SystemIcon } from './ui/SystemIcon';

export type TabId = 'hud' | 'actions' | 'combat' | 'market' | 'alliance' | 'links';

interface Props {
  activeTab: TabId | null;
  onTabChange: (tab: TabId | null) => void;
}

const Nav = styled.nav`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.85);
  border-top: 1px solid rgba(0, 255, 136, 0.15);
  backdrop-filter: blur(${THEME.blur.bar});
  -webkit-backdrop-filter: blur(${THEME.blur.bar});
  pointer-events: auto;
  z-index: 150;
  padding: 0 0 env(safe-area-inset-bottom, 0px) 0;
`;

const TabButton = styled.button<{ $active: boolean; $color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  flex: 1 1 0%;
  min-width: 0;
  height: 100%;
  background: transparent;
  border: none;
  border-top: 2px solid ${({ $active, $color }) => ($active ? $color : 'transparent')};
  color: ${({ $active, $color }) => ($active ? $color : '#6a7d94')};
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.15s, border-color 0.15s;
  padding: 4px 0;
  min-height: 44px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:active {
    opacity: 0.7;
  }
`;

const Icon = styled.span`
  font-size: 1.2rem;
  line-height: 1;
`;

const TAB_ICONS: Record<TabId, string> = {
  hud: '/assets/systems/radar.web.png', actions: '/assets/systems/energy.web.png', combat: '/assets/systems/weapon.web.png', market: '/assets/systems/ses.web.png', alliance: '/assets/systems/totem.web.png', links: '/assets/systems/arrow.web.png',
};
const TAB_COLORS: Record<TabId, string> = {
  hud: THEME.accent.green, actions: THEME.accent.blue, combat: THEME.accent.red, market: THEME.accent.gold, alliance: THEME.accent.gold, links: THEME.accent.green,
};

export function MobileNav({ activeTab, onTabChange }: Props) {
  const { t } = useI18n();
  const battleLog = useGameStore(s => s.battleLog);
  const seenCnt = useGameStore(s => s.seenBattleCount);
  const pendingRefund = useGameStore(s => s._alliancePendingRefund);
  const pendingEnergy = useGameStore(s => s.pendingEnergy);

  const tabIds: TabId[] = ['hud', 'actions', 'combat', 'market', 'alliance', 'links'];

  const tabLabels: Record<TabId, string> = {
    hud: t('mobile.tab_overview'),
    actions: t('mobile.tab_actions'),
    combat: t('mobile.tab_combat'),
    market: t('mobile.tab_market'),
    alliance: t('mobile.tab_alliance'),
    links: t('nav.links'),
  };

  return (
    <Nav>
      {tabIds.map(id => {
        const isActive = activeTab === id;
        // #16 未读事件：combat = 有未读战报；alliance = 有退款/战斗能量待领；market = 有公共挂单可买
        const hasBadge =
          (id === 'combat' && battleLog.length > seenCnt) ||
          (id === 'alliance' && pendingRefund > 0) ||
          (id === 'actions' && pendingEnergy > 0);

        return (
          <TabButton
            key={id}
            $active={isActive}
            $color={TAB_COLORS[id]}
            onClick={() => {
              // #55/#16 点击 combat 时标记已读
              if (id === 'combat' && !isActive) useGameStore.getState().markBattlesSeen();
              onTabChange(isActive ? null : id);
            }}
            aria-label={tabLabels[id]}
          >
            <Icon><SystemIcon icon={TAB_ICONS[id]} /></Icon>
            {tabLabels[id]}
            {hasBadge && !isActive && <Badge />}
          </TabButton>
        );
      })}
    </Nav>
  );
}

const Badge = styled.span`
  position: absolute;
  top: 6px;
  right: 50%;
  transform: translateX(16px);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${THEME.accent.green};
  box-shadow: 0 0 6px ${THEME.alpha(THEME.accent.green, 0.6)};
`;

/* Re-export tab IDs for convenience */
export const TAB_ORDER: TabId[] = ['hud', 'actions', 'combat', 'market', 'alliance', 'links'];
