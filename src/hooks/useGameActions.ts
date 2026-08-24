import { useCallback } from 'react';
import { parseEther, formatEther, Contract, MaxUint256, getAddress as checksumAddress } from 'ethers';
import { useGameStore } from './useGameStore';
import { useContract } from './useContract';
import { SYSTEMS, type SystemKey } from '../utils/constants';
import { GAME } from '../utils/constants';
import { ENERGY_MARKET_ABI } from '../utils/contract';
import { friendlyError } from '../utils/errors';
import { t } from '../i18n';

/** Maps SystemKey → contract string name for getUpgradeCost */
const SYS_TO_CONTRACT: Record<SystemKey, string> = {
  energyCollector: 'collector',
  weapon: 'weapon',
  shield: 'shield',
  radar: 'radar',
  engine: 'engine',
};

/** System IDs from contract: COLLECTOR=0, WEAPON=1, SHIELD=2, RADAR=3, ENGINE=4 */
const SYS_IDS: Record<SystemKey, number> = {
  energyCollector: 0,
  weapon: 1,
  shield: 2,
  radar: 3,
  engine: 4,
};

/* ══════════════════════════════════════════════════════════
   useGameActions — 所有游戏操作的统一入口
   合约不可用时直接抛出错误（不返回估算值/模拟数据）
   ══════════════════════════════════════════════════════════ */

