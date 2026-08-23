import { useState } from 'react';
import styled from 'styled-components';
import { useGameStore } from '../hooks/useGameStore';
import { useIsMobile } from '../hooks/useMediaQuery';
import { useTicker } from '../hooks/useTicker';
import { useGameActions } from '../hooks/useGameActions';
import { LoadingOverlay } from './Spinner';
import { ActionButton } from './ui/ActionButton';
import { SystemIcon } from './ui/SystemIcon';
import { TxConfirm } from './ui/TxConfirm';
import { useI18n } from '../hooks/useI18n';
import { THEME } from '../theme';
import { fmt, fmtCompact, fmtCoord } from '../utils/format';

/* ═══════════════════════════════════════════
   Layout
   ═══════════════════════════════════════════ */

const Panel = styled.div<{ $mobile: boolean }>`
  background: ${THEME.card};
  border: 1px solid ${THEME.border};
  border-radius: 8px;
  padding: ${({ $mobile }) => ($mobile ? '10px' : '14px 16px')};
  position: relative;
`;

const SectionTitle = styled.div`
  color: ${THEME.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`;

const LoadOverlay = styled.div`
  position: absolute; inset: 0; z-index: 1; border-radius: 8px; overflow: hidden;
`;

/* ═══════════════════════════════════════════
   Info Chips Row
   ═══════════════════════════════════════════ */

const Infos = styled.div`
  display: flex; gap: 6px; margin-bottom: 12px;
`;
const InfoChip = styled.div<{ $color: string }>`
  flex: 1;
  background: ${({ $color }) => THEME.alpha($color, 0.06)};
  border: 1px solid ${({ $color }) => THEME.alpha($color, 0.15)};
  border-radius: 6px;
  padding: 6px 10px;
  text-align: center;
`;
const InfoLabel = styled.div`
  color: ${THEME.text.secondary}; font-size: 0.65rem;
  font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;
`;
const InfoValue = styled.div<{ $color: string }>`
  color: ${({ $color }) => $color}; font-size: 0.88rem;
  font-family: 'Courier New', monospace; font-weight: bold; margin-top: 2px;
`;

/* ═══════════════════════════════════════════
   Action Cards Grid
   ═══════════════════════════════════════════ */

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  @media (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ActionCard = styled.button<{ $color: string; $disabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 6px;
  min-height: 72px;
  background: ${({ $color }) => THEME.alpha($color, 0.04)};
  border: 1px solid ${({ $color }) => THEME.alpha($color, 0.12)};
  border-radius: 6px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.3 : 1)};
  transition: all 0.15s;
  -webkit-tap-highlight-color: transparent;
  font-family: 'Courier New', monospace;
  &:hover:not(:disabled) {
    background: ${({ $color }) => THEME.alpha($color, 0.1)};
    border-color: ${({ $color }) => THEME.alpha($color, 0.3)};
  }
  &:active { opacity: 0.7; }
  @media (max-width: 767px) {
    min-height: 80px;
    padding: 12px 6px;
  }
`;

const ActionIcon = styled.span`
  font-size: 1.3rem;
  line-height: 1;
`;

const ActionLabel = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-size: 0.72rem;
  font-weight: bold;
  text-align: center;
  line-height: 1.2;
`;

const ActionBadge = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-size: 0.6rem;
  font-family: 'Courier New', monospace;
  background: ${({ $color }) => THEME.alpha($color, 0.12)};
  padding: 1px 6px;
  border-radius: 3px;
  white-space: nowrap;
`;

/* ═══════════════════════════════════════════
   Move Input Section
   ═══════════════════════════════════════════ */

const Input = styled.input<{ $mobile: boolean }>`
  width: 100%;
  padding: ${({ $mobile }) => ($mobile ? '12px 10px' : '8px')};
  font-size: ${({ $mobile }) => ($mobile ? '0.85rem' : '0.8rem')};
  font-family: 'Courier New', monospace;
  background: ${THEME.bg};
  border: 1px solid ${THEME.border};
  border-radius: 6px;
  color: ${THEME.text.primary};
  outline: none;
  min-height: ${({ $mobile }) => ($mobile ? '40px' : '36px')};
  &:focus { border-color: ${THEME.accent.green}; }
