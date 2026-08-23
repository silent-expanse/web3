/**
 * multicall — BSC Multicall3 辅助（#87 消市场轮询 N+1）
 *
 * BSC 上 Multicall3 已部署于 0xcA11bde05977b3631167028862bE2a173976CA11。
 * 若不可用或调用失败，调用方回落到逐个 RPC 模式。
 */
import { Contract, Interface, type Provider } from 'ethers';
import { ENERGY_MARKET_ABI } from './contract';

const MULTICALL3 = '0xcA11bde05977b3631167028862bE2a173976CA11';
const MULTICALL3_ABI = [
  'function aggregate3((address target, bool allowFailure, bytes callData)[] calls) view returns ((bool success, bytes returnData)[] returnData)',
] as const;

/**
 * 批量读取 EnergyMarket.orders(id)（i ∈ [0, count)）。
 * 成功时返回每个 slot 的原始解码结果（或 null 表示失败/无此订单）。
 * 若 Multicall 不可用则返回 null 供调用方回落。
 */
export async function fetchOrdersBatch(
  provider: Provider,
  market: string,
  count: number,
): Promise<unknown[] | null> {
  if (count === 0) return [];
  try {
    const iface = new Interface(ENERGY_MARKET_ABI as never);
    const mc = new Contract(MULTICALL3, MULTICALL3_ABI, provider);
    // 确定 Multicall 合约存在（eth_getCode 非空）
    const code = await provider.getCode(MULTICALL3);
    if (!code || code === '0x') return null;

    const CHUNK = 60;
    const all: unknown[] = [];
    for (let base = 0; base < count; base += CHUNK) {
      const n = Math.min(CHUNK, count - base);
      const calls = Array.from({ length: n }, (_, k) => {
        const id = base + k;
        return {
          target: market,
          allowFailure: true,
          callData: iface.encodeFunctionData('orders', [id]),
        };
      });
      const res: { success: boolean; returnData: string }[] = await mc.aggregate3(calls);
      for (let i = 0; i < res.length; i++) {
        const r = res[i];
        if (!r.success || r.returnData === '0x') {
          all.push(null);
          continue;
        }
        try {
          const decoded = iface.decodeFunctionResult('orders', r.returnData);
          all.push(decoded);
        } catch {
          all.push(null);
        }
      }
    }
    return all;
  } catch {
    return null;
  }
}
