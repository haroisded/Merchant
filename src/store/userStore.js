// store/userStore.ts
import { create } from 'zustand'

const userStore = create((set) => ({
  user: {},
  users: [],
  actions: {
    setUsers: (users) => set({ users }),
  },
}))

export const useUsers = () => userStore((state) => state.users)
export const useActions = () => userStore((state) => state.actions)