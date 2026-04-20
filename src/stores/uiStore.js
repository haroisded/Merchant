// stores/uiStore.js
import { create } from 'zustand';

const useUIStore = create((set) => ({
  isGlobalLoading: false,

  actions: {
    setGlobalLoading: (loading) => set({ isGlobalLoading: loading }),
  },
}));

// Actions
export const useUIActions = () => useUIStore((state) => state.actions);

// Selectors
export const useIsGlobalLoading = () => useUIStore((state) => state.isGlobalLoading);