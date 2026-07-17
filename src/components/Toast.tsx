import styled, { keyframes } from 'styled-components';
import { useGameStore, type Toast as ToastType } from '../hooks/useGameStore';
import { THEME } from '../theme';

const slideIn = keyframes`
  from { transform: translateX(120%); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
`;

const Container = styled.div`
  position: absolute;
  top: 80px;
  right: 12px;
  z-index: 300;
  display: flex;
  flex-direction: column;
  gap: 6px;
  pointer-events: none;
  max-width: min(320px, 80vw);
`;

const Item = styled.div<{ $type: ToastType['type'] }>`
  pointer-events: auto;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  animation: ${slideIn} 0.3s ease-out;
  border: 1px solid;

  ${({ $type }) => {
    switch ($type) {
      case 'success':
        return `
          color: ${THEME.accent.green};
          background: ${THEME.alpha(THEME.accent.green, 0.1)};
          border-color: ${THEME.alpha(THEME.accent.green, 0.3)};
        `;
      case 'error':
        return `
          color: ${THEME.accent.red};
          background: ${THEME.alpha(THEME.accent.red, 0.1)};
          border-color: ${THEME.alpha(THEME.accent.red, 0.3)};
        `;
      case 'info':
      default:
        return `
          color: ${THEME.accent.blue};
          background: ${THEME.alpha(THEME.accent.blue, 0.1)};
          border-color: ${THEME.alpha(THEME.accent.blue, 0.3)};
        `;
    }
  }}
`;

export function ToastContainer() {
  const toasts = useGameStore(s => s.toasts);
  const removeToast = useGameStore(s => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <Container>
      {toasts.map(t => (
        <Item key={t.id} $type={t.type} onClick={() => removeToast(t.id)}>
          {t.type === 'success' && '✅ '}
          {t.type === 'error' && '❌ '}
          {t.type === 'info' && 'ℹ️ '}
          {t.message}
        </Item>
      ))}
    </Container>
  );
}
