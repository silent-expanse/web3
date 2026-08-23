import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useGameStore } from '../hooks/useGameStore';
import { useContract } from '../hooks/useContract';
import { useI18n } from '../hooks/useI18n';
import { THEME } from '../theme';
import { SystemIcon } from './ui/SystemIcon';
import { fmt } from '../utils/format';

const Panel = styled.div<{ $mobile: boolean }>`
  background: ${THEME.card};
  border: 1px solid ${THEME.border};
  border-radius: 8px;
  padding: ${({ $mobile }) => ($mobile ? '10px' : '14px 16px')};
  max-height: ${({ $mobile }) => ($mobile ? 'none' : '360px')};
  overflow-y: auto;
`;

const SectionTitle = styled.div`
  color: ${THEME.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
  display: flex; align-items: center; gap: 8px;
`;

const FilterRow = styled.div`
  display: flex; gap: 4px; margin-bottom: 8px;
`;
const FilterBtn = styled.button<{ $active: boolean }>`
  padding: 4px 10px;
  font-size: 0.7rem;
  font-family: 'Courier New', monospace;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid ${({ $active }) => $active ? THEME.accent.green : THEME.border};
  background: ${({ $active }) => $active ? THEME.alpha(THEME.accent.green, 0.12) : 'transparent'};
  color: ${({ $active }) => $active ? THEME.accent.green : THEME.text.secondary};
`;

const LogRow = styled.div`
  padding: 7px 6px;
  border-bottom: 1px solid ${THEME.alpha(THEME.border, 0.3)};
  font-size: 0.76rem;
  font-family: 'Courier New', monospace;
  &:last-child { border-bottom: none; }
  &:hover { background: ${THEME.alpha(THEME.accent.green, 0.03)}; }
`;

const Empty = styled.div`
  color: ${THEME.text.secondary};
  text-align: center;
  padding: 20px 12px;
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
`;
const CTA = styled.button`
  margin-top: 8px;
  padding: 6px 14px;
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid ${THEME.accent.green};
  background: transparent;
  color: ${THEME.accent.green};
  &:hover { background: ${THEME.alpha(THEME.accent.green, 0.1)}; }
`;

const Attacker = styled.span` color: ${THEME.accent.red}; `;
const Defender = styled.span` color: ${THEME.accent.shield}; `;
const Dmg = styled.span` color: ${THEME.accent.gold}; `;
const Won = styled.span` color: ${THEME.accent.green}; `;
const Lost = styled.span` color: ${THEME.text.secondary}; `;
const Time = styled.span` color: ${THEME.text.secondary}; font-size: 0.68rem; `;
const Meta = styled.span` color: ${THEME.text.secondary}; font-size: 0.7rem; `;

type Filter = 'all' | 'out' | 'in';

