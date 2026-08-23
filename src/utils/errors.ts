/**
 * friendlyError — 将钱包/合约原始报错翻译为用户可读的双语短文案。
 *
 * - 用户主动拒绝签名（ACTION_REJECTED）不算错误：rejected=true，调用方静默降级
 * - 合约自定义 error 名（E_* / EM_* / DM_* / AL_*）→ i18n key
 * - 其余常见 EVM 错误码 → 通用文案
 */
import { t } from '../i18n';

export interface FriendlyError {
  /** true = 用户在钱包里拒绝签名/连接，非系统错误，调用方应静默降级 */
  rejected: boolean;
  /** 已本地化的短文案（无映射时保留简短原文） */
  msg: string;
}

/** 提取 ethers v6 错误中的 revert reason / 自定义 error 名 */
function extractReason(e: unknown): string | null {
  const anyE = e as {
    reason?: string;
    revert?: { args?: readonly unknown[] };
    shortMessage?: string;
    message?: string;
  };
  if (anyE.revert?.args && anyE.revert.args.length > 0) return String(anyE.revert.args[0]);
  if (anyE.reason) return anyE.reason;
  const src = anyE.shortMessage ?? anyE.message ?? '';
  const m = /execution reverted:? ?([^"\n]*)/.exec(src);
  if (m && m[1]) {
    const r = m[1].trim();
    // "EM_ZeroPrice (0x...)" 形式 → 取 error 名
    return r.split(' ')[0];
  }
  return null;
}

/** 合约自定义 error → i18n key */
const REASON_KEY: Record<string, string> = {
  /* ── SilentExpanseStrife (E_*) ── */
  E_AlreadyCiv: 'err.e_already_civ',
  E_AlreadyClaimed: 'err.e_already_claimed',
  E_AlreadyThere: 'err.e_already_there',
  E_CivNotFound: 'err.e_civ_not_found',
  E_DurabilityFull: 'err.e_durability_full',
  E_EngineWorn: 'err.e_engine_worn',
  E_InvalidName: 'err.e_invalid_name',
  E_InvalidReferrer: 'connect.bad_referrer',
  E_JumpCooldown: 'err.e_jump_cooldown',
  E_LeaveCooldown: 'err.e_leave_cooldown',
  E_LowAllowance: 'err.e_low_allowance',
  E_LowEnergy: 'toast.energy_insufficient_short',
  E_NoPendingEnergy: 'err.e_no_pending',
  E_NotInAlliance: 'err.al_not_member',
  E_NotRuins: 'err.e_not_ruins',
  E_PolicyBlocked: 'err.e_policy_blocked',
  E_RadarTooLow: 'err.e_radar_too_low',
  E_RateLimited: 'err.e_rate_limited',
  E_SelfTarget: 'err.e_self_target',
  E_ShieldFull: 'action.shield_full',
  E_TargetNotScanned: 'combat.attack_out_range',
  E_TargetProtected: 'err.e_target_protected',
  E_TargetShieldFull: 'err.e_target_shield_full',
  E_TooFar: 'combat.attack_out_range',
  E_WrongFee: 'err.e_wrong_fee',

  /* ── EnergyMarket (EM_*) ── */
  EM_InactiveOrder: 'err.em_inactive_order',
  EM_InvalidAmount: 'err.em_invalid_amount',
  EM_PriceTooHigh: 'err.em_price_slip',
  EM_SelfFill: 'err.em_self_fill',
  EM_TooEarly: 'err.em_too_early',
  EM_ZeroEnergy: 'market.insufficient_energy',

  /* ── DailyMinter (DM_*) ── */
  DM_AlreadyClaimed: 'ses.claimed',
  DM_AlreadyDistributed: 'err.dm_distributed',
  DM_NotDistributedYet: 'action.distribute',
  DM_TooEarly: 'err.dm_too_early',

  /* ── Alliance (AL_*) ── */
  AL_AlreadyExists: 'err.al_exists',
  AL_AlreadyInAlliance: 'err.al_in_alliance',
  AL_CannotKickSelf: 'err.al_kick_self',
  AL_Full: 'err.al_full',
  AL_InvalidName: 'err.al_invalid_name',
  AL_LastMember: 'err.al_last_member',
  AL_NoRefund: 'err.al_no_refund',
  AL_NotAuthorized: 'err.al_not_leader',
  AL_NotEnoughDonations: 'err.al_need_donation',
  AL_NotFound: 'err.al_not_found',
  AL_NotLeader: 'err.al_not_leader',
  AL_NotMember: 'err.al_not_member',
  AL_UseClaimRefund: 'err.al_use_claim_refund',
};

export function friendlyError(e: unknown): FriendlyError {
  if (!(e instanceof Error)) {
    return { rejected: false, msg: typeof e === 'string' ? e : t('err.unknown') };
  }
  const code = (e as { code?: string }).code;
  const message = e.message || '';

  // ── 用户主动拒绝签名：非错误 ──
  if (code === 'ACTION_REJECTED' || /user rejected|User denied|user cancelled/i.test(message)) {
    return { rejected: true, msg: '' };
  }

  if (code === 'INSUFFICIENT_FUNDS' || /insufficient funds/i.test(message)) {
    return { rejected: false, msg: t('err.insufficient_gas') };
  }
  if (/nonce too low|nonce has already been used/i.test(message)) {
    return { rejected: false, msg: t('err.nonce') };
  }
  if (/timeout/i.test(message)) {
    return { rejected: false, msg: t('err.timeout') };
  }
  if (code === 'NETWORK_ERROR' || /network|Failed to fetch/i.test(message)) {
    return { rejected: false, msg: t('err.network') };
  }

  const reason = extractReason(e);
  if (reason) {
    const key = REASON_KEY[reason];
    if (key) return { rejected: false, msg: t(key) };
    // 未映射的自定义 error 名：去掉可读性差的括号尾巴后展示
    return { rejected: false, msg: reason.length <= 40 ? reason : reason.slice(0, 40) + '…' };
  }

  const short = (e as { shortMessage?: string }).shortMessage;
  return { rejected: false, msg: short || (message.length > 120 ? message.slice(0, 120) + '…' : message) };
}
