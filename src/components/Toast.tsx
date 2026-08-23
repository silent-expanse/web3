import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import { useGameStore, type Toast as ToastType } from '../hooks/useGameStore';
import { useI18n } from '../hooks/useI18n';
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
  @media (max-width: 767px) {
    left: 12px;
    right: 12px;
    top: 56px;
    max-width: none;
    align-items: stretch;
  }
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

const CopyBtn = styled.button`
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid ${THEME.alpha(THEME.accent.blue, 0.4)};
  background: ${THEME.alpha(THEME.accent.blue, 0.15)};
  color: ${THEME.accent.blue};
  font-family: 'Courier New', monospace;
  font-size: 0.7rem;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  &:hover {
    background: ${THEME.alpha(THEME.accent.blue, 0.3)};
  }
  &:active {
    transform: scale(0.95);
  }
`;

const MsgRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  word-break: break-all;
`;

const TxLink = styled.a`
  color: ${THEME.accent.gold};
  font-size: 0.7rem;
  margin-left: 8px;
  text-decoration: underline;
  white-space: nowrap;
  flex-shrink: 0;
  &:hover { opacity: 0.8; }
`;

function ToastItem({ t: toastMsg }: { t: ToastType }) {
  const removeToast = useGameStore(s => s.removeToast);
  const [copied, setCopied] = useState(false);

  const { t } = useI18n();
  const explorerUrl = toastMsg.txHash ? `https://bscscan.com/tx/${toastMsg.txHash}` : null;
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(toastMsg.message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard 不可用 (非 HTTPS / 权限) 时回退到 select
      try {
        const ta = document.createElement('textarea');
        ta.value = toastMsg.message;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        // 最后回退: 什么都不做
      }
    }
  };

  return (
    <Item $type={toastMsg.type} onClick={() => removeToast(toastMsg.id)} title="点击关闭">
      <MsgRow>
        <span>
          {toastMsg.type === 'success' && '✓ '}
          {toastMsg.type === 'error' && '✕ '}
          {toastMsg.type === 'info' && 'ℹ '}
          {toastMsg.message}
        </span>
        {explorerUrl && <TxLink href={explorerUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>{t('general.tx_view')}</TxLink>}
        <CopyBtn onClick={handleCopy} title={t('nav.copy_addr')}>
          {copied ? t('toast.copied') : t('nav.copy_addr')}
        </CopyBtn>
      </MsgRow>
    </Item>
  );
}

export function ToastContainer() {
  const toasts = useGameStore(s => s.toasts);

  if (toasts.length === 0) return null;

  return (
    <Container aria-live="polite" aria-atomic="true">
      {toasts.map(t => (
        <ToastItem key={t.id} t={t} />
      ))}
    </Container>
  );
}
