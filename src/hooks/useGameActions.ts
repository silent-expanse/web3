import { useCallback } from 'react';
import { parseEther, formatEther, Contract, MaxUint256, getAddress as checksumAddress } from 'ethers';
import { useGameStore } from './useGameStore';
import { useContract } from './useContract';
import { SYSTEMS, type SystemKey } from '../utils/constants';
import { GAME } from '../utils/constants';
import { ENERGY_MARKET_ABI } from '../utils/contract';
import { t } from '../i18n';

/* ══════════════════════════════════════════════════════════
   数值公式（与 BSC 主网合约 SilentExpanseStrifeStorage 一致）
   验证：cast call 0x96ee... SYS_* / BASE_* / _calc*
   ══════════════════════════════════════════════════════════ */

/** 能量采集速率 (energy/sec): lv≤1 ? 3 : 3 + 10·√(lv-1)
 *  简化版：不含推荐加成 (1000+refs*2)/1000，仅用于本地显示。
 *  合约 _calcCollect() 含完整公式，实际采集以链上为准。
 */
export function calcCollectRate(lv: number): number {
  if (lv <= 1) return GAME.BASE_COLLECT;
  return GAME.BASE_COLLECT + GAME.COLLECT_BONUS * Math.sqrt(lv - 1);
}

/** 攻击力: 900 + 10·lv²  (ATK_BASE=900, ATK_RATE=10) 与合约 _calcAttack() 一致 */
export function calcAttackPower(lv: number): number {
  return GAME.ATK_BASE + GAME.ATK_RATE * lv * lv;
}

/** 防御力: 540 + 6·lv²  (DEF_BASE=540, DEF_RATE=6) 与合约 _calcShieldDefense() 一致 */
export function calcShieldDefense(lv: number): number {
  return GAME.DEF_BASE + GAME.DEF_RATE * lv * lv;
}

/** 雷达探测范围: 1000 + 150·L + 5·L² */
export function calcRadarRange(lv: number): number {
  return GAME.RADAR_BASE + GAME.RADAR_LINEAR * lv + GAME.RADAR_QUAD * lv * lv;
}

/** 护盾 HP: 3600 + 15·lv²  (SHIELD_HP_BASE=3600, SHIELD_HP_RATE=15) 与合约 _calcShieldHP() 一致 */
export function calcMaxShieldHP(lv: number): number {
  return GAME.SHIELD_HP_BASE + GAME.SHIELD_HP_RATE * lv * lv;
}

/** 引擎速度: 10 + 5·(L-1) */
export function calcSpeed(lv: number): number {
  return GAME.ENGINE_SPEED_BASE + GAME.ENGINE_SPEED_PER_LV * (lv - 1);
}

/** 攻击能量消耗: ATTACK_ENERGY_BASE(50000) + ATTACK_ENERGY_PER_LV(50000)·weaponLv */
export function calcAttackEnergyCost(weaponLv: number): number {
  return GAME.ATTACK_ENERGY_BASE + GAME.ATTACK_ENERGY_PER_LV * weaponLv;
}

type CivKey = 'energyCollectorLv' | 'weaponLv' | 'shieldLv' | 'radarLv' | 'engineLv';

