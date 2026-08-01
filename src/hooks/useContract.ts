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

/**
 * Initialize contract instances from the current window.ethereum provider.
 * Returns the new state, or null if ethereum is unavailable.
 */
async function initContracts(): Promise<ContractState | null> {
  if (!window.ethereum) {
    return { ...createInitialState(), isReady: true, isSimulated: true };
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const hasAddresses = !!GAME.SILENT_EXPANSE && !!GAME.SES_TOKEN && !!GAME.ALLIANCE;

  if (!hasAddresses) {
    return { ...createInitialState(), isReady: true, isSimulated: true };
  }

  const game = new Contract(GAME.SILENT_EXPANSE, SILENT_EXPANSE_ABI, signer);
  const sesToken = new Contract(GAME.SES_TOKEN, SES_ABI, signer);
  const alliance = new Contract(GAME.ALLIANCE, ALLIANCE_ABI, signer);
  const dailyMinter = GAME.DAILY_MINTER
    ? new Contract(GAME.DAILY_MINTER, DAILY_MINTER_ABI, signer)
    : null;

  return {
    provider, signer, game, sesToken, alliance, dailyMinter,
    isReady: true, isSimulated: false, error: null,
  };
}

/**
 * useContract — 统一的合约连接层。
 *
 * - 监听 MetaMask `accountsChanged` 事件，钱包切换时自动重建合约实例
 * - 监听 `chainChanged` 事件，网络切换时自动重建
 * - isSimulated = true 时表示合约不可用
 */
export function useContract(): ContractState {
  const [state, setState] = useState<ContractState>(createInitialState);

  const reinit = useCallback(async () => {
    try {
      const next = await initContracts();
      if (next) setState(next);
    } catch (e) {
      setState(prev => ({
        ...prev, isReady: true,
        error: e instanceof Error ? e.message : String(e),
      }));
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const next = await initContracts();
      if (!cancelled && next) setState(next);
    };

    init();

    // ── Listen for wallet account changes ──
    // When user switches accounts in MetaMask, the old signer becomes stale.
    // We must recreate all contract instances with the new signer.
    const handleAccountsChanged = (accounts: unknown) => {
      if (!Array.isArray(accounts) || accounts.length === 0) {
        // Wallet disconnected or locked
        setState(createInitialState());
        return;
      }
      reinit();
    };

    // ── Listen for chain changes ──
    // When user switches networks, provider + signer must be recreated.
    const handleChainChanged = () => {
      reinit();
    };

    if (window.ethereum?.on) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      cancelled = true;
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [reinit]);

  return state;
}
