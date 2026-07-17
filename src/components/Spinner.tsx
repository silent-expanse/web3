import styled, { keyframes } from 'styled-components';
import { THEME } from '../theme';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

const Ring = styled.div<{ $size: number; $color: string }>`
  display: inline-block;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: ${({ $size }) => Math.max(2, Math.floor($size / 8))}px solid rgba(255, 255, 255, 0.08);
  border-top-color: ${({ $color }) => $color};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const Dot = styled.span<{ $delay: number; $color: string }>`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  margin: 0 2px;
  animation: ${pulse} 1.2s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

const DotRow = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 6px;
`;

interface SpinnerProps {
  size?: number;
  color?: string;
}

/** Circular spinning ring */
export function SpinnerRing({ size = 24, color = THEME.accent.green }: SpinnerProps) {
  return <Ring $size={size} $color={color} />;
}

/** Three pulsing dots (typing indicator) */
export function SpinnerDots({ color = THEME.accent.green }: SpinnerProps) {
  return (
    <DotRow>
      <Dot $delay={0} $color={color} />
      <Dot $delay={0.2} $color={color} />
      <Dot $delay={0.4} $color={color} />
    </DotRow>
  );
}

/* ─── Fullscreen overlay with spinner ─── */

const Overlay = styled.div<{ $transparent?: boolean }>`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: ${({ $transparent }) =>
    $transparent ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.75)'};
  border-radius: inherit;
  backdrop-filter: blur(2px);
  z-index: 50;
  pointer-events: auto;
`;

const Msg = styled.div`
  color: ${THEME.accent.green};
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  letter-spacing: 1px;
`;

interface LoadingOverlayProps {
  message?: string;
  transparent?: boolean;
  color?: string;
}

export function LoadingOverlay({ message = '处理中', transparent, color }: LoadingOverlayProps) {
  return (
    <Overlay $transparent={transparent}>
      <SpinnerRing color={color} />
      <Msg style={{ color: color || '#00ff88' }}>
        {message}
        <SpinnerDots color={color} />
      </Msg>
    </Overlay>
  );
}