const LEVEL_KEYS: Record<SystemKey, CivKey> = {
  energyCollector: 'energyCollectorLv',
  weapon: 'weaponLv',
  shield: 'shieldLv',
  radar: 'radarLv',
  engine: 'engineLv',
};

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
      useGameStore.setState({ loading: true, error: null });

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
          lastCollectTime: Date.now(),
        });

        useGameStore.getState().claimSES();
        useGameStore.getState().addSuccessToast(t('toast.civ_created', { name }));
        return true;
      } catch (e) {
        useGameStore.getState().addErrorToast(t('toast.civ_create_failed', { msg: errMsg(e) }));
        return false;
      } finally {
        useGameStore.setState({ loading: false });
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
      useGameStore.setState({ loading: true, error: null });

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

        useGameStore.getState().addSuccessToast(t('toast.upgrade_success', { icon: SYSTEMS[system].icon, name: SYSTEMS[system].name }));
      } catch (e) {
        useGameStore.getState().addErrorToast(t('toast.upgrade_failed', { msg: errMsg(e) }));
      } finally {
        useGameStore.setState({ loading: false });
      }
    },
    [ct],
  );

  /* ─── 2. 攻击目标 ─── */
  const attackTarget = useCallback(async () => {
    const store = useGameStore.getState();
    if (!store.playerCiv || !store.selectedTarget) return;
    const attackCost = calcAttackEnergyCost(store.playerCiv.weaponLv);
    if (store.playerCiv.energy < attackCost) {
      useGameStore.setState({ error: t('toast.attack_energy', { cost: attackCost }) });
      return;
    }

    useGameStore.setState({ loading: true, error: null, lastAttackTime: Date.now() });

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
      useGameStore.getState().addErrorToast(t('toast.attack_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 3. 采集能量 ─── */
  const collectEnergy = useCallback(async () => {
    const store = useGameStore.getState();
    if (!store.playerCiv) return;
    useGameStore.setState({ loading: true, error: null });

    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const tx = await ct.game!.collectEnergy();
      await tx.wait();
      const addr = await getAddress();
      const raw = await ct.game!.getCivilization(addr);
      const civ = parseCivData(raw);
      // 一并刷新 shieldHP
      civ.shieldHP = Number(await ct.game!.getCurrentShieldHP(addr));
      useGameStore.setState(s => ({
        playerCiv: s.playerCiv ? { ...s.playerCiv, ...civ } : null,
        lastCollectTime: Date.now(),
      }));
      useGameStore.getState().addSuccessToast(t('toast.collect_success', { amount: Math.floor(calcCollectRate(raw.energyCollectorLv ?? 1) * 10) }));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.collect_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 4. 领取战斗能量 ─── */
  const claimCombatEnergy = useCallback(async () => {
    const store = useGameStore.getState();
    if (store.pendingEnergy <= 0) return;
    useGameStore.setState({ loading: true, error: null });

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
      useGameStore.getState().addSuccessToast(t('toast.claim_combat_success'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.claim_combat_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 4a. 分发当前纪元 SES（全局仅需一次，多次调用无效果） ─── */
  const distributeAction = useCallback(async () => {
    useGameStore.setState({ loading: true, error: null });
    try {
      requireContract(ct.dailyMinter, 'DailyMinter');
      const tx = await ct.dailyMinter!.distribute();
      await tx.wait();
      useGameStore.getState().addSuccessToast('📤 分发成功！可以领取 SES 了');
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.claim_ses_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 5. 领取每日 SES ─── */
  const claimDailySES = useCallback(async () => {
    useGameStore.setState({ loading: true, error: null });

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
      useGameStore.getState().addSuccessToast(t('toast.claim_ses_success'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.claim_ses_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 6. 巡航移动 ─── */
  const startMove = useCallback(
    async (x: number, y: number, z: number) => {
      useGameStore.setState({ loading: true, error: null });
      try {
        requireContract(ct.game, 'SilentExpanseStrife');
        const tx = await ct.game!.startMove(x, y, z);
        await tx.wait();
        useGameStore.getState().addSuccessToast(t('toast.move_success'));
      } catch (e) {
        useGameStore.getState().addErrorToast(t('toast.move_failed', { msg: errMsg(e) }));
      } finally {
        useGameStore.setState({ loading: false });
      }
    },
    [ct],
  );

  /* ─── 7. 空间跳跃 ─── */
  const spaceJump = useCallback(async () => {
    useGameStore.setState({ loading: true, error: null });
    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const tx = await ct.game!.spaceJump();
      await tx.wait();
      useGameStore.getState().addSuccessToast(t('toast.jump_success'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.jump_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 7a. 重建文明 ─── */
  const rebuildCivilizationAction = useCallback(async () => {
    useGameStore.setState({ loading: true, error: null });
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
      useGameStore.getState().addSuccessToast(t('toast.rebuild_success'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.rebuild_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 7b. 修理采集器 ─── */
  const repairCollectorAction = useCallback(async (amount: number) => {
    const store = useGameStore.getState();
    if (!store.playerCiv) return;
    useGameStore.setState({ loading: true, error: null });
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
      useGameStore.getState().addSuccessToast(t('toast.repair_collector_success'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.repair_collector_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 8. 修复护盾 ─── */
  const repairShield = useCallback(async () => {
    const store = useGameStore.getState();
    if (!store.playerCiv) return;
    // 优先使用合约读取的 maxShieldHP，兜底用本地计算（与合约一致）
    const maxHP = store.playerCiv.maxShieldHP || calcMaxShieldHP(store.playerCiv.shieldLv);
    if (store.playerCiv.shieldHP >= maxHP) return;
    useGameStore.setState({ loading: true, error: null });

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
      useGameStore.getState().addSuccessToast(t('toast.repair_shield_success'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.repair_shield_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 8a. 护盾再生（被动恢复加速） ─── */
  const regenShield = useCallback(async () => {
    const store = useGameStore.getState();
    if (!store.playerCiv) return;
    useGameStore.setState({ loading: true, error: null });

    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const tx = await ct.game!.regenShield();
      await tx.wait();
      const addr = await getAddress();
      const hp = await ct.game!.getCurrentShieldHP(addr);
      useGameStore.setState(s => ({
        playerCiv: s.playerCiv ? { ...s.playerCiv, shieldHP: Number(hp) } : null,
      }));
      useGameStore.getState().addSuccessToast(t('toast.regen_shield_success'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.regen_shield_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 8b. 一键全修（采集器+武器+护盾+引擎耐久） ─── */
  const repairAll = useCallback(async () => {
    useGameStore.setState({ loading: true, error: null });
    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const tx = await ct.game!.repairAll();
      await tx.wait();
      const addr = await getAddress();
      const civ = await ct.game!.getCivilization(addr);
      useGameStore.setState({
        playerCiv: { ...useGameStore.getState().playerCiv!, ...parseCivData(civ) },
      });
      useGameStore.getState().addSuccessToast(t('toast.repair_all_success'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.repair_all_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 8c. 取消巡航 ─── */
  const cancelMove = useCallback(async () => {
    useGameStore.setState({ loading: true, error: null });
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
      useGameStore.getState().addSuccessToast(t('toast.cancel_move_success'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.cancel_move_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 9. 创建联盟 ─── */
  const createAlliance = useCallback(async (name: string) => {
    if (!name.trim()) return;
    useGameStore.setState({ loading: true, error: null });
    try {
      requireContract(ct.alliance, 'Alliance');
      const tx = await ct.alliance!.createAlliance(name.trim());
      await tx.wait();
      useGameStore.getState().addSuccessToast(t('toast.alliance_created'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.alliance_create_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 10. 领取退款 ─── */
  const claimRefund = useCallback(async () => {
    useGameStore.setState({ loading: true, error: null });
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
      useGameStore.getState().addSuccessToast(t('toast.refund_claimed'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.refund_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 11. 加入联盟 ─── */
  const joinAlliance = useCallback(async (allianceId: string) => {
    useGameStore.setState({ loading: true, error: null });
    try {
      requireContract(ct.alliance, 'Alliance');
      const tx = await ct.alliance!.joinAlliance(allianceId);
      await tx.wait();
      useGameStore.getState().addSuccessToast(t('toast.alliance_joined'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.alliance_join_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 12. 离开联盟 ─── */
  const leaveAlliance = useCallback(async (allianceId: string) => {
    useGameStore.setState({ loading: true, error: null });
    try {
      requireContract(ct.alliance, 'Alliance');
      const tx = await ct.alliance!.leaveAlliance(allianceId);
      await tx.wait();
      useGameStore.setState({ currentAlliance: null });
      useGameStore.getState().addSuccessToast(t('toast.alliance_left'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.alliance_leave_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 13. 踢出成员（仅盟主） ─── */
  const kickMember = useCallback(async (allianceId: string, member: string) => {
    useGameStore.setState({ loading: true, error: null });
    try {
      requireContract(ct.alliance, 'Alliance');
      const tx = await ct.alliance!.kickMember(allianceId, member);
      await tx.wait();
      useGameStore.getState().addSuccessToast(t('toast.member_kicked'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.member_kick_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 14. 解散联盟（仅盟主） ─── */
  const disbandAlliance = useCallback(async (allianceId: string) => {
    useGameStore.setState({ loading: true, error: null });
    try {
      requireContract(ct.alliance, 'Alliance');
      const tx = await ct.alliance!.disbandAlliance(allianceId);
      await tx.wait();
      useGameStore.setState({ currentAlliance: null });
      useGameStore.getState().addSuccessToast(t('toast.alliance_disbanded'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.alliance_disband_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 15. 捐献能量给图腾 ─── */
  const donateToTotem = useCallback(async (allianceId: string, amount: number) => {
    useGameStore.setState({ loading: true, error: null });
    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const tx = await ct.game!.donateToTotem(allianceId, amount);
      await tx.wait();
      useGameStore.getState().addSuccessToast(t('toast.donate_success'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.donate_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 15a. 升级图腾（仅盟主） ─── */
  const upgradeTotem = useCallback(async (allianceId: string) => {
    useGameStore.setState({ loading: true, error: null });
    try {
      requireContract(ct.game, 'SilentExpanseStrife');
      const tx = await ct.game!.upgradeTotem(allianceId);
      await tx.wait();
      useGameStore.getState().addSuccessToast(t('toast.totem_upgrade_success'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.totem_upgrade_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
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
    useGameStore.setState({ loading: true, error: null });
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
      useGameStore.getState().addSuccessToast(t('toast.order_created'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.order_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 18. 吃单买入能量 ───
   *     TODO: 调用者需传入 orderId, energyAmount (要买的能量数量), maxUnitPriceWei (最高单价 wei)
   *     如果 maxUnitPriceWei 传 0，则从订单自动计算单价并上浮 10% 作为最高价。
   */
  const fillEnergyOrder = useCallback(async (orderId: number, energyAmount: number, maxUnitPriceWei?: bigint) => {
    useGameStore.setState({ loading: true, error: null });
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
      useGameStore.getState().addSuccessToast(t('toast.order_filled'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.order_fill_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 19. 撤单 ─── */
  const cancelEnergyOrder = useCallback(async (orderId: number) => {
    useGameStore.setState({ loading: true, error: null });
    try {
      requireContract(ct.signer, 'Signer');
      const market = new Contract(GAME.ENERGY_MARKET!, ENERGY_MARKET_ABI, ct.signer);
      const tx = await market.cancelOrder(orderId);
      await tx.wait();
      useGameStore.getState().addSuccessToast(t('toast.order_cancelled'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.order_cancel_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
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

/** Safely extract error message from any thrown value */
function errMsg(e: unknown, fallback = 'Unknown error'): string {
  if (e instanceof Error) return e.message;
  if (typeof e === 'string') return e;
  try { return JSON.stringify(e); } catch { return fallback; }
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
    isRuins: Boolean(raw.isRuins ?? false),
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
