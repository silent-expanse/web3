import { useState } from 'react';
import styled from 'styled-components';
import { useGameStore } from '../hooks/useGameStore';
import { useGameActions } from '../hooks/useGameActions';
import { ActionButton } from './ui/ActionButton';
import { SystemIcon } from './ui/SystemIcon';
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

const FieldRow = styled.div`
  display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px;
`;

const FieldLabel = styled.label`
  display: flex; align-items: center; gap: 6px;
  color: ${THEME.text.secondary}; font-size: 0.72rem;
  font-family: 'Courier New', monospace; font-weight: bold;
  letter-spacing: 0.5px;
`;

const FieldHint = styled.span`
  margin-left: auto; color: ${THEME.alpha(THEME.text.secondary, 0.6)};
  font-size: 0.68rem; font-weight: normal;
`;

const PreviewRow = styled.div<{ $valid: boolean }>`
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 10px; margin-bottom: 8px;
  border: 1px dashed ${({ $valid }) => ($valid ? THEME.alpha(THEME.accent.green, 0.5) : THEME.border)};
  border-radius: 6px;
  background: ${THEME.alpha(THEME.bg, 0.4)};
`;

const PreviewLeft = styled.span`
  display: flex; align-items: center; gap: 6px;
  color: ${THEME.text.secondary}; font-size: 0.75rem;
  font-family: 'Courier New', monospace;
`;

const PreviewValue = styled.span`
  color: ${THEME.accent.green}; font-size: 0.9rem; font-weight: bold;
  font-family: 'Courier New', monospace;
`;

const WarnHint = styled.div`
  color: ${THEME.accent.red}; font-size: 0.7rem;
  font-family: 'Courier New', monospace; margin: -4px 0 8px;
`;

export function EnergyMarket() {
  const { t } = useI18n();
  const ses = useGameStore(s => s.sesBalance);
  const address = useGameStore(s => s.address);
  const loading = useGameStore(s => s.loading);
  const orders = useGameStore(s => s.marketOrders);
  const { createEnergyOrder, fillEnergyOrder, cancelEnergyOrder } = useGameActions();

  const [sellAmount, setSellAmount] = useState('5000');
  const [sellPrice, setSellPrice] = useState('0.010');
  const playerEnergy = useGameStore(s => s.playerCiv?.energy ?? 0);

  const handleSell = async () => {
    const amt = Number(sellAmount), price = parseFloat(sellPrice);
    if (!amt || isNaN(price)) return;
    await createEnergyOrder(amt, price);
  };

  // 实时预览：卖出能量 × 单价 = 预计获得 SES
  const amtNum = Number(sellAmount);
  const priceNum = parseFloat(sellPrice);
  const previewSES = !isNaN(amtNum) && !isNaN(priceNum) && amtNum > 0 && priceNum > 0 ? amtNum * priceNum : null;
  const canSell = previewSES !== null && amtNum <= playerEnergy;
  const handleBuy = async (order: { id: number; price: number; amount: number; remaining: number }) => {
    const buyAmount = order.remaining > 0 ? order.remaining : order.amount;
    const cost = order.price * buyAmount;
    if (parseFloat(ses) < cost) return;
    // 购买挂单剩余能量；fillEnergyOrder 按 remaining 精确结算（传 energyAmount）
    await fillEnergyOrder(order.id, buyAmount);
  };
  const handleCancel = async (order: { id: number }) => {
    await cancelEnergyOrder(order.id);
  };

  return (
    <Panel>
      <SectionTitle><SystemIcon icon="/assets/systems/ses.web.png" /> {t('market.title')}</SectionTitle>

      {/* ── 卖出挂单：能量 → SES ── */}
      <FieldRow>
        <FieldLabel><SystemIcon icon="/assets/systems/energy.web.png" /> {t('market.sell_label_energy')}
          <FieldHint>{t('market.your_energy')}: {fmt(playerEnergy)}</FieldHint>
        </FieldLabel>
        <Input placeholder={t('market.sell_placeholder_energy')} value={sellAmount}
          onChange={e => setSellAmount(e.target.value)} />
      </FieldRow>
      <FieldRow>
        <FieldLabel><SystemIcon icon="/assets/systems/ses.web.png" /> {t('market.sell_label_price')}
          <FieldHint>{t('market.sell_unit_price')}</FieldHint>
        </FieldLabel>
        <Input placeholder={t('market.sell_placeholder_price')} value={sellPrice}
          onChange={e => setSellPrice(e.target.value)} />
      </FieldRow>
      <PreviewRow $valid={canSell}>
        <PreviewLeft><SystemIcon icon="/assets/systems/ses.web.png" /> {t('market.preview_receive')}</PreviewLeft>
        <PreviewValue>{previewSES !== null ? fmt(previewSES) : '—'}</PreviewValue>
      </PreviewRow>
      {previewSES !== null && !canSell && (
        <WarnHint>{t('market.insufficient_energy')}</WarnHint>
      )}
      <ActionButton variant="primary" onClick={handleSell} disabled={loading || !canSell} style={{ width: '100%' }}>
        {t('market.sell_btn')}
      </ActionButton>

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
              ) : (() => {
                const buyQty = o.remaining > 0 ? o.remaining : o.amount;
                const noSes = parseFloat(ses) < o.price * buyQty;
                return (
                  <ActionButton variant="primary" onClick={() => handleBuy(o)} disabled={loading || noSes}
                    title={noSes ? t('market.buy_no_ses') : undefined}>
                    {t('market.buy_btn')}
                  </ActionButton>
                );
              })()}
            </div>
          </OrderRow>
        ))}
      </div>
    </Panel>
  );
}
