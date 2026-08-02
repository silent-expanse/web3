import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { execSync } from 'node:child_process';

function getCommitHash(): string {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
  } catch {
    return 'dev';
  }
}

const commitHash = getCommitHash();

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_COMMIT__: JSON.stringify(commitHash),
  },
  resolve: {
    alias: {
      // bun workspace 不创建 node_modules symlink，手动映射 shared 包
      '@strifelabs-strife/shared/contracts': fileURLToPath(new URL('../shared/contracts.ts', import.meta.url)),
      '@strifelabs-strife/shared/contracts.json': fileURLToPath(new URL('../shared/contracts.json', import.meta.url)),
    },
  },
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
