import { type ReactNode } from 'react';
import styled from 'styled-components';
import { THEME } from '../../theme';
import { ActionButton } from './ActionButton';

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
 *     title="⚔️ 攻击 Mars"
 *     onConfirm={handleAttack}
 *     onCancel={() => setShowConfirm(false)}
 *     confirmVariant="danger"
 *   >
 *     消耗: 3,000 能量 + 1 令牌<br />
 *     掠夺: 15% DFT
 *   </TxConfirm>
 */
export function TxConfirm({
  open, title, icon, children, gasEstimate,
  loading, onConfirm, onCancel,
  confirmLabel = '确认', cancelLabel = '取消',
  confirmVariant = 'primary',
}: TxConfirmProps) {
  return (
    <Overlay $open={open} onClick={onCancel}>
      <Modal onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <Header>
          <Title>{icon || ''} {title}</Title>
        </Header>
        <Body>{children}</Body>
        {gasEstimate && <Gas>⛽ Gas: ~{gasEstimate}</Gas>}
        <Footer>
          <ActionButton variant="ghost" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </ActionButton>
          <ActionButton variant={confirmVariant} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </ActionButton>
        </Footer>
      </Modal>
    </Overlay>
  );
}
