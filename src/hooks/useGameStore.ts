import { create } from 'zustand';

export interface Civilization {
  name: string;
  x: number;
  y: number;
  z: number;
  energy: number;
  health: number;
  shieldHP: number;
  maxShieldHP: number;
  energyCollectorLv: number;
  weaponLv: number;
  radarLv: number;
  shieldLv: number;
  engineLv: number;
  scanRange: number;
  isRuins: boolean;
  isMoving: boolean;
}

export interface BattleEvent {
  attacker: string;
  defender: string;
  timestamp: number;
  damageDealt: number;
  shieldDamage: number;
  healthDamage: number;
  stolenEnergy: number;
  downgradedSystem: string;
  won: boolean;
}

export interface Alliance {
  id: string;
  name: string;
  memberCount: number;
  level: number;
}

export interface AttackTokenInfo {
  current: number;
  max: number;
  intervalSec: number;
  ratePerSec: number;
}

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  timestamp: number;
  /** 成功交易的 hash → 渲染 BscScan 链接（#39） */
  txHash?: string;
}

export interface AttackBeam {
  id: number;
  from: [number, number, number];
  to: [number, number, number];
  timestamp: number;
}

interface GameState {
  connected: boolean;
  address: string | null;

  playerCiv: Civilization | null;
  attackTokens: AttackTokenInfo;
  pendingEnergy: number;
  isDestroyed: boolean;
  sesBalance: string;
  entryFee: string;

  enemyCivs: Map<string, Civilization>;
  battleLog: BattleEvent[];
  battleCount: number;

  currentAlliance: Alliance | null;
  pendingRefund: number;

  selectedTarget: string | null;
  loading: boolean;
  /** 当前正在执行的 action id（per-action loading，#21/#30）：
   *  'create'|'upgrade'|'attack'|'collect'|'claimCombat'|'distribute'|'claimSES'|
   *  'move'|'jump'|'rebuild'|'repairCollector'|'repairShield'|'regenShield'|'repairAll'|
   *  'cancelMove'|'alliance.create'|'alliance.join'|…|'market.sell'|'market.buy'|'market.cancel'
   *  面板只在自己的 action 执行时显示蒙层，按钮仍用全局 loading 禁用。 */
  activeAction: string | null;
  error: string | null;

  /* ─── 数据同步健康（#29）：最近一次轮询成功时间 ─── */
  lastSyncAt: number;

  /* ─── 未读战报（#16）：已读标记，badge = battleLog.length > seenBattleCount ─── */
  seenBattleCount: number;

  /* ─── 攻击命中闪光（#57）：时间戳，GameUI 消费后播放一次动效 ─── */
  attackFlashAt: number;

  /* ─── toast notifications ─── */
  density: 'comfortable' | 'compact';

  toasts: Toast[];
  /* ─── active attack beams (3D) ─── */
  attackBeams: AttackBeam[];

  setConnected: (address: string) => void;
  setDisconnected: () => void;
  setPlayerCiv: (civ: Civilization | null) => void;
  setAttackTokens: (info: AttackTokenInfo) => void;
  setPendingEnergy: (energy: number) => void;
  setSESBalance: (balance: string) => void;
  setEntryFee: (fee: string) => void;
  addEnemyCiv: (address: string, civ: Civilization) => void;
  clearEnemyCivs: () => void;
  addBattleLog: (event: BattleEvent) => void;
  setBattleCount: (count: number) => void;
  setAlliance: (alliance: Alliance | null) => void;
  setPendingRefund: (amount: number) => void;
  setSelectedTarget: (address: string | null) => void;
  setLoading: (loading: boolean) => void;
  setActiveAction: (action: string | null) => void;
  setError: (error: string | null) => void;
  markBattlesSeen: () => void;
  triggerAttackFlash: () => void;
  setDensity: (d: 'comfortable' | 'compact') => void;

  /* ─── toast ─── */
  addToast: (message: string, type?: Toast['type']) => void;
  addSuccessToast: (message: string, txHash?: string) => void;
  addErrorToast: (message: string) => void;
  removeToast: (id: number) => void;

