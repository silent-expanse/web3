// Game constants — verified against BSC mainnet contract (chain 56)
// Source: SilentExpanseStrifeStorage.sol constants
//
// 合约地址来源: packages/shared/contracts.json (单一权威)
// 覆盖方式: VITE_* 环境变量
import { getContractAddress } from '@strifelabs-strife/shared/contracts';

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
  PLUNDER_RATIO: 500,         // bps (500 = 5%, 匹配合约 PLUNDER_RATIO + weaponLv * 50)
  LAST_HIT_BONUS_PERCENT: 50, // extra damage %
  DOWNGRADE_DIVISOR: 10,      // energy drain divisor on defeat
  SHIELD_DMG_BONUS: 200,      // % bonus damage vs shield

  // ── Shield ──
  SHIELD_HP_BASE: 3600,
  SHIELD_HP_RATE: 15,         // per sqrt(lv-1)
  REGEN_BASE: 50,             // base regen per tick
  REGEN_RATE: 1,              // per level
  SHIELD_REGEN_ENERGY_RATIO: 1,  // 1:1 energy:shield regen (匹配合约 SHIELD_REGEN_ENERGY_RATIO = 1)

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
  JUMP_SES_BASE: 10,           // SES (in whole units)
  JUMP_SES_MAX: 1000,
  JUMP_SES_PER_SQRT: 10,
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
  SHIELD_REPAIR_COST: 4,       // 匹配合约 SHIELD_REPAIR_COST
  WEAPON_REPAIR_COST: 3,       // 匹配合约 WEAPON_REPAIR_COST
  ENGINE_REPAIR_COST: 5,       // 匹配合约 ENGINE_REPAIR_COST
  REBUILD_ENERGY_COST: 500000,

  // ── Referral ──
  REFERRAL_ENERGY_REWARD: 150,

  // ── SES token ──
  SES_DECIMALS: 18,
  DAILY_SES_BASE: 23050,       // approx SES per day base
  DAILY_SES_EMISSION: 1152575342, // total daily SES emission
  SES_GROWTH_BPS: 5000,        // 50% growth per level

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

  // ── 合约地址 (单一来源: packages/shared/contracts.json) ──
  // 可通过 VITE_SILENT_EXPANSE, VITE_SES_TOKEN 等环境变量覆盖
  SILENT_EXPANSE: getContractAddress('SilentExpanseStrife'),
  SES_TOKEN: getContractAddress('SES'),
  ALLIANCE: getContractAddress('Alliance'),
  ENERGY_MARKET: getContractAddress('EnergyMarket'),
  DAILY_MINTER: getContractAddress('DailyMinter'),
  AGENT_REGISTRY: getContractAddress('AgentRegistry'),
  CHAIN_ID: Number((typeof import.meta !== 'undefined' && (import.meta as { env?: Record<string, string> }).env?.VITE_CHAIN_ID) || 56),
} as const;

// System display config
export const SYSTEMS = {
  energyCollector: { name: '采集', icon: '/assets/systems/collector.web.png', color: '#44ff88', label: '能量采集' },
  weapon: { name: '武器', icon: '/assets/systems/weapon.web.png', color: '#ff4444', label: '武器系统' },
  shield: { name: '护盾', icon: '/assets/systems/shield.web.png', color: '#ffaa00', label: '护盾系统' },
  radar: { name: '雷达', icon: '/assets/systems/radar.web.png', color: '#4488ff', label: '雷达系统' },
  engine: { name: '引擎', icon: '/assets/systems/engine.web.png', color: '#ff66cc', label: '引擎系统' },
} as const;

export type SystemKey = keyof typeof SYSTEMS;
