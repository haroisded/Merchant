// store/userStore.js
import { create } from 'zustand'

const useApplicationStore = create((set) => ({
  users: [],
  currentUser: null,
  isAppLoading: true,

  actions: {
    setUsers: (users) => set({ users }),
    setCurrentUser: (currentUser) => set({ currentUser }),
    setLoading: (isAppLoading) => set({ isAppLoading }),
    }
  }))


  // Actions
  export const useAppActions = () => useApplicationStore((state) => state.actions)

  // Selectors
  export const useUsers = () => useApplicationStore((state) => state.users)
  export const useCurrentUser = () => useApplicationStore((state) => state.currentUser)
  export const useIsAppLoading = () => useApplicationStore((state) => state.isAppLoading)