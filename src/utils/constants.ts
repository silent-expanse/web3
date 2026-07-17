// Game constants — verified against BSC mainnet contract (chain 56)
// Source: DarkForestStorage.sol constants
export const GAME = {
  // ── Civ creation ──
  INITIAL_ENERGY: 2000,
  INITIAL_HEALTH: 3000,
  INITIAL_SCAN_RANGE: 1000,
  NEWBIE_PROTECTION_SECONDS: 86400, // 1 day

  // ── Energy collector ──
  BASE_COLLECT: 3,            // energy/sec at Lv1
  COLLECT_BONUS: 10,          // per sqrt(lv-1)
  DURABILITY_BASE: 86400,     // collector durability base (1 day in seconds)
  DURABILITY_PER_LV: 7200,    // +2 hours per level

  // ── Combat ──
  ATK_BASE: 900,
  ATK_RATE: 10,               // per sqrt(lv-1)
  DEF_BASE: 540,
  DEF_RATE: 6,                // per sqrt(lv-1)
  ATTACK_ENERGY_BASE: 50000,  // base energy cost per attack
  ATTACK_ENERGY_PER_LV: 50000,// extra cost per weapon level
  PLUNDER_RATIO: 500,         // bps (500 = 50%)
  LAST_HIT_BONUS_PERCENT: 50, // extra damage %
  DOWNGRADE_DIVISOR: 10,      // energy drain divisor on defeat
  SHIELD_DMG_BONUS: 200,      // % bonus damage vs shield

  // ── Shield ──
  SHIELD_HP_BASE: 3600,
  SHIELD_HP_RATE: 15,         // per sqrt(lv-1)
  REGEN_BASE: 50,             // base regen per tick
  REGEN_RATE: 1,              // per level
  SHIELD_REGEN_ENERGY_RATIO: 10, // 1/10 of energy spent → shield regen

  // ── Durability (per system type) ──
  WEAPON_DUR_BASE: 60,
  WEAPON_DUR_PER_LV: 15,
  SHIELD_DUR_BASE: 40,
  SHIELD_DUR_PER_LV: 10,
  ENGINE_DUR_BASE: 30,
  ENGINE_DUR_PER_LV: 6,

  // ── Radar ──
  RADAR_BASE: 1000,
  RADAR_LINEAR: 150,
  RADAR_QUAD: 5,

  // ── Engine ──
  ENGINE_SPEED_BASE: 10,
  ENGINE_SPEED_PER_LV: 5,

  // ── Jump ──
  JUMP_COOLDOWN: 3600,         // 1 hour
  JUMP_ENERGY_BASE: 200000,
  JUMP_ENERGY_MAX: 16500000,
  JUMP_ENERGY_PER_SQRT: 200000,
  JUMP_DFT_BASE: 10,           // DFT (in whole units)
  JUMP_DFT_MAX: 1000,
  JUMP_DFT_PER_SQRT: 10,
  JUMP_TRACKING_RADAR_LV: 20,

  // ── Attack tokens ──
  TOKEN_BASE_MAX: 3,
  TOKEN_BASE_INTERVAL: 3,      // seconds
  TOKEN_MAX_CAP: 10,
  TOKEN_MIN_INTERVAL: 1,
  TOKEN_INTERVAL_MS_BASE: 300,
  TOKEN_INTERVAL_REDUCTION: 10,

  // ── Upkeep & repair ──
  UPKEEP_PER_LEVEL: 2000,      // energy per level per upkeep tick
  REPAIR_COST_PER_SEC: 1,      // energy per durability second repaired
  SHIELD_REPAIR_COST: 4,       // energy per shield HP repaired
  WEAPON_REPAIR_COST: 3,
  ENGINE_REPAIR_COST: 3,
  REBUILD_ENERGY_COST: 500000,

  // ── Referral ──
  REFERRAL_ENERGY_REWARD: 150,

  // ── DFT token ──
  DFT_DECIMALS: 18,
  DAILY_DFT_BASE: 23050,       // approx DFT per day base
  DAILY_DFT_EMISSION: 1152575342, // total daily DFT emission
  DFT_GROWTH_BPS: 5000,        // 50% growth per level

  // ── Anchor formula ──
  ANCHOR_BASE_BPS: 10000,      // 100%
  ANCHOR_MID_BPS: 300000,      // 3000%
  ANCHOR_MAX_BPS: 600000,      // 6000%
  ANCHOR_PIVOT_1: 100,         // level
  ANCHOR_PIVOT_2: 1000,        // level

  // ── Entry fee (in wei) ──
  ENTRY_FEE_MIN: 10000000000000000n,    // 0.01 BNB
  ENTRY_FEE_MAX: 50000000000000000n,    // 0.05 BNB
  FEE_RAMP_UP_TIME: 31536000,           // 1 year
  ORDER_DELAY_SEC: 3,

  // ── BSC Mainnet (chain 56) — 最终部署 ──
  DARK_FOREST: (typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string> }).env?.VITE_DARK_FOREST)
    || '0x96ee7c1a3cd81858a6638917de2a1efd691ae2fe',
  DFT_TOKEN: (typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string> }).env?.VITE_DFT_TOKEN)
    || '0x1266e922fe34459efda34e7ee5caf327fbf138d7',
  ALLIANCE: (typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string> }).env?.VITE_ALLIANCE)
    || '0x5f810a22359b678c01e72726149d387e79cd03f2',
  ENERGY_MARKET: (typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string> }).env?.VITE_ENERGY_MARKET)
    || '0x69f8dad1b4c9ceaf00bc48ed2216931ba78c5955',
  DAILY_MINTER: (typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string> }).env?.VITE_DAILY_MINTER)
    || '0x9b1c4e550fbf1c802495e6521ee5812e4264c95f',
  AGENT_REGISTRY: (typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string> }).env?.VITE_AGENT_REGISTRY)
    || '0x98233227e91829f7c424099f5d3bc86cf4d57f55',
  CHAIN_ID: Number((typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string> }).env?.VITE_CHAIN_ID) || 56),
} as const;

// System display config
export const SYSTEMS = {
  energyCollector: { name: '采集', icon: '🔧', color: '#44ff88', label: '能量采集' },
  weapon: { name: '武器', icon: '⚔️', color: '#ff4444', label: '武器系统' },
  shield: { name: '护盾', icon: '🛡️', color: '#ffaa00', label: '护盾系统' },
  radar: { name: '雷达', icon: '📡', color: '#4488ff', label: '雷达系统' },
  engine: { name: '引擎', icon: '🚀', color: '#ff66cc', label: '引擎系统' },
} as const;

export type SystemKey = keyof typeof SYSTEMS;
