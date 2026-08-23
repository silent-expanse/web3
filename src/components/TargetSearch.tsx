import { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { isAddress } from 'ethers';
import { useGameStore } from '../hooks/useGameStore';
import { useContract } from '../hooks/useContract';
import { useGameActions, civFromRaw } from '../hooks/useGameActions';
import { useTicker } from '../hooks/useTicker';
import { ActionButton } from './ui/ActionButton';
import { SystemIcon } from './ui/SystemIcon';
import { TxConfirm } from './ui/TxConfirm';
import { THEME } from '../theme';
import { useIsMobile } from '../hooks/useMediaQuery';
import { useI18n } from '../hooks/useI18n';
import { GAME } from '../utils/constants';
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

const Input = styled.input`
  width: 100%;
  padding: 8px 10px;
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  background: ${THEME.bg};
  border: 1px solid ${THEME.border};
  border-radius: 6px;
  color: ${THEME.text.primary};
  outline: none;
  &:focus { border-color: ${THEME.accent.red}; }
`;

const Row = styled.div`
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 0; border-bottom: 1px solid ${THEME.alpha(THEME.border, 0.4)};
  gap: 8px;
  &:last-child { border-bottom: none; }
`;

const Label = styled.span`
  color: ${THEME.text.primary}; font-size: 0.8rem; font-family: 'Courier New', monospace;
`;
const Detail = styled.span`
  color: ${THEME.text.secondary}; font-size: 0.72rem; font-family: 'Courier New', monospace;
`;

const SearchBar = styled.div`
  display: flex; gap: 6px; margin-bottom: 8px;
`;

const BlockReason = styled.div`
  margin-top: 4px;
  color: ${THEME.accent.red};
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  text-align: center;
  opacity: 0.85;
`;

const OutOfRange = styled.div`
  color: ${THEME.accent.red};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-align: center;
  padding: 4px 8px;
  margin-top: 6px;
  background: ${THEME.alpha(THEME.accent.red, 0.08)};
  border-radius: 4px;
  border: 1px solid ${THEME.alpha(THEME.accent.red, 0.15)};
`;

const SearchError = styled.div`
  color: ${THEME.accent.red};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-align: center;
  padding: 4px 8px;
  margin-bottom: 6px;
  background: ${THEME.alpha(THEME.accent.red, 0.06)};
  border-radius: 4px;
`;

const NearbyList = styled.div`
  margin-top: 8px;
  border: 1px solid ${THEME.alpha(THEME.border, 0.4)};
  border-radius: 6px;
  max-height: 220px;
  overflow-y: auto;
  background: ${THEME.alpha(THEME.bg, 0.3)};
`;

const NearbyRow = styled.div`
  display: flex; align-items: center; justify-content: space-between; gap: 8px;
  padding: 6px 10px; border-bottom: 1px solid ${THEME.alpha(THEME.border, 0.25)};
  font-size: 0.75rem; font-family: 'Courier New', monospace;
  &:last-child { border-bottom: none; }
  &:hover { background: ${THEME.alpha(THEME.accent.green, 0.04)}; }
`;

// #25 使用合约常量：ORDER_DELAY_SEC（3s）避免前端硬编码不一致
const ATTACK_COOLDOWN_MS = (GAME.ORDER_DELAY_SEC ?? 3) * 1000;

interface NearbyEntry {
  addr: string;
  name: string;
  energy: number;
  health: number;
  weaponLv: number;
  shieldLv: number;
  dist: number;
}

export function TargetSearch() {
  const { t } = useI18n();
  useIsMobile(); // ensure hook subscribed; value not needed directly here
  const playerCiv = useGameStore(s => s.playerCiv);
  const address = useGameStore(s => s.address);
  const enemyCivs = useGameStore(s => s.enemyCivs);
  const target = useGameStore(s => s.selectedTarget);
  const lastAttackTime = useGameStore(s => s.lastAttackTime);
  const attackTokens = useGameStore(s => s.attackTokens);
  const loading = useGameStore(s => s.loading);
  const myAtk = useGameStore(s => s.attackPower);
  const ct = useContract();
  const addEnemyCiv = useGameStore(s => s.addEnemyCiv);
  const setSelectedTarget = useGameStore(s => s.setSelectedTarget);
  const { attackTarget } = useGameActions();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchAddr, setSearchAddr] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [searchDistance, setSearchDistance] = useState<number | null>(null);
  const [inRange, setInRange] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [nearby, setNearby] = useState<NearbyEntry[] | null>(null);
  const [nearbyLoading, setNearbyLoading] = useState(false);
  const [targetDef, setTargetDef] = useState<number | null>(null);
  const [targetShield, setTargetShield] = useState<number | null>(null);

  // #58 走动的时间：每 250ms 刷新一次使 cooldown 数字实时走动
  const now = useTicker(250);
  const attackEnergyCost = useGameStore(s => s.attackEnergyCost);
  const cooldownRemaining = Math.max(0, Math.ceil((ATTACK_COOLDOWN_MS - (now - lastAttackTime)) / 1000));
  const attackBlockReason = !target ? 'combat.attack_btn_idle'
    : !inRange ? 'combat.attack_out_range'
    : cooldownRemaining > 0 ? 'combat.attack_in_cd'
    : playerCiv && playerCiv.energy < attackEnergyCost ? 'combat.attack_no_energy'
    : attackTokens.current <= 0 ? 'combat.attack_no_token'
    : null;
  const canAttack = !attackBlockReason && !loading;

  const targetCiv = target ? enemyCivs.get(target) : undefined;
  const targetName = targetCiv?.name ?? (target ? target.slice(0, 6) + '...' : '');

  // #52 目标情报自动刷新：每 10s 重新拉取 target 的文明+距离
  const targetRef = useRef(target);
  targetRef.current = target;
  useEffect(() => {
    if (!target) return;
    let cancelled = false;
    let id: ReturnType<typeof setInterval> | undefined;
    const refresh = async () => {
      const curTarget = targetRef.current;
      if (!curTarget || !ct.game || !address) return;
      try {
        const [raw, dist, rangeCheck, def, shield] = await Promise.allSettled([
          ct.game.getCivilization(curTarget),
          ct.game.getDistance(address, curTarget),
          ct.game.isInRange(address, curTarget),
          (ct.game.getShieldDefense as unknown as (a: string) => Promise<unknown>)?.(curTarget)?.catch(() => null),
          (ct.game.getCurrentShieldHP as unknown as (a: string) => Promise<unknown>)?.(curTarget)?.catch(() => null),
        ]);
        if (cancelled) return;
        if (raw.status === 'fulfilled' && raw.value) {
          const civ = civFromRaw(raw.value as never);
          addEnemyCiv(curTarget, civ);
        }
        if (dist.status === 'fulfilled' && dist.value !== null) setSearchDistance(Number(dist.value as number));
        if (rangeCheck.status === 'fulfilled') setInRange(Boolean(rangeCheck.value));
        if (def.status === 'fulfilled' && def.value != null) setTargetDef(Number(def.value as number));
        if (shield.status === 'fulfilled' && shield.value != null) setTargetShield(Number(shield.value as number));
      } catch { /* ignore */ }
    };
    // 首次不立即刷新（搜索已拿到），只启动 interval
    id = setInterval(refresh, 10_000);
    return () => { cancelled = true; if (id) clearInterval(id); };
  }, [target, ct.game, address, addEnemyCiv]);

  // 打开确认时再刷新一次（#52）
  useEffect(() => {
    if (!confirmOpen || !target || !ct.game || !address) return;
    (async () => {
      try {
        const [raw, dist, rangeCheck, def, shield] = await Promise.allSettled([
          ct.game!.getCivilization(target),
          ct.game!.getDistance(address, target),
          ct.game!.isInRange(address, target),
          (ct.game!.getShieldDefense as unknown as (a: string) => Promise<unknown>)?.(target)?.catch(() => null),
          (ct.game!.getCurrentShieldHP as unknown as (a: string) => Promise<unknown>)?.(target)?.catch(() => null),
        ]);
        if (raw.status === 'fulfilled' && raw.value) addEnemyCiv(target, civFromRaw(raw.value as never));
        if (dist.status === 'fulfilled' && dist.value !== null) setSearchDistance(Number(dist.value as number));
        if (rangeCheck.status === 'fulfilled') setInRange(Boolean(rangeCheck.value));
        if (def.status === 'fulfilled' && def.value != null) setTargetDef(Number(def.value as number));
        if (shield.status === 'fulfilled' && shield.value != null) setTargetShield(Number(shield.value as number));
      } catch { /* ignore */ }
    })();
  }, [confirmOpen, target, ct.game, address, addEnemyCiv]);

  const handleSearch = useCallback(async () => {
    const addr = searchInputRef.current?.value?.trim() ?? searchAddr.trim();
    if (!addr) return;
    if (!isAddress(addr)) { setSearchError(t('connect.bad_referrer')); return; }
    if (address && addr.toLowerCase() === address.toLowerCase()) { setSearchError(t('err.e_self_target')); return; }
    useGameStore.setState({ loading: true });
    setSearchDistance(null);
    setInRange(false);
    setSearchError('');
    setTargetDef(null); setTargetShield(null);
    try {
      if (!ct.game) throw new Error('Contract not available');
      const [raw, dist, rangeCheck] = await Promise.all([
        ct.game.getCivilization(addr),
        address ? ct.game.getDistance(address, addr).catch(() => null) : null,
        address ? ct.game.isInRange(address, addr).catch(() => false) : false,
      ]);
      const r = raw as unknown as Record<string, unknown>;
      const exists = Boolean((r as { exists?: boolean })?.exists ?? r);
      if (!exists || (r as { name?: unknown }).name === '') {
        setSearchError(t('err.e_civ_not_found'));
      } else if ((r as { isRuins?: boolean })?.isRuins) {
        setSearchError(t('err.e_civ_not_found'));
      }
      if (raw) {
        const civ = civFromRaw(raw as never);
        addEnemyCiv(addr, civ);
      }
      if (dist !== null) setSearchDistance(Number(dist as number));
      setInRange(Boolean(rangeCheck));
      setSelectedTarget(addr);
      if (!exists) setSelectedTarget(null);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setSearchError(msg.slice(0, 80));
      setSelectedTarget(addr);
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct, address, searchAddr, addEnemyCiv, setSelectedTarget, t]);

  // #51 雷达扫描附近目标
  const handleScanNearby = useCallback(async () => {
    if (!ct.game || !address) return;
    setNearbyLoading(true);
    setNearby(null);
    try {
      const [addrsRaw] = await ct.game.getPlayers(0, 40) as unknown as [string[]];
      const addrs = (addrsRaw ?? []).filter((a: string) => a.toLowerCase() !== address.toLowerCase()).slice(0, 40);
      if (addrs.length === 0) { setNearby([]); return; }
      const civsRaw = await ct.game.getCivilizations(addrs) as unknown as Record<string, unknown>[];
      const distResults = await Promise.allSettled(addrs.map((a: string) => ct.game!.getDistance(address, a).catch(() => null)));
      const entries: NearbyEntry[] = [];
      for (let i = 0; i < addrs.length; i++) {
        const addr = addrs[i];
        const raw = civsRaw[i];
        if (!raw || (raw as { isRuins?: boolean }).isRuins || !(raw as { exists?: boolean }).exists) continue;
        const civ = civFromRaw(raw as never);
        const dRes = distResults[i];
        const dist = dRes.status === 'fulfilled' && dRes.value != null ? Number(dRes.value as number) : Infinity;
        const inR = Number.isFinite(dist) && dist <= (playerCiv?.scanRange ?? playerCiv?.radarLv ? 1000 : 1000);
        if (!Number.isFinite(dist)) continue;
        // 仅保留雷达范围内
        const rangeOk = dist <= (playerCiv?.scanRange ?? 0) || (await ct.game!.isInRange(address, addr).catch(() => false));
        if (!rangeOk && dist > (playerCiv?.scanRange ?? 1000) && !inR) continue;
        entries.push({ addr, name: civ.name || addr.slice(0, 6) + '...', energy: civ.energy, health: civ.health, weaponLv: civ.weaponLv, shieldLv: civ.shieldLv, dist });
        // 缓存到 enemyCivs 供后续锁定使用
        addEnemyCiv(addr, civ);
      }
      entries.sort((a, b) => a.dist - b.dist);
      setNearby(entries.slice(0, 10));
    } catch {
      setNearby([]);
    } finally {
      setNearbyLoading(false);
    }
  }, [ct.game, address, playerCiv, addEnemyCiv]);

  const handleSelectNearby = (entry: NearbyEntry) => {
    setSelectedTarget(entry.addr);
    setSearchDistance(entry.dist);
    // 立即判定范围
    if (address && ct.game) {
      ct.game.isInRange(address, entry.addr).then((v: boolean) => setInRange(Boolean(v))).catch(() => setInRange(true));
    } else setInRange(true);
    setSearchAddr(entry.addr);
    if (searchInputRef.current) searchInputRef.current.value = entry.addr;
  };

  const handleConfirmAttack = () => {
    attackTarget();
    setConfirmOpen(false);
  };

  const myAtkLabel = Number.isFinite(myAtk) ? fmt(myAtk) : '—';
  const theirDefLabel = targetDef != null ? fmt(targetDef) : '…';

  return (
    <Panel>
      <SectionTitle><SystemIcon icon="/assets/systems/weapon.web.png" /> {t('combat.title')}</SectionTitle>

      <SearchBar>
        <Input ref={searchInputRef} placeholder={t('combat.search_placeholder')} value={searchAddr}
          onChange={e => setSearchAddr(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()} />
        <ActionButton variant="primary" onClick={handleSearch} disabled={loading || !searchAddr.trim()}>
          {t('combat.search_btn')}
        </ActionButton>
      </SearchBar>
      {searchError && <SearchError>{searchError}</SearchError>}

      {/* #51 附近扫描 */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
        <ActionButton variant="ghost" onClick={handleScanNearby} disabled={loading || nearbyLoading || !address} icon="/assets/systems/radar.web.png">
          {nearbyLoading ? t('upgrade.loading') : t('combat.scan_nearby')}
        </ActionButton>
        {nearby !== null && <span style={{ color: THEME.text.secondary, fontSize: '0.7rem', fontFamily: "'Courier New', monospace", alignSelf: 'center' }}>{nearby.length === 0 ? t('combat.scan_empty') : t('combat.scan_found', { n: nearby.length })}</span>}
      </div>
      {nearby !== null && nearby.length > 0 && (
        <NearbyList>
          {nearby.map(e => (
            <NearbyRow key={e.addr}>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ color: THEME.text.primary, fontWeight: 'bold' }}>{e.name}</span>
                {' '}<span style={{ color: THEME.text.secondary }}>{e.addr.slice(0, 6)}...{e.addr.slice(-4)}</span>
                <span style={{ marginLeft: 6, color: THEME.accent.blue }}>{fmt(e.dist)} ls</span>
              </span>
              <span style={{ color: THEME.text.secondary, fontSize: '0.68rem' }}>⚔ {e.weaponLv} 🛡 {e.shieldLv}</span>
              <ActionButton variant="ghost" onClick={() => handleSelectNearby(e)} disabled={loading}>锁定</ActionButton>
            </NearbyRow>
          ))}
        </NearbyList>
      )}

      {target && targetCiv && (
        <div style={{ marginBottom: 8 }}>
          <Row>
            <Label>{targetCiv.name}</Label>
            <Detail>{target.slice(0, 6)}...{target.slice(-4)}</Detail>
          </Row>
          <Row>
            <Label>{t('combat.energy')}</Label>
            <Detail>{fmt(targetCiv.energy || 0)}</Detail>
          </Row>
          <Row>
            <Label>{t('combat.health')}</Label>
            <Detail>{fmt(targetCiv.health || 0)}</Detail>
          </Row>
          <Row>
            <Label>{t('combat.weapon_lv')}</Label>
            <Detail>{targetCiv.weaponLv}</Detail>
          </Row>
          <Row>
            <Label>{t('combat.shield_lv')}</Label>
            <Detail>{targetCiv.shieldLv}</Detail>
          </Row>
          {searchDistance !== null && (
            <Row>
              <Label>{t('combat.distance')}</Label>
              <Detail>{fmt(searchDistance)} ls</Detail>
            </Row>
          )}
        </div>
      )}

      {target && targetCiv && !inRange && searchDistance !== null && (
        <OutOfRange>{t('combat.out_of_range_warn', { range: fmt(playerCiv?.scanRange || 0) })}</OutOfRange>
      )}

      <ActionButton variant="danger" disabled={!canAttack}
        onClick={() => setConfirmOpen(true)} icon="/assets/systems/weapon.web.png"
        style={{ width: '100%', marginTop: target ? 8 : 0 }}
        title={attackBlockReason ? t(attackBlockReason) : undefined}
      >
        {target ? t('combat.attack_btn', { name: targetName }) : t('combat.attack_btn_idle')}
        {target && cooldownRemaining > 0 && t('combat.attack_cooldown', { sec: cooldownRemaining })}
        {target && cooldownRemaining <= 0 && inRange && t('combat.attack_cost', { cost: attackEnergyCost })}
      </ActionButton>
      {attackBlockReason && target && inRange && (
        <BlockReason>{t(attackBlockReason)}</BlockReason>
      )}
      {!attackBlockReason && target && inRange && myAtk > 0 && targetDef != null && (
        <div style={{ color: THEME.text.secondary, fontSize: '0.68rem', fontFamily: "'Courier New', monospace", textAlign: 'center', marginTop: 4 }}>
          {t('combat.power_compare', { atk: myAtkLabel, def: theirDefLabel })}
          {targetShield != null && ` · 护盾 ${fmt(targetShield)}`}
        </div>
      )}

      <TxConfirm
        open={confirmOpen}
        title={t('combat.attack_btn', { name: targetName })}
        icon="/assets/systems/weapon.web.png"
        onConfirm={handleConfirmAttack}
        onCancel={() => setConfirmOpen(false)}
        confirmVariant="danger"
        confirmLabel={t('combat.confirm_attack')}
        loading={loading}
      >
        {t('combat.confirm_cost', { cost: attackEnergyCost })}<br />
        {t('combat.confirm_target', { name: targetName })}<br />
        {searchDistance !== null && <>{t('combat.confirm_distance', { dist: fmt(searchDistance) })}<br /></>}
        {cooldownRemaining > 0 && <>{t('combat.confirm_cooldown', { sec: cooldownRemaining })}<br /></>}
        {myAtk > 0 && targetDef != null && <>{t('combat.power_compare', { atk: myAtkLabel, def: theirDefLabel })}<br /></>}
        {targetShield != null && <>对方护盾 {fmt(targetShield)}<br /></>}
      </TxConfirm>
    </Panel>
  );
}
