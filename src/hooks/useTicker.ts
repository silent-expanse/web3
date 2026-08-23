/**
 * useTicker — 每 interval 毫秒重渲一次（#58 攻击冷却走动、#24 pendingCollect 实时增长用）
 */
import { useEffect, useState } from 'react';

export function useTicker(ms: number): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}