  moveEta: number;

  /* ─── attack beam ─── */
  addAttackBeam: (from: [number, number, number], to: [number, number, number]) => void;
  clearAttackBeams: () => void;

  /* ─── attack cooldown ─── */
  lastAttackTime: number;

  /* ─── energy collection ─── */
  lastCollectTime: number;
  collectRate: number;
  collectorDurability: { current: number; max: number };
  combatBoost: number;
  pendingCollect: number;
  shieldDefense: number;
  attackPower: number;
  attackEnergyCost: number;
  speed: number;
  radarRange: number;
  marketOrders: { id: number; price: number; amount: number; remaining: number; seller: string; isMine: boolean }[];
  // 联盟轮询（_ 前缀表来自 useQueryRefresh 的自动写，非手动）
  _allianceMembers: string[];
  _allianceTotemLevel: number;
  _allianceTotemEnergy: number;
  _allianceTotemUpgradeCost: number;
  _allianceIsLeader: boolean;
  _allianceLeader: string;
  _alliancePendingRefund: number;

  /* ─── daily claim / epoch ─── */
  lastClaimDay: number;
  currentEpoch: number;
  epochClaimed: boolean;
  lastDistributedEpoch: number;
  epochStartTime: number;
  epochEndTime: number;
  dailyEmission: number;

  setSearchAddress: (addr: string) => void;
  setSearchResult: (result: { name: string; distance: number; inRange: boolean } | null) => void;
  claimSES: () => void;

  /* ─── target search ─── */
  searchAddress: string;
  searchResult: { name: string; distance: number; inRange: boolean } | null;
}

let _toastId = 0;

