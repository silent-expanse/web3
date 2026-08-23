import { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useGameStore } from '../hooks/useGameStore';
import { useContract } from '../hooks/useContract';
import { useGameActions } from '../hooks/useGameActions';
import { LoadingOverlay } from './Spinner';
import { ActionButton } from './ui/ActionButton';
import { SystemIcon } from './ui/SystemIcon';
import { TxConfirm } from './ui/TxConfirm';
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
  padding: 4px 10px;
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  border-radius: 4px;
  cursor: pointer;
  background: ${({ $danger }) => ($danger ? THEME.alpha(THEME.accent.red, 0.12) : 'transparent')};
  border: 1px solid ${({ $danger }) => ($danger ? THEME.alpha(THEME.accent.red, 0.5) : THEME.border)};
  color: ${({ $danger }) => ($danger ? THEME.accent.red : THEME.text.secondary)};
  &:hover:not(:disabled) { opacity: 0.8; }
  &:disabled { opacity: 0.35; cursor: not-allowed; }
  min-height: 32px;
  @media (max-width: 767px) { min-height: 36px; }
`;

const AllianceListContainer = styled.div`
  max-height: 240px; overflow-y: auto; border: 1px solid ${THEME.alpha(THEME.border, 0.4)}; border-radius: 6px; padding: 4px;
`;

const PresetRow = styled.div`
  display: flex; gap: 4px; margin-top: 6px; flex-wrap: wrap;
`;
const PresetBtn = styled.button`
  padding: 3px 8px;
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  border-radius: 4px;
  cursor: pointer;
  background: ${THEME.alpha(THEME.accent.green, 0.08)};
  border: 1px solid ${THEME.alpha(THEME.accent.green, 0.25)};
  color: ${THEME.accent.green};
  &:hover { background: ${THEME.alpha(THEME.accent.green, 0.15)}; }
