import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { formatEther, isAddress } from 'ethers';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useGameStore } from '../hooks/useGameStore';
import { civFromRaw, useGameActions } from '../hooks/useGameActions';
import { useContract } from '../hooks/useContract';
import { useIsMobile } from '../hooks/useMediaQuery';
import { useI18n } from '../hooks/useI18n';
import { THEME } from '../theme';
import { SpaceBackground } from './SpaceBackground';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  pointer-events: auto;
  z-index: 200;
  padding: 24px 16px;
  padding-top: env(safe-area-inset-top, 24px);
  padding-bottom: env(safe-area-inset-bottom, 24px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const Title = styled.h1<{ $mobile: boolean }>`
  font-size: ${({ $mobile }) => ($mobile ? '2.5rem' : '4rem')};
  color: ${THEME.accent.green};
  font-family: 'Courier New', monospace;
  letter-spacing: ${({ $mobile }) => ($mobile ? '6px' : '12px')};
  text-shadow: 0 0 40px ${THEME.alpha(THEME.accent.green, 0.5)};
  margin-bottom: 8px;
  animation: ${float} 3s ease-in-out infinite;
  text-align: center;
  word-break: break-word;
`;

const Subtitle = styled.p<{ $mobile: boolean }>`
  color: ${THEME.text.secondary};
  font-size: ${({ $mobile }) => ($mobile ? '0.9rem' : '1.1rem')};
  font-family: 'Courier New', monospace;
  letter-spacing: ${({ $mobile }) => ($mobile ? '3px' : '6px')};
  margin-bottom: 24px;
  text-align: center;
`;

/* ─── Lore narrative ─── */
const LoreSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 20px;
  max-width: 520px;
  text-align: center;
`;

const LoreEngineTitle = styled.div`
  color: ${THEME.alpha(THEME.accent.green, 0.6)};
  font-size: 0.7rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 8px;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoreLine = styled.div`
  color: ${THEME.alpha(THEME.text.primary, 0.85)};
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
`;

const LoreProtocol = styled.div`
  color: ${THEME.alpha(THEME.text.secondary, 0.7)};
  font-size: 0.75rem;
  font-family: 'Courier New', monospace;
  line-height: 1.5;
  margin-top: 4px;
  max-width: 440px;
  white-space: pre-line;
`;

const LoreDivider = styled.div`
  width: 60px;
  height: 1px;
  background: ${THEME.alpha(THEME.accent.green, 0.3)};
  margin: 8px 0 12px;
`;

const ActionButton = styled.button<{ $mobile: boolean }>`
  padding: ${({ $mobile }) => ($mobile ? '14px 32px' : '16px 48px')};
  font-size: ${({ $mobile }) => ($mobile ? '1rem' : '1.2rem')};
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: ${THEME.accent.green};
  background: transparent;
  border: 2px solid ${THEME.accent.green};
  border-radius: 8px;
  cursor: pointer;
  letter-spacing: 4px;
  transition: all 0.3s ease;
  min-height: 48px;
  -webkit-tap-highlight-color: transparent;
  &:hover { background: ${THEME.alpha(THEME.accent.green, 0.1)}; box-shadow: 0 0 50px ${THEME.alpha(THEME.accent.green, 0.4)}; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
  &:active { background: ${THEME.alpha(THEME.accent.green, 0.2)}; }
`;

const Input = styled.input<{ $mobile: boolean }>`
  padding: 12px 16px;
  font-size: ${({ $mobile }) => ($mobile ? '0.95rem' : '1rem')};
  font-family: 'Courier New', monospace;
  background: ${THEME.alpha(THEME.accent.green, 0.05)};
  border: 1px solid ${THEME.alpha(THEME.accent.green, 0.3)};
  border-radius: 8px;
  color: ${THEME.accent.green};
  outline: none;
  width: 100%;
  max-width: 360px;
  text-align: center;
  min-height: ${({ $mobile }) => ($mobile ? '44px' : 'auto')};
  &::placeholder { color: ${THEME.alpha(THEME.accent.green, 0.2)}; }
  &:focus { border-color: ${THEME.accent.green}; box-shadow: 0 0 20px ${THEME.alpha(THEME.accent.green, 0.2)}; }
`;

const SmallInput = styled(Input)<{ $mobile: boolean }>`
  font-size: ${({ $mobile }) => ($mobile ? '0.85rem' : '0.85rem')};
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 400px;
`;

const ErrorText = styled.div`
  color: ${THEME.accent.red};
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
  margin-top: 8px;
  text-align: center;
  padding: 0 16px;
`;

const FeeDisplay = styled.div<{ $mobile: boolean }>`
  color: ${THEME.accent.gold};
  font-size: ${({ $mobile }) => ($mobile ? '0.8rem' : '0.85rem')};
  font-family: 'Courier New', monospace;
  background: ${THEME.alpha(THEME.accent.gold, 0.1)};
  border: 1px solid ${THEME.alpha(THEME.accent.gold, 0.3)};
  border-radius: 6px;
  padding: 8px 16px;
  text-align: center;
  max-width: 360px;
  width: 100%;
`;

const Hint = styled.p<{ $mobile: boolean }>`
  color: ${THEME.text.secondary};
  font-size: ${({ $mobile }) => ($mobile ? '0.75rem' : '0.85rem')};
  margin-top: 16px;
  font-family: 'Courier New', monospace;
  text-align: center;
  max-width: 360px;
`;

const StatusText = styled.p`
  color: ${THEME.accent.green};
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 24px;
`;

const WalletBadge = styled.div`
  color: ${THEME.text.secondary};
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  background: ${THEME.alpha(THEME.accent.green, 0.08)};
  border: 1px solid ${THEME.alpha(THEME.accent.green, 0.2)};
  border-radius: 4px;
  padding: 6px 12px;
  text-align: center;
  width: 100%;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 20px;
  width: 100%;
  max-width: 420px;
`;

const LangBtn = styled.button`
  background: none;
  border: 1px solid ${THEME.alpha(THEME.text.secondary, 0.3)};
  border-radius: 4px;
  color: ${THEME.text.secondary};
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  padding: 4px 12px;
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  &:hover { color: ${THEME.accent.green}; border-color: ${THEME.accent.green}; }
`;

const TutorialLink = styled.a`
  color: ${THEME.text.secondary};
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  text-decoration: none;
  transition: color 0.15s;
  &:hover { color: ${THEME.accent.green}; text-decoration: underline; }
`;

const RainbowWrapper = styled.div`
  margin-bottom: 24px;
  /* Override RainbowKit button to match Silent Expanse: Strife theme */
  [data-rk] button {
    font-family: 'Courier New', monospace !important;
  }
`;

/* ════════════════════════════════════════════
   ConnectPanel
   ════════════════════════════════════════════ */

export function ConnectPanel() {
  const [name, setName] = useState('');
  const [referrer, setReferrer] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fee, setFee] = useState('0.01');
  const [checkingCiv, setCheckingCiv] = useState(false);
  const [feeProgress, setFeeProgress] = useState(0);
  const [bnbPrice, setBnbPrice] = useState<number | null>(null);

  const { t, toggleLang } = useI18n();
  const isMobile = useIsMobile();
  const loading = useGameStore(s => s.loading);
  // #02 实时字符计数与校验（需在 t 之后）
  const nameLen = name.length;
  const nameError = nameLen > 32 ? t('connect.name_too_long') : '';

  const { address: wagmiAddress, isConnected: wagmiConnected } = useAccount();
  const ct = useContract();
  const { createCivilization, fetchEntryFee } = useGameActions();

  const shortAddr = wagmiAddress
    ? wagmiAddress.slice(0, 4) + '...' + wagmiAddress.slice(-4)
    : '';

  /* ── ?ref= 参数自动填充（#04） ── */
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const ref = url.searchParams.get('ref') || url.searchParams.get('referrer') || url.searchParams.get('invite');
      if (ref && isAddress(ref) && !referrer) setReferrer(ref);
    } catch { /* ignore */ }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── 钱包/账户切换检测 ── */
  const prevConnected = useRef(false);
  const prevAddress = useRef(wagmiAddress);
  useEffect(() => {
    // 账户切换：断开后重新连了不同的钱包，或者同一个钱包切了账户
    const addressChanged = prevAddress.current && wagmiAddress && prevAddress.current !== wagmiAddress;
    const justDisconnected = prevConnected.current && !wagmiConnected;

    if (justDisconnected || addressChanged) {
      useGameStore.getState().setDisconnected();
    }
    prevConnected.current = wagmiConnected;
    prevAddress.current = wagmiAddress;

    if (!wagmiConnected || !wagmiAddress) return;
    if (!ct.isReady || ct.contractUnavailable || !ct.game || !ct.sesToken) return;

    let cancelled = false;
    setCheckingCiv(true);

    async function check() {
      let raw;
      try {
        raw = await ct.game!.getCivilization(wagmiAddress!);
      } catch {
        if (!cancelled) setCheckingCiv(false);
        return;
      }

      if (cancelled) return;

      if (raw?.exists) {
        const civ = civFromRaw(raw);
        useGameStore.setState({
          connected: true,
          address: wagmiAddress!,
          playerCiv: civ,
        });

        Promise.all([
          ct.sesToken!.balanceOf(wagmiAddress!),
          ct.game!.getEntryFee(),
        ]).then(async ([balanceRaw, feeWei]) => {
          useGameStore.setState({
            sesBalance: (parseFloat(formatEther(balanceRaw))).toFixed(2),
            entryFee: formatEther(feeWei),
          });
        }).catch(() => {});
      }

      if (!cancelled) setCheckingCiv(false);
    }

    check();
    return () => { cancelled = true; };
  }, [wagmiConnected, wagmiAddress, ct.isReady, ct.contractUnavailable]);

  // #03 BNB → USD 折算（Binance 公共接口，失败静默）
  useEffect(() => {
    let cancelled = false;
    const fetchPrice = async () => {
      try {
        const r = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT', { cache: 'no-store' });
        const j = await r.json() as { price?: string };
        if (!cancelled && j.price) setBnbPrice(parseFloat(j.price));
      } catch { /* 静默 */ }
    };
    fetchPrice();
    const id = setInterval(fetchPrice, 60_000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  /* ── 入场费 ── */
  useEffect(() => {
    const calcProgress = (feeStr: string) => {
      const f = parseFloat(feeStr);
      if (!Number.isFinite(f)) return 0;
      return Math.min(100, Math.max(0, Math.round(((f - 0.01) / 0.04) * 100)));
    };
    fetchEntryFee().then(v => { setFee(v); setFeeProgress(calcProgress(v)); }).catch(() => {});
    const interval = setInterval(() => {
      fetchEntryFee().then(v => { setFee(v); setFeeProgress(calcProgress(v)); }).catch(() => {});
    }, 30_000);
    return () => clearInterval(interval);
  }, [fetchEntryFee]);

  /* ── 创建文明 ── */
  const handleCreate = async () => {
    if (!name.trim()) { setError(t('connect.name_required')); return; }
    if (name.length > 32) { setError(t('connect.name_too_long')); return; }
    if (!wagmiAddress) { setError(t('connect.wallet_required')); return; }

    const ref = referrer.trim();
    if (ref && !isAddress(ref)) {
      setError(t('connect.bad_referrer'));
      return;
    }

    setCreating(true);
    setError(null);

    const ok = await createCivilization(name.trim(), ref || undefined);
    if (!ok) setCreating(false);
  };

  /* ── 推导 UI 状态 ── */
  const uiDisconnected = !wagmiConnected;
  const uiChecking = wagmiConnected && (!ct.isReady || ct.contractUnavailable || checkingCiv);
  const uiForm = wagmiConnected && ct.isReady && !ct.contractUnavailable && !checkingCiv && !creating;
  const uiCreating = creating;

  return (
    <Overlay>
      <SpaceBackground variant="hero" clip="hero" dense />
      <LoreSection>
        <LoreEngineTitle>◈ {t('lore.splash_title')} ◈</LoreEngineTitle>
        <LoreLine>{t('lore.splash_line1')}</LoreLine>
        <LoreLine>{t('lore.splash_line2')}</LoreLine>
        <LoreDivider />
        <LoreProtocol>{t('lore.protocol_intro')}</LoreProtocol>
      </LoreSection>

      <Title $mobile={isMobile}>{t('connect.title')}</Title>
      <Subtitle $mobile={isMobile}>{t('connect.subtitle')}</Subtitle>
      <FeeDisplay $mobile={isMobile}>
        {t('connect.fee_label')}: <strong>{fee} BNB</strong>{bnbPrice != null && ` ≈ $${(parseFloat(fee) * bnbPrice).toFixed(2)}`}
      </FeeDisplay>
      <div style={{ width: '100%', maxWidth: 360, height: 4, background: THEME.alpha(THEME.accent.gold, 0.15), borderRadius: 2, overflow: 'hidden', marginBottom: 8 }}>
        <div style={{ width: `${feeProgress}%`, height: '100%', background: THEME.accent.gold, transition: 'width 0.5s' }} />
      </div>
      <div style={{ color: THEME.alpha(THEME.accent.gold, 0.7), fontSize: '0.68rem', fontFamily: "'Courier New', monospace", marginBottom: 12 }}>{t('connect.fee_progress', { pct: feeProgress })}</div>

      {/* ── 连接钱包 ── */}
      {uiDisconnected && (
        <>
          <RainbowWrapper>
            <ConnectButton />
          </RainbowWrapper>
          <Hint $mobile={isMobile}>{t('connect.fee_hint')}</Hint>
        </>
      )}

      {/* ── 加载中 ── */}
      {uiChecking && (
        <StatusText>
          {!ct.isReady || ct.contractUnavailable ? t('connect.loading_contract') : t('connect.checking_civ')}
        </StatusText>
      )}

      {/* ── 创建表单 ── */}
      {uiForm && (
        <Form>
          <RainbowWrapper>
            <ConnectButton />
          </RainbowWrapper>
          {shortAddr && <WalletBadge>🔗 {shortAddr}</WalletBadge>}
          <div style={{ width: '100%', maxWidth: 360 }}>
            <Input $mobile={isMobile} placeholder={t('connect.civ_name')} value={name}
              onChange={e => setName(e.target.value)} maxLength={32}
              onKeyDown={e => e.key === 'Enter' && handleCreate()} autoFocus
              style={nameError ? { borderColor: THEME.accent.red } : undefined} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ color: THEME.text.secondary, fontSize: '0.68rem', fontFamily: "'Courier New', monospace" }}>{t('connect.name_hint')}</span>
              <span style={{ color: nameLen > 28 ? THEME.accent.gold : THEME.text.secondary, fontSize: '0.68rem', fontFamily: "'Courier New', monospace" }}>{t('connect.char_count', { cur: nameLen })}</span>
            </div>
            {nameError && <div style={{ color: THEME.accent.red, fontSize: '0.7rem', marginTop: 4 }}>{nameError}</div>}
          </div>
          <SmallInput $mobile={isMobile} placeholder={t('connect.referrer')} value={referrer}
            onChange={e => setReferrer(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleCreate()} />
          {referrer && isAddress(referrer) && new URLSearchParams(window.location.search).get('ref') === referrer && (
            <span style={{ color: THEME.accent.green, fontSize: '0.68rem', fontFamily: "'Courier New', monospace" }}>{t('connect.referrer_auto')}</span>
          )}
          <FeeDisplay $mobile={isMobile}>{t('connect.referral_bonus')}</FeeDisplay>
          <ActionButton $mobile={isMobile} onClick={handleCreate} disabled={loading || !!nameError || !name.trim()}>
            {t('connect.pay', { fee })}
          </ActionButton>
        </Form>
      )}

      {/* ── 创建中 ── */}
      {uiCreating && (
        <>
          <StatusText>{t('general.creating')}</StatusText>
          <ActionButton $mobile={isMobile} onClick={() => setCreating(false)} disabled={loading}
            style={{ marginTop: 16, fontSize: isMobile ? '0.85rem' : '0.95rem', animation: 'none' }}>
            ← {t('general.back')}
          </ActionButton>
        </>
      )}

      {error && <ErrorText>{error}</ErrorText>}

      <FooterRow>
        <LangBtn onClick={toggleLang}>{t('connect.lang_switch')}</LangBtn>
        <TutorialLink href="https://docs.strifelabs.com" target="_blank" rel="noopener noreferrer">
          {t('connect.tutorial')}
        </TutorialLink>
      </FooterRow>
    </Overlay>
  );
}
