import { useState } from 'react';
import styled from 'styled-components';
import { useGameStore } from '../hooks/useGameStore';
import { useIsMobile } from '../hooks/useMediaQuery';
import { useGameActions } from '../hooks/useGameActions';
import { LoadingOverlay } from './Spinner';
import { ActionButton } from './ui/ActionButton';
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
  const [tx, setTx] = useState('');
  const [ty, setTy] = useState('');
  const [tz, setTz] = useState('');
  const pending = useGameStore(s => s.pendingEnergy);
  const loading = useGameStore(s => s.loading);
  const error = useGameStore(s => s.error);
  const sesBalance = useGameStore(s => s.sesBalance);
  const playerCiv = useGameStore(s => s.playerCiv);
  const collectRate = useGameStore(s => s.collectRate);
  const lastCollectTime = useGameStore(s => s.lastCollectTime);
  const collectorDurability = useGameStore(s => s.collectorDurability);
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
    if (isNaN(x) || isNaN(y) || isNaN(z)) return;
    startMove(x, y, z);
    setShowMove(false); setTx(''); setTy(''); setTz('');
  };

  const hasShield = playerCiv && playerCiv.shieldHP > 0;

  /* ── Energy collection pending estimate ──
   * 对齐链上 _collectEnergy (Admin.sol:43-45):
   *   pending = min(now - lastUpdateTime, collectorDurability) × collectRate
   * lastCollectTime 来自链上 lastUpdateTime（秒），此处统一为 ms 计算。 */
  const pendingCollect = lastCollectTime > 0 && collectRate > 0
    ? Math.floor(collectRate * Math.min((Date.now() - lastCollectTime) / 1000, collectorDurability.current))
    : 0;

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
      {loading && <LoadOverlay><LoadingOverlay message={t('general.loading')} color={THEME.accent.green} transparent /></LoadOverlay>}
      <SectionTitle>{t('action.title')}</SectionTitle>

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
          <InfoChip $color="#8844ff">
            <InfoLabel>{t('action.daily_est')}</InfoLabel>
            <InfoValue $color="#8844ff">{dailyEmission > 0 ? fmt(dailyEmission, 0) : '…'} SES</InfoValue>
          </InfoChip>
          <InfoChip $color={THEME.accent.blue}>
            <InfoLabel>{t('general.epoch')} #{currentEpoch}</InfoLabel>
            <InfoValue $color={THEME.accent.blue}>{epochRemainStr}</InfoValue>
          </InfoChip>
        </Infos>
      )}

      {/* Error Banner */}
      {error && (
        <ErrorBanner onClick={clearError}>
          {t('hud.error_dismiss', { msg: error })}
        </ErrorBanner>
      )}

      {/* === Resource Production === */}
      <GroupLabel>{t('action.group_collect')}</GroupLabel>
      <Grid>
        {/* Collect Energy — with pending estimate */}
        <ActionCard $color={THEME.accent.green} $disabled={loading} onClick={() => !loading && collectEnergy()}>
          <ActionIcon>⚡</ActionIcon>
          <ActionLabel $color={THEME.accent.green}>{t('action.collect')}</ActionLabel>
          {pendingCollect > 0 && <ActionBadge $color={THEME.accent.green}>~{fmt(pendingCollect)}</ActionBadge>}
        </ActionCard>
      </Grid>

      {/* === Reward Settlement (passive accruals, claimed via tx) === */}
      <GroupLabel>{t('action.group_claim')}</GroupLabel>
      <Grid>
        {/* Combat Energy Claim */}
        <ActionCard $color={pending > 0 ? THEME.accent.gold : THEME.text.secondary} $disabled={loading || pending <= 0}
          onClick={() => !loading && pending > 0 && claimCombatEnergy()}>
          <ActionIcon>📦</ActionIcon>
          <ActionLabel $color={pending > 0 ? THEME.accent.gold : THEME.text.secondary}>{t('action.combat_energy')}</ActionLabel>
          {pending > 0 && <ActionBadge $color={THEME.accent.gold}>{fmt(pending)}</ActionBadge>}
          {pending <= 0 && <ActionBadge $color={THEME.text.secondary}>{t('action.combat_energy_empty')}</ActionBadge>}
        </ActionCard>

        {/* Daily SES — Distribute (全局分发) */}
        {!epochDistributed && (
          <ActionCard $color={THEME.accent.gold} $disabled={loading}
            onClick={() => !loading && distribute()}>
            <ActionIcon>📤</ActionIcon>
            <ActionLabel $color={THEME.accent.gold}>{t('action.distribute')}</ActionLabel>
            <ActionBadge $color={THEME.accent.gold}>{t('action.distributing')}</ActionBadge>
          </ActionCard>
        )}

        {/* Daily SES — Claim */}
        {epochDistributed && (
          <ActionCard $color={epochClaimed ? THEME.text.secondary : '#8844ff'}
            $disabled={loading || epochClaimed}
            onClick={() => !loading && !epochClaimed && claimDailySES()}>
            <ActionIcon>📅</ActionIcon>
            <ActionLabel $color={epochClaimed ? THEME.text.secondary : '#8844ff'}>
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
      <GroupLabel>{t('action.group_move')}</GroupLabel>
      <Grid>
        {showMove ? (
          <div style={{ gridColumn: '1 / -1' }}>
            {playerCiv && (
              <div style={{
                color: THEME.accent.blue, fontSize: '0.68rem', fontFamily: "'Courier New', monospace",
                marginBottom: 6, opacity: 0.8,
              }}>
                {t('hud.location')}: ({fmtCoord(playerCiv.x)}, {fmtCoord(playerCiv.y)}, {fmtCoord(playerCiv.z)})
              </div>
            )}
            <InputRow>
              <Input $mobile={isMobile} placeholder="X" value={tx} onChange={e => setTx(e.target.value)} disabled={loading} />
              <Input $mobile={isMobile} placeholder="Y" value={ty} onChange={e => setTy(e.target.value)} disabled={loading} />
              <Input $mobile={isMobile} placeholder="Z" value={tz} onChange={e => setTz(e.target.value)} disabled={loading} />
            </InputRow>
            <InputRow>
              <ActionButton variant="primary" disabled={loading} onClick={handleStartMove} style={{ flex: 1 }}>
                {t('action.move_confirm')}
              </ActionButton>
              <ActionButton variant="ghost" onClick={() => setShowMove(false)}>{t('action.move_cancel')}</ActionButton>
            </InputRow>
          </div>
        ) : (
          <ActionCard $color={THEME.accent.blue} $disabled={loading} onClick={() => !loading && setShowMove(true)}>
            <ActionIcon>🚀</ActionIcon>
            <ActionLabel $color={THEME.accent.blue}>{t('action.move')}</ActionLabel>
          </ActionCard>
        )}
        <ActionCard $color="#ff66aa" $disabled={loading} onClick={() => !loading && spaceJump()}>
          <ActionIcon>🌌</ActionIcon>
          <ActionLabel $color="#ff66aa">{t('action.jump')}</ActionLabel>
        </ActionCard>
        {/* Cancel move */}
        <ActionCard $color={THEME.accent.red} $disabled={loading || showMove} onClick={() => !loading && !showMove && cancelMove()}>
          <ActionIcon>⏹️</ActionIcon>
          <ActionLabel $color={THEME.accent.red}>{t('action.cancel_move')}</ActionLabel>
        </ActionCard>
      </Grid>

      <Divider />

      {/* === System Maintenance === */}
      <GroupLabel>{t('action.group_repair')}</GroupLabel>
      <Grid>
        <ActionCard $color={THEME.accent.blue} $disabled={loading} onClick={() => !loading && repairShield()}>
          <ActionIcon>🛡️</ActionIcon>
          <ActionLabel $color={THEME.accent.blue}>{t('action.repair_shield')}</ActionLabel>
          {hasShield && <ActionBadge $color={THEME.accent.blue}>HP {playerCiv!.shieldHP}</ActionBadge>}
        </ActionCard>
        <ActionCard $color={THEME.accent.green} $disabled={loading} onClick={() => !loading && regenShield()}>
          <ActionIcon>♻️</ActionIcon>
          <ActionLabel $color={THEME.accent.green}>{t('action.regen_shield')}</ActionLabel>
        </ActionCard>
        <ActionCard $color="#ff8844" $disabled={loading} onClick={() => !loading && repairAll()}>
          <ActionIcon>🔧</ActionIcon>
          <ActionLabel $color="#ff8844">{t('action.repair_all')}</ActionLabel>
        </ActionCard>
      </Grid>
    </Panel>
  );
}
