import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useGameStore } from '../hooks/useGameStore';
import { useContract } from '../hooks/useContract';
import { useGameActions } from '../hooks/useGameActions';
import { LoadingOverlay } from './Spinner';
import { ActionButton } from './ui/ActionButton';
import { SystemIcon } from './ui/SystemIcon';
import { useIsMobile } from '../hooks/useMediaQuery';
import { useI18n } from '../hooks/useI18n';
import { THEME } from '../theme';
import { fmt } from '../utils/format';

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

const TabRow = styled.div`
  display: flex; gap: 4px; margin-bottom: 10px; flex-wrap: wrap;
`;
const Tab = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => $active ? THEME.alpha(THEME.accent.gold, 0.1) : 'transparent'};
  border: 1px solid ${({ $active }) => $active ? THEME.accent.gold : THEME.border};
  border-radius: 4px; padding: 5px 12px; cursor: pointer;
  color: ${({ $active }) => $active ? THEME.accent.gold : THEME.text.secondary};
  font-family: 'Courier New', monospace; font-size: 0.72rem;
`;

const Input = styled.input`
  width: 100%; padding: 8px; font-size: 0.8rem; font-family: 'Courier New', monospace;
  background: ${THEME.bg}; border: 1px solid ${THEME.border};
  border-radius: 6px; color: ${THEME.text.primary}; outline: none;
  &:focus { border-color: ${THEME.accent.gold}; }
`;

const AllianceCard = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px; margin-bottom: 4px;
  border: 1px solid ${THEME.alpha(THEME.accent.gold, 0.12)};
  border-radius: 6px; gap: 8px;
  background: ${THEME.alpha(THEME.card, 0.4)};
`;
const AllianceName = styled.span`
  color: ${THEME.text.primary}; font-size: 0.82rem; font-family: 'Courier New', monospace; font-weight: bold;
`;
const AllianceMeta = styled.span`
  color: ${THEME.text.secondary}; font-size: 0.7rem; font-family: 'Courier New', monospace;
`;

const Row = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 4px 0; font-size: 0.78rem; font-family: 'Courier New', monospace; color: ${THEME.text.secondary};
`;

const LoadOverlay = styled.div`
  position: absolute; inset: 0; z-index: 1; border-radius: 8px; overflow: hidden;
`;

const RoleTag = styled.span<{ $leader?: boolean }>`
  flex-shrink: 0;
  font-size: 0.62rem;
  padding: 1px 5px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  ${({ $leader }) => $leader
    ? `color: ${THEME.accent.gold}; border: 1px solid ${THEME.alpha(THEME.accent.gold, 0.5)}; background: ${THEME.alpha(THEME.accent.gold, 0.1)};`
    : `color: ${THEME.text.secondary}; border: 1px solid ${THEME.border};`}
`;

const MiniBtn = styled.button<{ $danger?: boolean }>`
  padding: 2px 8px;
  font-size: 0.65rem;
  font-family: 'Courier New', monospace;
  border-radius: 4px;
  cursor: pointer;
  background: ${({ $danger }) => ($danger ? THEME.alpha(THEME.accent.red, 0.12) : 'transparent')};
  border: 1px solid ${({ $danger }) => ($danger ? THEME.alpha(THEME.accent.red, 0.5) : THEME.border)};
  color: ${({ $danger }) => ($danger ? THEME.accent.red : THEME.text.secondary)};
  &:hover:not(:disabled) { opacity: 0.8; }
  &:disabled { opacity: 0.35; cursor: not-allowed; }
`;

const AllianceListContainer = styled.div`
  max-height: 200px; overflow-y: auto; border: 1px solid ${THEME.alpha(THEME.border, 0.4)}; border-radius: 6px; padding: 4px;
