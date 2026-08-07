import { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useGameStore } from '../hooks/useGameStore';
import { useContract } from '../hooks/useContract';
import { useGameActions, civFromRaw } from '../hooks/useGameActions';
import { ActionButton } from './ui/ActionButton';
import { SystemIcon } from './ui/SystemIcon';
import { TxConfirm } from './ui/TxConfirm';
import { THEME } from '../theme';
import { useIsMobile } from '../hooks/useMediaQuery';
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

const ATTACK_COOLDOWN = 3000;

export function TargetSearch() {
  const { t } = useI18n();
  const isMobile = useIsMobile();
  const playerCiv = useGameStore(s => s.playerCiv);
  const address = useGameStore(s => s.address);
  const enemyCivs = useGameStore(s => s.enemyCivs);
  const target = useGameStore(s => s.selectedTarget);
  const lastAttackTime = useGameStore(s => s.lastAttackTime);
  const loading = useGameStore(s => s.loading);
  const ct = useContract();
  const addEnemyCiv = useGameStore(s => s.addEnemyCiv);
  const setSelectedTarget = useGameStore(s => s.setSelectedTarget);
  const { attackTarget } = useGameActions();

  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchAddr, setSearchAddr] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [searchDistance, setSearchDistance] = useState<number | null>(null);
  const [inRange, setInRange] = useState(false);

  const now = Date.now();
  const attackEnergyCost = useGameStore(s => s.attackEnergyCost); // 链上 getAttackEnergyCost
  const canAttack = target && playerCiv && inRange && playerCiv.energy >= attackEnergyCost && (now - lastAttackTime >= ATTACK_COOLDOWN) && !loading;
  const cooldownRemaining = Math.max(0, Math.ceil((ATTACK_COOLDOWN - (now - lastAttackTime)) / 1000));

  const targetCiv = target ? enemyCivs.get(target) : undefined;
  const targetName = targetCiv?.name ?? (target ? target.slice(0, 6) + '...' : '');

  const handleSearch = useCallback(async () => {
    const addr = searchInputRef.current?.value?.trim();
    if (!addr) return;
    useGameStore.setState({ loading: true });
    setSearchDistance(null);
    setInRange(false);
    try {
      if (!ct.game) throw new Error('Contract not available');
      const [raw, dist, rangeCheck] = await Promise.all([
        ct.game.getCivilization(addr),
        address ? ct.game.getDistance(address, addr).catch(() => null) : null,
        address ? ct.game.isInRange(address, addr).catch(() => false) : false,
      ]);
      if (raw) {
        const civ = civFromRaw(raw);
        addEnemyCiv(addr, civ);
      }
      if (dist !== null) setSearchDistance(Number(dist));
      setInRange(Boolean(rangeCheck));
      setSelectedTarget(addr);
    } catch {
      setSelectedTarget(addr);
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct, address, addEnemyCiv, setSelectedTarget]);

  const handleConfirmAttack = () => {
    attackTarget();
    setConfirmOpen(false);
  };

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
      >
        {target ? t('combat.attack_btn', { name: targetName }) : t('combat.attack_btn_idle')}
        {target && cooldownRemaining > 0 && t('combat.attack_cooldown', { sec: cooldownRemaining })}
        {target && cooldownRemaining <= 0 && inRange && t('combat.attack_cost', { cost: attackEnergyCost })}
      </ActionButton>

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
      </TxConfirm>
    </Panel>
  );
}
