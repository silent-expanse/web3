import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useGameStore } from '../hooks/useGameStore';
import { useContract } from '../hooks/useContract';
import { THEME } from '../theme';
import { SystemIcon } from './ui/SystemIcon';
import { useI18n } from '../hooks/useI18n';
import { fmt } from '../utils/format';

const Panel = styled.div`
  background: ${THEME.card};
  border: 1px solid ${THEME.border};
  border-radius: 8px;
  padding: 14px 16px;
`;

const SectionTitle = styled.div`
  color: ${THEME.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`;

const Row = styled.div`
  display: flex; align-items: center; gap: 8px;
  padding: 6px 4px; border-bottom: 1px solid ${THEME.alpha(THEME.border, 0.3)};
  font-size: 0.78rem; font-family: 'Courier New', monospace;
  &:last-child { border-bottom: none; }
  &:hover { background: ${THEME.alpha(THEME.accent.green, 0.03)}; }
`;

const Rank = styled.span<{ $top?: boolean }>`
  width: 24px; text-align: center; font-weight: bold; flex-shrink: 0;
  color: ${({ $top }) => $top ? THEME.accent.gold : THEME.text.secondary};
  font-size: ${({ $top }) => $top ? '0.85rem' : '0.75rem'};
`;

const Name = styled.span`
  flex: 1; color: ${THEME.text.primary}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
`;

const Score = styled.span`
  color: ${THEME.accent.green}; font-weight: bold; text-align: right;
`;

const Info = styled.span`
  color: ${THEME.text.secondary}; font-size: 0.68rem; text-align: right; min-width: 60px;
`;

interface SimplePlayer {
  player: string;
  energy: number;
  health: number;
  collectorLv: number;
  weaponLv: number;
  shieldLv: number;
  radarLv: number;
  engineLv: number;
  shieldHP: number;
  shieldMax: number;
  exists: boolean;
  isRuins: boolean;
}

export function Leaderboard() {
  const { t } = useI18n();
  const ct = useContract();
  const address = useGameStore(s => s.address);
  const playerCiv = useGameStore(s => s.playerCiv);

  // Fetch leaderboard from contract
  const { data: players, isFetching } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: async (): Promise<SimplePlayer[]> => {
      if (!ct.game) throw new Error('Contract not available');
      const [addrs] = await ct.game.getPlayers(0, 50);
      if (!addrs || addrs.length === 0) return [];
      const statuses = await ct.game.getSimpleStatuses(addrs);
      return (statuses as any[]).map(s => ({
        player: String(s.player ?? ''),
        energy: Number(s.energy ?? 0),
        health: Number(s.health ?? 0),
        collectorLv: Number(s.collectorLv ?? s[3] ?? 1),
        weaponLv: Number(s.weaponLv ?? s[4] ?? 1),
        shieldLv: Number(s.shieldLv ?? s[5] ?? 1),
        radarLv: Number(s.radarLv ?? s[6] ?? 1),
        engineLv: Number(s.engineLv ?? s[7] ?? 1),
        shieldHP: Number(s.shieldHP ?? 0),
        shieldMax: Number(s.shieldMax ?? 0),
        exists: Boolean(s.exists ?? s[10] ?? false),
        isRuins: Boolean(s.isRuins ?? s[11] ?? false),
      })).filter(p => p.exists && !p.isRuins);
    },
    enabled: !!ct.game,
    refetchInterval: 30_000,
  });

  // Build sorted entries
  const entries = useMemo(() => {
    const list = players ?? [];
    // Add current player if not in list (e.g. fresh account)
    if (playerCiv && address && !list.some(p => p.player.toLowerCase() === address.toLowerCase())) {
      list.push({
        player: address, energy: playerCiv.energy, health: playerCiv.health,
        collectorLv: playerCiv.energyCollectorLv, weaponLv: playerCiv.weaponLv,
        shieldLv: playerCiv.shieldLv, radarLv: playerCiv.radarLv, engineLv: playerCiv.engineLv,
        shieldHP: playerCiv.shieldHP, shieldMax: playerCiv.maxShieldHP,
        exists: true, isRuins: false,
      });
    }
    list.sort((a, b) => b.energy - a.energy);
    return list.slice(0, 20);
  }, [players, playerCiv, address]);

  if (!players && isFetching) {
    return (
      <Panel>
        <SectionTitle><SystemIcon icon="/assets/systems/trophy.web.png" /> {t('nav.leaderboard')}</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ height: 28, background: THEME.alpha(THEME.border, 0.35), borderRadius: 4, animation: 'pulse 1.2s ease-in-out infinite', opacity: 0.6 - i * 0.08 }} />
          ))}
        </div>
      </Panel>
    );
  }

  if (!players || players.length === 0) {
    return (
      <Panel>
        <SectionTitle><SystemIcon icon="/assets/systems/trophy.web.png" /> {t('nav.leaderboard')}</SectionTitle>
        <div style={{ color: THEME.text.secondary, textAlign: 'center', padding: 20, fontSize: '0.78rem', lineHeight: 1.6 }}>
          <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>🏆</div>
          {t('leaderboard.empty')}
          <div style={{ fontSize: '0.68rem', opacity: 0.7, marginTop: 4 }}>{t('general.empty_cta')}</div>
        </div>
      </Panel>
    );
  }

  return (
    <Panel>
      <SectionTitle><SystemIcon icon="/assets/systems/trophy.web.png" /> {t('nav.leaderboard')}</SectionTitle>
      <Row style={{ color: THEME.text.secondary, fontSize: '0.68rem', borderBottom: `1px solid ${THEME.border}` }}>
        <Rank>{t('leaderboard.col_rank')}</Rank>
        <Name>{t('leaderboard.col_player')}</Name>
        <Info>{t('leaderboard.col_level')}</Info>
        <Score>{t('leaderboard.col_energy')}</Score>
      </Row>
      {entries.map((p, i) => {
        const isYou = address && p.player.toLowerCase() === address.toLowerCase();
        const avgLevel = Math.round((p.collectorLv + p.weaponLv + p.shieldLv + p.radarLv + p.engineLv) / 5);
        return (
          <Row key={p.player} style={isYou ? { background: THEME.alpha(THEME.accent.green, 0.05) } : undefined}>
            <Rank $top={i < 3}>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</Rank>
            <Name style={isYou ? { color: THEME.accent.green } : undefined}>
              {isYou ? '⭐ ' : ''}{p.player.slice(0, 6)}...{p.player.slice(-4)}
            </Name>
            <Info>{t('leaderboard.player_level', { lv: avgLevel })}</Info>
            <Score>{fmt(p.energy)}</Score>
          </Row>
        );
      })}
    </Panel>
  );
}