export function useGameActions() {
  const ct = useContract();

  /** 抛出合约不可用错误 */
  function requireContract<T>(obj: T | null, name: string): asserts obj is T {
    if (!obj) throw new Error(`${name} Contract not available`);
  }

  /** 获取当前钱包地址（优先 signer，回退 store） */
  async function getAddress(): Promise<string> {
    if (ct.signer) return await ct.signer.getAddress();
    const addr = useGameStore.getState().address;
    if (addr) return addr;
    throw new Error('Wallet not connected');
  }

  /* ─── 0. 获取入场费 ─── */
  const fetchEntryFee = useCallback(async (): Promise<string> => {
    requireContract(ct.game, 'SilentExpanseStrife');
    const feeWei = await ct.game!.getEntryFee();
    return formatEther(feeWei);
  }, [ct]);

  /* ─── 0a. 创建文明 ─── */
  const createCivilization = useCallback(
    async (name: string, referrer?: string): Promise<boolean> => {
      requireContract(ct.game, 'SilentExpanseStrife');
      requireContract(ct.signer, 'Signer');
      beginAction('create');

      try {
        const feeWei = await ct.game!.getEntryFee();
        const overrides = { value: feeWei };

        let tx;
        if (referrer) {
          const refAddr = checksumAddress(referrer.trim());
          // 使用完整签名消除重载歧义 (ethers v6 ambiguous function 错误)
          tx = await ct.game!['createCivilization(string,address)'](name.trim(), refAddr, overrides);
        } else {
          tx = await ct.game!['createCivilization(string)'](name.trim(), overrides);
        }
        await tx.wait();

        const addr = await ct.signer!.getAddress();
        const raw = await ct.game!.getCivilization(addr);
        const civ = parseCivData(raw);
        // 从合约读取 shieldHP（getCivilization 不含此字段）
        const shieldHP = await ct.game!.getCurrentShieldHP(addr);
        civ.shieldHP = Number(shieldHP);
        useGameStore.setState({
          connected: true,
          address: addr,
          playerCiv: civ,
          entryFee: formatEther(feeWei),
          lastCollectTime: raw.lastUpdateTime ? Number(raw.lastUpdateTime) * 1000 : Date.now(),
        });

        useGameStore.getState().claimSES();
        useGameStore.getState().addSuccessToast(t('toast.civ_created', { name }), tx.hash);
        return true;
      } catch (e) {
        { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.civ_create_failed', { msg: fe.msg })); }
        return false;
      } finally {
        endAction();
      }
    },
    [ct],
  );

  /* ─── 1. 升级系统 ─── */
  const upgradeSystem = useCallback(
    async (system: SystemKey) => {
      const store = useGameStore.getState();
      if (!store.playerCiv) return;
      requireContract(ct.game, 'SilentExpanseStrife');
      requireContract(ct.sesToken, 'SES Token');
      beginAction('upgrade');

      try {
        const df = ct.game!;
        const ses = ct.sesToken!;
        const addr = await getAddress();

        // 从合约读取真实升级成本
        const realCost = await df.getUpgradeCost(addr, SYS_TO_CONTRACT[system]);
        const costSES = Number(realCost.ses) / 1e18;
        const costEnergy = Number(realCost.energy);

        const sesBalance = parseFloat(store.sesBalance);
        const energy = store.playerCiv.energy;

        if (sesBalance < costSES) {
          useGameStore.setState({
            loading: false,
            error: t('toast.ses_insufficient', { need: costSES.toFixed(2), have: sesBalance.toFixed(2) }),
          });
          return;
        }
        if (energy < costEnergy) {
          useGameStore.setState({
            loading: false,
            error: t('toast.energy_insufficient', { need: costEnergy.toLocaleString(), have: energy.toLocaleString() }),
          });
          return;
        }

        // 确保 SES 授权额度足够（upgradeSystem 会 transferFrom）
        // 每次检查，不够就授权 MaxUint256（一次授权永久有效）
        const allowance = await ses.allowance(addr, GAME.SILENT_EXPANSE);
        if (allowance < realCost.ses) {
          const approveTx = await ses.approve(GAME.SILENT_EXPANSE, MaxUint256);
          await approveTx.wait();
        }

        const tx = await df.upgradeSystem(SYS_IDS[system]);
        await tx.wait();

        // 刷新链上数据
        const civ = await df.getCivilization(addr);
        useGameStore.setState({
          playerCiv: { ...store.playerCiv!, ...parseCivData(civ) },
          sesBalance: formatBalance(await ses.balanceOf(addr)),
        });

        useGameStore.getState().addSuccessToast(t('toast.upgrade_success', { name: SYSTEMS[system].name }), tx.hash);
      } catch (e) {
        { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.upgrade_failed', { msg: fe.msg })); }
      } finally {
        endAction();
      }
    },
    [ct],
  );

  /* ─── 2. 攻击目标 ─── */
  const attackTarget = useCallback(async () => {
    const store = useGameStore.getState();
    if (!store.playerCiv || !store.selectedTarget) return;
    const attackCost = useGameStore.getState().attackEnergyCost; // 链上 getAttackEnergyCost
    if (store.attackTokens.current <= 0) {
      useGameStore.setState({ error: t('combat.attack_no_token') });
      return;
    }
    if (store.playerCiv.energy < attackCost) {
      useGameStore.setState({ error: t('toast.attack_energy', { cost: attackCost }) });
      return;
    }

    useGameStore.setState({ loading: true, activeAction: 'attack', error: null, lastAttackTime: Date.now() });

    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const tx = await ct.game!.attack(store.selectedTarget);
      await tx.wait();
      const addr = await getAddress();
      const civ = parseCivData(await ct.game!.getCivilization(addr));
      // 合约读取 shieldHP（getCivilization 不含此字段）
      civ.shieldHP = Number(await ct.game!.getCurrentShieldHP(addr));
      useGameStore.setState({
        playerCiv: { ...store.playerCiv, ...civ },
      });
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.attack_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 3. 采集能量 ─── */
  const collectEnergy = useCallback(async () => {
    const store = useGameStore.getState();
    if (!store.playerCiv) return;
    beginAction('collect');

    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const tx = await ct.game!.collectEnergy();
      const receipt = await tx.wait();
      // 从 EnergyCollected 事件读取本次实际收取的能量（合约 _collectEnergy 结算值）
      let collected = 0;
      if (receipt && receipt.logs) {
        try {
          const iface = ct.game!.interface;
          for (const log of receipt.logs) {
            try {
              const parsed = iface.parseLog(log);
              if (parsed && parsed.name === 'EnergyCollected') {
                collected = Number(parsed.args.amount ?? 0);
                break;
              }
            } catch { /* 非本合约事件，跳过 */ }
          }
        } catch { /* 事件解析失败则回退为 0 */ }
      }
      const addr = await getAddress();
      const raw = await ct.game!.getCivilization(addr);
      const civ = parseCivData(raw);
      // 一并刷新 shieldHP
      civ.shieldHP = Number(await ct.game!.getCurrentShieldHP(addr));
      useGameStore.setState(s => ({
        playerCiv: s.playerCiv ? { ...s.playerCiv, ...civ } : null,
        // 用合约返回的 lastUpdateTime（秒→ms），保持与轮询基准一致
        lastCollectTime: raw.lastUpdateTime ? Number(raw.lastUpdateTime) * 1000 : Date.now(),
      }));
      useGameStore.getState().addSuccessToast(t('toast.collect_success', { amount: collected }), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.collect_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 4. 领取战斗能量 ─── */
  const claimCombatEnergy = useCallback(async () => {
    const store = useGameStore.getState();
    if (store.pendingEnergy <= 0) return;
    beginAction('claimCombat');

    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const tx = await ct.game!.claimCombatEnergy();
      await tx.wait();
      const addr = await getAddress();
      const civ = await ct.game!.getCivilization(addr);
      const pending = await ct.game!.pendingCombatEnergy(addr);
      useGameStore.setState({
        playerCiv: { ...useGameStore.getState().playerCiv!, ...parseCivData(civ) },
        pendingEnergy: Number(pending),
      });
      useGameStore.getState().addSuccessToast(t('toast.claim_combat_success'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.claim_combat_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 4a. 分发当前纪元 SES（全局仅需一次，多次调用无效果） ─── */
  const distributeAction = useCallback(async () => {
    beginAction('distribute');
    try {
      requireContract(ct.dailyMinter, 'DailyMinter');
      const tx = await ct.dailyMinter!.distribute();
      await tx.wait();
      useGameStore.getState().addSuccessToast(t('toast.distribute_success'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.claim_ses_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 5. 领取每日 SES ─── */
  const claimDailySES = useCallback(async () => {
    beginAction('claimSES');

    try {
      requireContract(ct.dailyMinter, 'DailyMinter');
      requireContract(ct.sesToken, 'SES Token');

      // Ensure epoch is distributed (anyone can call; no-op if already done)
      try {
        const distTx = await ct.dailyMinter!.distribute();
        await distTx.wait();
      } catch {
        // Already distributed this epoch — continue to claim
      }
      const tx = await ct.dailyMinter!.claim();
      await tx.wait();
      const addr = await getAddress();
      useGameStore.setState({
        sesBalance: formatBalance(await ct.sesToken!.balanceOf(addr)),
      });
      useGameStore.getState().claimSES();
      useGameStore.getState().addSuccessToast(t('toast.claim_ses_success'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.claim_ses_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 6. 巡航移动 ─── */
  const startMove = useCallback(
    async (x: number, y: number, z: number) => {
      beginAction('move');
      try {
        requireContract(ct.game, 'SilentExpanseStrife');
        const tx = await ct.game!.startMove(x, y, z);
        await tx.wait();
        useGameStore.getState().addSuccessToast(t('toast.move_success'), tx.hash);
      } catch (e) {
        { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.move_failed', { msg: fe.msg })); }
      } finally {
        endAction();
      }
    },
    [ct],
  );

  /* ─── 7. 空间跳跃 ─── */
  const spaceJump = useCallback(async () => {
    beginAction('jump');
    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const tx = await ct.game!.spaceJump();
      await tx.wait();
      useGameStore.getState().addSuccessToast(t('toast.jump_success'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.jump_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 7a. 重建文明 ─── */
  const rebuildCivilizationAction = useCallback(async () => {
    beginAction('rebuild');
    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const tx = await ct.game!.rebuildCivilization();
      await tx.wait();
      // 重建后刷新文明数据
      const addr = await getAddress();
      const raw = await ct.game!.getCivilization(addr);
      const civ = parseCivData(raw);
      civ.shieldHP = Number(await ct.game!.getCurrentShieldHP(addr));
      useGameStore.setState({
        playerCiv: { ...useGameStore.getState().playerCiv!, ...civ },
      });
      useGameStore.getState().addSuccessToast(t('toast.rebuild_success'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.rebuild_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 7b. 修理采集器 ─── */
  const repairCollectorAction = useCallback(async (amount: number) => {
    const store = useGameStore.getState();
    if (!store.playerCiv) return;
    beginAction('repairCollector');
    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const tx = await ct.game!.repairCollector(amount);
      await tx.wait();
      // 刷新耐久度
      const addr = await getAddress();
      const dur = await ct.game!.getCollectorDurability(addr);
      useGameStore.setState({
        collectorDurability: { current: Number(dur[0]), max: Number(dur[1]) },
      });
      useGameStore.getState().addSuccessToast(t('toast.repair_collector_success'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.repair_collector_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 8. 修复护盾 ─── */
  const repairShield = useCallback(async () => {
    const store = useGameStore.getState();
    if (!store.playerCiv) return;
    // maxShieldHP 由轮询从 getMaxShieldHP 填充
    const maxHP = store.playerCiv.maxShieldHP;
    if (store.playerCiv.shieldHP >= maxHP) return;
    beginAction('repairShield');

    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const repairAmount = maxHP - store.playerCiv.shieldHP;
      const tx = await ct.game!.repairShield(repairAmount);
      await tx.wait();
      const addr = await getAddress();
      // 从合约读取最新护盾 HP
      const hp = await ct.game!.getCurrentShieldHP(addr);
      useGameStore.setState(s => ({
        playerCiv: s.playerCiv ? { ...s.playerCiv, shieldHP: Number(hp) } : null,
      }));
      useGameStore.getState().addSuccessToast(t('toast.repair_shield_success'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.repair_shield_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 8a. 护盾再生（被动恢复加速） ─── */
  const regenShield = useCallback(async () => {
    const store = useGameStore.getState();
    if (!store.playerCiv) return;
    beginAction('regenShield');

    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const tx = await ct.game!.regenShield();
      await tx.wait();
      const addr = await getAddress();
      const hp = await ct.game!.getCurrentShieldHP(addr);
      useGameStore.setState(s => ({
        playerCiv: s.playerCiv ? { ...s.playerCiv, shieldHP: Number(hp) } : null,
      }));
      useGameStore.getState().addSuccessToast(t('toast.regen_shield_success'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.regen_shield_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 8b. 一键全修（采集器+武器+护盾+引擎耐久） ─── */
  const repairAll = useCallback(async () => {
    beginAction('repairAll');
    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const tx = await ct.game!.repairAll();
      await tx.wait();
      const addr = await getAddress();
      const civ = await ct.game!.getCivilization(addr);
      useGameStore.setState({
        playerCiv: { ...useGameStore.getState().playerCiv!, ...parseCivData(civ) },
      });
      useGameStore.getState().addSuccessToast(t('toast.repair_all_success'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.repair_all_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 8c. 取消巡航 ─── */
  const cancelMove = useCallback(async () => {
    beginAction('cancelMove');
    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const tx = await ct.game!.cancelMove();
      await tx.wait();
      const addr = await getAddress();
      const pos = await ct.game!.getCurrentPosition(addr);
      useGameStore.setState(s => ({
        playerCiv: s.playerCiv
          ? { ...s.playerCiv, x: Number(pos.x ?? pos[0]), y: Number(pos.y ?? pos[1]), z: Number(pos.z ?? pos[2]) }
          : null,
      }));
      useGameStore.getState().addSuccessToast(t('toast.cancel_move_success'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.cancel_move_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 9. 创建联盟 ─── */
  const createAlliance = useCallback(async (name: string) => {
    if (!name.trim()) return;
    beginAction('alliance.create');
    try {
      requireContract(ct.alliance, 'Alliance');
      const tx = await ct.alliance!.createAlliance(name.trim());
      await tx.wait();
      useGameStore.getState().addSuccessToast(t('toast.alliance_created'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.alliance_create_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 10. 领取退款 ─── */
  const claimRefund = useCallback(async () => {
    beginAction('alliance.refund');
    try {
      requireContract(ct.alliance, 'Alliance');
      requireContract(ct.sesToken, 'SES Token');
      const tx = await ct.alliance!.claimRefund();
      await tx.wait();
      const addr = await getAddress();
      useGameStore.setState({
        sesBalance: formatBalance(await ct.sesToken!.balanceOf(addr)),
        pendingRefund: 0,
      });
      useGameStore.getState().addSuccessToast(t('toast.refund_claimed'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.refund_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 11. 加入联盟 ─── */
  const joinAlliance = useCallback(async (allianceId: string) => {
    beginAction('alliance.join');
    try {
      requireContract(ct.alliance, 'Alliance');
      const tx = await ct.alliance!.joinAlliance(allianceId);
      await tx.wait();
      useGameStore.getState().addSuccessToast(t('toast.alliance_joined'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.alliance_join_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 12. 离开联盟 ─── */
  const leaveAlliance = useCallback(async (allianceId: string) => {
    beginAction('alliance.leave');
    try {
      requireContract(ct.alliance, 'Alliance');
      const tx = await ct.alliance!.leaveAlliance(allianceId);
      await tx.wait();
      useGameStore.setState({
        currentAlliance: null,
        _allianceMembers: [],
        _allianceTotemLevel: 0,
        _allianceTotemEnergy: 0,
        _allianceTotemUpgradeCost: 0,
        _allianceIsLeader: false,
        _allianceLeader: '',
      });
      useGameStore.getState().addSuccessToast(t('toast.alliance_left'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.alliance_leave_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 13. 踢出成员（仅盟主） ─── */
  const kickMember = useCallback(async (allianceId: string, member: string) => {
    beginAction('alliance.kick');
    try {
      requireContract(ct.alliance, 'Alliance');
      const tx = await ct.alliance!.kickMember(allianceId, member);
      await tx.wait();
      useGameStore.getState().addSuccessToast(t('toast.member_kicked'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.member_kick_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 13a. 转移盟主（仅盟主） ─── */
  const transferLeadership = useCallback(async (allianceId: string, newLeader: string) => {
    beginAction('alliance.transfer');
    try {
      requireContract(ct.alliance, 'Alliance');
      const tx = await ct.alliance!.transferLeadership(allianceId, newLeader);
      await tx.wait();
      useGameStore.getState().addSuccessToast(t('toast.leadership_transferred'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.leadership_transfer_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 14. 解散联盟（仅盟主） ─── */
  const disbandAlliance = useCallback(async (allianceId: string) => {
    beginAction('alliance.disband');
    try {
      requireContract(ct.alliance, 'Alliance');
      const tx = await ct.alliance!.disbandAlliance(allianceId);
      await tx.wait();
      useGameStore.setState({
        currentAlliance: null,
        _allianceMembers: [],
        _allianceTotemLevel: 0,
        _allianceTotemEnergy: 0,
        _allianceTotemUpgradeCost: 0,
        _allianceIsLeader: false,
        _allianceLeader: '',
      });
      useGameStore.getState().addSuccessToast(t('toast.alliance_disbanded'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.alliance_disband_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 15. 捐献能量给图腾 ─── */
  const donateToTotem = useCallback(async (allianceId: string, amount: number) => {
    beginAction('alliance.donate');
    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const tx = await ct.game!.donateToTotem(allianceId, amount);
      await tx.wait();
      useGameStore.getState().addSuccessToast(t('toast.donate_success'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.donate_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 15a. 升级图腾（仅盟主） ─── */
  const upgradeTotem = useCallback(async (allianceId: string) => {
    beginAction('alliance.totem');
    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const tx = await ct.game!.upgradeTotem(allianceId);
      await tx.wait();
      useGameStore.getState().addSuccessToast(t('toast.totem_upgrade_success'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.totem_upgrade_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 16. 清除错误 ─── */
  const clearError = useCallback(() => {
    useGameStore.setState({ error: null });
  }, []);

  /* ══════════════════════════════════════════════
     能量市场
     ══════════════════════════════════════════════ */

  /* ─── 17. 创建挂单卖出能量 ─── */
  const createEnergyOrder = useCallback(async (energyAmount: number, sesPrice: number) => {
    beginAction('market.sell');
    try {
      requireContract(ct.signer, 'Signer');
      if (!GAME.ENERGY_MARKET) throw new Error('ENERGY_MARKET address not configured');
      const market = new Contract(GAME.ENERGY_MARKET, ENERGY_MARKET_ABI, ct.signer);
      const tx = await market.createOrder(energyAmount, parseEther(String(sesPrice)));
      await tx.wait();
      if (ct.game) {
        const addr = await getAddress();
        const civ = await ct.game.getCivilization(addr);
        useGameStore.setState({ playerCiv: { ...useGameStore.getState().playerCiv!, energy: Number(civ.energy ?? civ[2] ?? 0) } as never });
      }
      useGameStore.getState().addSuccessToast(t('toast.order_created'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.order_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 18. 吃单买入能量 ───
   *     TODO: 调用者需传入 orderId, energyAmount (要买的能量数量), maxUnitPriceWei (最高单价 wei)
   *     如果 maxUnitPriceWei 传 0，则从订单自动计算单价并上浮 10% 作为最高价。
   */
  const fillEnergyOrder = useCallback(async (orderId: number, energyAmount: number, maxUnitPriceWei?: bigint) => {
    beginAction('market.buy');
    try {
      requireContract(ct.signer, 'Signer');
      requireContract(ct.sesToken, 'SES Token');
      const market = new Contract(GAME.ENERGY_MARKET!, ENERGY_MARKET_ABI, ct.signer);

      // 读取订单信息以计算精确单价
      const order = await market.orders(orderId);
      if (order.remaining === 0n) throw new Error('Order already filled');
      const unitPrice = BigInt(order.sesPrice) / BigInt(order.energyAmount);  // integer division, 匹配合约 _unitPrice
      const maxUnitPrice = maxUnitPriceWei ?? (unitPrice * 110n / 100n);  // 默认上浮 10%

      // 计算需要支付的 SES（fillOrder 会从买家 transferFrom）
      const requiredSes = BigInt(energyAmount) * order.sesPrice / order.energyAmount;

      // 确保 SES 授权额度足够
      const addr = await getAddress();
      const allowance = await ct.sesToken!.allowance(addr, GAME.ENERGY_MARKET!);
      if (allowance < requiredSes) {
        const approveTx = await ct.sesToken!.approve(GAME.ENERGY_MARKET!, MaxUint256);
        await approveTx.wait();
      }

      const tx = await market.fillOrder(orderId, energyAmount, maxUnitPrice);
      await tx.wait();

      // 刷新玩家能量和 SES 余额
      if (ct.game) {
        const civ = await ct.game.getCivilization(addr);
        useGameStore.setState({
          playerCiv: { ...useGameStore.getState().playerCiv!, energy: Number(civ.energy ?? 0) } as never,
          sesBalance: formatBalance(await ct.sesToken!.balanceOf(addr)),
        });
      }
      useGameStore.getState().addSuccessToast(t('toast.order_filled'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.order_fill_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  /* ─── 19. 撤单 ─── */
  const cancelEnergyOrder = useCallback(async (orderId: number) => {
    beginAction('market.cancel');
    try {
      requireContract(ct.signer, 'Signer');
      const market = new Contract(GAME.ENERGY_MARKET!, ENERGY_MARKET_ABI, ct.signer);
      const tx = await market.cancelOrder(orderId);
      await tx.wait();
      useGameStore.getState().addSuccessToast(t('toast.order_cancelled'), tx.hash);
    } catch (e) {
      { const fe = friendlyError(e); if (!isRejected(fe)) useGameStore.getState().addErrorToast(t('toast.order_cancel_failed', { msg: fe.msg })); }
    } finally {
        endAction();
      }
  }, [ct]);

  return {
    createCivilization,
    fetchEntryFee,
    upgradeSystem,
    attackTarget,
    collectEnergy,
    claimCombatEnergy,
    claimDailySES,
    distribute: distributeAction,
    startMove,
    spaceJump,
    rebuildCivilization: rebuildCivilizationAction,
    repairCollector: repairCollectorAction,
    repairShield,
    regenShield,
    repairAll,
    cancelMove,
    createAlliance,
    joinAlliance,
    leaveAlliance,
    kickMember,
    transferLeadership,
    disbandAlliance,
    donateToTotem,
    upgradeTotem,
    claimRefund,
    clearError,
    createEnergyOrder,
    fillEnergyOrder,
    cancelEnergyOrder,
  };
}

/* ══════════════════════════════════════════════════════════
   内部工具
   ══════════════════════════════════════════════════════════ */

function isRejected(f: ReturnType<typeof friendlyError>): boolean {
  return f.rejected;
}

/** 工具：记录 per-action loading，并保证 finally 统一清理 */
function beginAction(actionId: string) {
  useGameStore.setState({ loading: true, error: null, activeAction: actionId });
}
function endAction() {
  useGameStore.setState({ loading: false, activeAction: null });
}

/** Raw tuple returned by getCivilization(address) */
interface CivTuple {
  name?: string; x?: bigint | number; y?: bigint | number; z?: bigint | number;
  energy?: bigint | number; health?: bigint | number;
  shieldHP?: bigint | number; maxShieldHP?: bigint | number;
  energyCollectorLv?: bigint | number; weaponLv?: bigint | number;
  radarLv?: bigint | number; shieldLv?: bigint | number; engineLv?: bigint | number;
  scanRange?: bigint | number; isRuins?: boolean;
  [index: number]: unknown;
}

/** Parse getCivilization() raw tuple into civilized store shape.
 *  maxShieldHP 直接从 shieldLv 计算（与合约 _calcShieldHP 一致），
 *  避免额外的 RPC 调用。shieldHP 需要在有独立 RPC 时另行填充。
 */
export function civFromRaw(raw: any) {
  const shieldLv = Number(raw.shieldLv ?? 1);
  return {
    name: String(raw.name ?? ''),
    x: Number(raw.x ?? raw.location?.x ?? 0),
    y: Number(raw.y ?? raw.location?.y ?? 0),
    z: Number(raw.z ?? raw.location?.z ?? 0),
    energy: Number(raw.energy ?? 0),
    health: Number(raw.health ?? 0),
    shieldHP: Number(raw.shieldHP ?? 0),
    // 与合约 _calcShieldHP(): SHIELD_HP_BASE + SHIELD_HP_RATE * lv² 一致
    maxShieldHP: GAME.SHIELD_HP_BASE + GAME.SHIELD_HP_RATE * shieldLv * shieldLv,
    energyCollectorLv: Number(raw.energyCollectorLv ?? 1),
    weaponLv: Number(raw.weaponLv ?? 1),
    radarLv: Number(raw.radarLv ?? 1),
    shieldLv,
    engineLv: Number(raw.engineLv ?? 1),
    scanRange: Number(raw.scanRange ?? 1000),
    isRuins: Boolean(raw.isRuins ?? false), isMoving: false,
  };
}

function parseCivData(raw: CivTuple) {
  return civFromRaw(raw);
}

function formatBalance(raw: bigint | number | string): string {
  const val = typeof raw === 'bigint' ? Number(raw) / 1e18 : Number(raw);
  if (isNaN(val)) return '0.00';
  return val.toFixed(2);
}
