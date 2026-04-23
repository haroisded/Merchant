import { create } from 'zustand'

const useApplicationStore = create((set) => ({
  PageSwitch: true, 
  applications: undefined,
  isAppMutating: false,
  ApplicationLoading: false,

  
  actions: {
    setPageSwitch: (PageSwitch) => set({ PageSwitch: !!PageSwitch }),
    setApplications: (applications) => set({ applications: applications }), // ← Array | null | undefined
    setAppLoading: (ApplicationLoading) => set({ ApplicationLoading: !!ApplicationLoading }),
    setIsAppMutating: (isAppMutating) => set({ isAppMutating: !!isAppMutating }),
  },
}))

// Actions
export const useAppActions = () => useApplicationStore((state) => state.actions)

// Selectors
export const usePageSwitch = () => useApplicationStore((state) => state.PageSwitch)
export const useApplications = () => useApplicationStore((state) => state.applications)
export const useIsAppMutating = () => useApplicationStore((state) => state.isAppMutating);
export const useIsAppLoading = () => useApplicationStore((state) => state.ApplicationLoading);