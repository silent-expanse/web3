import { useCallback } from 'react';
import { parseEther, formatEther, Contract } from 'ethers';
import { useGameStore } from './useGameStore';
import { useContract } from './useContract';
import { SYSTEMS, type SystemKey } from '../utils/constants';
import { GAME } from '../utils/constants';
import { ENERGY_MARKET_ABI } from '../utils/contract';
import { t } from '../i18n';

/* ══════════════════════════════════════════════════════════
   数值公式（与 BSC 主网合约 DarkForestStorage 一致）
   验证：cast call 0x96ee... SYS_* / BASE_* / _calc*
   ══════════════════════════════════════════════════════════ */

/** 能量采集速率 (energy/sec): lv≤1 ? 3 : 3 + 10·√(lv-1) */
export function calcCollectRate(lv: number): number {
  if (lv <= 1) return GAME.BASE_COLLECT;
  return GAME.BASE_COLLECT + GAME.COLLECT_BONUS * Math.sqrt(lv - 1);
}

/** 攻击力: 900 + 10·√(lv-1)  (ATK_BASE=900, ATK_RATE=10) */
export function calcAttackPower(lv: number): number {
  return GAME.ATK_BASE + GAME.ATK_RATE * Math.sqrt(Math.max(0, lv - 1));
}

/** 防御力: 540 + 6·√(lv-1)  (DEF_BASE=540, DEF_RATE=6) */
export function calcShieldDefense(lv: number): number {
  return GAME.DEF_BASE + GAME.DEF_RATE * Math.sqrt(Math.max(0, lv - 1));
}

/** 雷达探测范围: 1000 + 150·L + 5·L² */
export function calcRadarRange(lv: number): number {
  return GAME.RADAR_BASE + GAME.RADAR_LINEAR * lv + GAME.RADAR_QUAD * lv * lv;
}

