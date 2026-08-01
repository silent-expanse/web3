import { useState } from 'react';
import styled from 'styled-components';
import { useGameStore } from '../hooks/useGameStore';
import { useGameActions } from '../hooks/useGameActions';
import { ActionButton } from './ui/ActionButton';
import { THEME } from '../theme';
import { useI18n } from '../hooks/useI18n';
import { fmt } from '../utils/format';

const Panel = styled.div`
  background: ${THEME.card};
  border: 1px solid ${THEME.border};
  border-radius: 8px;
  padding: 14px 16px;
`;

const SectionTitle = styled.div`
  color: ${THEME.text.secondary};
  font-size: 0.72rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%; padding: 8px; font-size: 0.78rem; font-family: 'Courier New', monospace;
  background: ${THEME.bg}; border: 1px solid ${THEME.border};
  border-radius: 6px; color: ${THEME.text.primary}; outline: none;
  &:focus { border-color: ${THEME.accent.green}; }
`;

const Row = styled.div`
  display: flex; align-items: center; gap: 6px; margin-bottom: 4px;
`;

const OrderRow = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 5px 0; border-bottom: 1px solid ${THEME.alpha(THEME.border, 0.3)};
  font-size: 0.75rem; font-family: 'Courier New', monospace;
  &:last-child { border-bottom: none; }
`;

const Sell = styled.span` color: ${THEME.accent.red}; `;
const Buy = styled.span` color: ${THEME.accent.green}; `;

export function EnergyMarket() {
  const { t } = useI18n();
  const ses = useGameStore(s => s.sesBalance);
  const address = useGameStore(s => s.address);
  const loading = useGameStore(s => s.loading);
  const orders = useGameStore(s => s.marketOrders);
  const { createEnergyOrder, fillEnergyOrder, cancelEnergyOrder } = useGameActions();

  const [sellAmount, setSellAmount] = useState('5000');
  const [sellPrice, setSellPrice] = useState('0.010');

  const handleSell = async () => {
    const amt = Number(sellAmount), price = parseFloat(sellPrice);
    if (!amt || isNaN(price)) return;
    await createEnergyOrder(amt, price);
  };
  const handleBuy = async (order: { id: number; price: number; amount: number }) => {
    const cost = order.price * order.amount;
    if (parseFloat(ses) < cost) return;
    await fillEnergyOrder(order.id, order.price);
  };
  const handleCancel = async (order: { id: number }) => {
    await cancelEnergyOrder(order.id);
  };

  return (
    <Panel>
      <SectionTitle>{t('market.title')}</SectionTitle>
      <Row>
        <Input placeholder={t('market.sell_placeholder_energy')} value={sellAmount}
          onChange={e => setSellAmount(e.target.value)} style={{ flex: 1 }} />
        <Input placeholder={t('market.sell_placeholder_price')} value={sellPrice}
          onChange={e => setSellPrice(e.target.value)} style={{ flex: 1 }} />
        <ActionButton variant="primary" onClick={handleSell} disabled={loading} style={{ flexShrink: 0 }}>
          {t('market.sell_btn')}
        </ActionButton>
      </Row>

      <div style={{ marginTop: 10, maxHeight: 280, overflowY: 'auto' }}>
        {orders.length === 0 ? (
          <Row style={{ justifyContent: 'center', color: THEME.text.secondary, padding: 16 }}>
            {t('market.empty')}
          </Row>
        ) : orders.map((o, i) => (
          <OrderRow key={`${o.id}-${i}`}>
            <div style={{ flex: 1 }}>
              <Sell>{t('market.order_energy', { amt: fmt(o.amount) })}</Sell>
              {' @ '}
              <Buy>{t('market.order_price', { price: fmt(o.price, 4) })}</Buy>
              <div style={{ fontSize: '0.65rem', color: THEME.text.secondary }}>{o.seller}{o.isMine ? ` ${t('market.order_you')}` : ''}</div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {o.isMine ? (
                <ActionButton variant="danger" onClick={() => handleCancel(o)} disabled={loading}>{t('market.cancel_btn')}</ActionButton>
              ) : (
                <ActionButton variant="primary" onClick={() => handleBuy(o)} disabled={loading || parseFloat(ses) < o.price * o.amount}>
                  {t('market.buy_btn')}
                </ActionButton>
              )}
            </div>
          </OrderRow>
        ))}
      </div>
    </Panel>
  );
}
