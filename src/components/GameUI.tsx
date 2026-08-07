import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useGameStore } from '../hooks/useGameStore';
import { useIsMobile } from '../hooks/useMediaQuery';
import { useGameActions } from '../hooks/useGameActions';
import { ConnectPanel } from './ConnectPanel';
import { HUD } from './HUD';
import { ActionPanel } from './ActionPanel';
import { BattleLog } from './BattleLog';
import { AlliancePanel } from './AlliancePanel';
import { TargetSearch } from './TargetSearch';
import { UpgradeRecommendation } from './UpgradeRecommendation';
import { Leaderboard } from './Leaderboard';
import { EnergyMarket } from './EnergyMarket';
import { MobileNav, type TabId } from './MobileNav';
import { ToastContainer } from './Toast';
import { SystemIcon } from './ui/SystemIcon';
import { useI18n } from '../hooks/useI18n';
import { THEME } from '../theme';
import { fmt, fmtCompact } from '../utils/format';

/* ─── Types ─── */
type PageId = 'overview' | 'actions' | 'combat' | 'tech' | 'alliance' | 'market' | 'leaderboard';

interface NavItemDef {
  id: PageId;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItemDef[] = [
  { id: 'overview', label: 'nav.overview', icon: '/assets/systems/radar.web.png' },
  { id: 'actions', label: 'nav.actions', icon: '/assets/systems/energy.web.png' },
  { id: 'combat', label: 'nav.combat', icon: '/assets/systems/weapon.web.png' },
  { id: 'tech', label: 'nav.tech', icon: '/assets/systems/shield.web.png' },
  { id: 'alliance', label: 'nav.alliance', icon: '/assets/systems/totem.web.png' },
  { id: 'market', label: 'nav.market', icon: '/assets/systems/ses.web.png' },
  { id: 'leaderboard', label: 'nav.leaderboard', icon: '/assets/systems/engine.web.png' },
];

/* ─── Layout containers ─── */
const DashboardContainer = styled.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: ${THEME.bg};
  overflow: hidden;
`;

/* ─── Top Bar ─── */
const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 16px;
  padding-top: calc(env(safe-area-inset-top, 0px) + 8px);
  background: ${THEME.alpha(THEME.card, 0.8)};
  border-bottom: 1px solid ${THEME.border};
  flex-shrink: 0;
  min-height: 56px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

const CivName = styled.span`
  color: ${THEME.accent.green};
  font-size: 1.05rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  white-space: nowrap;
  flex-shrink: 0;
`;

const CivAddr = styled.span`
  color: ${THEME.text.secondary};
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  flex-shrink: 0;
`;

const Pill = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 5px;
  background: ${({ $color }) => THEME.alpha($color, 0.1)};
  border: 1px solid ${({ $color }) => THEME.alpha($color, 0.2)};
  border-radius: 4px;
  padding: 4px 10px;
  white-space: nowrap;
  flex-shrink: 0;
  font-family: 'Courier New', monospace;
`;

const PillLabel = styled.span`
  color: ${THEME.text.secondary};
  font-size: 0.75rem;
`;

const PillValue = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-size: 0.88rem;
  font-weight: bold;
`;

const DailyClaimBtn = styled.button<{ $canClaim: boolean }>`
  background: ${({ $canClaim }) => $canClaim ? THEME.alpha(THEME.accent.gold, 0.15) : 'transparent'};
  border: 1px solid ${({ $canClaim }) => $canClaim ? THEME.alpha(THEME.accent.gold, 0.4) : THEME.border};
  border-radius: 4px;
  color: ${({ $canClaim }) => $canClaim ? THEME.accent.gold : THEME.text.secondary};
  font-family: 'Courier New', monospace;
  font-size: 0.76rem;
  padding: 4px 10px;
  cursor: ${({ $canClaim }) => $canClaim ? 'pointer' : 'default'};
  white-space: nowrap;
  flex-shrink: 0;
  &:hover { background: ${({ $canClaim }) => $canClaim ? THEME.alpha(THEME.accent.gold, 0.25) : 'transparent'}; }
`;

/* ─── Main area (sidebar + content) ─── */
const MainArea = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

/* ─── Sidebar ─── */
const Sidebar = styled.nav`
  width: 180px;
  flex-shrink: 0;
  background: ${THEME.alpha(THEME.card, 0.5)};
  border-right: 1px solid ${THEME.border};
  padding: 8px 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const NavBtn = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  color: ${({ $active }) => $active ? THEME.accent.green : THEME.text.secondary};
  background: ${({ $active }) => $active ? THEME.alpha(THEME.accent.green, 0.08) : 'transparent'};
  border: none;
  border-left: 3px solid ${({ $active }) => $active ? THEME.accent.green : 'transparent'};
  cursor: pointer;
  text-align: left;
  transition: background 0.1s, color 0.1s;
  &:hover { background: ${THEME.alpha(THEME.accent.green, 0.04)}; color: ${THEME.text.primary}; }
  -webkit-tap-highlight-color: transparent;
`;

const TopBarLink = styled.a`
  color: ${THEME.text.secondary};
  font-family: 'Courier New', monospace;
  font-size: 0.78rem;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.15s;
  &:hover { color: ${THEME.accent.green}; text-decoration: underline; }
`;

const TopBarLangBtn = styled.button`
  background: none;
  border: 1px solid ${THEME.alpha(THEME.text.secondary, 0.3)};
  border-radius: 3px;
  color: ${THEME.text.secondary};
  font-family: 'Courier New', monospace;
  font-size: 0.72rem;
  padding: 4px 8px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color 0.15s, border-color 0.15s;
  &:hover { color: ${THEME.accent.green}; border-color: ${THEME.accent.green}; }
`;

const NavIcon = styled.span`
  font-size: 1rem;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
`;

/* ─── Content area ─── */
const Content = styled.main`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 16px 20px;
`;

const ContentInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/* ─── Mobile tab color mapping (kept from original) ─── */
const TAB_COLORS: Record<TabId, string> = {
  hud: THEME.accent.green,
  actions: THEME.accent.blue,
  combat: THEME.accent.red,
  market: THEME.accent.gold,
  alliance: THEME.accent.gold,
};

/* ─── Mobile wrapper ─── */
const MobileContainer = styled.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: ${THEME.bg};
  overflow: hidden;
`;

const MobileContent = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 80px 10px 70px;
`;

/* ─── page title for desktop content ─── */
const PageTitle = styled.div`
  color: ${THEME.text.primary};
  font-size: 1.1rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 4px;
`;

const PageDivider = styled.div`
  height: 1px;
  background: ${THEME.border};
  margin: 0 0 12px 0;
`;

/* ════════════════════════════════════════════
   Desktop content for each page
   ════════════════════════════════════════════ */
// Page title config (rendered by DesktopLayout with t())
const PAGE_TITLES: Record<PageId, string> = {
  overview: 'page.overview',
  actions: 'page.actions',
  combat: 'page.combat',
  tech: 'page.tech',
  alliance: 'page.alliance',
  market: 'page.market',
  leaderboard: 'page.leaderboard',
};
const PAGE_ICONS: Record<PageId, string> = {
  overview: '/assets/systems/radar.web.png',
  actions: '/assets/systems/energy.web.png',
  combat: '/assets/systems/weapon.web.png',
  tech: '/assets/systems/shield.web.png',
  alliance: '/assets/systems/totem.web.png',
  market: '/assets/systems/ses.web.png',
  leaderboard: '/assets/systems/trophy.web.png',
};

/* ════════════════════════════════════════════
   Desktop Layout
   ════════════════════════════════════════════ */
function DesktopLayout() {
  const [page, setPage] = useState<PageId>('overview');
  const playerCiv = useGameStore(s => s.playerCiv);
  const address = useGameStore(s => s.address);
  const ses = useGameStore(s => s.sesBalance);
  const loading = useGameStore(s => s.loading);
  const epochClaimed = useGameStore(s => s.epochClaimed);
  const { t, toggleLang } = useI18n();
  const { claimDailySES } = useGameActions();
  // 链上 getEnergyCollectRate（÷1e6）——必须在条件 return 之前（React Hooks 规则）
  const rate = useGameStore(s => s.collectRate);

  const sesClaimDisabled = loading || epochClaimed;

  if (!playerCiv) {
    return (
      <DashboardContainer>
        <ConnectPanel />
        <ToastContainer />
      </DashboardContainer>
    );
  }

  const shortAddr = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  const shieldPct = playerCiv.maxShieldHP > 0
    ? Math.round((playerCiv.shieldHP / playerCiv.maxShieldHP) * 100)
    : 0;

  const renderPage = () => {
    const content = (() => {
      switch (page) {
        case 'overview': return <HUD />;
        case 'actions': return <ActionPanel />;
        case 'combat': return <><TargetSearch /><BattleLog /></>;
        case 'tech': return <UpgradeRecommendation />;
        case 'alliance': return <AlliancePanel />;
        case 'market': return <EnergyMarket />;
        case 'leaderboard': return <Leaderboard />;
      }
    })();
    return (
      <>
        <PageTitle><SystemIcon icon={PAGE_ICONS[page]} /> {t(PAGE_TITLES[page])}</PageTitle>
        <PageDivider />
        {content}
      </>
    );
  };

  return (
    <DashboardContainer>
      <TopBar>
        <CivName>{playerCiv.name}</CivName>
        <CivAddr>{shortAddr}</CivAddr>

        <ConnectButton />

        <Pill $color={THEME.accent.gold}>
          <PillLabel><SystemIcon icon="/assets/systems/ses.web.png" /></PillLabel>
          <PillValue $color={THEME.accent.gold}>{fmtCompact(ses)}</PillValue>
        </Pill>

        <Pill $color={THEME.accent.green}>
          <PillLabel><SystemIcon icon="/assets/systems/energy.web.png" /></PillLabel>
          <PillValue $color={THEME.accent.green}>{fmt(playerCiv.energy)}</PillValue>
        </Pill>

        <Pill $color="#44ff88">
          <PillLabel><SystemIcon icon="/assets/systems/energy.web.png" />/s</PillLabel>
          <PillValue $color="#44ff88">{rate}</PillValue>
        </Pill>

        <Pill $color={THEME.accent.red}>
          <PillLabel><SystemIcon icon="/assets/systems/heart.web.png" /></PillLabel>
          <PillValue $color={THEME.accent.red}>{fmt(playerCiv.health)}</PillValue>
        </Pill>

        <Pill $color={THEME.accent.shield}>
          <PillLabel><SystemIcon icon="/assets/systems/shield.web.png" /></PillLabel>
          <PillValue $color={THEME.accent.shield}>{shieldPct}%</PillValue>
        </Pill>

        <DailyClaimBtn $canClaim={!epochClaimed} onClick={() => !sesClaimDisabled && claimDailySES()} disabled={sesClaimDisabled}>
          <SystemIcon icon="/assets/systems/ses.web.png" />{' '}
          {epochClaimed ? t('ses.claimed') : t('ses.claim')}
        </DailyClaimBtn>
        <TopBarLink href="https://docs.strifelabs.com" target="_blank">{t('connect.tutorial')}</TopBarLink>
        <TopBarLangBtn onClick={toggleLang}>{t('connect.lang_switch')}</TopBarLangBtn>
      </TopBar>

      <MainArea>
        <Sidebar>
          {NAV_ITEMS.map(item => (
            <NavBtn
              key={item.id}
              $active={page === item.id}
              onClick={() => setPage(item.id)}
            >
              <NavIcon><SystemIcon icon={item.icon} /></NavIcon>
              {t(item.label)}
            </NavBtn>
          ))}
        </Sidebar>

        <Content>
          <ContentInner>
            {renderPage()}
          </ContentInner>
        </Content>
      </MainArea>

      <ToastContainer />

      {/* ── Lore footer quote ── */}
      <LoreFooter>
        <LoreFooterText>{t('lore.footer_quote')}</LoreFooterText>
        <LoreFooterEpoch>
          {t('lore.epoch_label')} #{'—'} · {t('lore.engine_status')}
        </LoreFooterEpoch>
        <LoreFooterVersion>v0.1.0 · {__APP_COMMIT__}</LoreFooterVersion>
      </LoreFooter>
    </DashboardContainer>
  );
}

/* ─── Lore footer styled components ─── */
const LoreFooter = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
  padding: 10px 20px;
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 10px);
  background: ${THEME.alpha(THEME.card, 0.75)};
  border-top: 1px solid ${THEME.alpha(THEME.accent.green, 0.16)};
  min-height: 48px;
`;

const LoreFooterText = styled.span`
  color: ${THEME.alpha(THEME.text.secondary, 0.78)};
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  font-style: italic;
`;

const LoreFooterEpoch = styled.span`
  color: ${THEME.alpha(THEME.accent.green, 0.6)};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
  white-space: nowrap;
`;

const LoreFooterVersion = styled.span`
  color: ${THEME.alpha(THEME.text.secondary, 0.5)};
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  white-space: nowrap;
`;

/* ════════════════════════════════════════════
   Mobile Layout (adapted from original but without 3D)
   ════════════════════════════════════════════ */
function MobileLayout() {
  const { t } = useI18n();
  const connected = useGameStore(s => s.connected);
  const playerCiv = useGameStore(s => s.playerCiv);
  const address = useGameStore(s => s.address);
  const ses = useGameStore(s => s.sesBalance);
  const target = useGameStore(s => s.selectedTarget);
  const battleLog = useGameStore(s => s.battleLog);
  const alliance = useGameStore(s => s.currentAlliance);
  const loading = useGameStore(s => s.loading);
  const collectRate = useGameStore(s => s.collectRate); // 链上 getEnergyCollectRate（÷1e6）

  const [activeTab, setActiveTab] = useState<TabId | null>(null);
  const [prevConnected, setPrevConnected] = useState(connected);

  // 账户连接状态变化 → 副作用处理（禁止渲染期间 setState，避免 React #310 hooks 数变化）
  useEffect(() => {
    if (connected !== prevConnected) {
      setPrevConnected(connected);
      if (!connected) setActiveTab(null);
    }
  }, [connected, prevConnected]);

  if (!connected) {
    return (
      <MobileContainer>
        <ConnectPanel />
        <ToastContainer />
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <ToastContainer />

      {/* Compact HUD bar — 只留名称 + 钱包；状态展示在「状态」tab 的 HUD 页 */}
      {playerCiv && (
        <MobileHudBar>
          <MiniName>{playerCiv.name}</MiniName>
          {/* 钱包按钮固定在右上角，不随状态卡片滚动，避免遮挡 */}
          <MobileWalletSlot>
            <ConnectButton />
          </MobileWalletSlot>
        </MobileHudBar>
      )}

      {/* Main scrollable content area — 按底部 Tab 显示当前面板（不再堆叠） */}
      <MobileContent>
        {activeTab === 'hud' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <HUD />
            <UpgradeRecommendation />
            <Leaderboard />
          </div>
        )}
        {activeTab === 'actions' && <ActionPanel />}
        {activeTab === 'combat' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <TargetSearch />
            <BattleLog />
          </div>
        )}
        {activeTab === 'market' && <EnergyMarket />}
        {activeTab === 'alliance' && <AlliancePanel />}
        {activeTab === null && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <HUD />
            <UpgradeRecommendation />
            <Leaderboard />
          </div>
        )}
      </MobileContent>

      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* ── Lore footer quote ── */}
      <LoreFooter>
        <LoreFooterText>{t('lore.footer_quote')}</LoreFooterText>
        <LoreFooterEpoch>
          {t('lore.epoch_label')} #{'—'} · {t('lore.engine_status')}
        </LoreFooterEpoch>
        <LoreFooterVersion>v0.1.0 · {__APP_COMMIT__}</LoreFooterVersion>
      </LoreFooter>
    </MobileContainer>
  );
}

