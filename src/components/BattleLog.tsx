import { useMemo } from 'react';
import styled from 'styled-components';
import { useGameStore } from '../hooks/useGameStore';
import { useI18n } from '../hooks/useI18n';
import { THEME } from '../theme';
import { SystemIcon } from './ui/SystemIcon';

const Panel = styled.div<{ $mobile: boolean }>`
  background: ${THEME.card};
  border: 1px solid ${THEME.border};
  border-radius: 8px;
  padding: ${({ $mobile }) => ($mobile ? '10px' : '14px 16px')};
  max-height: ${({ $mobile }) => ($mobile ? 'none' : '300px')};
  overflow-y: auto;
`;

const SectionTitle = styled.div`
  color: ${THEME.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
`;

const LogRow = styled.div`
  padding: 6px 4px;
  border-bottom: 1px solid ${THEME.alpha(THEME.border, 0.3)};
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  &:last-child { border-bottom: none; }
`;

const Attacker = styled.span` color: ${THEME.accent.red}; `
const Defender = styled.span` color: ${THEME.accent.shield}; `
const Dmg = styled.span` color: ${THEME.accent.gold}; `
const Won = styled.span` color: ${THEME.accent.green}; `
const Lost = styled.span` color: ${THEME.text.secondary}; `
const Time = styled.span` color: ${THEME.text.secondary}; font-size: 0.68rem; `

export function BattleLog() {
  const { t } = useI18n();
  const battleLog = useGameStore(s => s.battleLog);

  const grouped = useMemo(() => {
    return battleLog;
  }, [battleLog]);

  return (
    <Panel $mobile={false}>
      <SectionTitle><SystemIcon icon="/assets/systems/weapon.web.png" /> {t('battle.title')}</SectionTitle>
      {grouped.length === 0 ? (
        <LogRow style={{ color: THEME.text.secondary, textAlign: 'center' }}>
          {t('battle.empty')}
        </LogRow>
      ) : (
        grouped.slice(0, 50).map((b, i) => (
          <LogRow key={i}>
            <Attacker>{b.attacker.slice(0, 6)}...</Attacker>
            {' → '}
            <Defender>{b.defender.slice(0, 6)}...</Defender>
            {' | '}
            <Dmg>{b.damageDealt}</Dmg>
            {' dmg '}
            {b.won ? <Won>✓</Won> : <Lost>✗</Lost>}
            {' '}
            <Time>{new Date(b.timestamp * 1000).toLocaleTimeString()}</Time>
          </LogRow>
        ))
      )}
    </Panel>
  );
}
