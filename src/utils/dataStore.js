// store/userStore.js
import { create } from 'zustand'

const useDataStore = create((set) => ({
  user: null,
  users: [],
  currentUser: null,
  session: null,
  isLoading: true,


  actions: {
    setUser: (user) => set({ user }),
    setUsers: (users) => set({ users }),
    setCurrentUser: (currentUser) => set({ currentUser }),
    setSession: (session) => set({ session }),
    setLoading: (isLoading) => set({ isLoading }),
    }
  }))


  // Actions
  export const useActions = () => useDataStore((state) => state.actions)

  // Selectors
  export const useUser = () => useDataStore((state) => state.user)
  export const useUsers = () => useDataStore((state) => state.users)
  export const useCurrentUser = () => useDataStore((state) => state.currentUser)
  export const useSession = () => useDataStore((state) => state.session)
  export const useIsLoading = () => useDataStore((state) => state.isLoading)