export const useGameStore = create<GameState>((set) => ({
  connected: false,
  address: null,

  playerCiv: null,
  attackTokens: { current: 0, max: 0, intervalSec: 0, ratePerSec: 0 },
  pendingEnergy: 0,
  isDestroyed: false,
  sesBalance: '0',
  entryFee: '0.01',

  enemyCivs: new Map(),
  battleLog: [],
  battleCount: 0,

  currentAlliance: null,
  pendingRefund: 0,

  selectedTarget: null,
  loading: false,
  activeAction: null,
  error: null,
  lastSyncAt: 0,
  seenBattleCount: 0,
  attackFlashAt: 0,
  density: (typeof localStorage !== 'undefined' && (localStorage.getItem('ses_density') as 'comfortable' | 'compact') ) || 'comfortable',

  toasts: [],
  attackBeams: [],

  lastAttackTime: 0,
  lastCollectTime: 0,
  collectRate: 0,
  collectorDurability: { current: 0, max: 0 },
  moveEta: 0,
  combatBoost: 0,
  pendingCollect: 0,
  shieldDefense: 0,
  attackPower: 0,
  attackEnergyCost: 0,
  speed: 0,
  radarRange: 0,
  marketOrders: [],
  _allianceMembers: [],
  _allianceTotemLevel: 0,
  _allianceTotemEnergy: 0,
  _allianceTotemUpgradeCost: 0,
  _allianceIsLeader: false,
  _allianceLeader: '',
  _alliancePendingRefund: 0,
  lastClaimDay: 0,
  currentEpoch: 0,
  epochClaimed: false,
  lastDistributedEpoch: 0,
  epochStartTime: 0,
  epochEndTime: 0,
  dailyEmission: 0,
  searchAddress: '',
  searchResult: null,

  /* ─── connection ─── */
  setConnected: (address) => set({ connected: true, address }),
  setDisconnected: () => set({
    connected: false, address: null, playerCiv: null,
    sesBalance: '0', currentAlliance: null, battleLog: [],
    enemyCivs: new Map(), pendingEnergy: 0, isDestroyed: false, toasts: [], attackBeams: [],
    lastCollectTime: 0, collectRate: 0, collectorDurability: { current: 0, max: 0 }, moveEta: 0, combatBoost: 0, pendingCollect: 0, shieldDefense: 0, attackPower: 0, attackEnergyCost: 0, speed: 0, radarRange: 0, marketOrders: [], _allianceMembers: [], _allianceTotemLevel: 0, _allianceTotemEnergy: 0, _allianceTotemUpgradeCost: 0, _allianceIsLeader: false, _allianceLeader: '', _alliancePendingRefund: 0,
  currentEpoch: 0, epochClaimed: false, lastDistributedEpoch: 0,
    epochStartTime: 0, epochEndTime: 0, dailyEmission: 0,
    activeAction: null, lastSyncAt: 0, seenBattleCount: 0, attackFlashAt: 0,
  }),

  setPlayerCiv: (civ) => set({ playerCiv: civ }),
  setAttackTokens: (info) => set({ attackTokens: info }),
  setPendingEnergy: (energy) => set({ pendingEnergy: energy }),
  setSESBalance: (balance) => set({ sesBalance: balance }),
  setEntryFee: (fee) => set({ entryFee: fee }),
  addEnemyCiv: (address, civ) =>
    set((state) => { const m = new Map(state.enemyCivs); m.set(address, civ); return { enemyCivs: m }; }),
  clearEnemyCivs: () => set({ enemyCivs: new Map() }),
  addBattleLog: (event) =>
    set((state) => ({ battleLog: [event, ...state.battleLog].slice(0, 100) })),
  setBattleCount: (count) => set({ battleCount: count }),
  setAlliance: (alliance) => set({ currentAlliance: alliance }),
  setPendingRefund: (amount) => set({ pendingRefund: amount }),
  setSelectedTarget: (address) => set({ selectedTarget: address }),
  setLoading: (loading) => set({ loading }),
  setActiveAction: (action) => set({ activeAction: action }),
  setError: (error) => set({ error }),
  markBattlesSeen: () => set((s) => ({ seenBattleCount: s.battleLog.length })),
  triggerAttackFlash: () => set({ attackFlashAt: Date.now() }),
  setDensity: (d) => {
    try { localStorage.setItem('ses_density', d); } catch { /* ignore */ }
    set({ density: d });
  },

  /* ─── toast ─── */
  addToast: (message, type = 'info') => {
    const id = ++_toastId;
    // #32: 错误信息驻留更久（8s），普通信息 3.5s
    const duration = type === 'error' ? 8000 : 3500;
    set((s) => ({ toasts: [...s.toasts, { id, message, type, timestamp: Date.now() }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, duration);
  },
  /** Shorthand: success toast, 可附带交易 hash（#39 → Toast 渲染 BscScan 链接） */
  addSuccessToast: (message: string, txHash?: string) => {
    const id = ++_toastId;
    set((s) => ({ toasts: [...s.toasts, { id, message, type: 'success' as const, timestamp: Date.now(), txHash }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 6000);
  },
  /** Shorthand: add an error toast and also set store.error */
  addErrorToast: (message: string) => {
    useGameStore.getState().addToast(message, 'error');
    set({ error: message });
  },
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  /* ─── attack beam ─── */
  addAttackBeam: (from, to) => {
    const id = ++_toastId;
    set((s) => ({ attackBeams: [...s.attackBeams, { id, from, to, timestamp: Date.now() }] }));
    // auto-remove after 600ms
    setTimeout(() => {
      set((s) => ({ attackBeams: s.attackBeams.filter((b) => b.id !== id) }));
    }, 600);
  },
  clearAttackBeams: () => set({ attackBeams: [] }),

  /* ─── daily claim ─── */
  setSearchAddress: (addr) => set({ searchAddress: addr }),
  setSearchResult: (result) => set({ searchResult: result }),
  claimSES: () => {
    const today = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    set({ lastClaimDay: today });
  },
}));

// canClaimSES as standalone function (avoids circular type in store)
export function canClaimSES(): boolean {
  const state = useGameStore.getState();
  const today = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return today !== state.lastClaimDay;
}
