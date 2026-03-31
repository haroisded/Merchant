// store/userStore.ts
import { create } from 'zustand'

 
const userStore = create((set) => ({
  user: {},
  users: [],
  currentuser: "none",
  session: "none",
  actions: {
    setUsers: (users) => set({ users }),
  },
}))


export const useUsers = () => userStore((state) => state.users)
export const useActions = () => userStore((state) => state.actions)