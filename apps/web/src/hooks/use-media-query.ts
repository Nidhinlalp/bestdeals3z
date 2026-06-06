'use client';

import { useEffect, useState } from 'react';

/** Reactive media-query hook. SSR-safe (defaults to false until mounted). */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Convenience: true on desktop-class viewports (≥ 744px). */
export const useIsDesktop = () => useMediaQuery('(min-width: 46.5rem)');
