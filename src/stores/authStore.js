// store/authStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => ({
  profile: undefined,
  profileVisibility: false,
  session: null,
  isAuthLoading: true,
  isProfileLoading: true,
  isMutating: false,

  actions: {
    setProfile: (profile) => set({ profile: profile }),

    setProfileVisibility: (profileVisibility) => set({ profileVisibility: !!profileVisibility }),
    
    setSession: (session) => set((state) => 
      state.session?.access_token === session?.access_token 
      ? state // current session state
      : { session } // new passed session state
    ),

    setAuthLoading: (isAuthLoading) => set({ isAuthLoading: !!isAuthLoading }),

    setProfileLoading: (isProfileLoading) => set({ isProfileLoading: !!isProfileLoading }),

    setIsMutating: (isMutating) => set({ isMutating: !!isMutating }),
   }
  })
  );


  // Actions
  export const useAuthActions = () => useAuthStore((state) => state.actions);

  // Selectors
  export const useProfile = () => useAuthStore((state) => state.profile);
  export const useProfileVisibility = () => useAuthStore((state) => state.profileVisibility);
  export const useSession = () => useAuthStore((state) => state.session);
  export const useIsMutating = () => useAuthStore((state) => state.isMutating);
  export const useIsAuthLoading = () => useAuthStore((state) => state.isAuthLoading);
  export const useIsProfileLoading = () => useAuthStore((state) => state.isProfileLoading);