// stores/uiStore.js
import { create } from 'zustand';

const useUIStore = create((set) => ({
  isGlobalLoading: false,
  activeModal: null, // 'viewProfile' | 'editProfile' | null

  actions: {
    setGlobalLoading: (loading) => set({ isGlobalLoading: loading }),
    openModal: (modalName) => set({ activeModal: modalName }),
    closeModal: () => set({ activeModal: null }),
  },
}));

export const useUIActions = () => useUIStore((state) => state.actions);
export const useIsGlobalLoading = () => useUIStore((state) => state.isGlobalLoading);
export const useActiveModal = () => useUIStore((state) => state.activeModal);