/** 护盾 HP: 3600 + 15·√(lv-1)  (SHIELD_HP_BASE=3600, SHIELD_HP_RATE=15) */
export function calcMaxShieldHP(lv: number): number {
  return GAME.SHIELD_HP_BASE + GAME.SHIELD_HP_RATE * Math.sqrt(Math.max(0, lv - 1));
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
    requireContract(ct.darkForest, 'DarkForest');
    const feeWei = await ct.darkForest!.getEntryFee();
    return formatEther(feeWei);
  }, [ct]);

  /* ─── 0a. 创建文明 ─── */
  const createCivilization = useCallback(
    async (name: string, referrer?: string): Promise<boolean> => {
      requireContract(ct.darkForest, 'DarkForest');
      requireContract(ct.signer, 'Signer');
      useGameStore.setState({ loading: true, error: null });

      try {
        const feeWei = await ct.darkForest!.getEntryFee();
        const overrides = { value: feeWei };

        let tx;
        if (referrer && /^0x[0-9a-fA-F]{40}$/.test(referrer.trim())) {
          tx = await ct.darkForest!.createCivilization(name.trim(), referrer.trim(), overrides);
        } else {
          tx = await ct.darkForest!.createCivilization(name.trim(), overrides);
        }
        await tx.wait();

        const addr = await ct.signer!.getAddress();
        const raw = await ct.darkForest!.getCivilization(addr);
        const civ = parseCivData(raw);
        useGameStore.setState({
          connected: true,
          address: addr,
          playerCiv: civ,
          entryFee: formatEther(feeWei),
          lastCollectTime: Date.now(),
        });

        useGameStore.getState().claimDFT();
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
      requireContract(ct.darkForest, 'DarkForest');
      requireContract(ct.dftToken, 'DFT Token');
      useGameStore.setState({ loading: true, error: null });

      try {
        const df = ct.darkForest!;
        const dft = ct.dftToken!;
        const addr = await getAddress();

        // 从合约读取真实升级成本
        const realCost = await df.getUpgradeCost(addr, SYS_TO_CONTRACT[system]);
        const costDFT = Number(realCost.dft) / 1e18;
        const costEnergy = Number(realCost.energy);

        const dftBalance = parseFloat(store.dftBalance);
        const energy = store.playerCiv.energy;

        if (dftBalance < costDFT) {
          useGameStore.setState({
            loading: false,
            error: t('toast.dft_insufficient', { need: costDFT.toFixed(2), have: dftBalance.toFixed(2) }),
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

        const tx = await df.upgradeSystem(SYS_IDS[system]);
        await tx.wait();

        // 刷新链上数据
        const civ = await df.getCivilization(addr);
        useGameStore.setState({
          playerCiv: { ...store.playerCiv!, ...parseCivData(civ) },
          dftBalance: formatBalance(await dft.balanceOf(addr)),
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
      requireContract(ct.darkForest, 'DarkForest');
      const tx = await ct.darkForest!.attack(store.selectedTarget);
      await tx.wait();
      const addr = await getAddress();
      const civ = await ct.darkForest!.getCivilization(addr);
      useGameStore.setState({
        playerCiv: { ...store.playerCiv, ...parseCivData(civ) },
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
      requireContract(ct.darkForest, 'DarkForest');
      const tx = await ct.darkForest!.collectEnergy();
      await tx.wait();
      const addr = await getAddress();
      const data = await ct.darkForest!.getCivilization(addr);
      useGameStore.setState(s => ({
        playerCiv: s.playerCiv ? { ...s.playerCiv, ...parseCivData(data) } : null,
        lastCollectTime: Date.now(),
      }));
      useGameStore.getState().addSuccessToast(t('toast.collect_success', { amount: Math.floor(calcCollectRate(data.energyCollectorLv ?? 1) * 10) }));
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
      requireContract(ct.darkForest, 'DarkForest');
      const tx = await ct.darkForest!.claimCombatEnergy();
      await tx.wait();
      const addr = await getAddress();
      const civ = await ct.darkForest!.getCivilization(addr);
      const pending = await ct.darkForest!.pendingCombatEnergy(addr);
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

  /* ─── 5. 领取每日 DFT ─── */
  const claimDailyDFT = useCallback(async () => {
    useGameStore.setState({ loading: true, error: null });

    try {
      requireContract(ct.dailyMinter, 'DailyMinter');
      requireContract(ct.dftToken, 'DFT Token');

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
        dftBalance: formatBalance(await ct.dftToken!.balanceOf(addr)),
      });
      useGameStore.getState().claimDFT();
      useGameStore.getState().addSuccessToast(t('toast.claim_dft_success'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.claim_dft_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 6. 巡航移动 ─── */
  const startMove = useCallback(
    async (x: number, y: number, z: number) => {
      useGameStore.setState({ loading: true, error: null });
      try {
        requireContract(ct.darkForest, 'DarkForest');
        const tx = await ct.darkForest!.startMove(x, y, z);
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
      requireContract(ct.darkForest, 'DarkForest');
      const tx = await ct.darkForest!.spaceJump();
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
      requireContract(ct.darkForest, 'DarkForest');
      const tx = await ct.darkForest!.rebuildCivilization();
      await tx.wait();
      // 重建后刷新文明数据
      const addr = await getAddress();
      const raw = await ct.darkForest!.getCivilization(addr);
      useGameStore.setState({
        playerCiv: { ...useGameStore.getState().playerCiv!, ...parseCivData(raw) },
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
      requireContract(ct.darkForest, 'DarkForest');
      const tx = await ct.darkForest!.repairCollector(amount);
      await tx.wait();
      // 刷新耐久度
      const addr = await getAddress();
      const dur = await ct.darkForest!.getCollectorDurability(addr);
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
    const maxHP = store.playerCiv.maxShieldHP || calcMaxShieldHP(store.playerCiv.shieldLv);
    if (store.playerCiv.shieldHP >= maxHP) return;
    useGameStore.setState({ loading: true, error: null });

    try {
      requireContract(ct.darkForest, 'DarkForest');
      const repairAmount = maxHP - store.playerCiv.shieldHP;
      const tx = await ct.darkForest!.repairShield(repairAmount);
      await tx.wait();
      const addr = await getAddress();
      const hp = await ct.darkForest!.getCurrentShieldHP(addr);
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
      requireContract(ct.darkForest, 'DarkForest');
      const tx = await ct.darkForest!.regenShield();
      await tx.wait();
      const addr = await getAddress();
      const hp = await ct.darkForest!.getCurrentShieldHP(addr);
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
      requireContract(ct.darkForest, 'DarkForest');
      const tx = await ct.darkForest!.repairAll();
      await tx.wait();
      const addr = await getAddress();
      const civ = await ct.darkForest!.getCivilization(addr);
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
      requireContract(ct.darkForest, 'DarkForest');
      const tx = await ct.darkForest!.cancelMove();
      await tx.wait();
      const addr = await getAddress();
      const pos = await ct.darkForest!.getCurrentPosition(addr);
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
  /** 从合约读取玩家的当前联盟并更新 store */
  const refreshMyAlliance = useCallback(async () => {
    if (!ct.alliance) return;
    const addr = await getAddress();
    // 交易刚确认后 RPC 读节点可能尚未同步，最多重试 3 次
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        if (attempt > 0) await new Promise(r => setTimeout(r, 1000 * attempt));
        const allianceId: string = await ct.alliance.playerAlliance(addr);
        if (allianceId && allianceId !== '0x' + '00'.repeat(32)) {
          const raw = await ct.alliance.alliances(allianceId);
          useGameStore.setState({
            currentAlliance: {
              id: allianceId,
              name: String(raw.name ?? ''),
              memberCount: Number(raw.memberCount ?? raw[3] ?? 0),
              level: Number(raw.level ?? raw[2] ?? 1),
            },
          });
        } else {
          useGameStore.setState({ currentAlliance: null });
        }
        return; // 成功即退出
      } catch (e) {
        if (attempt === 2) console.warn('[refreshMyAlliance] failed after 3 retries:', e);
      }
    }
  }, [ct]);

  const createAlliance = useCallback(async (name: string) => {
    if (!name.trim()) return;
    useGameStore.setState({ loading: true, error: null });
    try {
      requireContract(ct.alliance, 'Alliance');
      const tx = await ct.alliance!.createAlliance(name.trim());
      await tx.wait();
      await refreshMyAlliance();
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
      requireContract(ct.dftToken, 'DFT Token');
      const tx = await ct.alliance!.claimRefund();
      await tx.wait();
      const addr = await getAddress();
      useGameStore.setState({
        dftBalance: formatBalance(await ct.dftToken!.balanceOf(addr)),
        pendingRefund: 0,
      });
      await refreshMyAlliance();
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
      await refreshMyAlliance();
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
      await refreshMyAlliance();
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
      requireContract(ct.darkForest, 'DarkForest');
      const tx = await ct.darkForest!.donateToTotem(allianceId, amount);
      await tx.wait();
      await refreshMyAlliance();
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
      requireContract(ct.darkForest, 'DarkForest');
      const tx = await ct.darkForest!.upgradeTotem(allianceId);
      await tx.wait();
      await refreshMyAlliance();
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
  const createEnergyOrder = useCallback(async (energyAmount: number, dftPrice: number) => {
    useGameStore.setState({ loading: true, error: null });
    try {
      requireContract(ct.signer, 'Signer');
      if (!GAME.ENERGY_MARKET) throw new Error('ENERGY_MARKET address not configured');
      const market = new Contract(GAME.ENERGY_MARKET, ENERGY_MARKET_ABI, ct.signer);
      const tx = await market.createOrder(energyAmount, parseEther(String(dftPrice)));
      await tx.wait();
      if (ct.darkForest) {
        const addr = await getAddress();
        const civ = await ct.darkForest.getCivilization(addr);
        useGameStore.setState({ playerCiv: { ...useGameStore.getState().playerCiv!, energy: Number(civ.energy ?? civ[2] ?? 0) } as never });
      }
      useGameStore.getState().addSuccessToast(t('toast.order_created'));
    } catch (e) {
      useGameStore.getState().addErrorToast(t('toast.order_failed', { msg: errMsg(e) }));
    } finally {
      useGameStore.setState({ loading: false });
    }
  }, [ct]);

  /* ─── 18. 吃单买入能量 ─── */
  const fillEnergyOrder = useCallback(async (orderId: number, maxPrice: number) => {
    useGameStore.setState({ loading: true, error: null });
    try {
      requireContract(ct.signer, 'Signer');
      const market = new Contract(GAME.ENERGY_MARKET!, ENERGY_MARKET_ABI, ct.signer);
      const tx = await market.fillOrder(orderId, parseEther(String(maxPrice)));
      await tx.wait();
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
    claimDailyDFT,
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

/** Parse getCivilization() raw tuple into civilized store shape */
export function civFromRaw(raw: any) {
  return {
    name: String(raw.name ?? ''),
    x: Number(raw.x ?? raw.location?.x ?? 0),
    y: Number(raw.y ?? raw.location?.y ?? 0),
    z: Number(raw.z ?? raw.location?.z ?? 0),
    energy: Number(raw.energy ?? 0),
    health: Number(raw.health ?? 0),
    shieldHP: 0,
    maxShieldHP: 0,
    energyCollectorLv: Number(raw.energyCollectorLv ?? 1),
    weaponLv: Number(raw.weaponLv ?? 1),
    radarLv: Number(raw.radarLv ?? 1),
    shieldLv: Number(raw.shieldLv ?? 1),
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
