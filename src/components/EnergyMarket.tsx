import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useGameStore } from '../hooks/useGameStore';
import { useGameActions } from '../hooks/useGameActions';
import { ActionButton } from './ui/ActionButton';
import { SystemIcon } from './ui/SystemIcon';
import { TxConfirm } from './ui/TxConfirm';
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
  padding: 6px 0; border-bottom: 1px solid ${THEME.alpha(THEME.border, 0.3)};
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

const HintLine = styled.div`
  color: ${THEME.text.secondary};
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  margin: -2px 0 8px;
  opacity: 0.85;
`;

const SortRow = styled.div`
  display: flex; gap: 4px; margin-bottom: 6px; flex-wrap: wrap;
`;
const SortBtn = styled.button<{ $active: boolean }>`
  padding: 4px 8px;
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid ${({ $active }) => $active ? THEME.accent.gold : THEME.border};
  background: ${({ $active }) => $active ? THEME.alpha(THEME.accent.gold, 0.12) : 'transparent'};
  color: ${({ $active }) => $active ? THEME.accent.gold : THEME.text.secondary};
`;

const SectionSubTitle = styled.div`
  color: ${THEME.text.secondary};
  font-size: 0.68rem;
  font-family: 'Courier New', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 10px 0 4px;
  opacity: 0.7;
`;

