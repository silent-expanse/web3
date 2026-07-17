import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  customLogger: {
    warn(msg, _options) {
      if (typeof msg === 'string' && msg.includes('/*#__PURE__*/')) return;
      console.warn(msg);
    },
    info(msg) { console.info(msg); },
    error(msg) { console.error(msg); },
    warnOnce(msg, opts) {
      if (typeof msg === 'string' && msg.includes('/*#__PURE__*/')) return;
      console.warn(msg);
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/ethers/')) return 'ethers';
          if (id.includes('node_modules/viem/')) return 'viem';
          if (id.includes('node_modules/wagmi/') ||
              id.includes('node_modules/@wagmi/')) return 'wagmi';
          if (id.includes('node_modules/@rainbow-me/')) return 'rainbowkit';
          if (id.includes('node_modules/@walletconnect/') ||
              id.includes('node_modules/@reown/')) return 'walletconnect';
          if (id.includes('node_modules/@coinbase/') ||
              id.includes('node_modules/@base-org/') ||
              id.includes('node_modules/porto/')) return 'coinbase-wallet';
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/') ||
              id.includes('node_modules/styled-components/')) return 'framework';
          if (id.includes('node_modules/@tanstack/')) return 'query';
          if (id.includes('node_modules/i18next/') ||
              id.includes('node_modules/react-i18next/')) return 'i18n';
        },
      },
    },
  },
});
