import { useEffect, useState } from 'react';
import { BrowserProvider, Contract, JsonRpcSigner } from 'ethers';
import { GAME } from '../utils/constants';
import { DARK_FOREST_ABI, DFT_ABI, ALLIANCE_ABI, DAILY_MINTER_ABI } from '../utils/contract';

export interface ContractState {
  provider: BrowserProvider | null;
  signer: JsonRpcSigner | null;
  darkForest: Contract | null;
  dftToken: Contract | null;
  alliance: Contract | null;
  dailyMinter: Contract | null;
  isReady: boolean;
  /** true = no deployed contract found, using local simulation */
  isSimulated: boolean;
  error: string | null;
}

const INITIAL: ContractState = {
  provider: null,
  signer: null,
  darkForest: null,
  dftToken: null,
  alliance: null,
  dailyMinter: null,
  isReady: false,
  isSimulated: true,
  error: null,
};

/**
 * useContract — 统一的合约连接层。
 *
 * isSimulated = true 时表示合约不可用，ConnectPanel 会显示等待状态。
 * 所有游戏操作（useGameActions）在合约不可用时直接抛出错误，不返回估算值。
 */
export function useContract(): ContractState {
  const [state, setState] = useState<ContractState>(INITIAL);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        if (!window.ethereum) {
          setState(prev => ({ ...prev, isReady: true, isSimulated: true }));
          return;
        }

        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const hasAddresses = !!GAME.DARK_FOREST && !!GAME.DFT_TOKEN && !!GAME.ALLIANCE;

        if (hasAddresses) {
          const darkForest = new Contract(GAME.DARK_FOREST, DARK_FOREST_ABI, signer);
          const dftToken = new Contract(GAME.DFT_TOKEN, DFT_ABI, signer);
          const alliance = new Contract(GAME.ALLIANCE, ALLIANCE_ABI, signer);
          const dailyMinter = GAME.DAILY_MINTER
            ? new Contract(GAME.DAILY_MINTER, DAILY_MINTER_ABI, signer)
            : null;
          if (!cancelled) {
            setState({
              provider, signer, darkForest, dftToken, alliance, dailyMinter,
              isReady: true, isSimulated: false, error: null,
            });
          }
        } else {
          // Contract addresses not configured — run in simulation mode
          if (!cancelled) {
            setState(prev => ({ ...prev, isReady: true, isSimulated: true }));
          }
        }
      } catch (e) {
        if (!cancelled) {
          setState(prev => ({
            ...prev, isReady: true, isSimulated: true,
            error: e instanceof Error ? e.message : String(e),
          }));
        }
      }
    };

    init();
    return () => { cancelled = true; };
  }, []);

  return state;
}
