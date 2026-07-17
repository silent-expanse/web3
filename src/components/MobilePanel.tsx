import { type ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  open: boolean;
  title: string;
  color: string;
  children: ReactNode;
  onClose: () => void;
}

const Backdrop = styled.div<{ $open: boolean }>`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: opacity 0.25s ease;
  z-index: 150;
`;

const Sheet = styled.div<{ $open: boolean }>`
  position: absolute;
  bottom: 56px;
  left: 0;
  right: 0;
  max-height: 55vh;
  background: rgba(0, 0, 0, 0.92);
  border-top: 1px solid rgba(0, 255, 136, 0.12);
  border-radius: 16px 16px 0 0;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  pointer-events: auto;
  z-index: 155;
  transform: translateY(${({ $open }) => ($open ? '0' : '100%')});
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
  display: flex;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom, 0px);
`;

const Header = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

const Title = styled.div<{ $color: string }>`
  color: ${({ $color }) => $color};
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const CloseBtn = styled.button`
  background: rgba(255, 255, 255, 0.08);
  border: none;
  color: #446688;
  font-size: 1.2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  -webkit-tap-highlight-color: transparent;
  &:active { background: rgba(255, 255, 255, 0.15); }
`;

const Body = styled.div`
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 16px;
  flex: 1;
  max-height: calc(55vh - 52px);
  font-size: 0.85rem;

  &::-webkit-scrollbar { width: 3px; }
  &::-webkit-scrollbar-thumb { background: rgba(0, 255, 136, 0.15); border-radius: 2px; }
`;

const PullHandle = styled.div`
  width: 36px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.15);
  margin: 8px auto 0;
`;

export function MobilePanel({ open, title, color, children, onClose }: Props) {
  return (
    <>
      <Backdrop $open={open} onClick={onClose} />
      <Sheet $open={open}>
        <PullHandle />
        <Header $color={color}>
          <Title $color={color}>{title}</Title>
          <CloseBtn onClick={onClose}>✕</CloseBtn>
        </Header>
        <Body>{children}</Body>
      </Sheet>
    </>
  );
}