export function EnergyMarket() {
  const { t } = useI18n();
  const ses = useGameStore(s => s.sesBalance);
  const loading = useGameStore(s => s.loading);
  const activeAction = useGameStore(s => s.activeAction);
  const marketLoading = activeAction !== null && activeAction.startsWith('market.');
  const orders = useGameStore(s => s.marketOrders);
  const { createEnergyOrder, fillEnergyOrder, cancelEnergyOrder } = useGameActions();

  // #59 记忆上次卖出参数
  const [sellAmount, setSellAmount] = useState(() => {
    try { return localStorage.getItem('ses_sell_amt') ?? '5000'; } catch { return '5000'; }
  });
  const [sellPrice, setSellPrice] = useState(() => {
    try { return localStorage.getItem('ses_sell_price') ?? '0.010'; } catch { return '0.010'; }
  });
  const [sort, setSort] = useState<'price' | 'amount'>('price');
  const [buyPick, setBuyPick] = useState<{ id: number; price: number; remaining: number; amount: number } | null>(null);
  const [buyAmt, setBuyAmt] = useState('');

  const playerEnergy = useGameStore(s => s.playerCiv?.energy ?? 0);

  useEffect(() => { try { localStorage.setItem('ses_sell_amt', sellAmount); } catch { /* ignore */ } }, [sellAmount]);
  useEffect(() => { try { localStorage.setItem('ses_sell_price', sellPrice); } catch { /* ignore */ } }, [sellPrice]);

  const handleSell = async () => {
    const amt = Number(sellAmount), price = parseFloat(sellPrice);
    if (!amt || isNaN(price)) return;
    await createEnergyOrder(amt, price);
  };

  // #62 数值输入过滤
  const onSellAmount = (v: string) => {
    const f = v.replace(/[^0-9]/g, '').slice(0, 10);
    setSellAmount(f);
  };
  const onSellPrice = (v: string) => {
    const f = v.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1').slice(0, 10);
    setSellPrice(f);
  };

  // 实时预览：卖出能量 × 单价 = 预计获得 SES
  const amtNum = Number(sellAmount);
  const priceNum = parseFloat(sellPrice);
  const previewSES = !isNaN(amtNum) && !isNaN(priceNum) && amtNum > 0 && priceNum > 0 ? amtNum * priceNum : null;
  const canSell = previewSES !== null && amtNum <= playerEnergy && amtNum > 0 && priceNum > 0;
  const isLargeAmount = amtNum > 1_000_000;

  // #45 sort + #46 best price hint + #60 my/public 分区
  const { myOrders, publicOrders, bestPrice } = useMemo(() => {
    const mine = orders.filter(o => o.isMine);
    const pub = orders.filter(o => !o.isMine);
    const sortedPub = [...pub].sort((a, b) => sort === 'price' ? a.price - b.price : b.amount - a.amount);
    const sortedMine = [...mine].sort((a, b) => a.price - b.price);
    const best = sortedPub[0]?.price ?? null;
    return { myOrders: sortedMine, publicOrders: sortedPub, bestPrice: best };
  }, [orders, sort]);

  const sesNum = parseFloat(ses);

  // #43 partial buy modal helpers
  const openBuy = (o: { id: number; price: number; amount: number; remaining: number }) => {
    setBuyPick(o);
    const remaining = o.remaining > 0 ? o.remaining : o.amount;
    // 默认买满或能负担的最大值
    const affordable = o.price > 0 ? Math.floor(sesNum / o.price) : remaining;
    const def = Math.min(remaining, Math.max(1, affordable));
    setBuyAmt(String(Math.max(1, Math.min(remaining, def || remaining))));
  };
  const handleConfirmBuy = async () => {
    if (!buyPick) return;
    const n = Number(buyAmt);
    if (!n || n <= 0 || n > buyPick.remaining) return;
    const cost = buyPick.price * n;
    if (sesNum < cost) return;
    await fillEnergyOrder(buyPick.id, n);
    setBuyPick(null);
    setBuyAmt('');
  };
  const buyPreviewCost = buyPick ? buyPick.price * (Number(buyAmt) || 0) : 0;
  const buyMaxUnit = buyPick ? buyPick.price * 1.1 : 0;
  const buyCan = buyPick ? (Number(buyAmt) > 0 && Number(buyAmt) <= buyPick.remaining && sesNum >= buyPreviewCost) : false;

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
        <div style={{ display: 'flex', gap: 6 }}>
          <Input placeholder={t('market.sell_placeholder_energy')} value={sellAmount}
            onChange={e => onSellAmount(e.target.value)} inputMode="numeric" />
          <ActionButton variant="ghost" onClick={() => setSellAmount(String(Math.floor(playerEnergy)))} disabled={playerEnergy <= 0}>{t('market.sell_max')}</ActionButton>
        </div>
      </FieldRow>
      <FieldRow>
        <FieldLabel><SystemIcon icon="/assets/systems/ses.web.png" /> {t('market.sell_label_price')}
          <FieldHint>{t('market.sell_unit_price')}</FieldHint>
        </FieldLabel>
        <Input placeholder={t('market.sell_placeholder_price')} value={sellPrice}
          onChange={e => onSellPrice(e.target.value)} inputMode="decimal" />
      </FieldRow>
      <PreviewRow $valid={!!canSell}>
        <PreviewLeft><SystemIcon icon="/assets/systems/ses.web.png" /> {t('market.preview_receive')}</PreviewLeft>
        <PreviewValue>{previewSES !== null ? fmt(previewSES) : '—'}</PreviewValue>
      </PreviewRow>
      {previewSES !== null && <HintLine>{t('market.total_price', { price: fmt(previewSES, 4) })} · {t('market.slippage_hint', { pct: '10', price: fmt(priceNum * 1.1, 4) } as unknown as Record<string, string|number>) as string}</HintLine>}
      {isLargeAmount && previewSES !== null && <HintLine style={{ color: THEME.accent.gold }}>{t('market.precision_warn')}</HintLine>}
      {previewSES !== null && !canSell && (
        <WarnHint>{t('market.insufficient_energy')}</WarnHint>
      )}
      <ActionButton variant="primary" onClick={handleSell} disabled={loading || !canSell} loading={marketLoading && activeAction === 'market.sell'} style={{ width: '100%' }}>
        {t('market.sell_btn')}
      </ActionButton>

      {/* Best price hint (#46) */}
      {bestPrice != null && (
        <HintLine style={{ marginTop: 8 }}>{t('market.best_price', { price: fmt(bestPrice, 4) })}</HintLine>
      )}

      {/* Sort controls (#45) */}
      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <SectionSubTitle style={{ margin: 0 }}>{t('market.active_orders')}</SectionSubTitle>
        <SortRow>
          <SortBtn $active={sort === 'price'} onClick={() => setSort('price')}>{t('market.sort_price')}</SortBtn>
          <SortBtn $active={sort === 'amount'} onClick={() => setSort('amount')}>{t('market.sort_amount')}</SortBtn>
        </SortRow>
      </div>

      <div style={{ maxHeight: 320, overflowY: 'auto' }}>
        {/* #60 我的挂单 */}
        {myOrders.length > 0 && (
          <>
            <SectionSubTitle><SystemIcon icon="/assets/systems/arrow.web.png" /> {t('market.my_orders')} · {myOrders.length}</SectionSubTitle>
            {myOrders.map((o) => (
              <OrderRow key={`mine-${o.id}`}>
                <div style={{ flex: 1 }}>
                  <Sell>{t('market.order_energy', { amt: fmt(o.remaining) })}</Sell>
                  <span style={{ color: THEME.text.secondary, fontSize: '0.66rem' }}> / {fmt(o.amount)}</span>
                  {' @ '}
                  <Buy>{t('market.order_price', { price: fmt(o.price, 4) })}</Buy>
                  <div style={{ fontSize: '0.65rem', color: THEME.text.secondary }}>{o.seller} {t('market.order_you')}</div>
                </div>
                <ActionButton variant="danger" onClick={() => handleCancel(o)} disabled={loading}>{t('market.cancel_btn')}</ActionButton>
              </OrderRow>
            ))}
          </>
        )}

        {/* 公共挂单 */}
        <SectionSubTitle>{t('market.public_orders')} · {publicOrders.length}</SectionSubTitle>
        {publicOrders.length === 0 && myOrders.length === 0 ? (
          <Row style={{ justifyContent: 'center', color: THEME.text.secondary, padding: 16 }}>
            {t('market.empty')}
          </Row>
        ) : publicOrders.length === 0 ? (
          <Row style={{ justifyContent: 'center', color: THEME.text.secondary, padding: 12 }}>
            {t('market.empty')}
          </Row>
        ) : publicOrders.map((o) => (
          <OrderRow key={`${o.id}`}>
            <div style={{ flex: 1 }}>
              <Sell>{t('market.order_energy', { amt: fmt(o.remaining) })}</Sell>
              <span style={{ color: THEME.text.secondary, fontSize: '0.66rem' }}> / {fmt(o.amount)}</span>
              {' @ '}
              <Buy>{t('market.order_price', { price: fmt(o.price, 4) })}</Buy>
              <div style={{ fontSize: '0.65rem', color: THEME.text.secondary }}>{o.seller}</div>
            </div>
            <ActionButton variant="primary" onClick={() => openBuy(o)} disabled={loading}
              title={sesNum < o.price * (o.remaining > 0 ? o.remaining : o.amount) ? t('market.buy_no_ses') : undefined}>
              {t('market.buy_btn')}
            </ActionButton>
          </OrderRow>
        ))}
      </div>

      {/* #61 买入二次确认 + #43 部分数量 */}
      <TxConfirm
        open={!!buyPick}
        title={buyPick ? t('market.buy_confirm_title', { amount: Number(buyAmt) || 0 }) : t('market.buy_btn')}
        icon="/assets/systems/ses.web.png"
        onConfirm={handleConfirmBuy}
        onCancel={() => { setBuyPick(null); setBuyAmt(''); }}
        confirmVariant="primary"
        confirmLabel={t('market.buy_btn')}
        loading={loading}
      >
        {buyPick && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ color: THEME.text.secondary, fontSize: '0.75rem' }}>{t('market.buy_partial_placeholder')} (max {fmt(buyPick.remaining)})</label>
              <Input value={buyAmt} onChange={e => setBuyAmt(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))} inputMode="numeric" placeholder={t('market.buy_partial_placeholder')} />
              <div style={{ color: sesNum < buyPreviewCost ? THEME.accent.red : THEME.accent.green, fontSize: '0.78rem' }}>
                {t('market.buy_confirm_body', { cost: fmt(buyPreviewCost, 4), unit: fmt(buyMaxUnit, 4) })}
              </div>
              {!buyCan && Number(buyAmt) > 0 && <WarnHint>{sesNum < buyPreviewCost ? t('market.buy_no_ses') : `数量需 1–${fmt(buyPick.remaining)}`}</WarnHint>}
              <HintLine>{t('market.slippage_hint', { pct: '10', price: fmt(buyMaxUnit, 4) } as unknown as Record<string, string|number>) as string}</HintLine>
            </div>
          </>
        )}
      </TxConfirm>
    </Panel>
  );
}
