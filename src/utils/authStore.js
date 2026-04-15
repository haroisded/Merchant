// store/authStore.js
import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useAuthStore = create((set) => ({
  session: null,
  profile: null,
  isAuthLoading: true,

  actions: {
    setSession: (session) => set({ session }),
    setProfile: (profile) => set({ profile }),
    setAuthLoading: (isLoading) => set({ isLoading }),

    init: () => {
      // Set initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        set({ session, isLoading: false });
        if (session) {
          fetchAndSetProfile(session.user.id, set);
        }
      });

      // Listen to auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT') {
          set({ session: null, profile: null });
        } else if (session) {
          set({ session });
          fetchAndSetProfile(session.user.id, set);
        }
      });

      // Return cleanup function
      return () => subscription.unsubscribe();
        },
      },
    }));


    // Helper function (kept outside store)
    async function fetchAndSetProfile(userId, set) {
      const { data } = await supabase
        .from('profiles')
        .select()
        .eq('id', userId)
        .single();
      if (data) set({ profile: data });
    }


  // Actions
  export const useAuthActions = () => useAuthStore((state) => state.actions);

  // Selectors
  export const useSession = () => useAuthStore((state) => state.session);
  export const useProfile = () => useAuthStore((state) => state.profile);
  export const useIsAuthLoading = () => useAuthStore((state) => state.isLoading);