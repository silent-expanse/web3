import { useState, useEffect } from 'react';
import { t, getLang, toggleLang, onLangChange, type Lang } from '../i18n';

export function useI18n() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const unsub = onLangChange(() => setTick(n => n + 1));
    return unsub;
  }, []);

  return { t, lang: getLang, toggleLang };
}
