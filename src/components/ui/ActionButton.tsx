import { type ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { THEME, hoverBg } from '../../theme';

type Variant = 'primary' | 'danger' | 'ghost';

interface ActionButtonProps {
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  children: ReactNode;
  onClick?: () => void;
  title?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}

const variantStyles = {
  primary: css`
    background: ${THEME.accent.green};
    color: ${THEME.bg};
    border: none;
    &:hover:not(:disabled) { background: ${THEME.alpha(THEME.accent.green, 0.85)}; }
  `,
  danger: css`
    background: ${THEME.accent.red};
    color: #fff;
    border: none;
    &:hover:not(:disabled) { background: ${THEME.alpha(THEME.accent.red, 0.85)}; }
  `,
  ghost: css`
    background: transparent;
    color: ${THEME.text.secondary};
    border: 1px solid ${THEME.border};
    &:hover:not(:disabled) { background: ${hoverBg(THEME.border)}; }
  `,
};

const StyledButton = styled.button<{ $variant: Variant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 14px;
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  min-height: 36px;
  @media (max-width: 767px) { min-height: 44px; padding: 10px 16px; }
  -webkit-tap-highlight-color: transparent;
  transition: background 0.15s, opacity 0.15s;
  white-space: nowrap;
  ${({ $variant }) => variantStyles[$variant]}
  &:disabled { opacity: 0.35; cursor: not-allowed; }
  &:active { opacity: 0.7; }
`;

/**
 * ActionButton — 统一操作按钮 (primary/danger/ghost)
 *
 * 用法:
 *   <ActionButton variant="danger" onClick={attack}>⚔️ 攻击</ActionButton>
 *   <ActionButton variant="primary" icon="⬆️">升级</ActionButton>
 *   <ActionButton variant="ghost">取消</ActionButton>
 */
export function ActionButton({ variant = 'ghost', disabled, loading, icon, children, onClick, title, style, ...rest }: ActionButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      disabled={disabled || loading}
      onClick={onClick}
      title={title}
      style={style}
      {...rest}
    >
      {loading && '⟳ '}
      {icon}{children}
    </StyledButton>
  );
}
