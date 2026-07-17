import { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { formatEther } from 'ethers';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useGameStore } from '../hooks/useGameStore';
import { civFromRaw, useGameActions } from '../hooks/useGameActions';
import { useContract } from '../hooks/useContract';
import { useIsMobile } from '../hooks/useMediaQuery';
import { useI18n } from '../hooks/useI18n';
import { THEME } from '../theme';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at center, #0a0a1a 0%, #000 70%);
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
  /* Override RainbowKit button to match Dark Forest theme */
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

  const { t, toggleLang } = useI18n();
  const isMobile = useIsMobile();
  const loading = useGameStore(s => s.loading);

  const { address: wagmiAddress, isConnected: wagmiConnected } = useAccount();
  const ct = useContract();
  const { createCivilization, fetchEntryFee } = useGameActions();

  const shortAddr = wagmiAddress
    ? wagmiAddress.slice(0, 4) + '...' + wagmiAddress.slice(-4)
    : '';

  /* ── 文明检查 ── */
  const prevConnected = useRef(false);
  useEffect(() => {
    // on disconnect → clear store
    if (prevConnected.current && !wagmiConnected) {
      useGameStore.getState().setDisconnected();
    }
    prevConnected.current = wagmiConnected;

    if (!wagmiConnected || !wagmiAddress) return;
    if (!ct.isReady || ct.isSimulated || !ct.darkForest || !ct.dftToken) return;

    let cancelled = false;
    setCheckingCiv(true);

    async function check() {
      let raw;
      try {
        raw = await ct.darkForest!.getCivilization(wagmiAddress!);
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
          ct.dftToken!.balanceOf(wagmiAddress!),
          ct.darkForest!.getEntryFee(),
        ]).then(async ([balanceRaw, feeWei]) => {
          useGameStore.setState({
            dftBalance: (parseFloat(formatEther(balanceRaw))).toFixed(2),
            entryFee: formatEther(feeWei),
          });
        }).catch(() => {});
      }

      if (!cancelled) setCheckingCiv(false);
    }

    check();
    return () => { cancelled = true; };
  }, [wagmiConnected, wagmiAddress, ct.isReady, ct.isSimulated]);

  /* ── 入场费 ── */
  useEffect(() => {
    fetchEntryFee().then(setFee).catch(() => {});
    const interval = setInterval(() => {
      fetchEntryFee().then(setFee).catch(() => {});
    }, 30_000);
    return () => clearInterval(interval);
  }, [fetchEntryFee]);

  /* ── 创建文明 ── */
  const handleCreate = async () => {
    if (!name.trim()) { setError(t('connect.name_required')); return; }
    if (name.length > 32) { setError(t('connect.name_too_long')); return; }
    if (!wagmiAddress) { setError(t('connect.wallet_required')); return; }

    if (referrer.trim() && !/^0x[0-9a-fA-F]{40}$/.test(referrer.trim())) {
      setError(t('connect.bad_referrer'));
      return;
    }

    setCreating(true);
    setError(null);

    const ok = await createCivilization(name.trim(), referrer.trim() || undefined);
    if (!ok) setCreating(false);
  };

  /* ── 推导 UI 状态 ── */
  const uiDisconnected = !wagmiConnected;
  const uiChecking = wagmiConnected && (!ct.isReady || ct.isSimulated || checkingCiv);
  const uiForm = wagmiConnected && ct.isReady && !ct.isSimulated && !checkingCiv && !creating;
  const uiCreating = creating;

  return (
    <Overlay>
      <Title $mobile={isMobile}>{t('connect.title')}</Title>
      <Subtitle $mobile={isMobile}>{t('connect.subtitle')}</Subtitle>
      <FeeDisplay $mobile={isMobile}>
        {t('connect.fee_label')}: <strong>{fee} BNB</strong>
      </FeeDisplay>

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
          {!ct.isReady || ct.isSimulated ? t('connect.loading_contract') : t('connect.checking_civ')}
        </StatusText>
      )}

      {/* ── 创建表单 ── */}
      {uiForm && (
        <Form>
          <RainbowWrapper>
            <ConnectButton />
          </RainbowWrapper>
          {shortAddr && <WalletBadge>🔗 {shortAddr}</WalletBadge>}
          <Input $mobile={isMobile} placeholder={t('connect.civ_name')} value={name}
            onChange={e => setName(e.target.value)} maxLength={32}
            onKeyDown={e => e.key === 'Enter' && handleCreate()} autoFocus />
          <SmallInput $mobile={isMobile} placeholder={t('connect.referrer')} value={referrer}
            onChange={e => setReferrer(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleCreate()} />
          <FeeDisplay $mobile={isMobile}>{t('connect.referral_bonus')}</FeeDisplay>
          <ActionButton $mobile={isMobile} onClick={handleCreate} disabled={loading}>
            {t('connect.pay', { fee })}
          </ActionButton>
        </Form>
      )}

      {/* ── 创建中 ── */}
      {uiCreating && (
        <>
          <StatusText>{t('general.creating')}</StatusText>
          <ActionButton $mobile={isMobile} onClick={() => setCreating(false)}
            style={{ marginTop: 16, fontSize: isMobile ? '0.85rem' : '0.95rem', animation: 'none' }}>
            ← {t('general.back')}
          </ActionButton>
        </>
      )}

      {error && <ErrorText>{error}</ErrorText>}

      <FooterRow>
        <LangBtn onClick={toggleLang}>{t('connect.lang_switch')}</LangBtn>
        <TutorialLink href="https://docs.darkforest.uk" target="_blank" rel="noopener noreferrer">
          {t('connect.tutorial')}
        </TutorialLink>
      </FooterRow>
    </Overlay>
  );
}
