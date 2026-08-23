import { type ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { THEME } from '../../theme';
import { ActionButton } from './ActionButton';
import { SystemIcon } from './SystemIcon';

interface TxConfirmProps {
  open: boolean;
  title: string;
  icon?: string;
  children?: ReactNode;
  gasEstimate?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: 'primary' | 'danger';
}

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 500;
  background: rgba(0, 0, 0, 0.6);
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Modal = styled.div`
  background: ${THEME.card};
  border: 1px solid ${THEME.border};
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 380px;
  backdrop-filter: blur(12px);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${THEME.border};
`;

const Title = styled.div`
  color: ${THEME.text.primary};
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 1px;
`;

const Body = styled.div`
  color: ${THEME.text.secondary};
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const Footer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const Gas = styled.div`
  color: ${THEME.alpha(THEME.text.secondary, 0.6)};
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  margin-top: 8px;
  text-align: right;
`;

/**
 * TxConfirm — 交易确认弹窗
 *
 * 用法:
 *   <TxConfirm
 *     open={showConfirm}
 *     title="攻击 Mars"
 *     onConfirm={handleAttack}
 *     onCancel={() => setShowConfirm(false)}
 *     confirmVariant="danger"
 *   >
 *     消耗: 3,000 能量 + 1 令牌<br />
 *     掠夺: 15% SES
 *   </TxConfirm>
 */
export function TxConfirm({
  open, title, icon, children, gasEstimate,
  loading, onConfirm, onCancel,
  confirmLabel = '确认', cancelLabel = '取消',
  confirmVariant = 'primary',
}: TxConfirmProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // #90: Esc 关闭 + 禁止背景滚动 + 焦点管理
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
      if (e.key === 'Tab' && overlayRef.current) {
        const els = overlayRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), [href]');
        if (els.length === 0) return;
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // 自动聚焦确认按钮（最后一个 button）
    setTimeout(() => {
      const btns = overlayRef.current?.querySelectorAll<HTMLButtonElement>('button');
      btns?.[btns.length - 1]?.focus();
    }, 30);
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, onCancel]);

  return (
    <Overlay $open={open} ref={overlayRef} role="dialog" aria-modal="true" aria-label={title} aria-busy={loading ? 'true' : undefined} onClick={onCancel}>
      <Modal onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <Header>
          <Title id="txconfirm-title">{icon && <SystemIcon icon={icon} />} {title}</Title>
        </Header>
        <Body>{children}</Body>
        {gasEstimate && <Gas>⛽ Gas: ~{gasEstimate}</Gas>}
        <Footer>
          <ActionButton variant="ghost" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </ActionButton>
          <ActionButton variant={confirmVariant} onClick={onConfirm} loading={loading} aria-label={confirmLabel}>
            {confirmLabel}
          </ActionButton>
        </Footer>
      </Modal>
    </Overlay>
  );
}
