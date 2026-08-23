/**
 * useQueryRefresh — 基于 TanStack Query 的数据刷新层
 *
 * 合约连接时从链上拉取数据。
 * 所有独立 view 调用并行发出，单次轮询仅 1 RTT。
 * #82 单次轮询聚合为一次 setState（避免多轮重渲）
 * #87 市场 orders 用 Multicall3 批量拉取
 * #55/#53 战报同步：getBattleHistory → 入 store 并检测被攻击
 * #29 同步健康：recent successful poll → lastSyncAt
 * #86 页面失焦自动暂停（refetchIntervalInBackground: false）
 */

import { useQuery } from '@tanstack/react-query';
import { formatEther, Contract } from 'ethers';
import { useGameStore, type BattleEvent } from './useGameStore';
import { useContract } from './useContract';
import { GAME } from '../utils/constants';
import { ENERGY_MARKET_ABI } from '../utils/contract';
import { fetchOrdersBatch } from '../utils/multicall';

// 连续轮询失败计数
const pollFailCount: Record<string, number> = {};

/**
 * useCivPolling — 合约模式下的周期性数据刷新
 *
 * 14+ 个独立 view 调用通过 Promise.allSettled 并行发出，
 * 每个调用独立 try/catch，单次失败不影响其他数据刷新。
 * #82 解析后收集到 patch 对象，最终一次性 setState。
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
              pendingCollectResult, defResult, speedResult, radarResult, atkResult, atkCostResult,
              posResult, battleResult] = await Promise.allSettled([
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
          df.getCurrentPosition(address),
          // #53 battle log: global history (cheap — small limit)
          df.getBattleHistory ? df.getBattleHistory(0, 20).catch(() => []) : Promise.resolve([]),
        ]);

        /* ─── #82 收集 patch，最终单次 setState ─── */
        const patch: Record<string, unknown> = {};
        // 用于 setState 回调中的合并（如 playerCiv 细粒度更新）→ 先收集，再最后合并
        let shieldHP: number | null = null;
        let shieldMax: number | null = null;
        let civMove: boolean | null = null;
        let civMoveEta: number | null = null;

        // 1. Civilization + isDestroyed
        let civTmp: Record<string, unknown> | null = null;
        if (civResult.status === 'fulfilled') {
          const raw = civResult.value as Record<string, unknown>;
          civTmp = {
            name: String((raw as { name?: unknown }).name ?? ''),
            x: Number((raw as { x?: unknown; location?: { x: unknown } }).x ?? (raw as { location?: { x: unknown } }).location?.x ?? 0),
            y: Number((raw as { y?: unknown; location?: { y: unknown } }).y ?? (raw as { location?: { y: unknown } }).location?.y ?? 0),
            z: Number((raw as { z?: unknown; location?: { z: unknown } }).z ?? (raw as { location?: { z: unknown } }).location?.z ?? 0),
            energy: Number((raw as { energy?: unknown }).energy ?? 0),
            health: Number((raw as { health?: unknown }).health ?? 0),
            shieldHP: 0,
            maxShieldHP: 0,
            energyCollectorLv: Number((raw as { energyCollectorLv?: unknown }).energyCollectorLv ?? 1),
            weaponLv: Number((raw as { weaponLv?: unknown }).weaponLv ?? 1),
            radarLv: Number((raw as { radarLv?: unknown }).radarLv ?? 1),
            shieldLv: Number((raw as { shieldLv?: unknown }).shieldLv ?? 1),
            engineLv: Number((raw as { engineLv?: unknown }).engineLv ?? 1),
            scanRange: Number((raw as { scanRange?: unknown }).scanRange ?? 1000),
            isRuins: Boolean((raw as { isRuins?: unknown }).isRuins ?? false),
            isMoving: false,
          };
          (patch as Record<string, unknown>).playerCiv = civTmp;
          (patch as Record<string, unknown>).isDestroyed = Boolean((raw as { isRuins?: unknown }).isRuins ?? false);
          const lut = (raw as { lastUpdateTime?: unknown }).lastUpdateTime;
          (patch as Record<string, unknown>).lastCollectTime = lut ? Number(lut) * 1000 : Date.now();
        }

        if (balResult.status === 'fulfilled') {
          const sesBalance = formatEther(balResult.value as bigint);
          patch.sesBalance = (parseFloat(sesBalance)).toFixed(2);
        }

        // 2. Attack token info
        if (tokResult.status === 'fulfilled') {
          const t = tokResult.value as Record<string, unknown>;
          const rateBig: bigint = (t.ratePerSec as bigint) ?? (t as unknown as bigint[])[3] ?? 0n;
          patch.attackTokens = {
            current: Number((t.current as number) ?? (t as unknown as unknown[])[0] ?? 0),
            max: Number((t.max as number) ?? (t as unknown as unknown[])[1] ?? 5),
            intervalSec: Number((t.intervalSec as number) ?? (t as unknown as unknown[])[2] ?? 60),
            ratePerSec: Number(rateBig) / 1e18,
          };
        }

        // 3. Pending combat energy
        if (pendingResult.status === 'fulfilled') {
          patch.pendingEnergy = Number(pendingResult.value as bigint | number);
        }

        // 4. Shield HP (子 Promise.allSettled)
        if (shResult.status === 'fulfilled') {
          const [cur, max] = (shResult.value as PromiseSettledResult<unknown>[]) as [
            PromiseSettledResult<bigint | number>,
            PromiseSettledResult<bigint | number>,
          ];
          if (cur.status === 'fulfilled' && max.status === 'fulfilled') {
            shieldHP = Number(cur.value);
            shieldMax = Number(max.value);
          }
        }

        // 5. Energy collect rate (fixed-point ×1e6)
        if (rateResult.status === 'fulfilled') {
          patch.collectRate = Number(rateResult.value as bigint | number) / 1e6;
        }

        // 6. Collector durability
        if (durResult.status === 'fulfilled') {
          const d = durResult.value as [bigint | number, bigint | number];
          patch.collectorDurability = { current: Number(d[0]), max: Number(d[1]) };
        }

        // 6b. Position / movement
        if (posResult.status === 'fulfilled') {
          const p = posResult.value as Record<string | number, unknown>;
          civMove = Boolean((p as Record<string, unknown>)[1] ?? (p as { isMoving?: unknown }).isMoving ?? false);
          civMoveEta = Number((p as Record<string, unknown>)[2] ?? (p as { eta?: unknown }).eta ?? 0);
        }

        // 7. Combat boost
        if (boostResult.status === 'fulfilled') {
          patch.combatBoost = Number(boostResult.value as number);
        }

        // 8. Pending collectable energy
        if (pendingCollectResult.status === 'fulfilled') {
          patch.pendingCollect = Number(pendingCollectResult.value as number);
        }

        // 9. Shield defense / speed / radar / attack
        if (defResult.status === 'fulfilled') patch.shieldDefense = Number(defResult.value as number);
        if (speedResult.status === 'fulfilled') patch.speed = Number(speedResult.value as number);
        if (radarResult.status === 'fulfilled') patch.radarRange = Number(radarResult.value as number);
        if (atkResult.status === 'fulfilled') patch.attackPower = Number(atkResult.value as number);
        if (atkCostResult.status === 'fulfilled') patch.attackEnergyCost = Number(atkCostResult.value as number);

        // #55/#53 battle history → BattleEvent[] + incoming detection
        if (battleResult.status === 'fulfilled') {
          const rawList = (battleResult.value as unknown[]) ?? [];
          const next: BattleEvent[] = rawList.map((r: unknown) => {
            const rec = r as Record<string, unknown>;
            return {
              attacker: String(rec.attacker ?? ''),
              defender: String(rec.defender ?? ''),
              timestamp: Number(rec.timestamp ?? 0),
              damageDealt: Number(rec.damageDealt ?? 0),
              shieldDamage: Number(rec.shieldDamage ?? rec.shieldDmg ?? 0),
              healthDamage: Number(rec.healthDamage ?? rec.healthDmg ?? 0),
              stolenEnergy: Number(rec.stolenEnergy ?? 0),
              downgradedSystem: String(rec.downgradedSystem ?? ''),
              won: Boolean(rec.attackerWon ?? rec.won ?? false),
            };
          }).filter(b => b.attacker && b.defender);
          if (next.length > 0) {
            const prevLen = useGameStore.getState().battleLog.length;
            patch.battleLog = next;
            patch.battleCount = next.length;
            // #55 incoming alert: new battles where I am defender
            if (prevLen > 0 && next.length > prevLen) {
              const me = address.toLowerCase();
              const newcomers = next.slice(0, next.length - prevLen);
              for (const b of newcomers) {
                if (b.defender.toLowerCase() === me) {
                  // 异步 toast，不阻塞 patch
                  setTimeout(() => {
                    const shortAtk = b.attacker.slice(0, 6) + '...' + b.attacker.slice(-4);
                    useGameStore.getState().addToast(`${shortAtk} 攻击了你，掠夺 ${b.stolenEnergy} 能量`, 'error');
                  }, 0);
                  break;
                }
              }
            }
          }
        }

        // 合并 shield + movement 到 playerCiv（如已有）
        if (civTmp !== null) {
          if (shieldHP !== null && shieldMax !== null) {
            (civTmp as Record<string, unknown>).shieldHP = shieldHP;
            (civTmp as Record<string, unknown>).maxShieldHP = shieldMax;
          }
          if (civMove !== null) {
            (civTmp as Record<string, unknown>).isMoving = civMove;
          }
          patch.playerCiv = civTmp;
          patch.moveEta = civMoveEta ?? 0;
        } else {
          // 没有 civ 刷新，单独补丁 shield/movement（如已有 civ）
          if (shieldHP !== null || shieldMax !== null || civMove !== null) {
            const cur = useGameStore.getState().playerCiv;
            if (cur) {
              const nextCiv: Record<string, unknown> = { ...cur as unknown as Record<string, unknown> };
              if (shieldHP !== null) nextCiv.shieldHP = shieldHP;
              if (shieldMax !== null) nextCiv.maxShieldHP = shieldMax;
              if (civMove !== null) nextCiv.isMoving = civMove;
              patch.playerCiv = nextCiv as never;
            }
            if (civMoveEta !== null) patch.moveEta = civMoveEta;
          }
        }

        // #29 同步健康心跳
        patch.lastSyncAt = Date.now();

        // #82 单次写入
        useGameStore.setState(patch as never);

        /* ─── 第 2 批：DailyMinter ─── */
        if (ct.dailyMinter) {
          const [epochRes, distRes, emissionRes] = await Promise.allSettled([
            ct.dailyMinter.currentEpoch(),
            ct.dailyMinter.lastDistributedEpoch(),
            ct.dailyMinter.DAILY_EMISSION(),
          ]);

          if (emissionRes.status === 'fulfilled') {
            useGameStore.setState({ dailyEmission: Number(emissionRes.value as bigint | number) / 1e18 } as never);
          }

          if (epochRes.status === 'fulfilled') {
            const epoch = Number(epochRes.value as bigint | number);
            const [genesisRes, daySecRes, claimedRes] = await Promise.allSettled([
              ct.dailyMinter!.genesisTimestamp(),
              ct.dailyMinter!.DAY_SECONDS(),
              ct.dailyMinter!.epochClaimed(epoch, address),
            ]);

            const genesis = genesisRes.status === 'fulfilled' ? Number(genesisRes.value as number) : 0;
            const daySec = daySecRes.status === 'fulfilled' ? Number(daySecRes.value as number) : 86400;

            useGameStore.setState({
              currentEpoch: epoch,
              lastDistributedEpoch: distRes.status === 'fulfilled' ? Number(distRes.value as number) : 0,
              epochStartTime: genesis + (epoch - 1) * daySec,
              epochEndTime: genesis + epoch * daySec,
              epochClaimed: claimedRes.status === 'fulfilled' ? (claimedRes.value as boolean) : false,
            } as never);
          }
        }

        return { timestamp: Date.now() };
      } catch (e: unknown) {
        const err = e as { message?: string };
        const errMsg = String(err?.message || e || '');
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
          console.warn(`[civPolling] ${category} failure #${count}:`, (err as { message?: string })?.message || e);
        } else if (count === 10 || count % 50 === 0) {
          console.warn(`[civPolling] ${category}: ${count} consecutive failures`);
        }
        return null;
      }
    },
    refetchInterval: 5_000,
    refetchIntervalInBackground: false,
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
          useGameStore.setState({ currentAlliance: null } as never);
          return { inAlliance: false };
        }

        const [raw, members, cost, isLeader, pendingRefund] = await Promise.all([
          ct.alliance.alliances(allianceId),
          ct.alliance.getAllianceMembers(allianceId),
          ct.alliance.totemUpgradeCost(allianceId),
          ct.alliance.isLeader(allianceId, address),
          ct.alliance.pendingRefunds(address),
        ]);

        useGameStore.setState({
          currentAlliance: {
            id: allianceId,
            name: String((raw as Record<string, unknown>).name ?? ''),
            memberCount: Number((raw as Record<string, unknown>).memberCount ?? (raw as unknown as unknown[])[3] ?? 0),
            level: Number((raw as Record<string, unknown>).level ?? (raw as unknown as unknown[])[2] ?? 1),
          },
          _allianceMembers: (members as string[]).slice(0, 20),
          _allianceTotemLevel: Number((raw as Record<string, unknown>).totemLevel ?? (raw as unknown as unknown[])[6] ?? 0),
          _allianceTotemEnergy: Number((raw as Record<string, unknown>).totemEnergy ?? (raw as unknown as unknown[])[7] ?? 0),
          _allianceTotemUpgradeCost: Number(cost as number),
          _allianceIsLeader: isLeader as boolean,
          _allianceLeader: String((raw as Record<string, unknown>).leader ?? (raw as unknown as unknown[])[1] ?? ''),
          _alliancePendingRefund: Number(pendingRefund as number),
        } as never);

        return { inAlliance: true };
      } catch {
        return null;
      }
    },
    refetchInterval: 10_000,
    refetchIntervalInBackground: false,
    enabled: connected && !!address && !!ct.alliance,
  });
}

