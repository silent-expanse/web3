/**
 * Silent Expanse: Strife — 统一设计调色板 (依据 FRONTEND_DESIGN.md §1.2)
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
    /** SES 金 / 稀有 */
    gold: '#FFD93D' as const,
    /** 护盾蓝 */
    shield: '#5F9FFF' as const,
    /** 次级紫（市场日估、令牌） */
    violet: '#8844ff' as const,
    /** 薄荷绿（采集率） */
    mint: '#44ff88' as const,
    /** 粉（跃迁） */
    pink: '#ff66aa' as const,
    /** 橙（全修） */
    orange: '#ff8844' as const,
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
    profit: '#00D4AA' as const,
    loss: '#FF4757' as const,
  },

  /* ─── 圆角系统 ─── */
  radius: {
    sm: '6px' as const,
    md: '8px' as const,
    lg: '12px' as const,
    pill: '999px' as const,
  },

  /* ─── 阴影层级 ─── */
  elevation: {
    card: '0 1px 3px rgba(0,0,0,0.32), 0 4px 12px rgba(0,0,0,0.24)' as const,
    modal: '0 12px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.4)' as const,
  },

  /* ─── 8pt 间距 ─── */
  space: {
    xs: '4px' as const,
    sm: '8px' as const,
    md: '16px' as const,
    lg: '24px' as const,
    xl: '32px' as const,
  },

  /* ─── 字体 ─── */
  font: {
    mono: "'JetBrains Mono','Courier New',monospace" as const,
    display: "'Orbitron','JetBrains Mono',monospace" as const,
  },

  /* ─── 模糊 ─── */
  blur: {
    bar: '12px' as const,
    card: '12px' as const,
  },

  /* ─── 字阶 ─── */
  type: {
    h1: '1.35rem' as const,
    h2: '1.05rem' as const,
    body: '0.82rem' as const,
    caption: '0.68rem' as const,
  },

  /* ─── 动效 ─── */
  transition: {
    fast: '150ms ease-out' as const,
    normal: '300ms ease-out' as const,
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
