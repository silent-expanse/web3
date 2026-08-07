import { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useGameStore, type Civilization } from '../hooks/useGameStore';
import { useIsMobile } from '../hooks/useMediaQuery';
import { useGameActions } from '../hooks/useGameActions';
import { SYSTEMS, type SystemKey } from '../utils/constants';
import { StatCard } from './ui/StatCard';
import { ActionButton } from './ui/ActionButton';
import { THEME } from '../theme';
import { useI18n } from '../hooks/useI18n';
import { fmt, fmtCompact, fmtCoord } from '../utils/format';

/* ─── Layout ─── */

const Container = styled.div<{ $mobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${({ $mobile }) => $mobile && css`padding: 4px 0;`}
`;

const Panel = styled.div`
  background: ${THEME.card};
  border: 1px solid ${THEME.border};
  border-radius: 8px;
  padding: 14px 16px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 10px;
`;

const SectionTitle = styled.div`
  color: ${THEME.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
`;

const Name = styled.div`
  color: ${THEME.accent.green};
  font-size: 1.1rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 1px;
`;
const Sub = styled.div`
  color: ${THEME.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
`;

const StatPill = styled.div<{ $color: string }>`
  background: ${({ $color }) => THEME.alpha($color, 0.08)};
  border: 1px solid ${({ $color }) => THEME.alpha($color, 0.18)};
  border-radius: 6px;
  padding: 8px 14px;
  min-height: 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 3px;
`;

const StatLabel = styled.div`
  color: ${THEME.text.secondary};
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 2px;
`;

const StatValue = styled.div<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
`;

const StatRate = styled.div`
  color: ${THEME.text.secondary};
  font-size: 0.65rem;
  font-family: 'Courier New', monospace;
`;

export function HUD() {
  const { t } = useI18n();
  const civ = useGameStore(s => s.playerCiv);
  const addr = useGameStore(s => s.address);
  const ses = useGameStore(s => s.sesBalance);
  const pending = useGameStore(s => s.pendingEnergy);
  const tokens = useGameStore(s => s.attackTokens);
  const loading = useGameStore(s => s.loading);
  const error = useGameStore(s => s.error);
  const isMobile = useIsMobile();

  // 维修/重建入口（采集器耐久耗尽时的唯一修复入口；重建在摧毁状态）
  const { clearError, rebuildCivilization, repairCollector } = useGameActions();

  // ── 所有 hooks 必须在条件 return 之前（React Hooks 规则，避免 #310）──
  const rate = useGameStore(s => s.collectRate); // 链上 getEnergyCollectRate（÷1e6）
  const atk = useGameStore(s => s.attackPower);  // 链上 getAttackPower
  const isDestroyed = useGameStore(s => s.isDestroyed);
  const collectorDur = useGameStore(s => s.collectorDurability);
  const combatBoost = useGameStore(s => s.combatBoost);
  // 防御/速度/雷达从链上 view 读取（轮询刷新），避免本地重复公式
  const defVal = useGameStore(s => s.shieldDefense);
  const speedVal = useGameStore(s => s.speed);
  const radarVal = useGameStore(s => s.radarRange);
  // 联盟图腾防御加成（合约 _defAllianceBonus: 每盟友 8 防御 × (1+图腾Lv×0.5%)）
  const currentAlliance = useGameStore(s => s.currentAlliance);
  const totemLv = useGameStore(s => s._allianceTotemLevel);
  const allyCount = currentAlliance?.memberCount ?? 0;
  const allyBonus = allyCount > 1
    ? Math.floor((allyCount - 1) * 8 * (10000 + totemLv * 50) / 10000)
    : 0;
  const defTotal = defVal + allyBonus;

  const shortAddr = addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';
  const sesNum = parseFloat(ses);

  const systems = useMemo(() => {
    const c = civ!; // hooks 必须在条件 return 之前（React 规则），civ 为 null 时组件提前返回不渲染此处
    return [
      { key: 'energyCollector' as SystemKey, icon: SYSTEMS.energyCollector.icon, title: SYSTEMS.energyCollector.name, lv: c.energyCollectorLv, color: SYSTEMS.energyCollector.color,
        bars: [
          { label: t('hud.collect_rate'), value: rate, rate: fmt(rate, 2) + t('general.per_sec'), color: THEME.accent.green },
          ...(collectorDur.max > 0 ? [{ label: t('hud.durability'), value: collectorDur.current, max: collectorDur.max, color: THEME.accent.blue }] : []),
        ] },
      { key: 'weapon' as SystemKey, icon: SYSTEMS.weapon.icon, title: SYSTEMS.weapon.name, lv: c.weaponLv, color: SYSTEMS.weapon.color,
        bars: [{ label: t('hud.attack_power'), value: atk, color: THEME.accent.red }] },
      { key: 'shield' as SystemKey, icon: SYSTEMS.shield.icon, title: SYSTEMS.shield.name, lv: c.shieldLv, color: SYSTEMS.shield.color,
      bars: [
        { label: t('hud.shield'), value: c.shieldHP, max: c.maxShieldHP, color: THEME.accent.shield },
        { label: t('hud.defense'), value: defTotal, color: SYSTEMS.shield.color },
      ] },
      { key: 'radar' as SystemKey, icon: SYSTEMS.radar.icon, title: SYSTEMS.radar.name, lv: c.radarLv, color: SYSTEMS.radar.color,
        bars: [{ label: t('hud.scan_range'), value: radarVal || c.scanRange, rate: (radarVal || c.scanRange) + t('general.ls'), color: THEME.accent.blue }] },
      { key: 'engine' as SystemKey, icon: SYSTEMS.engine.icon, title: SYSTEMS.engine.name, lv: c.engineLv, color: SYSTEMS.engine.color,
        bars: [{ label: t('hud.speed'), value: speedVal, rate: speedVal + t('general.ls_h'), color: SYSTEMS.engine.color }],
      },
    ];
  }, [civ, rate, atk, defTotal, speedVal, radarVal, t]);

  if (!civ) return null;

  return (
    <Container $mobile={isMobile}>
      {/* Error */}
      {error && (
        <div onClick={clearError} style={{
          color: THEME.accent.red, fontSize: '0.78rem', fontFamily: "'Courier New', monospace",
          padding: '6px 10px', background: THEME.alpha(THEME.accent.red, 0.1), borderRadius: 6,
          cursor: 'pointer', textAlign: 'center', border: `1px solid ${THEME.alpha(THEME.accent.red, 0.2)}`,
        }}>
          {t('hud.error_dismiss', { msg: error })}
        </div>
      )}

      {/* ── Panel 1: Identity + Key Stats（纯展示）── */}
      <Panel>
        <Row style={{ marginBottom: 10 }}>
          <div style={{ flex: 1 }}>
            <Name>{civ.name}</Name>
            <Sub>{shortAddr}</Sub>
          </div>
        </Row>
        {/* 坐标独占一行，nowrap 避免长文本在网格内被拆成多行 */}
        <Sub style={{ color: THEME.accent.blue, whiteSpace: 'nowrap', marginBottom: 10 }}>
          {t('hud.location')}: ({fmtCoord(civ.x)}, {fmtCoord(civ.y)}, {fmtCoord(civ.z)})
        </Sub>
        <Row>
          <StatPill $color={THEME.accent.gold}>
            <StatLabel>{t('hud.ses')}</StatLabel>
            <StatValue $color={THEME.accent.gold}>{fmtCompact(sesNum)}</StatValue>
          </StatPill>
          <StatPill $color={THEME.accent.green}>
            <StatLabel>{t('general.energy')}</StatLabel>
            <StatValue $color={THEME.accent.green}>{fmt(civ.energy)}</StatValue>
            <StatRate>{fmt(rate, 2)}{t('general.per_sec')}</StatRate>
          </StatPill>
          <StatPill $color={THEME.accent.red}>
            <StatLabel>{t('general.health')}</StatLabel>
            <StatValue $color={THEME.accent.red}>{fmt(civ.health)}</StatValue>
          </StatPill>
          <StatPill $color={THEME.accent.shield}>
            <StatLabel>{t('hud.shield')}</StatLabel>
            <StatValue $color={THEME.accent.shield}>
              {civ.maxShieldHP > 0 ? Math.round((civ.shieldHP / civ.maxShieldHP) * 100) + '%' : '0%'}
            </StatValue>
          </StatPill>
          <StatPill $color="#8844ff">
            <StatLabel>{t('hud.attack_token_label')}</StatLabel>
            <StatValue $color="#8844ff">
              {fmt(tokens.current, 1)}/{tokens.max}
            </StatValue>
            <StatRate>{fmt(tokens.ratePerSec, 4)}{t('general.per_sec')}</StatRate>
          </StatPill>
          {combatBoost > 0 && (
            <StatPill $color={THEME.accent.gold}>
              <StatLabel>{t('hud.combat_boost')}</StatLabel>
              <StatValue $color={THEME.accent.gold}>+{combatBoost}%</StatValue>
              <StatRate>{t('hud.totem_bonus')}</StatRate>
            </StatPill>
          )}
          {pending > 0 && (
            <StatPill $color={THEME.accent.gold}>
              <StatLabel>{t('hud.pending_label')}</StatLabel>
              <StatValue $color={THEME.accent.gold}>{fmt(pending)}</StatValue>
              <StatRate>{t('hud.pending_type')}</StatRate>
            </StatPill>
          )}
        </Row>
      </Panel>

      {/* ── Rebuild Banner ── */}
      {isDestroyed && (
        <Panel>
          <div style={{ textAlign: 'center', padding: '16px 8px' }}>
            <SectionTitle style={{ color: THEME.accent.red, marginBottom: 8 }}>{t('hud.destroyed_title')}</SectionTitle>
            <div style={{ color: THEME.text.secondary, fontSize: '0.78rem', marginBottom: 12, fontFamily: "'Courier New', monospace" }}>
              {t('hud.destroyed_desc')}
            </div>
            <ActionButton variant="danger" disabled={loading} onClick={() => !loading && rebuildCivilization()}>
              {t('hud.destroyed_btn')}
            </ActionButton>
            <div style={{ color: THEME.text.secondary, fontSize: '0.68rem', marginTop: 8, fontFamily: "'Courier New', monospace" }}>
              {t('hud.rebuild_cost')}
            </div>
          </div>
        </Panel>
      )}

      {/* ── Collector Durability Warning ── */}
      {!isDestroyed && collectorDur.max > 0 && collectorDur.current < collectorDur.max * 0.3 && (
        <Panel style={{ borderColor: THEME.alpha(THEME.accent.gold, 0.3) }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ color: THEME.accent.gold, fontSize: '0.78rem', fontFamily: "'Courier New', monospace" }}>
              {t('hud.durability_warn', { pct: Math.round(collectorDur.current / collectorDur.max * 100) })}
            </span>
            <ActionButton variant="ghost" icon="/assets/systems/collector.web.png" disabled={loading} onClick={() => !loading && repairCollector(collectorDur.max)}>
              {t('hud.durability_repair')}
            </ActionButton>
          </div>
        </Panel>
      )}

      {/* ── Panel 2: 五大系统（状态展示；升级操作在「系统」页）── */}
      <Panel>
        <SectionTitle>{t('hud.tech_systems')}</SectionTitle>
        <Grid>
          {systems.map(s => {
            return (
              <StatCard
                key={s.key} icon={s.icon} title={s.title} level={s.lv}
                bars={s.bars} warn={false}
              />
            );
          })}
        </Grid>
      </Panel>
    </Container>
  );
}
