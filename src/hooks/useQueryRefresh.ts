/**
 * useQueryRefresh — 基于 TanStack Query 的数据刷新层
 *
 * 合约连接时从链上拉取数据。
 */

import { useQuery } from '@tanstack/react-query';
import { formatEther } from 'ethers';
import { useGameStore } from './useGameStore';
import { useContract } from './useContract';

// 连续轮询失败计数（每类错误独立计数，模块级避免污染 store type）
const pollFailCount: Record<string, number> = {};

/**
 * useCivPolling — 合约模式下的周期性数据刷新
 *
 * 定时拉取玩家文明数据和 DFT 余额。
 */
export function useCivPolling() {
  const ct = useContract();
  const connected = useGameStore(s => s.connected);
  const address = useGameStore(s => s.address);

  return useQuery({
    queryKey: ['civPolling', address],
    queryFn: async () => {
      if (!connected || !address || !ct.darkForest || !ct.dftToken) {
        return null;
      }
      try {
        const [raw, balanceRaw] = await Promise.all([
          ct.darkForest.getCivilization(address),
          ct.dftToken.balanceOf(address),
        ]);
        const civ = {
          name: String(raw.name ?? ''),
          x: Number(raw.x ?? raw.location?.x ?? 0),
          y: Number(raw.y ?? raw.location?.y ?? 0),
          z: Number(raw.z ?? raw.location?.z ?? 0),
          energy: Number(raw.energy ?? 0),
          health: Number(raw.health ?? 0),
          shieldHP: 0,           // from getCurrentShieldHP() below
          maxShieldHP: 0,        // from getMaxShieldHP() below
          energyCollectorLv: Number(raw.energyCollectorLv ?? 1),
          weaponLv: Number(raw.weaponLv ?? 1),
          radarLv: Number(raw.radarLv ?? 1),
          shieldLv: Number(raw.shieldLv ?? 1),
          engineLv: Number(raw.engineLv ?? 1),
          scanRange: Number(raw.scanRange ?? 1000),
          isRuins: Boolean(raw.isRuins ?? false),
        };
        const dftBalance = formatEther(balanceRaw);

        useGameStore.setState({
          playerCiv: civ,
          dftBalance: (parseFloat(dftBalance)).toFixed(2),
        });

        // Also try to read attack token info
        try {
          const tokRaw = await ct.darkForest.getAttackTokenInfo(address);
          // rate 是 18 位定点数 (uint256 × 1e18)，需除以 1e18
          const rateBig: bigint = tokRaw.ratePerSec ?? tokRaw[3] ?? 0n;
          useGameStore.setState({
            attackTokens: {
              current: Number(tokRaw.current ?? tokRaw[0] ?? 0),
              max: Number(tokRaw.max ?? tokRaw[1] ?? 5),
              intervalSec: Number(tokRaw.intervalSec ?? tokRaw[2] ?? 60),
              ratePerSec: Number(rateBig) / 1e18,
            },
          });
        } catch { /* ignore */ }

        // Try to read pending combat energy
        try {
          const pendingRaw = await ct.darkForest.pendingCombatEnergy(address);
          useGameStore.setState({ pendingEnergy: Number(pendingRaw) });
        } catch { /* ignore */ }

        // Try to read shield HP
        try {
          const [shieldHP, maxShieldHP] = await Promise.all([
            ct.darkForest.getCurrentShieldHP(address),
            ct.darkForest.getMaxShieldHP(address),
          ]);
          useGameStore.setState(s => ({
            playerCiv: s.playerCiv ? { ...s.playerCiv, shieldHP: Number(shieldHP), maxShieldHP: Number(maxShieldHP) } : null,
          }));
        } catch { /* ignore */ }

        // Set isDestroyed from civ data
        useGameStore.setState({ isDestroyed: Boolean(raw.isRuins ?? false) });

        // Try to read energy collect rate
        try {
          const rate = await ct.darkForest.getEnergyCollectRate(address);
          useGameStore.setState({ collectRate: Number(rate) });
        } catch { /* ignore */ }

        // Try to read collector durability
        try {
          const dur = await ct.darkForest.getCollectorDurability(address);
          useGameStore.setState({ collectorDurability: { current: Number(dur[0]), max: Number(dur[1]) } });
        } catch { /* ignore */ }

        // Try to read combat boost (alliance totem bonus)
        try {
          const boost = await ct.darkForest.getCombatBoost(address);
          useGameStore.setState({ combatBoost: Number(boost) });
        } catch { /* ignore */ }

        // Try to read DailyMinter epoch info
        if (ct.dailyMinter) {
          try {
            const epoch = Number(await ct.dailyMinter.currentEpoch());
            const lastDistributed = Number(await ct.dailyMinter.lastDistributedEpoch());
            const epochInfo = await ct.dailyMinter.getEpochInfo(epoch);
            const claimed = await ct.dailyMinter.epochClaimed(epoch, address);
            // epochInfo: (startTimestamp, endTimestamp, distributed)
            useGameStore.setState({
              currentEpoch: epoch,
              lastDistributedEpoch: lastDistributed,
              epochStartTime: Number(epochInfo[0]),
              epochEndTime: Number(epochInfo[1]),
              epochClaimed: claimed,
            });
          } catch { /* daily minter not available or read error */ }

          // Read daily DFT emission
          try {
            const emission = await ct.dailyMinter.DAILY_EMISSION();
            useGameStore.setState({ dailyEmission: Number(emission) / 1e18 });
          } catch { /* ignore */ }
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

        // 首次警告详细日志，后续仅记录计数
        if (count <= 2) {
          console.warn(`[civPolling] ${category} failure #${count}:`, e?.message || e);
        } else if (count === 10 || count % 50 === 0) {
          console.warn(`[civPolling] ${category}: ${count} consecutive failures`);
        }
        return null;
      }
    },
    refetchInterval: 5_000, // 每 5 秒轮询
    enabled: connected && !!address && !!ct.darkForest && !!ct.dftToken,
    meta: { isBackground: true },
  });
}
