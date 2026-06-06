'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true only after the component has mounted on the client.
 * Use to guard rendering of values that come from persisted stores
 * (cart/wishlist counts) so server and client markup match on first paint.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
