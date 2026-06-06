// =============================================================================
// Zustand Store: Recently viewed products  (UI-only, persisted)
// =============================================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const MAX = 8;

interface RecentlyViewedState {
  slugs: string[];
  push: (slug: string) => void;
  clear: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      slugs: [],
      push: (slug) =>
        set((s) => ({
          slugs: [slug, ...s.slugs.filter((x) => x !== slug)].slice(0, MAX),
        })),
      clear: () => set({ slugs: [] }),
    }),
    { name: 'b3z-recently-viewed' }
  )
);