/* ══════════════════════════════════════════════════════════
   useMarketPolling — 能量市场挂单轮询（#87 Multicall3 批量）
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
        const count = Number(await market.getOrderCount());
        const maxScan = Math.min(count, 200);

        type OrderRow = { id: number; price: number; amount: number; remaining: number; seller: string; isMine: boolean };
        const orders: OrderRow[] = [];
        const myAddr = (address || '').toLowerCase();

        // #87 优先 Multicall3 批量拉取
        let batch = await fetchOrdersBatch(ct.provider as unknown as import('ethers').Provider, GAME.ENERGY_MARKET, maxScan);
        if (batch) {
          for (let i = 0; i < batch.length; i++) {
            const o = batch[i] as unknown as Record<string, unknown> | null;
            if (!o) continue;
            const remaining = Number((o.remaining as number) ?? (o as unknown as unknown[])[3] ?? 0);
            if (remaining <= 0) continue;
            const sellerRaw = (o.seller as string) ?? (o as unknown as unknown[])[1] ?? '';
            const sellerAddr = typeof sellerRaw === 'string' ? (sellerRaw as string).toLowerCase() : '';
            if (!sellerAddr) continue;
            const eAmt = Number((o.energyAmount as number) ?? (o as unknown as unknown[])[0] ?? 0);
            const sPrice = Number((o.sesPrice as bigint | number) ?? (o as unknown as unknown[])[2] ?? 0);
            orders.push({
              id: i,
              amount: eAmt,
              remaining,
              price: Number(sPrice) / 1e18 / Math.max(eAmt, 1),
              seller: (sellerAddr as string).slice(0, 6) + '...' + (sellerAddr as string).slice(-4),
              isMine: sellerAddr === myAddr,
            });
          }
        } else {
          // 回落：逐个 RPC（限流批次）
          for (let i = 0; i < maxScan; i++) {
            try {
              const o = (await market.orders(i)) as Record<string, unknown>;
              const remaining = Number((o.remaining as number) ?? 0);
              if (remaining <= 0) continue;
              const sellerAddr = typeof o.seller === 'string' ? (o.seller as string).toLowerCase() : '';
              if (!sellerAddr) continue;
              const eAmt = Number((o.energyAmount as number) ?? 0);
              const sPrice = Number((o.sesPrice as bigint | number) ?? 0);
              orders.push({
                id: i,
                amount: eAmt,
                remaining,
                price: Number(sPrice) / 1e18 / Math.max(eAmt, 1),
                seller: (sellerAddr as string).slice(0, 6) + '...' + (sellerAddr as string).slice(-4),
                isMine: sellerAddr === myAddr,
              });
            } catch { /* skip invalid */ }
          }
        }

        useGameStore.setState({ marketOrders: orders } as never);
        return { count: orders.length };
      } catch {
        return null;
      }
    },
    refetchInterval: 15_000,
    refetchIntervalInBackground: false,
    enabled: !!GAME.ENERGY_MARKET && !!ct.provider,
  });
}
