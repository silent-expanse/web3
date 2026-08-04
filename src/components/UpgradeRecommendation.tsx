import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useGameStore } from '../hooks/useGameStore';
import { useContract } from '../hooks/useContract';
import { useGameActions, calcCollectRate, calcAttackPower, calcShieldDefense, calcRadarRange, calcSpeed } from '../hooks/useGameActions';
import { ActionButton } from './ui/ActionButton';
import { TxConfirm } from './ui/TxConfirm';
import { LoadingOverlay } from './Spinner';
import { THEME } from '../theme';
import { type SystemKey, SYSTEMS, GAME } from '../utils/constants';
import { useI18n } from '../hooks/useI18n';
import { fmt, fmtCompact } from '../utils/format';

/* ═══════════════════════════════════════════
   Layout
   ═══════════════════════════════════════════ */

const Panel = styled.div`
  background: ${THEME.card};
  border: 1px solid ${THEME.border};
  border-radius: 8px;
  padding: 14px 16px;
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
   Upgrade Card
   ═══════════════════════════════════════════ */

const Card = styled.div<{ $color: string; $highlight?: boolean; $affordable: boolean }>`
  background: ${({ $highlight, $color }) =>
    $highlight ? THEME.alpha($color, 0.06) : THEME.alpha($color, 0.02)};
  border: 1px solid ${({ $highlight, $color }) =>
    $highlight ? $color : THEME.alpha($color, 0.12)};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  transition: border-color 0.2s, background 0.2s;
  opacity: ${({ $affordable }) => $affordable ? 1 : 0.55};
  &:hover {
    border-color: ${({ $color }) => THEME.alpha($color, 0.4)};
    background: ${({ $color }) => THEME.alpha($color, 0.08)};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 6px;
`;

const CardTitle = styled.span`
  color: ${THEME.text.primary};
  font-size: 0.82rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LevelBadge = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-size: 0.7rem;
  font-family: 'Courier New', monospace;
  background: ${({ $color }) => THEME.alpha($color, 0.12)};
  border-radius: 3px;
  padding: 1px 6px;
`;

const HighlightTag = styled.span<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-size: 0.6rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: ${({ $color }) => THEME.alpha($color, 0.15)};
  border-radius: 3px;
  padding: 2px 6px;
  border: 1px solid ${({ $color }) => THEME.alpha($color, 0.3)};
`;

/* ═══════════════════════════════════════════
   Stat Row (current → next)
   ═══════════════════════════════════════════ */

const StatRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const StatBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const StatBoxLabel = styled.div`
  color: ${THEME.text.secondary};
  font-size: 0.6rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatBoxValue = styled.div<{ $color: string; $next?: boolean }>`
  color: ${({ $color, $next }) => $next ? $color : THEME.text.primary};
  font-size: ${({ $next }) => $next ? '0.9rem' : '0.82rem'};
  font-family: 'Courier New', monospace;
  font-weight: bold;
`;

const ArrowDivider = styled.span`
  color: ${THEME.text.secondary};
  font-size: 0.9rem;
  opacity: 0.4;
`;

/* ═══════════════════════════════════════════
   Cost Bar
   ═══════════════════════════════════════════ */

const CostRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const CostBarTrack = styled.div`
  flex: 1;
  height: 6px;
  background: ${THEME.alpha(THEME.border, 0.3)};
  border-radius: 3px;
  overflow: hidden;
`;

const CostBarFill = styled.div<{ $color: string; $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => Math.min($pct, 100)}%;
  background: ${({ $color }) => $color};
  border-radius: 3px;
  transition: width 0.3s;
`;

const CostLabel = styled.span<{ $affordable: boolean }>`
  color: ${({ $affordable }) => $affordable ? THEME.accent.green : THEME.accent.red};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  white-space: nowrap;
  flex-shrink: 0;
`;

const EnergyCostBadge = styled.span`
  color: ${THEME.accent.blue};
  font-size: 0.62rem;
  font-family: 'Courier New', monospace;
  background: ${THEME.alpha(THEME.accent.blue, 0.1)};
  border-radius: 3px;
  padding: 1px 5px;
  margin-left: 4px;
`;

/* ═══════════════════════════════════════════
   Error Banner
   ═══════════════════════════════════════════ */

const LoadingCost = styled.span`
  color: ${THEME.text.secondary};
  font-size: 0.65rem;
  font-family: 'Courier New', monospace;
  opacity: 0.6;
`;

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
   Data Model
   ═══════════════════════════════════════════ */

interface Recommendation {
  key: SystemKey;
  lv: number;
  name: string;
  icon: string;
  color: string;
  value: number;
  gain: number;
  nextValue: number;
  sysName: string;
}

interface CostInfo {
  ses: number;
  energy: number;
}

const SYS_TO_CONTRACT: Record<SystemKey, string> = {
  energyCollector: 'collector',
  weapon: 'weapon',
  shield: 'shield',
  radar: 'radar',
  engine: 'engine',
};

function calcRecommendation(key: SystemKey, lv: number): { value: number; gain: number; nextValue: number; subGain?: string } {
  const next = lv + 1;
  switch (key) {
    case 'energyCollector': {
      const cur = calcCollectRate(lv), nxt = calcCollectRate(next);
      const gain = nxt - cur;
      // 第二收益：耐久上限 +DURABILITY_PER_LV 秒（合约 _calcMaxDurability 线性增长，每次升级都有）
      // 速率受整数 sqrt 平台期影响可能为 0，耐久收益保持可见，避免「升级无收益」错觉
      return { value: cur, gain, nextValue: nxt, subGain: `+${GAME.DURABILITY_PER_LV}s 耐久` };
    }
    case 'weapon': {
      const cur = calcAttackPower(lv), nxt = calcAttackPower(next);
      return { value: cur, gain: nxt - cur, nextValue: nxt };
    }
    case 'shield': {
      const cur = calcShieldDefense(lv), nxt = calcShieldDefense(next);
      return { value: cur, gain: nxt - cur, nextValue: nxt };
    }
    case 'radar': {
      const cur = calcRadarRange(lv), nxt = calcRadarRange(next);
      return { value: cur, gain: nxt - cur, nextValue: nxt };
    }
    case 'engine': {
      const cur = calcSpeed(lv), nxt = calcSpeed(next);
      return { value: cur, gain: nxt - cur, nextValue: nxt };
    }
  }
}

/* ═══════════════════════════════════════════
   Component
   ═══════════════════════════════════════════ */

export function UpgradeRecommendation() {
  const { t } = useI18n();
  const civ = useGameStore(s => s.playerCiv);
  const loading = useGameStore(s => s.loading);
  const error = useGameStore(s => s.error);
  const sesNum = parseFloat(useGameStore(s => s.sesBalance));
  const address = useGameStore(s => s.address);
  const ct = useContract();
  const { upgradeSystem, clearError } = useGameActions();

  const [confirmSystem, setConfirmSystem] = useState<SystemKey | null>(null);

  /* ── Fetch real upgrade costs from contract ── */
  const { data: realCosts, isFetching: costLoading } = useQuery({
    queryKey: ['upgradeCosts', address, civ?.energyCollectorLv, civ?.weaponLv, civ?.shieldLv, civ?.radarLv, civ?.engineLv],
    queryFn: async (): Promise<Record<string, CostInfo> | null> => {
      if (!ct.game || !address || ct.isSimulated) return null;
      const names = ['collector', 'weapon', 'shield', 'radar', 'engine'];
      const results = await Promise.all(
        names.map(name => ct.game!.getUpgradeCost(address, name))
      );
      const map: Record<string, CostInfo> = {};
      names.forEach((name, i) => {
        map[name] = { ses: Number(results[i].ses) / 1e18, energy: Number(results[i].energy) };
      });
      return map;
    },
    enabled: !!ct.game && !!address && !ct.isSimulated,
    staleTime: 10_000,
    refetchInterval: 15_000,
  });

  /* ── Build recommendation list ── */
  const recs = useMemo(() => {
    if (!civ) return [];
    const keys: SystemKey[] = ['energyCollector', 'weapon', 'shield', 'radar', 'engine'];
    const lvs = [civ.energyCollectorLv, civ.weaponLv, civ.shieldLv, civ.radarLv, civ.engineLv];
    return keys
      .map((key, i) => {
        const lv = lvs[i];
        const sys = SYSTEMS[key];
        const rec = calcRecommendation(key, lv);
        return { key, lv, name: sys.name, icon: sys.icon, color: sys.color, sysName: SYS_TO_CONTRACT[key], ...rec };
      })
      .filter(r => !isNaN(r.gain) && r.lv < 999)
      .sort((a, b) => b.gain - a.gain);
  }, [civ]);

  if (!civ || recs.length === 0) return null;

  const handleConfirmUpgrade = () => {
    if (confirmSystem) upgradeSystem(confirmSystem);
    setConfirmSystem(null);
  };

  const selectedForUpgrade = confirmSystem ? recs.find(r => r.key === confirmSystem) : null;

  return (
    <Panel>
      <SectionTitle>{t('nav.tech')}</SectionTitle>

      {/* Loading overlay */}
      {loading && <LoadOverlay><LoadingOverlay message={t('upgrade.btn')} color={THEME.accent.green} transparent /></LoadOverlay>}

      {/* Error banner */}
      {error && (
        <ErrorBanner onClick={clearError}>
          {t('hud.error_dismiss', { msg: error })}
        </ErrorBanner>
      )}

      {/* Contract unavailable */}
      {!realCosts && !costLoading && ct.game && address && (
        <div style={{ color: THEME.text.secondary, fontSize: '0.75rem', textAlign: 'center', padding: 12 }}>
          {t('upgrade.unavailable')}
        </div>
      )}

      {/* Loading */}
      {costLoading && (
        <div style={{ color: THEME.text.secondary, fontSize: '0.75rem', textAlign: 'center', padding: 12 }}>
          {t('upgrade.loading')}
        </div>
      )}

      {realCosts && recs.map((r, i) => {
        const contractCost = realCosts[r.sysName];
        const costSES = contractCost.ses;
        const costEnergy = contractCost.energy;
        const affordable = sesNum >= costSES;
        const pct = sesNum > 0 ? (sesNum / costSES) * 100 : 0;

        return (
          <Card key={r.key} $color={r.color} $highlight={i === 0} $affordable={affordable}>
            <CardHeader>
              <CardTitle>
                {r.icon} {r.name}
                <LevelBadge $color={r.color}>Lv.{r.lv}</LevelBadge>
              </CardTitle>
              {i === 0 && <HighlightTag $color={r.color}>{t('upgrade.recommend_badge')}</HighlightTag>}
            </CardHeader>

            <StatRow>
              <StatBox>
                <StatBoxLabel>{t('upgrade.current')}</StatBoxLabel>
                <StatBoxValue $color={THEME.text.primary}>{r.value}</StatBoxValue>
              </StatBox>
              <ArrowDivider>→</ArrowDivider>
              <StatBox>
                <StatBoxLabel>{t('upgrade.after')}</StatBoxLabel>
                <StatBoxValue $color={r.color} $next>{r.nextValue}</StatBoxValue>
              </StatBox>
              <StatBox>
                <StatBoxLabel>{t('upgrade.gain')}</StatBoxLabel>
                <StatBoxValue $color={r.color} $next>
                  {r.key === 'energyCollector' && r.gain === 0
                    ? (r.subGain ?? `+${r.gain}`)
                    : `+${r.gain}`}
                </StatBoxValue>
              </StatBox>
            </StatRow>

            <CostRow>
              <CostBarTrack>
                <CostBarFill $color={affordable ? THEME.accent.green : THEME.accent.red} $pct={pct} />
              </CostBarTrack>
              <CostLabel $affordable={affordable}>
                {fmtCompact(sesNum)} / {fmt(costSES, 2)} SES
                {costEnergy > 0 && <EnergyCostBadge>⚡{fmt(costEnergy)}</EnergyCostBadge>}
              </CostLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {costLoading && <LoadingCost>⟳</LoadingCost>}
                <ActionButton variant="primary" disabled={loading || !affordable}
                  onClick={() => setConfirmSystem(r.key)}>
                  {t('upgrade.btn')}
                </ActionButton>
              </div>
            </CostRow>
          </Card>
        );
      })}

      {/* TxConfirm */}
      <TxConfirm
        open={!!confirmSystem}
        title={`⬆️ ${t('hud.confirm_upgrade')} ${selectedForUpgrade ? selectedForUpgrade.name : ''}`}
        icon="⬆️"
        onConfirm={handleConfirmUpgrade}
        onCancel={() => setConfirmSystem(null)}
        confirmVariant="primary"
        confirmLabel={t('hud.confirm_upgrade')}
        loading={loading}
      >
        {selectedForUpgrade && (
          <>
            {t('upgrade.btn')} {selectedForUpgrade.name} Lv.
            {selectedForUpgrade.lv} → {selectedForUpgrade.lv + 1}<br />
            {realCosts ? `${t('hud.cost')}: ${fmt(Number(realCosts[selectedForUpgrade.sysName]?.ses ?? 0), 2)} SES${Number(realCosts[selectedForUpgrade.sysName]?.energy ?? 0) > 0 ? ` + ${fmt(Number(realCosts[selectedForUpgrade.sysName].energy))}⚡` : ''}` : ''}
          </>
        )}
      </TxConfirm>
    </Panel>
  );
}