`;

const InputRow = styled.div`
  display: flex; gap: 6px; margin-top: 6px;
`;

/* ═══════════════════════════════════════════
   Section Header
   ═══════════════════════════════════════════ */

const GroupLabel = styled.div`
  color: ${THEME.text.secondary};
  font-size: 0.65rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 10px 0 4px 0;
  opacity: 0.6;
`;

const Divider = styled.div`
  height: 1px;
  background: ${THEME.alpha(THEME.border, 0.3)};
  margin: 8px 0;
`;

/* ═══════════════════════════════════════════
   Error Banner
   ═══════════════════════════════════════════ */

const ErrorBanner = styled.div`
  color: ${THEME.accent.red};
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  padding: 6px 10px;
  background: ${THEME.alpha(THEME.accent.red, 0.08)};
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 8px;
  text-align: center;
  border: 1px solid ${THEME.alpha(THEME.accent.red, 0.15)};
`;

/* ═══════════════════════════════════════════
   Component
   ═══════════════════════════════════════════ */

export function ActionPanel() {
  const [showMove, setShowMove] = useState(false);
  const [jumpConfirm, setJumpConfirm] = useState(false);
  const [tx, setTx] = useState('');
  const [ty, setTy] = useState('');
  const [tz, setTz] = useState('');
  const [coordError, setCoordError] = useState('');
  const pending = useGameStore(s => s.pendingEnergy);
  const isMoving = useGameStore(s => s.playerCiv?.isMoving ?? false);
  const loading = useGameStore(s => s.loading);
  const activeAction = useGameStore(s => s.activeAction);
  // #22 per-action overlay: 仅显示属于此面板的操作
  const actionLoading = activeAction !== null && ['collect','claimCombat','distribute','claimSES','move','jump','repairShield','regenShield','repairAll','cancelMove'].includes(activeAction);
  const error = useGameStore(s => s.error);
  const sesBalance = useGameStore(s => s.sesBalance);
  const playerCiv = useGameStore(s => s.playerCiv);
  const collectRate = useGameStore(s => s.collectRate);
  const currentEpoch = useGameStore(s => s.currentEpoch);
  const epochClaimed = useGameStore(s => s.epochClaimed);
  const epochEndTime = useGameStore(s => s.epochEndTime);
  const lastDistributedEpoch = useGameStore(s => s.lastDistributedEpoch);
  const dailyEmission = useGameStore(s => s.dailyEmission);
  const isMobile = useIsMobile();
  const { t } = useI18n();

  const { collectEnergy, claimCombatEnergy, claimDailySES, distribute, startMove, spaceJump, repairShield, regenShield, repairAll, cancelMove, clearError } = useGameActions();

  const handleStartMove = () => {
    const x = parseInt(tx), y = parseInt(ty), z = parseInt(tz);
    if (isNaN(x) || isNaN(y) || isNaN(z)) { setCoordError(t('action.move_invalid')); return; }
    setCoordError('');
    startMove(x, y, z);
    setShowMove(false); setTx(''); setTy(''); setTz('');
  };

  const hasShield = playerCiv && playerCiv.shieldHP > 0;
  const shieldFull = playerCiv ? playerCiv.shieldHP >= (playerCiv.maxShieldHP || 0) && playerCiv.maxShieldHP > 0 : false;

  /* ── Pending collectable energy — 链上 getPendingEnergy + 本地插值实时增长（#24） ── */
  const pendingCollect = useGameStore(s => s.pendingCollect);
  const lastSyncAt = useGameStore(s => s.lastSyncAt);
  const collectorDur = useGameStore(s => s.collectorDurability);
  const ticker = useTicker(1000);
  const pendingLive = (() => {
    if (!pendingCollect) return 0;
    if (!lastSyncAt || !collectRate) return pendingCollect;
    const elapsed = Math.max(0, (ticker - lastSyncAt) / 1000);
    const inc = collectRate * elapsed;
    const base = pendingCollect + inc;
    // 若耐久存在且 dur 快耗尽，钳制增长（简化：不超 maxDur-rate 比例，此处仅避免过大值）
    if (collectorDur.max > 0 && collectorDur.current <= 0) return Math.min(base, pendingCollect);
    return base;
  })();

  /* ── SES epoch ── */
  const epochDistributed = lastDistributedEpoch >= currentEpoch;
  const epochRemaining = epochEndTime > 0
    ? Math.max(0, Math.floor((epochEndTime * 1000 - Date.now()) / 1000))
    : 0;
  const epochRemainStr = epochRemaining > 0
    ? t('action.epoch_remaining', { min: Math.floor(epochRemaining / 60), sec: epochRemaining % 60 })
    : t('action.calculating');

  return (
    <Panel $mobile={isMobile}>
      {actionLoading && <LoadOverlay><LoadingOverlay message={t('general.loading')} color={THEME.accent.green} transparent /></LoadOverlay>}
      <SectionTitle><SystemIcon icon="/assets/systems/energy.web.png" /> {t('action.title')}</SectionTitle>

      {/* Resource Info Chips */}
      {playerCiv && (
        <Infos>
          <InfoChip $color={THEME.accent.gold}>
            <InfoLabel>{t('action.ses_balance')}</InfoLabel>
            <InfoValue $color={THEME.accent.gold}>{fmtCompact(sesBalance)}</InfoValue>
          </InfoChip>
          <InfoChip $color={THEME.accent.green}>
            <InfoLabel>{t('action.collect_rate')}</InfoLabel>
            <InfoValue $color={THEME.accent.green}>{fmt(collectRate, 2)}{t('general.per_sec')}</InfoValue>
          </InfoChip>
          <InfoChip $color={THEME.accent.violet}>
            <InfoLabel>{t('action.daily_est')}</InfoLabel>
            <InfoValue $color={THEME.accent.violet}>{dailyEmission > 0 ? fmt(dailyEmission, 0) : '…'} SES</InfoValue>
          </InfoChip>
          <InfoChip $color={THEME.accent.blue}>
            <InfoLabel>{t('general.epoch')} #{currentEpoch}</InfoLabel>
            <InfoValue $color={THEME.accent.blue}>{epochRemainStr}</InfoValue>
          </InfoChip>
        </Infos>
      )}
      {playerCiv && playerCiv.energyCollectorLv <= 2 && (
        <div style={{ color: THEME.alpha(THEME.accent.green, 0.85), fontSize: '0.7rem', fontFamily: "'Courier New', monospace", background: THEME.alpha(THEME.accent.green, 0.08), border: `1px dashed ${THEME.alpha(THEME.accent.green, 0.25)}`, borderRadius: 6, padding: '6px 10px', marginBottom: 10 }}>{t('general.tooltip_newbie')}</div>
      )}

      {/* Error Banner */}
      {error && (
        <ErrorBanner onClick={clearError}>
          {t('hud.error_dismiss', { msg: error })}
        </ErrorBanner>
      )}

      {/* === Resource Production === */}
      <GroupLabel><SystemIcon icon="/assets/systems/energy.web.png" /> {t('action.group_collect')}</GroupLabel>
      <Grid>
        {/* Collect Energy — with pending estimate */}
        <ActionCard $color={THEME.accent.green} $disabled={loading} onClick={() => !loading && collectEnergy()}>
          <ActionIcon><SystemIcon icon="/assets/systems/energy.web.png" /></ActionIcon>
          <ActionLabel $color={THEME.accent.green}>{t('action.collect')}</ActionLabel>
          {pendingLive > 0 && <ActionBadge $color={THEME.accent.green}>~{fmt(Math.floor(pendingLive))}</ActionBadge>}
        </ActionCard>
      </Grid>

      {/* === Reward Settlement (passive accruals, claimed via tx) === */}
      <GroupLabel><SystemIcon icon="/assets/systems/crate.web.png" /> {t('action.group_claim')}</GroupLabel>
      <Grid>
        {/* Combat Energy Claim */}
        <ActionCard $color={pending > 0 ? THEME.accent.gold : THEME.text.secondary} $disabled={loading || pending <= 0}
          onClick={() => !loading && pending > 0 && claimCombatEnergy()}>
          <ActionIcon><SystemIcon icon="/assets/systems/crate.web.png" /></ActionIcon>
          <ActionLabel $color={pending > 0 ? THEME.accent.gold : THEME.text.secondary}>{t('action.combat_energy')}</ActionLabel>
          {pending > 0 && <ActionBadge $color={THEME.accent.gold}>{fmt(pending)}</ActionBadge>}
          {pending <= 0 && <ActionBadge $color={THEME.text.secondary}>{t('action.combat_energy_empty')}</ActionBadge>}
        </ActionCard>

        {/* Daily SES — Distribute (全局分发) */}
        {!epochDistributed && (
          <ActionCard $color={THEME.accent.gold} $disabled={loading}
            onClick={() => !loading && distribute()}>
            <ActionIcon><SystemIcon icon="/assets/systems/distribute.web.png" /></ActionIcon>
            <ActionLabel $color={THEME.accent.gold}>{t('action.distribute')}</ActionLabel>
            <ActionBadge $color={THEME.accent.gold}>{t('action.distributing')}</ActionBadge>
          </ActionCard>
        )}

        {/* Daily SES — Claim */}
        {epochDistributed && (
          <ActionCard $color={epochClaimed ? THEME.text.secondary : THEME.accent.violet}
            $disabled={loading || epochClaimed}
            onClick={() => !loading && !epochClaimed && claimDailySES()}>
            <ActionIcon><SystemIcon icon="/assets/systems/claim.web.png" /></ActionIcon>
            <ActionLabel $color={epochClaimed ? THEME.text.secondary : THEME.accent.violet}>
              {epochClaimed ? t('action.claimed_today') : t('action.claim_ses')}
            </ActionLabel>
            <ActionBadge $color={epochClaimed ? THEME.text.secondary : THEME.accent.green}>
              {epochClaimed ? '✓' : epochRemainStr}
            </ActionBadge>
          </ActionCard>
        )}
      </Grid>

      <Divider />

      {/* === Movement === */}
      <GroupLabel><SystemIcon icon="/assets/systems/engine.web.png" /> {t('action.group_move')}</GroupLabel>
      <Grid>
        {showMove ? (
          <div style={{ gridColumn: '1 / -1' }}>
            {playerCiv && (
              <div style={{
                color: THEME.accent.blue, fontSize: '0.68rem', fontFamily: "'Courier New', monospace",
                marginBottom: 6, opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {t('hud.location')}: ({fmtCoord(playerCiv.x)}, {fmtCoord(playerCiv.y)}, {fmtCoord(playerCiv.z)})
              </div>
            )}
            <InputRow>
              <Input $mobile={isMobile} placeholder="X" value={tx} onChange={e => setTx(e.target.value)} onFocus={e => isMobile && setTimeout(() => (e.target as HTMLInputElement).scrollIntoView({ behavior: 'smooth', block: 'center' }), 150)} disabled={loading} />
              <Input $mobile={isMobile} placeholder="Y" value={ty} onChange={e => setTy(e.target.value)} onFocus={e => isMobile && setTimeout(() => (e.target as HTMLInputElement).scrollIntoView({ behavior: 'smooth', block: 'center' }), 150)} disabled={loading} />
              <Input $mobile={isMobile} placeholder="Z" value={tz} onChange={e => setTz(e.target.value)} onFocus={e => isMobile && setTimeout(() => (e.target as HTMLInputElement).scrollIntoView({ behavior: 'smooth', block: 'center' }), 150)} disabled={loading} />
            </InputRow>
            {coordError && <div style={{ color: THEME.accent.red, fontSize: '0.68rem', fontFamily: "'Courier New', monospace", marginTop: 4 }}>{coordError}</div>}
            <InputRow>
              <ActionButton variant="primary" disabled={loading} onClick={handleStartMove} style={{ flex: 1 }}>
                {t('action.move_confirm')}
              </ActionButton>
              <ActionButton variant="ghost" onClick={() => { setShowMove(false); setCoordError(''); }}>{t('action.move_cancel')}</ActionButton>
            </InputRow>
          </div>
        ) : (
          <ActionCard $color={THEME.accent.blue} $disabled={loading} onClick={() => !loading && setShowMove(true)}>
            <ActionIcon><SystemIcon icon="/assets/systems/engine.web.png" /></ActionIcon>
            <ActionLabel $color={THEME.accent.blue}>{t('action.move')}</ActionLabel>
          </ActionCard>
        )}
        <ActionCard $color={THEME.accent.pink} $disabled={loading} onClick={() => !loading && setJumpConfirm(true)}>
          <ActionIcon><SystemIcon icon="/assets/systems/jump.web.png" /></ActionIcon>
          <ActionLabel $color={THEME.accent.pink}>{t('action.jump')}</ActionLabel>
        </ActionCard>
        {/* Cancel move — 仅在移动中可取消 */}
        <ActionCard $color={THEME.accent.red} $disabled={loading || showMove || !isMoving} onClick={() => !loading && !showMove && isMoving && cancelMove()}>
          <ActionIcon><SystemIcon icon="/assets/systems/cancel.web.png" /></ActionIcon>
          <ActionLabel $color={isMoving ? THEME.accent.red : THEME.text.secondary}>{t('action.cancel_move')}</ActionLabel>
          {isMoving && <ActionBadge $color={THEME.accent.red}>{t('action.moving')}</ActionBadge>}
        </ActionCard>
      </Grid>

      <Divider />

      {/* === System Maintenance === */}
      <GroupLabel><SystemIcon icon="/assets/systems/collector.web.png" /> {t('action.group_repair')}</GroupLabel>
      <Grid>
        <ActionCard $color={THEME.accent.blue} $disabled={loading || shieldFull} onClick={() => !loading && !shieldFull && repairShield()}>
          <ActionIcon><SystemIcon icon="/assets/systems/shield.web.png" /></ActionIcon>
          <ActionLabel $color={shieldFull ? THEME.text.secondary : THEME.accent.blue}>{t('action.repair_shield')}</ActionLabel>
          <ActionBadge $color={shieldFull ? THEME.text.secondary : THEME.accent.blue}>
            {shieldFull ? t('action.shield_full') : `HP ${playerCiv?.shieldHP ?? 0}/${playerCiv?.maxShieldHP ?? 0}`}
          </ActionBadge>
        </ActionCard>
        <ActionCard $color={THEME.accent.green} $disabled={loading} onClick={() => !loading && regenShield()}>
          <ActionIcon><SystemIcon icon="/assets/systems/regen.web.png" /></ActionIcon>
          <ActionLabel $color={THEME.accent.green}>{t('action.regen_shield')}</ActionLabel>
        </ActionCard>
        <ActionCard $color={THEME.accent.orange} $disabled={loading} onClick={() => !loading && repairAll()}>
          <ActionIcon><SystemIcon icon="/assets/systems/collector.web.png" /></ActionIcon>
          <ActionLabel $color={THEME.accent.orange}>{t('action.repair_all')}</ActionLabel>
        </ActionCard>
      </Grid>

      {/* 追踪跃迁确认 */}
      <TxConfirm
        open={jumpConfirm}
        title={t('action.jump')}
        icon="/assets/systems/jump.web.png"
        onConfirm={() => { spaceJump(); setJumpConfirm(false); }}
        onCancel={() => setJumpConfirm(false)}
        confirmVariant="primary"
        confirmLabel={t('action.jump_confirm')}
        loading={loading}
      >
        {t('action.jump_warn')}
      </TxConfirm>
    </Panel>
  );
}
