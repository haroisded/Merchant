// store/userStore.js
import { create } from 'zustand'


// Create the store (use a consistent name)
export const useUserStore = create((set) => ({
  user: null,
  users: [],
  currentUser: null,
  session: null,

  actions: {
  setUser: (user) => set({ user }),
  setUsers: (users) => set({ users }),
  setCurrentUser: (currentUser) => set({ currentUser }),
  setSession: (session) => set({ session }),
  }
}))


//actions 
export const useActions = () => useActions((state) => state.actions)


// Selectors for individual state slices
export const useUser = () => useUserStore((state) => state.user)
export const useUsers = () => useUserStore((state) => state.users)
export const useCurrentUser = () => useUserStore((state) => state.currentUser)
export const useSession = () => useUserStore((state) => state.session)