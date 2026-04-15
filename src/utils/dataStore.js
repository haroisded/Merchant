// store/userStore.js
import { create } from 'zustand'

const useDataStore = create((set) => ({
  users: [],
  currentUser: null,
  isLoading: true,


  actions: {
    setUsers: (users) => set({ users }),
    setCurrentUser: (currentUser) => set({ currentUser }),
    setLoading: (isLoading) => set({ isLoading }),
    }
  }))


  // Actions
  export const useDataActions = () => useDataStore((state) => state.actions)

  // Selectors
  export const useUsers = () => useDataStore((state) => state.users)
  export const useCurrentUser = () => useDataStore((state) => state.currentUser)
  export const useIsLoading = () => useDataStore((state) => state.isLoading)