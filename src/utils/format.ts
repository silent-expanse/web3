/**
 * fmt — 数字显示格式化工具
 * 统一管理所有用户可见的数字格式。
 */

/** 大于此值使用紧凑格式 (K/M/B) */
const COMPACT_THRESHOLD = 1_000_000;

/**
 * 坐标显示：int256 大整数，Number 精度有限，用科学计数法展示
 *   4.879e76 → "4.88e+76"
 */
export function fmtCoord(n: number): string {
  if (!Number.isFinite(n)) return '0';
  return n.toExponential(2);
}

/**
 * 格式化数字：大数用 K/M/B，小数截断，整数不带小数点
 *
 * 示例:
 *   1_152_575_342  → "1.15B"
 *   2_500_000      → "2.5M"
 *   161_137        → "161,137"
 *   3_000          → "3,000"
 *   17.142         → "17.14"
 *   0.5            → "0.5"
 */
export function fmt(n: number, decimals = 2): string {
  if (!Number.isFinite(n)) return '0';

  // 紧凑格式
  if (Math.abs(n) >= 1e9) return (n / 1e9).toFixed(decimals).replace(/\.?0+$/, '') + 'B';
  if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(decimals).replace(/\.?0+$/, '') + 'M';
  if (Math.abs(n) >= COMPACT_THRESHOLD) return (n / 1e3).toFixed(decimals).replace(/\.?0+$/, '') + 'K';

  // 整数 → 千分位格式
  if (Number.isInteger(n)) return n.toLocaleString();

  // 小数 → 截断末尾零
  return n.toFixed(decimals).replace(/\.?0+$/, '');
}

/**
 * 显示余额/能量等可能很大的数字，统一用紧凑格式
 */
export function fmtCompact(n: number | string): string {
  const num = typeof n === 'string' ? parseFloat(n) : n;
  if (!Number.isFinite(num)) return '0';
  return fmt(num);
}
