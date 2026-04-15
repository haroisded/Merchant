// store/authStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  session: null,
  isAuthLoading: true,

  actions: {
    setSession: (session) => set({ session }),
    setUser: (user) => set({ user }),
    setAuthLoading: (isAuthLoading) => set({ isAuthLoading }),
    }
  }));


  // Actions
  export const useAuthActions = () => useAuthStore((state) => state.actions);

  // Selectors
  export const useSession = () => useAuthStore((state) => state.session);
  export const useUser = () => useAuthStore((state) => state.user);
  export const useIsAuthLoading = () => useAuthStore((state) => state.isAuthLoading);