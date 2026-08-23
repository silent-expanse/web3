import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

// 提升 window.ethereum 的监听器上限，避免 wagmi/RainbowKit 多实例触发 MaxListenersExceededWarning（#拓展钱包的 contentscript.js 非阻塞警告）
if (typeof window !== 'undefined' && (window as unknown as { ethereum?: { setMaxListeners?: (n: number) => void } }).ethereum?.setMaxListeners) {
  try { (window as unknown as { ethereum: { setMaxListeners: (n: number) => void } }).ethereum.setMaxListeners(30); } catch { /* ignore */ }
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
