/**
 * Dark Forest — 统一设计调色板 (依据 FRONTEND_DESIGN.md §1.2)
 *
 * 所有组件引用此文件，不再硬编码色值。
 * 调整设计时只需改此一处。
 */

export const THEME = {
  /* ─── 背景色 ─── */
  bg: '#0A0E17' as const,
  card: '#131A2B' as const,
  border: '#1E2A45' as const,

  /* ─── 文字 ─── */
  text: {
    primary: '#E8EDF5' as const,
    secondary: '#8892A8' as const,
  },

  /* ─── 功能色 ─── */
  accent: {
    /** 能量绿 / 主操作 */
    green: '#00D4AA' as const,
    /** 信息蓝 / 链接 */
    blue: '#4A90D9' as const,
    /** 战斗红 / 危险 */
    red: '#FF4757' as const,
    /** DFT 金 / 稀有 */
    gold: '#FFD93D' as const,
    /** 护盾蓝 */
    shield: '#5F9FFF' as const,
  },

  /* ─── 按钮 ─── */
  button: {
    primary: '#00D4AA' as const,
    danger: '#FF4757' as const,
    ghost: 'transparent' as const,
    ghostBorder: '#1E2A45' as const,
  },

  /* ─── 状态 ─── */
  status: {
    success: '#00D4AA' as const,
    error: '#FF4757' as const,
    warning: '#FFD93D' as const,
    info: '#4A90D9' as const,
  },

  /* ─── 半透明遮罩 ─── */
  alpha: (hex: string, a: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  },
} as const;

/** 快捷函数：按钮悬浮态 */
export const hoverBg = (hex: string) => THEME.alpha(hex, 0.12);