/* ════════════════════════════════════════════
   Main exported GameUI — desktop vs mobile
   ════════════════════════════════════════════ */
export function GameUI() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileLayout />;
  }

  return <DesktopLayout />;
}

/* ─── Mobile styled components (moved here so the file is self-contained) ─── */
// These are adapted from the original GameUI.tsx

const MobileHudBar = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 130;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(0, 255, 136, 0.1);
  padding: 6px 10px;
  padding-top: calc(env(safe-area-inset-top, 0px) + 6px);
  flex-shrink: 0;
`;

/* 钱包按钮固定槽：不随状态卡片横向滚动，始终可见且不遮挡 */
const MobileWalletSlot = styled.div`
  flex-shrink: 0;
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const MobileHudRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  flex: 1;
  min-width: 0;
  &::-webkit-scrollbar { display: none; }
`;

const MiniCard = styled.div<{ $color?: string }>`
  flex-shrink: 0;
  min-width: 62px;
  min-height: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid ${({ $color }) => $color || 'rgba(0,255,136,0.15)'};
  border-radius: 4px;
  padding: 4px 8px;
  white-space: nowrap;
  text-align: center;
`;

const MiniLabel = styled.div`
  color: #446688;
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.5px;
`;

const MiniValue = styled.div<{ $color?: string }>`
  color: ${({ $color }) => $color || THEME.accent.green};
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
`;

const MiniName = styled.div`
  color: ${THEME.accent.green};
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  white-space: nowrap;
  flex-shrink: 0;
`;
