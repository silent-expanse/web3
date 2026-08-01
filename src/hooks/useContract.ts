import { useCallback, useEffect, useState } from 'react';
import { BrowserProvider, Contract, JsonRpcSigner } from 'ethers';
import { GAME } from '../utils/constants';
import { SILENT_EXPANSE_ABI, SES_ABI, ALLIANCE_ABI, DAILY_MINTER_ABI } from '../utils/contract';

export interface ContractState {
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  game: Contract | null;
  sesToken: Contract | null;
  alliance: Contract | null;
  dailyMinter: Contract | null;
  isReady: boolean;
  /** true = no deployed contract found, using local simulation */
  isSimulated: boolean;
  error: string | null;
}

function createInitialState(): ContractState {
  return {
    provider: null,
    signer: null,
    game: null,
    sesToken: null,
    alliance: null,
    dailyMinter: null,
    isReady: false,
    isSimulated: true,
    error: null,
  };
}

/* ═══════════════════════════════════════════════════════════
 * 模块级单例 — 修复: 9 个组件各自调用 useContract() 导致
 * 页面加载时重复触发 eth_requestAccounts (-32002 错误)
 *
 * 方案: 首次调用触发 initContracts(), 后续调用复用结果。
 * accountsChanged / chainChanged 事件统一由单例层处理。
 * ═══════════════════════════════════════════════════════════ */

let sharedProvider: BrowserProvider | null = null;
let sharedSigner: JsonRpcSigner | null = null;
let sharedState: ContractState | null = null;
let initPromise: Promise<ContractState | null> | null = null;

/** 单例初始化 — 只执行一次 getSigner() */
async function getSharedState(): Promise<ContractState | null> {
  if (sharedState) return sharedState;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      if (!window.ethereum) {
        sharedState = { ...createInitialState(), isReady: true, isSimulated: true };
        return sharedState;
      }

      const provider = new BrowserProvider(window.ethereum);
      sharedProvider = provider;

      // 获取 signer 会触发 eth_requestAccounts — 只调用一次
      let signer: JsonRpcSigner | null = null;
      try {
        signer = await provider.getSigner();
        sharedSigner = signer;
      } catch (e) {
        // 用户拒绝连接: 降级为只读模式 (无 signer), 不阻塞页面
        console.warn('[useContract] signer unavailable, read-only mode:', e);
      }

      const hasAddresses = !!GAME.SILENT_EXPANSE && !!GAME.SES_TOKEN && !!GAME.ALLIANCE;
      if (!hasAddresses) {
        sharedState = { ...createInitialState(), isReady: true, isSimulated: true };
        return sharedState;
      }

      if (!signer) {
        sharedState = { ...createInitialState(), isReady: true, isSimulated: true, error: 'Wallet not connected' };
        return sharedState;
      }

      sharedState = {
        provider,
        signer,
        game: new Contract(GAME.SILENT_EXPANSE, SILENT_EXPANSE_ABI, signer),
        sesToken: new Contract(GAME.SES_TOKEN, SES_ABI, signer),
        alliance: new Contract(GAME.ALLIANCE, ALLIANCE_ABI, signer),
        dailyMinter: GAME.DAILY_MINTER
          ? new Contract(GAME.DAILY_MINTER, DAILY_MINTER_ABI, signer)
          : null,
        isReady: true,
        isSimulated: false,
        error: null,
      };
      return sharedState;
    } catch (e) {
      sharedState = {
        ...createInitialState(),
        isReady: true,
        error: e instanceof Error ? e.message : String(e),
      };
      return sharedState;
    }
  })();

  return initPromise;
}

/** 钱包切换/网络切换时重置单例（只重建一次，所有订阅者共享） */
function resetSharedState() {
  sharedState = null;
  sharedProvider = null;
  sharedSigner = null;
  initPromise = null;
}

/**
 * useContract — 统一的合约连接层（全局单例）。
 *
 * - 所有组件共享同一个初始化结果，避免重复 eth_requestAccounts
 * - 监听 `accountsChanged` / `chainChanged`，重建后广播给所有订阅者
 * - isSimulated = true 时表示合约不可用
 */
export function useContract(): ContractState {
  const [state, setState] = useState<ContractState>(createInitialState);

  useEffect(() => {
    let cancelled = false;

    // 订阅单例状态
    const apply = (s: ContractState | null) => {
      if (!cancelled && s) setState(s);
    };

    // 初始加载（模块级单例只触发一次 getSigner）
    getSharedState().then(apply);

    // ── 统一监听钱包事件, 重建单例后广播 ──
    const handleAccountsChanged = (accounts: unknown) => {
      if (!Array.isArray(accounts) || accounts.length === 0) {
        resetSharedState();
        if (!cancelled) setState(createInitialState());
        return;
      }
      resetSharedState();
      getSharedState().then(apply);
    };

    const handleChainChanged = () => {
      resetSharedState();
      getSharedState().then(apply);
    };

    if (window.ethereum?.on) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      cancelled = true;
      // 注意: 不 removeListener — 单例模式要求事件监听常驻,
      // 组件卸载时移除会导致其他组件失去事件
    };
  }, []);

  return state;
}
