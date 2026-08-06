/**
 * useQueryRefresh — 基于 TanStack Query 的数据刷新层
 *
 * 合约连接时从链上拉取数据。
 * 所有独立 view 调用并行发出，单次轮询仅 1 RTT。
 */

import { useQuery } from '@tanstack/react-query';
import { formatEther, Contract } from 'ethers';
import { useGameStore } from './useGameStore';
import { useContract } from './useContract';
import { GAME } from '../utils/constants';
import { ENERGY_MARKET_ABI } from '../utils/contract';

// 连续轮询失败计数
const pollFailCount: Record<string, number> = {};

/**
 * useCivPolling — 合约模式下的周期性数据刷新
 *
 * 14 个独立 view 调用通过 Promise.allSettled 并行发出，
 * 每个调用独立 try/catch，单次失败不影响其他数据刷新。
 */
export function useCivPolling() {
  const ct = useContract();
  const connected = useGameStore(s => s.connected);
  const address = useGameStore(s => s.address);

  return useQuery({
    queryKey: ['civPolling', address],
    queryFn: async () => {
      if (!connected || !address || !ct.game || !ct.sesToken) {
        return null;
      }
      try {
        /* ─── 第 1 批：SilentExpanseStrife 全部独立 view 并行发出 ─── */
        const df = ct.game;
        const ses = ct.sesToken;

        const [civResult, balResult, tokResult, pendingResult,
               shResult, rateResult, durResult, boostResult,
              pendingCollectResult, defResult, speedResult, radarResult, atkResult, atkCostResult] = await Promise.allSettled([
          df.getCivilization(address),
          ses.balanceOf(address),
          df.getAttackTokenInfo(address),
          df.pendingCombatEnergy(address),
          Promise.allSettled([
            df.getCurrentShieldHP(address),
            df.getMaxShieldHP(address),
          ]),
          df.getEnergyCollectRate(address),
          df.getCollectorDurability(address),
          df.getCombatBoost(address),
          df.getPendingEnergy(address),
          df.getShieldDefense(address),
          df.getSpeed(address),
          df.getRadarRange(address),
          df.getAttackPower(address),
          df.getAttackEnergyCost(address),
        ]);

        /* ─── 解析结果 ─── */

        // 1. Civilization + SES balance
        if (civResult.status === 'fulfilled') {
          const raw = civResult.value;
          const civ = {
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
          useGameStore.setState({
            playerCiv: civ,
            isDestroyed: Boolean(raw.isRuins ?? false),
            // 链上 lastUpdateTime 只在采集时更新 (Admin.sol:49)，
            // 是 pending 采集估算的正确基准（秒 → ms，与 Date.now() 同单位）
            lastCollectTime: raw.lastUpdateTime ? Number(raw.lastUpdateTime) * 1000 : Date.now(),
          });
        }

        if (balResult.status === 'fulfilled') {
          const sesBalance = formatEther(balResult.value);
          useGameStore.setState({ sesBalance: (parseFloat(sesBalance)).toFixed(2) });
        }

        // 2. Attack token info
        if (tokResult.status === 'fulfilled') {
          const t = tokResult.value;
          const rateBig: bigint = t.ratePerSec ?? t[3] ?? 0n;
          useGameStore.setState({
            attackTokens: {
              current: Number(t.current ?? t[0] ?? 0),
              max: Number(t.max ?? t[1] ?? 5),
              intervalSec: Number(t.intervalSec ?? t[2] ?? 60),
              ratePerSec: Number(rateBig) / 1e18,
            },
          });
        }

        // 3. Pending combat energy
        if (pendingResult.status === 'fulfilled') {
          useGameStore.setState({ pendingEnergy: Number(pendingResult.value) });
        }

        // 4. Shield HP (子 Promise.allSettled)
        if (shResult.status === 'fulfilled') {
          const [cur, max] = shResult.value;
          if (cur.status === 'fulfilled' && max.status === 'fulfilled') {
            useGameStore.setState(s => ({
              playerCiv: s.playerCiv
                ? { ...s.playerCiv, shieldHP: Number(cur.value), maxShieldHP: Number(max.value) }
                : null,
            }));
          }
        }

        // 5. Energy collect rate (contract returns fixed-point ×1e6 → ÷1e6 for /s)
        if (rateResult.status === 'fulfilled') {
          useGameStore.setState({ collectRate: Number(rateResult.value) / 1e6 });
        }

        // 6. Collector durability
        if (durResult.status === 'fulfilled') {
          const d = durResult.value;
          useGameStore.setState({ collectorDurability: { current: Number(d[0]), max: Number(d[1]) } });
        }

        // 7. Combat boost
        if (boostResult.status === 'fulfilled') {
          useGameStore.setState({ combatBoost: Number(boostResult.value) });
        }

        // 8. Pending collectable energy (on-chain exact)
        if (pendingCollectResult.status === 'fulfilled') {
          useGameStore.setState({ pendingCollect: Number(pendingCollectResult.value) });
        }

        // 9. Shield defense / speed / radar range / attack power
        if (defResult.status === 'fulfilled') {
          useGameStore.setState({ shieldDefense: Number(defResult.value) });
        }
        if (speedResult.status === 'fulfilled') {
          useGameStore.setState({ speed: Number(speedResult.value) });
        }
        if (radarResult.status === 'fulfilled') {
          useGameStore.setState({ radarRange: Number(radarResult.value) });
        }
        if (atkResult.status === 'fulfilled') {
          useGameStore.setState({ attackPower: Number(atkResult.value) });
        }
        if (atkCostResult.status === 'fulfilled') {
          useGameStore.setState({ attackEnergyCost: Number(atkCostResult.value) });
        }

        /* ─── 第 2 批：DailyMinter — epoch 依赖链，分两批并行 ─── */
        if (ct.dailyMinter) {
          // 第 2a 批：epoch 值和分布式信息（无依赖）
          const [epochRes, distRes, emissionRes] = await Promise.allSettled([
            ct.dailyMinter.currentEpoch(),
            ct.dailyMinter.lastDistributedEpoch(),
            ct.dailyMinter.DAILY_EMISSION(),
          ]);

          if (emissionRes.status === 'fulfilled') {
            useGameStore.setState({ dailyEmission: Number(emissionRes.value) / 1e18 });
          }

          // 第 2b 批：依赖 epoch 结果
          if (epochRes.status === 'fulfilled') {
            const epoch = Number(epochRes.value);
            // getEpochInfo 返回 (epochIndex, totalEmissionWei, distributed)
            // 纪元起止时间需用 genesisTimestamp + DAY_SECONDS 计算
            const [genesisRes, daySecRes, claimedRes] = await Promise.allSettled([
              ct.dailyMinter!.genesisTimestamp(),
              ct.dailyMinter!.DAY_SECONDS(),
              ct.dailyMinter!.epochClaimed(epoch, address),
            ]);

            const genesis = genesisRes.status === 'fulfilled' ? Number(genesisRes.value) : 0;
            const daySec = daySecRes.status === 'fulfilled' ? Number(daySecRes.value) : 86400;

            useGameStore.setState({
              currentEpoch: epoch,
              lastDistributedEpoch: distRes.status === 'fulfilled' ? Number(distRes.value) : 0,
              epochStartTime: genesis + (epoch - 1) * daySec,
              epochEndTime: genesis + epoch * daySec,
              epochClaimed: claimedRes.status === 'fulfilled' ? claimedRes.value : false,
            });
          }
        }

        return { timestamp: Date.now() };
      } catch (e: any) {
        const errMsg = String(e?.message || e || '');
        let category = 'unknown';
        if (errMsg.includes('Failed to fetch') || errMsg.includes('NetworkError') || errMsg.includes('ERR_NETWORK')) {
          category = 'network';
        } else if (errMsg.includes('CALL_EXCEPTION') || errMsg.includes('missing revert data')) {
          category = 'contract';
        } else if (errMsg.includes('nonce too low') || errMsg.includes('already known')) {
          category = 'nonce';
        } else if (errMsg.includes('timeout')) {
          category = 'timeout';
        }

        pollFailCount[category] = (pollFailCount[category] || 0) + 1;
        const count = pollFailCount[category];

        if (count <= 2) {
          console.warn(`[civPolling] ${category} failure #${count}:`, e?.message || e);
        } else if (count === 10 || count % 50 === 0) {
          console.warn(`[civPolling] ${category}: ${count} consecutive failures`);
        }
        return null;
      }
    },
    refetchInterval: 5_000,
    enabled: connected && !!address && !!ct.game && !!ct.sesToken,
    meta: { isBackground: true },
  });
}

/* ══════════════════════════════════════════════════════════
   useAlliancePolling — 联盟数据轮询
   ══════════════════════════════════════════════════════════ */
export function useAlliancePolling() {
  const ct = useContract();
  const connected = useGameStore(s => s.connected);
  const address = useGameStore(s => s.address);

  return useQuery({
    queryKey: ['alliancePolling', address],
    queryFn: async () => {
      if (!connected || !address || !ct.alliance) return null;
      try {
        const allianceId: string = await ct.alliance.playerAlliance(address);
        const hasAlliance = allianceId && allianceId !== '0x' + '00'.repeat(32);

        if (!hasAlliance) {
          useGameStore.setState({ currentAlliance: null });
          return { inAlliance: false };
        }

        const [raw, members, cost, isLeader] = await Promise.all([
          ct.alliance.alliances(allianceId),
          ct.alliance.getAllianceMembers(allianceId),
          ct.alliance.totemUpgradeCost(allianceId),
          ct.alliance.isLeader(allianceId, address),
        ]);

        useGameStore.setState({
          currentAlliance: {
            id: allianceId,
            name: String(raw.name ?? ''),
            memberCount: Number(raw.memberCount ?? raw[3] ?? 0),
            level: Number(raw.level ?? raw[2] ?? 1),
          },
          _allianceMembers: members.slice(0, 10),
          _allianceTotemLevel: Number(raw.totemLevel ?? raw[6] ?? 0),
          _allianceTotemEnergy: Number(raw.totemEnergy ?? raw[7] ?? 0),
          _allianceTotemUpgradeCost: Number(cost),
          _allianceIsLeader: isLeader,
        });

        return { inAlliance: true };
      } catch {
        return null;
      }
    },
    refetchInterval: 10_000,
    enabled: connected && !!address && !!ct.alliance,
  });
}

/* ══════════════════════════════════════════════════════════
   useMarketPolling — 能量市场挂单轮询
   ══════════════════════════════════════════════════════════ */
export function useMarketPolling() {
  const ct = useContract();
  const address = useGameStore(s => s.address);

  return useQuery({
    queryKey: ['marketPolling'],
    queryFn: async () => {
      if (!GAME.ENERGY_MARKET || !ct.provider) return null;
      try {
        const market = new Contract(GAME.ENERGY_MARKET, ENERGY_MARKET_ABI, ct.provider);
        const orders: { id: number; price: number; amount: number; remaining: number; seller: string; isMine: boolean }[] = [];

        // 遍历 orders(id) 获取活跃挂单（remaining > 0）
        const count = Number(await market.getOrderCount());
        const maxScan = Math.min(count, 200);
        for (let i = 0; i < maxScan; i++) {
          try {
            const o = await market.orders(i);
            const remaining = Number(o.remaining ?? 0);
            if (remaining <= 0) continue; // 已成交/取消
            const sellerAddr = typeof o.seller === 'string' ? o.seller.toLowerCase() : '';
            if (!sellerAddr) continue;
            orders.push({
              id: i,
              amount: Number(o.energyAmount ?? 0),
              remaining,
              price: Number(o.sesPrice ?? 0) / 1e18,
              seller: sellerAddr.slice(0, 6) + '...' + sellerAddr.slice(-4),
              isMine: sellerAddr === (address || '').toLowerCase(),
            });
          } catch { /* skip invalid */ }
        }

        useGameStore.setState({ marketOrders: orders });
        return { count: orders.length };
      } catch {
        return null;
      }
    },
    refetchInterval: 15_000,
    enabled: !!GAME.ENERGY_MARKET && !!ct.provider,
  });
}