`;

interface AllianceInfo { id: string; name: string; leader: string; level: number; memberCount: number; }

export function AlliancePanel() {
  const { t } = useI18n();
  const ct = useContract();
  const isMobile = useIsMobile();
  const address = useGameStore(s => s.address);
  const alliance = useGameStore(s => s.currentAlliance);
  const loading = useGameStore(s => s.loading);
  const activeAction = useGameStore(s => s.activeAction);
  const allianceLoading = activeAction !== null && activeAction.startsWith('alliance.');
  const members = useGameStore(s => s._allianceMembers);
  const totemLevel = useGameStore(s => s._allianceTotemLevel);
  const totemEnergy = useGameStore(s => s._allianceTotemEnergy);
  const totemUpgradeCostVal = useGameStore(s => s._allianceTotemUpgradeCost);
  const isLeader = useGameStore(s => s._allianceIsLeader);
  const allianceLeader = useGameStore(s => s._allianceLeader);
  const pendingRefund = useGameStore(s => s._alliancePendingRefund);
  const playerEnergy = useGameStore(s => s.playerCiv?.energy ?? 0);
  const { createAlliance, joinAlliance, leaveAlliance, kickMember, transferLeadership, disbandAlliance, claimRefund, donateToTotem, upgradeTotem } = useGameActions();

  const [tab, setTab] = useState<'mine' | 'list'>('mine');
  const [allianceName, setAllianceName] = useState('');
  const [donateAmt, setDonateAmt] = useState('');
  const [alliances, setAlliances] = useState<AllianceInfo[]>([]);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [allianceQuery, setAllianceQuery] = useState('');
  const [allianceSort, setAllianceSort] = useState<'members' | 'level'>('members');
  const [kickConfirm, setKickConfirm] = useState<{ id: string; member: string } | null>(null);
  const [disbandInput, setDisbandInput] = useState('');
  const [disbandOpen, setDisbandOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);

  // 仅「列表」标签需要手动拉取所有联盟
  const fetchAlliances = useCallback(async () => {
    if (!ct.alliance) return;
    try {
      const ids: string[] = await ct.alliance.getAllianceList();
      const infos: AllianceInfo[] = [];
      for (const id of ids.slice(0, 30)) {
        try {
          const raw = await ct.alliance.alliances(id);
          infos.push({ id, name: String((raw as Record<string, unknown>).name ?? (raw as unknown as unknown[])[0] ?? '?'), leader: String((raw as Record<string, unknown>).leader ?? (raw as unknown as unknown[])[1] ?? ''),
            level: Number((raw as Record<string, unknown>).level ?? (raw as unknown as unknown[])[2] ?? 1), memberCount: Number((raw as Record<string, unknown>).memberCount ?? (raw as unknown as unknown[])[3] ?? 0) });
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
  const handleLeave = async () => {
    if (!alliance) return;
    await leaveAlliance(alliance.id);
    setLeaveOpen(false);
    setTab('list');
  };
  const handleDisband = async () => {
    if (!alliance) return;
    if (disbandInput !== alliance.name) return;
    await disbandAlliance(alliance.id);
    setDisbandOpen(false);
    setDisbandInput('');
    setTab('list');
  };

  const filteredAlliances = useMemo(() => {
    const q = allianceQuery.trim().toLowerCase();
    let list = alliances;
    if (q) list = list.filter(a => a.name.toLowerCase().includes(q));
    return [...list].sort((a, b) => allianceSort === 'members' ? b.memberCount - a.memberCount : b.level - a.level);
  }, [alliances, allianceQuery, allianceSort]);

  const visibleMembers = showAllMembers ? members : members.slice(0, 10);
  const presets = useMemo(() => {
    const e = playerEnergy;
    return [
      { label: '1K', value: Math.min(1000, e) },
      { label: '5K', value: Math.min(5000, e) },
      { label: '25%', value: Math.floor(e * 0.25) },
      { label: 'MAX', value: e },
    ];
  }, [playerEnergy]);

  return (
    <Panel $mobile={isMobile}>
      {allianceLoading && <LoadOverlay><LoadingOverlay message={t('general.loading')} color={THEME.accent.gold} transparent /></LoadOverlay>}
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
                {visibleMembers.map((m, i) => {
                  const isSelf = m === address;
                  const isThisLeader = m.toLowerCase() === allianceLeader.toLowerCase();
                  return (
                    <Row key={i}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: THEME.accent.green, boxShadow: `0 0 4px ${THEME.alpha(THEME.accent.green, 0.6)}`, flexShrink: 0, opacity: 0.9 }} title="在线" />
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
                          <MiniBtn $danger onClick={() => setKickConfirm({ id: alliance.id, member: m })} disabled={loading}>
                            {t('alliance.kick')}
                          </MiniBtn>
                        </span>
                      )}
                    </Row>
                  );
                })}
                {members.length > 10 && (
                  <Row style={{ justifyContent: 'center' }}>
                    <MiniBtn onClick={() => setShowAllMembers(v => !v)}>
                      {showAllMembers ? t('alliance.show_less') : t('alliance.view_all', { n: members.length })}
                    </MiniBtn>
                  </Row>
                )}
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
                  onChange={e => setDonateAmt(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))} style={{ flex: 1 }} inputMode="numeric" />
                <ActionButton variant="primary" onClick={() => { const amt = Number(donateAmt); if (amt > 0) { donateToTotem(alliance.id, amt); setDonateAmt(''); } }}
                  disabled={loading || !(Number(donateAmt) > 0)}>
                  {t('alliance.donate')}
                </ActionButton>
              </Row>
              <PresetRow>
                <span style={{ color: THEME.text.secondary, fontSize: '0.68rem', fontFamily: "'Courier New', monospace", alignSelf: 'center' }}>{t('alliance.donate_presets')}</span>
                {presets.map(p => (
                  <PresetBtn key={p.label} onClick={() => setDonateAmt(String(p.value))} disabled={loading || p.value <= 0}>{p.label}</PresetBtn>
                ))}
              </PresetRow>
              {/* 盟主专属操作 */}
              {isLeader && (
                <>
                  <ActionButton variant="ghost" onClick={() => upgradeTotem(alliance.id)} disabled={loading || totemEnergy < totemUpgradeCostVal}
                    title={totemEnergy < totemUpgradeCostVal ? t('alliance.totem_need_more') : undefined}
                    style={{ marginTop: 6, width: '100%' }}>
                    {t('alliance.upgrade_totem')}
                  </ActionButton>
                  {totemEnergy < totemUpgradeCostVal && (
                    <div style={{ color: THEME.accent.red, fontSize: '0.68rem', marginTop: 4, fontFamily: "'Courier New', monospace" }}>
                      {t('alliance.totem_need_more')}（{fmt(totemEnergy)} / {fmt(totemUpgradeCostVal)}）
                    </div>
                  )}
                  <ActionButton variant="danger" onClick={() => { setDisbandInput(''); setDisbandOpen(true); }} disabled={loading}
                    style={{ marginTop: 4, width: '100%' }}>
                    {t('alliance.disband')}
                  </ActionButton>
                </>
              )}
              {/* 成员专属操作：退出（人数>1 时允许） */}
              {!isLeader && alliance.memberCount > 1 && (
                <>
                  <ActionButton variant="ghost" onClick={() => setLeaveOpen(true)} disabled={loading}
                    style={{ marginTop: 6, width: '100%' }}>
                    {t('alliance.leave')}
                  </ActionButton>
                  <div style={{ color: THEME.text.secondary, fontSize: '0.68rem', fontFamily: "'Courier New', monospace", marginTop: 4, textAlign: 'center' }}>
                    {t('alliance.leave_note', { sec: 86400 })}
                  </div>
                </>
              )}
              {/* 退款：有退款才显示 */}
              {pendingRefund > 0 && (
                <ActionButton variant="ghost" onClick={() => claimRefund()} disabled={loading} style={{ marginTop: 4, width: '100%' }}>
                  {t('alliance.refund')} ({fmt(pendingRefund)} SES)
                </ActionButton>
              )}

              {/* #38踢人确认 */}
              <TxConfirm
                open={!!kickConfirm}
                title={t('alliance.kick')}
                onConfirm={() => { if (kickConfirm) { kickMember(kickConfirm.id, kickConfirm.member); setKickConfirm(null); } }}
                onCancel={() => setKickConfirm(null)}
                confirmVariant="danger"
                confirmLabel={t('alliance.kick')}
                loading={loading}
              >
                {kickConfirm && t('alliance.kick_confirm', { name: kickConfirm.member.slice(0, 6) + '...' })}
              </TxConfirm>

              {/* #71 解散强确认 */}
              <TxConfirm
                open={disbandOpen}
                title={t('alliance.disband')}
                onConfirm={handleDisband}
                onCancel={() => { setDisbandOpen(false); setDisbandInput(''); }}
                confirmVariant="danger"
                confirmLabel={t('alliance.disband')}
                loading={loading}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span>{t('alliance.disband_confirm_ph')}</span>
                  <Input placeholder={alliance.name} value={disbandInput} onChange={e => setDisbandInput(e.target.value)} />
                  {disbandInput !== alliance.name && <span style={{ color: THEME.accent.red, fontSize: '0.68rem' }}>{t('alliance.disband_need_input')}</span>}
                </div>
              </TxConfirm>

              {/* #72 退出确认 */}
              <TxConfirm
                open={leaveOpen}
                title={t('alliance.leave')}
                onConfirm={handleLeave}
                onCancel={() => setLeaveOpen(false)}
                confirmVariant="danger"
                confirmLabel={t('alliance.leave')}
                loading={loading}
              >
                {t('alliance.leave_note', { sec: 86400 })}
              </TxConfirm>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: 12, color: THEME.text.secondary }}>
              <div style={{ color: THEME.text.secondary, fontSize: '0.7rem', marginBottom: 6 }}>{t('alliance.join_note')}</div>
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
        <>
          <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
            <Input placeholder={t('alliance.search')} value={allianceQuery} onChange={e => setAllianceQuery(e.target.value)} style={{ flex: 1 }} />
            <Tab $active={allianceSort === 'members'} onClick={() => setAllianceSort('members')}>人数</Tab>
            <Tab $active={allianceSort === 'level'} onClick={() => setAllianceSort('level')}>等级</Tab>
          </div>
          <div style={{ color: THEME.text.secondary, fontSize: '0.68rem', marginBottom: 4 }}>{t('alliance.join_note')}</div>
          <AllianceListContainer>
            {filteredAlliances.length === 0 ? (
              <Row style={{ justifyContent: 'center', opacity: 0.6, padding: 12 }}>{t('alliance.no_alliance')}</Row>
            ) : (
              filteredAlliances.map(a => (
                <AllianceCard key={a.id}>
                  <div style={{ minWidth: 0 }}>
                    <AllianceName>{a.name}</AllianceName>
                    <AllianceMeta>Lv.{a.level} · {a.memberCount}{t('alliance.people')}</AllianceMeta>
                  </div>
                  <ActionButton variant="ghost" onClick={() => handleJoin(a.id)} disabled={loading}>{t('alliance.join')}</ActionButton>
                </AllianceCard>
              ))
            )}
          </AllianceListContainer>
        </>
      )}
    </Panel>
  );
}
