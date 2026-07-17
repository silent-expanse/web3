import { useState, useEffect } from 'react';

/**
 * Reactive media query hook.
 * Returns true when the query matches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/** Shorthand: true when viewport < 768px */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}
