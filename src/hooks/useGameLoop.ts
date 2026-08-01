/**
 * useGameLoop — 游戏心跳循环
 * 通过 TanStack Query 的 refetchInterval 从链上拉取数据。
 */

import { useCivPolling, useAlliancePolling, useMarketPolling } from './useQueryRefresh';

export function useGameLoop() {
  useCivPolling();
  useAlliancePolling();
  useMarketPolling();
  return null;
}
