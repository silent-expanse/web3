import styled from 'styled-components';
import { THEME } from '../../theme';
import { fmt } from '../../utils/format';

interface ResourceBarProps {
  label: string;
  value: number;
  /** 可选最大值。不传或传 0 时只显示数值，不显示进度条和 max 文本 */
  max?: number;
  rate?: string;
  color?: string;
  icon?: string;
}

const Bar = styled.div`
  background: ${THEME.bg};
  border: 1px solid ${THEME.border};
  border-radius: 6px;
  padding: 6px 10px;
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const Label = styled.span`
  color: ${THEME.text.secondary};
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.5px;
`;

const Value = styled.span<{ $color?: string }>`
  color: ${({ $color }) => $color || THEME.accent.green};
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
`;

const Track = styled.div`
  height: 6px;
  background: ${THEME.alpha(THEME.border, 0.3)};
  border-radius: 3px;
  overflow: hidden;
`;

const Fill = styled.div<{ $pct: number; $color?: string }>`
  height: 100%;
  width: ${({ $pct }) => Math.max(0, Math.min(100, $pct))}%;
  background: ${({ $color }) => $color || THEME.accent.green};
  border-radius: 3px;
  transition: width 0.4s ease;
`;

/**
 * ResourceBar — 资源进度条
 *
 * 用法:
 *   <ResourceBar label="能量" value={12450} max={50000} rate="33/s" color="#00D4AA" />
 */
export function ResourceBar({ label, value, max, rate, color, icon }: ResourceBarProps) {
  const hasMax = max !== undefined && max > 0;
  const pct = hasMax ? (value / max!) * 100 : 0;
  return (
    <Bar>
      <LabelRow>
        <Label>{icon || ''} {label}</Label>
        <span>
          <Value $color={color}>{fmt(value)}</Value>
          {hasMax && (
            <span style={{ color: THEME.text.secondary, fontSize: '0.7rem', fontFamily: "'Courier New', monospace" }}>
              {' '}/ {fmt(max!)}
            </span>
          )}
          {rate && (
            <span style={{ color: THEME.text.secondary, fontSize: '0.65rem', fontFamily: "'Courier New', monospace", marginLeft: 6 }}>
              {rate}
            </span>
          )}
        </span>
      </LabelRow>
      {hasMax && (
        <Track>
          <Fill $pct={pct} $color={color} />
        </Track>
      )}
    </Bar>
  );
}
