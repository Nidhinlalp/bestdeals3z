// =============================================================================
// Zustand Store: Quick View modal (holds the active product slug)
// =============================================================================

import { create } from 'zustand';

interface QuickViewState {
  slug: string | null;
  open: (slug: string) => void;
  close: () => void;
}

export const useQuickViewStore = create<QuickViewState>()((set) => ({
  slug: null,
  open: (slug) => set({ slug }),
  close: () => set({ slug: null }),
}));
