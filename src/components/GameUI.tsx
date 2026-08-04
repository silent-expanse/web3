import { useState } from 'react';
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
import { MobilePanel } from './MobilePanel';
import { ToastContainer } from './Toast';
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
  { id: 'overview', label: 'nav.overview', icon: '📊' },
  { id: 'actions', label: 'nav.actions', icon: '🎮' },
  { id: 'combat', label: 'nav.combat', icon: '⚔️' },
  { id: 'tech', label: 'nav.tech', icon: '🛡' },
  { id: 'alliance', label: 'nav.alliance', icon: '🏰' },
  { id: 'market', label: 'nav.market', icon: '📊' },
  { id: 'leaderboard', label: 'nav.leaderboard', icon: '🏆' },
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
  log: THEME.accent.red,
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
  const rate = useGameStore(s => s.collectRate); // 链上 getEnergyCollectRate（÷1e6）
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
        <PageTitle>{t(PAGE_TITLES[page])}</PageTitle>
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
          <PillLabel>SES</PillLabel>
          <PillValue $color={THEME.accent.gold}>{fmtCompact(ses)}</PillValue>
        </Pill>

        <Pill $color={THEME.accent.green}>
          <PillLabel>⚡</PillLabel>
          <PillValue $color={THEME.accent.green}>{fmt(playerCiv.energy)}</PillValue>
        </Pill>

        <Pill $color="#44ff88">
          <PillLabel>⚡/s</PillLabel>
          <PillValue $color="#44ff88">{rate}</PillValue>
        </Pill>

        <Pill $color={THEME.accent.red}>
          <PillLabel>❤️</PillLabel>
          <PillValue $color={THEME.accent.red}>{fmt(playerCiv.health)}</PillValue>
        </Pill>

        <Pill $color={THEME.accent.shield}>
          <PillLabel>🛡</PillLabel>
          <PillValue $color={THEME.accent.shield}>{shieldPct}%</PillValue>
        </Pill>

        <DailyClaimBtn $canClaim={!epochClaimed} onClick={() => !sesClaimDisabled && claimDailySES()} disabled={sesClaimDisabled}>
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
              <NavIcon>{item.icon}</NavIcon>
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

  if (connected !== prevConnected) {
    setPrevConnected(connected);
    if (!connected) setActiveTab(null);
  }

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

      {/* Compact HUD bar (adapted from original GameUI mobile code) */}
      {playerCiv && (
        <MobileHudBar>
          <MobileHudRow>
            <MiniName>{playerCiv.name}</MiniName>
            <MiniCard $color={THEME.accent.gold}>
              <MiniLabel>SES</MiniLabel>
              <MiniValue $color={THEME.accent.gold}>{fmtCompact(ses)}</MiniValue>
            </MiniCard>
            <MiniCard>
              <MiniLabel>⚡</MiniLabel>
              <MiniValue>{fmt(playerCiv.energy)}</MiniValue>
            </MiniCard>
            <MiniCard $color="#44ff88">
              <MiniLabel>⚡/s</MiniLabel>
              <MiniValue $color="#44ff88">{fmt(collectRate, 2)}</MiniValue>
            </MiniCard>
            <MiniCard $color="#ff8844">
              <MiniLabel>❤️</MiniLabel>
              <MiniValue $color="#ff8844">{fmt(playerCiv.health)}</MiniValue>
            </MiniCard>
            <MiniCard $color={THEME.accent.shield}>
              <MiniLabel>🛡</MiniLabel>
              <MiniValue $color={THEME.accent.shield}>
                {playerCiv.shieldHP > 0
                  ? Math.round((playerCiv.shieldHP / (playerCiv.maxShieldHP || 1)) * 100) + '%'
                  : '0%'}
              </MiniValue>
            </MiniCard>
            <MiniCard $color={THEME.accent.blue}>
              <MiniLabel>📡</MiniLabel>
              <MiniValue $color={THEME.accent.blue}>{playerCiv.scanRange}</MiniValue>
            </MiniCard>
            {battleLog.length > 0 && (
              <MiniCard $color={THEME.accent.red}>
                <MiniLabel>⚔</MiniLabel>
                <MiniValue $color={THEME.accent.red}>{battleLog.length}</MiniValue>
              </MiniCard>
            )}
            {alliance && (
              <MiniCard $color={THEME.accent.gold}>
                <MiniLabel>{alliance.name}</MiniLabel>
                <MiniValue $color={THEME.accent.gold}>Lv.{alliance.level}</MiniValue>
              </MiniCard>
            )}
            <MiniCard style={{ padding: '0 4px' }}>
              <ConnectButton />
            </MiniCard>
          </MobileHudRow>
        </MobileHudBar>
      )}

      {/* Main scrollable content area */}
      <MobileContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ActionPanel />
          <TargetSearch />
          <BattleLog />
          <UpgradeRecommendation />
          <EnergyMarket />
          <Leaderboard />
          <AlliancePanel />
        </div>
      </MobileContent>

      {/* Mobile Panels (overlays for tab navigation) - keeping compatible */}
      <MobilePanel
        open={activeTab === 'hud'}
        title={t('hud.title')}
        color={TAB_COLORS.hud}
        onClose={() => setActiveTab(null)}
      >
        <HUD />
      </MobilePanel>

      <MobilePanel
        open={activeTab === 'actions'}
        title={t('page.actions')}
        color={TAB_COLORS.actions}
        onClose={() => setActiveTab(null)}
      >
        <ActionPanel />
      </MobilePanel>

      <MobilePanel
        open={activeTab === 'log'}
        title={t('battle.title')}
        color={TAB_COLORS.log}
        onClose={() => setActiveTab(null)}
      >
        <BattleLog />
      </MobilePanel>

      <MobilePanel
        open={activeTab === 'alliance'}
        title={t('alliance.title')}
        color={TAB_COLORS.alliance}
        onClose={() => setActiveTab(null)}
      >
        <AlliancePanel />
      </MobilePanel>

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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 130;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(0, 255, 136, 0.1);
  padding: 6px 10px;
  padding-top: calc(env(safe-area-inset-top, 0px) + 6px);
`;

const MobileHudRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
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
