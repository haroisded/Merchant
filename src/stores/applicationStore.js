// store/applicationStore.js
import { create } from 'zustand'

const initialState = {
  users: [],
  currentUser: null,
  isAppLoading: true,
  applicationForm: {
    applicationName: '',
    applicationPassword: '',
    applicationKey: '',
    businessCategory: null,
    administratorName: '',
    totalUsers: 1,
  },
};

const useApplicationStore = create((set) => ({
  users: [],
  currentUser: null,
  isAppLoading: true,

  applicationForm: {
    applicationName: '',
    applicationPassword: '',
    applicationKey: '',
    businessCategory: null,       // 'Purchasable' | 'Serviceable' | 'Both'
    administratorName: '',
    totalUsers: 1,
  },

  actions: {
    setUsers: (users) => set({ users }),
    setCurrentUser: (currentUser) => set({ currentUser }),
    setLoading: (isAppLoading) => set({ isAppLoading }),


    setApplicationForm: (fields) =>
      set((state) => ({
        applicationForm: { ...state.applicationForm, ...fields }, // ← partial merge, not full replace
      })),


    resetApplicationForm: () => set({ applicationForm: initialState.applicationForm }),
  },
}))


// Actions
export const useAppActions = () => useApplicationStore((state) => state.actions)

// Selectors
export const useUsers = () => useApplicationStore((state) => state.users)
export const useCurrentUser = () => useApplicationStore((state) => state.currentUser)
export const useIsAppLoading = () => useApplicationStore((state) => state.isAppLoading)
export const useApplicationForm = () => useApplicationStore((state) => state.applicationForm) // ← new