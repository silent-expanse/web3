/**
 * AnimatedNumber — 对数值变化做平滑过渡（#23）
 * 小额变化用 CSS transition；首渲或大跳变直接显示。
 * 组件内部维护 displayedRef，通过 RAF 线性推进。
 */
import { useEffect, useRef, useState } from 'react';

export function AnimatedNumber({
  value,
  decimals = 0,
  fmt,
  className,
  style,
}: {
  value: number;
  decimals?: number;
  /** 自定义格式化（缺省为原 value→decimals→fmt 流程由父决定时可传 fmt(value)） */
  fmt?: (v: number) => string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [display, setDisplay] = useState(value);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    const start = display;
    const delta = value - start;
    // 首渲或差值极大，直接跳转
    if (!Number.isFinite(start) || !Number.isFinite(delta) || Math.abs(delta) / Math.max(Math.abs(start), 1) > 0.5) {
      setDisplay(value);
      return;
    }
    // 小额变化：300ms 线性
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 300);
      const eased = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p; // easeInOutQuad
      setDisplay(start + delta * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current !== null) cancelAnimationFrame(raf.current); };
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const text = fmt ? fmt(display) : (Number.isInteger(value) ? Math.round(display).toLocaleString() : display.toFixed(decimals));
  return <span className={className} style={style}>{text}</span>;
}
