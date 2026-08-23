import styled from 'styled-components';
import { THEME } from '../../theme';

const Wrap = styled.div`
  color: ${THEME.text.secondary};
  text-align: center;
  padding: 20px 12px;
  font-size: 0.78rem;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
`;
const Icon = styled.div`
  font-size: 1.6rem;
  margin-bottom: 6px;
`;
const Hint = styled.div`
  font-size: 0.68rem;
  opacity: 0.7;
  margin-top: 4px;
`;
const Cta = styled.button`
  margin-top: 8px;
  padding: 6px 14px;
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  border-radius: ${THEME.radius.sm};
  border: 1px solid ${THEME.accent.green};
  background: transparent;
  color: ${THEME.accent.green};
  cursor: pointer;
  &:hover { background: ${THEME.alpha(THEME.accent.green, 0.1)}; }
`;

export function EmptyState({ icon = '◈', title, hint, ctaLabel, onCta }: { icon?: string; title: string; hint?: string; ctaLabel?: string; onCta?: () => void; }) {
  return (
    <Wrap>
      <Icon>{icon}</Icon>
      <div>{title}</div>
      {hint && <Hint>{hint}</Hint>}
      {ctaLabel && onCta && <Cta onClick={onCta}>{ctaLabel}</Cta>}
    </Wrap>
  );
}
