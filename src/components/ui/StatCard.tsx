import { type ReactNode } from 'react';
import styled from 'styled-components';
import { THEME } from '../../theme';
import { ResourceBar } from './ResourceBar';

interface StatCardProps {
  icon: string;
  title: string;
  level?: number;
  levelKey?: string;
  children?: ReactNode;
  bars?: { label: string; value: number; max?: number; rate?: string; color?: string }[];
  actions?: ReactNode;
  warn?: boolean;
}

const Card = styled.div<{ $warn?: boolean }>`
  background: ${THEME.alpha(THEME.card, 0.6)};
  border: 1px solid ${({ $warn }) => ($warn ? THEME.status.warning : THEME.border)};
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: border-color 0.2s;
  &:hover { border-color: ${({ $warn }) => ($warn ? THEME.status.warning : THEME.alpha(THEME.accent.green, 0.3))}; }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 4px;
`;

const Title = styled.span`
  color: ${THEME.text.primary};
  font-size: 0.82rem;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Level = styled.span`
  color: ${THEME.text.secondary};
  font-size: 0.7rem;
  font-family: 'Courier New', monospace;
  background: ${THEME.alpha(THEME.text.secondary, 0.08)};
  border-radius: 3px;
  padding: 1px 6px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

const Actions = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

export function StatCard({ icon, title, level, levelKey = 'Lv', children, bars, actions, warn }: StatCardProps) {
  return (
    <Card $warn={warn}>
      <Header>
        <Title>{icon} {title}</Title>
        {level !== undefined && <Level>{levelKey}.{level}</Level>}
      </Header>
      <Body>
        {bars?.map((b, i) => (
          <ResourceBar key={i} {...b} />
        ))}
        {children}
      </Body>
      {actions && <Actions>{actions}</Actions>}
    </Card>
  );
}