export function BattleLog() {
  const { t } = useI18n();
  const battleLog = useGameStore(s => s.battleLog);
  const address = useGameStore(s => s.address);
  const ct = useContract();
  const [filter, setFilter] = useState<Filter>('all');

  // name resolution: from enemyCivs map if known
  const enemyCivs = useGameStore(s => s.enemyCivs);
  const nameOf = (addr: string) => enemyCivs.get(addr)?.name ?? (addr.slice(0, 6) + '...');

  const filtered = useMemo(() => {
    const me = (address || '').toLowerCase();
    if (filter === 'out') return battleLog.filter(b => b.attacker.toLowerCase() === me);
    if (filter === 'in') return battleLog.filter(b => b.defender.toLowerCase() === me);
    return battleLog;
  }, [battleLog, address, filter]);

  // Try to resolve unknown names lazily via civ batch (fire-and-forget, cached in enemyCivs)
  // Trigger once on mount / when log changes
  if (ct.game && filtered.length > 0 && address) {
    const unknown = new Set<string>();
    for (const b of filtered.slice(0, 20)) {
      if (!enemyCivs.has(b.attacker) && b.attacker.toLowerCase() !== address.toLowerCase()) unknown.add(b.attacker);
      if (!enemyCivs.has(b.defender) && b.defender.toLowerCase() !== address.toLowerCase()) unknown.add(b.defender);
    }
    if (unknown.size > 0 && unknown.size <= 6) {
      const addrs = [...unknown];
      // fire-and-forget batch
      (ct.game.getCivilizations as unknown as (a: string[]) => Promise<unknown[]>)(addrs).then(raws => {
        (raws as Record<string, unknown>[]).forEach((r, i) => {
          const a = addrs[i];
          if (r && !useGameStore.getState().enemyCivs.has(a)) {
            try {
              const n = String((r as { name?: unknown }).name ?? '');
              const civ = { name: n, x: 0, y: 0, z: 0, energy: Number((r as { energy?: unknown }).energy ?? 0), health: Number((r as { health?: unknown }).health ?? 0), shieldHP: 0, maxShieldHP: 0, energyCollectorLv: 1, weaponLv: 1, radarLv: 1, shieldLv: 1, engineLv: 1, scanRange: 1000, isRuins: false, isMoving: false } as import('../hooks/useGameStore').Civilization;
              useGameStore.getState().addEnemyCiv(a, civ);
            } catch { /* ignore */ }
          }
        });
      }).catch(() => {});
    }
  }

  return (
    <Panel $mobile={false}>
      <SectionTitle><SystemIcon icon="/assets/systems/weapon.web.png" /> {t('battle.title')}</SectionTitle>
      {battleLog.length > 0 && (
        <FilterRow>
          <FilterBtn $active={filter === 'all'} onClick={() => setFilter('all')}>{t('battle.filter_all')}</FilterBtn>
          <FilterBtn $active={filter === 'out'} onClick={() => setFilter('out')}>{t('battle.filter_out')}</FilterBtn>
          <FilterBtn $active={filter === 'in'} onClick={() => setFilter('in')}>{t('battle.filter_in')}</FilterBtn>
        </FilterRow>
      )}
      {filtered.length === 0 ? (
        <Empty>
          {battleLog.length === 0 ? t('battle.empty') : (filter === 'in' ? t('battle.empty') : t('battle.empty'))}
          {battleLog.length === 0 && (
            <>
              <br />
              <Meta>{t('general.empty_cta')}</Meta>
            </>
          )}
        </Empty>
      ) : (
        filtered.slice(0, 50).map((b, i) => {
          const me = (address || '').toLowerCase();
          const isMeAttacker = b.attacker.toLowerCase() === me;
          const isMeDefender = b.defender.toLowerCase() === me;
          return (
          <LogRow key={`${b.attacker}-${b.defender}-${b.timestamp}-${i}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, alignItems: 'center' }}>
              <span>
                <Attacker title={b.attacker}>{nameOf(b.attacker)}</Attacker>
                {' → '}
                <Defender title={b.defender}>{nameOf(b.defender)}</Defender>
                {' | '}
                <Dmg>{b.damageDealt}</Dmg> dmg
                {b.shieldDamage > 0 && <> <Meta>(🛡 {b.shieldDamage}</Meta></>}
                {b.healthDamage > 0 && <><Meta> ❤ {b.healthDamage}</Meta></>}
                {(b.shieldDamage > 0 || b.healthDamage > 0) && <Meta>)</Meta>}
                {b.stolenEnergy > 0 && <> <Dmg>+{fmt(b.stolenEnergy)}⚡</Dmg></>}
                {b.downgradedSystem && <> <Lost>↓{b.downgradedSystem}</Lost></>}
                {' '}{b.won ? <Won>✓</Won> : <Lost>✗</Lost>}
                {isMeDefender && <span style={{ color: THEME.accent.red, fontSize: '0.68rem', marginLeft: 4 }}>{t('battle.incoming')}</span>}
                {isMeAttacker && b.won && <span style={{ color: THEME.accent.green, fontSize: '0.68rem', marginLeft: 4 }}>won</span>}
              </span>
              <Time>{new Date(b.timestamp * 1000).toLocaleTimeString()}</Time>
            </div>
          </LogRow>
        );})
      )}
    </Panel>
  );
}
