import { type ReactNode } from 'react';
import { WagmiProvider, createConfig, http, fallback } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { bsc } from 'wagmi/chains';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 1, staleTime: 10_000 },
  },
});

const BSC_RPC_LIST = [
  'https://bsc-dataseed1.binance.org',
  'https://bsc-dataseed2.binance.org',
  'https://bsc-dataseed3.binance.org',
  'https://bsc-dataseed4.binance.org',
  'https://bsc-dataseed1.defibit.io',
  'https://bsc-dataseed2.defibit.io',
];

const config = createConfig({
  chains: [bsc],
  connectors: [injected()],
  transports: {
    [bsc.id]: fallback(BSC_RPC_LIST.map(url => http(url))),
  },
});

/** Dark Forest custom RainbowKit theme — dark background, green accent */
const dfTheme = {
  ...darkTheme(),
  colors: {
    ...darkTheme().colors,
    accentColor: '#00D4AA',
    accentColorForeground: '#0A0E17',
    actionButtonBorder: '#1E2A45',
    actionButtonBorderMobile: '#1E2A45',
    actionButtonSecondaryBackground: '#131A2B',
    closeButton: '#8892A8',
    closeButtonBackground: '#131A2B',
    connectButtonBackground: '#131A2B',
    connectButtonBackgroundError: '#FF4757',
    connectButtonInnerBackground: '#131A2B',
    connectButtonText: '#E8EDF5',
    connectButtonTextError: '#FFFFFF',
    connectionIndicator: '#00D4AA',
    downloadBottomCardBackground: '#131A2B',
    downloadTopCardBackground: '#131A2B',
    error: '#FF4757',
    generalBorder: '#1E2A45',
    generalBorderDim: '#1E2A45',
    menuItemBackground: '#131A2B',
    modalBackdrop: 'rgba(0,0,0,0.7)',
    modalBackground: '#0A0E17',
    modalBorder: '#1E2A45',
    modalText: '#E8EDF5',
    modalTextDim: '#8892A8',
    modalTextSecondary: '#8892A8',
    profileAction: '#131A2B',
    profileActionHover: '#1E2A45',
    profileForeground: '#0A0E17',
    selectedOptionBorder: '#00D4AA',
    standby: '#FFD93D',
  },
  fonts: {
    body: "'Courier New', monospace",
  },
  radii: {
    ...darkTheme().radii,
    actionButton: '6px',
    connectButton: '6px',
    menuButton: '6px',
    modal: '10px',
    modalMobile: '10px',
  },
};

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider theme={dfTheme} modalSize="compact">
          {children}
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