`;

interface AllianceInfo { id: string; name: string; leader: string; level: number; memberCount: number; }

export function AlliancePanel() {
  const { t } = useI18n();
  const ct = useContract();
  const isMobile = useIsMobile();
  const address = useGameStore(s => s.address);
  const alliance = useGameStore(s => s.currentAlliance);
  const loading = useGameStore(s => s.loading);
  const members = useGameStore(s => s._allianceMembers);
  const totemLevel = useGameStore(s => s._allianceTotemLevel);
  const totemEnergy = useGameStore(s => s._allianceTotemEnergy);
  const totemUpgradeCostVal = useGameStore(s => s._allianceTotemUpgradeCost);
  const isLeader = useGameStore(s => s._allianceIsLeader);
  const allianceLeader = useGameStore(s => s._allianceLeader);
  const pendingRefund = useGameStore(s => s._alliancePendingRefund);
  const { createAlliance, joinAlliance, leaveAlliance, kickMember, transferLeadership, disbandAlliance, claimRefund, donateToTotem, upgradeTotem } = useGameActions();

  const [tab, setTab] = useState<'mine' | 'list'>('mine');
  const [allianceName, setAllianceName] = useState('');
  const [donateAmt, setDonateAmt] = useState('');
  const [alliances, setAlliances] = useState<AllianceInfo[]>([]);

  // 仅「列表」标签需要手动拉取所有联盟
  const fetchAlliances = useCallback(async () => {
    if (!ct.alliance) return;
    try {
      const ids: string[] = await ct.alliance.getAllianceList();
      const infos: AllianceInfo[] = [];
      for (const id of ids.slice(0, 20)) {
        try {
          const raw = await ct.alliance.alliances(id);
          infos.push({ id, name: String(raw.name ?? raw[0] ?? '?'), leader: String(raw.leader ?? raw[1] ?? ''),
            level: Number(raw.level ?? raw[2] ?? 1), memberCount: Number(raw.memberCount ?? raw[3] ?? 0) });
        } catch { /* skip */ }
      }
      setAlliances(infos);
    } catch { /* ignore */ }
  }, [ct]);

  useEffect(() => {
    if (tab === 'list') fetchAlliances();
  }, [tab, fetchAlliances]);

  const handleCreate = async () => {
    if (!allianceName.trim()) return;
    await createAlliance(allianceName.trim());
    setAllianceName('');
    setTab('mine');
  };
  const handleJoin = async (id: string) => {
    await joinAlliance(id);
    setTab('mine');
  };
  const handleLeave = async (allianceId: string) => {
    await leaveAlliance(allianceId);
    setTab('list');
  };
  const handleDisband = async (allianceId: string) => {
    await disbandAlliance(allianceId);
    setTab('list');
  };

  return (
    <Panel $mobile={isMobile}>
      {loading && <LoadOverlay><LoadingOverlay message={t('general.loading')} color={THEME.accent.gold} transparent /></LoadOverlay>}
      <SectionTitle><SystemIcon icon="/assets/systems/totem.web.png" /> {t('alliance.title')}</SectionTitle>
      <TabRow>
        <Tab $active={tab === 'mine'} onClick={() => setTab('mine')}>{t('alliance.mine')}</Tab>
        <Tab $active={tab === 'list'} onClick={() => setTab('list')}>{t('alliance.available')}</Tab>
      </TabRow>

      {tab === 'mine' && (
        <>
          {alliance ? (
            <>
              <AllianceCard>
                <AllianceName>{alliance.name}</AllianceName>
                <AllianceMeta>Lv.{alliance.level} · {alliance.memberCount}{t('alliance.people')}</AllianceMeta>
              </AllianceCard>
              <div style={{ marginBottom: 6 }}>
                {members.map((m, i) => {
                  const isSelf = m === address;
                  const isThisLeader = m.toLowerCase() === allianceLeader.toLowerCase();
                  return (
                    <Row key={i}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 }}>
                        {isThisLeader && <RoleTag $leader>{t('alliance.leader')}</RoleTag>}
                        <span style={{ color: isSelf ? THEME.accent.green : THEME.text.secondary, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {m.slice(0, 6)}...{m.slice(-4)}
                        </span>
                        {isSelf && <span style={{ color: THEME.accent.green }}>{t('alliance.you')}</span>}
                      </span>
                      {isLeader && !isSelf && !isThisLeader && (
                        <span style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                          <MiniBtn onClick={() => { if (window.confirm(t('alliance.transfer_confirm'))) transferLeadership(alliance.id, m); }} disabled={loading}>
                            {t('alliance.transfer')}
                          </MiniBtn>
                          <MiniBtn $danger onClick={() => kickMember(alliance.id, m)} disabled={loading}>
                            {t('alliance.kick')}
                          </MiniBtn>
                        </span>
                      )}
                    </Row>
                  );
                })}
              </div>
              <Row>
                <span><SystemIcon icon="/assets/systems/totem.web.png" /> {t('alliance.totem')} Lv.{totemLevel}</span>
                <span>{t('alliance.totem_pool')}: {fmt(totemEnergy)} <SystemIcon icon="/assets/systems/energy.web.png" /></span>
              </Row>
              {/* 图腾加成（合约 _defAllianceBonus: 每盟友 8 防御 × (1+图腾Lv×0.5%)） */}
              {alliance && alliance.memberCount > 1 && (
                <Row style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
                  <span style={{ color: THEME.text.secondary, fontSize: '0.7rem' }}>{t('alliance.totem_bonus_desc')}</span>
                  <span style={{ color: THEME.accent.green, fontSize: '0.8rem' }}>
                    {t('alliance.totem_bonus_value', { val: fmt(Math.floor((alliance.memberCount - 1) * 8 * (10000 + totemLevel * 50) / 10000)) })}
                  </span>
                  {isLeader && (
                    <span style={{ color: THEME.accent.gold, fontSize: '0.75rem' }}>
                      {t('alliance.totem_next_bonus', { val: fmt(Math.floor((alliance.memberCount - 1) * 8 * (10000 + (totemLevel + 1) * 50) / 10000)) })}
                    </span>
                  )}
                </Row>
              )}
              {isLeader && (
                <Row>
                  <span><SystemIcon icon="/assets/systems/arrow.web.png" /> {t('alliance.upgrade_totem')}</span>
                  <span style={{ color: THEME.accent.green }}>{fmt(totemUpgradeCostVal)} <SystemIcon icon="/assets/systems/energy.web.png" /></span>
                </Row>
              )}
              {isLeader && <Row><span style={{ color: THEME.accent.gold }}>{t('alliance.leader')}</span></Row>}
              <Row style={{ marginTop: 6, gap: 6 }}>
                <Input placeholder={t('alliance.donate')} value={donateAmt}
                  onChange={e => setDonateAmt(e.target.value)} style={{ flex: 1 }} />
                <ActionButton variant="primary" onClick={() => { donateToTotem(alliance.id, Number(donateAmt)||0); setDonateAmt(''); }}
                  disabled={loading || !donateAmt}>
                  {t('alliance.donate')}
                </ActionButton>
              </Row>
              {/* 盟主专属操作 */}
              {isLeader && (
                <>
                  <ActionButton variant="ghost" onClick={() => upgradeTotem(alliance.id)} disabled={loading}
                    style={{ marginTop: 6, width: '100%' }}>
                    {t('alliance.upgrade_totem')}
                  </ActionButton>
                  <ActionButton variant="danger" onClick={() => alliance && handleDisband(alliance.id)} disabled={loading}
                    style={{ marginTop: 4, width: '100%' }}>
                    {t('alliance.disband')}
                  </ActionButton>
                </>
              )}
              {/* 成员专属操作：退出（人数>1 时允许） */}
              {!isLeader && alliance.memberCount > 1 && (
                <ActionButton variant="ghost" onClick={() => alliance && handleLeave(alliance.id)} disabled={loading}
                  style={{ marginTop: 6, width: '100%' }}>
                  {t('alliance.leave')}
                </ActionButton>
              )}
              {/* 退款：有退款才显示 */}
              {pendingRefund > 0 && (
                <ActionButton variant="ghost" onClick={() => claimRefund()} disabled={loading} style={{ marginTop: 4, width: '100%' }}>
                  {t('alliance.refund')} ({fmt(pendingRefund)} SES)
                </ActionButton>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: 12, color: THEME.text.secondary }}>
              <Input placeholder={t('alliance.name')} value={allianceName}
                onChange={e => setAllianceName(e.target.value)} style={{ marginBottom: 8 }}
                onKeyDown={e => e.key === 'Enter' && handleCreate()} />
              <ActionButton variant="primary" onClick={handleCreate} disabled={loading || !allianceName.trim()} style={{ width: '100%' }}>
                {t('alliance.create')}
              </ActionButton>
            </div>
          )}
        </>
      )}

      {tab === 'list' && (
        <AllianceListContainer>
          {alliances.length === 0 ? (
            <Row style={{ textAlign: 'center', opacity: 0.6 }}>{t('alliance.no_alliance')}</Row>
          ) : (
            alliances.map(a => (
              <AllianceCard key={a.id}>
                <div>
                  <AllianceName>{a.name}</AllianceName>
                  <AllianceMeta>Lv.{a.level} · {a.memberCount}{t('alliance.people')}</AllianceMeta>
                </div>
                <ActionButton variant="ghost" onClick={() => handleJoin(a.id)} disabled={loading}>{t('alliance.join')}</ActionButton>
              </AllianceCard>
            ))
          )}
        </AllianceListContainer>
      )}
    </Panel>
  );
}
