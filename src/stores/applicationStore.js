import { create } from 'zustand'

const useApplicationStore = create((set) => ({
  PageSwitch: true, 
  applications: undefined,
  isAppMutating: false,
  isAppPageLoading: false,
  
  actions: {
    setPageSwitch: (PageSwitch) => set({ PageSwitch: !!PageSwitch }),
    setApplications: (applications) => set({ applications: applications }), // ← Array | null | undefined
    setIsAppMutating: (isAppMutating) => set({ isAppMutating: !!isAppMutating }),
    setIsAppPageLoading: (isAppPageLoading) => set({ isAppPageLoading: !!isAppPageLoading }),
  },
}))

// Actions
export const useAppActions = () => useApplicationStore((state) => state.actions)

// Selectors
export const usePageSwitch = () => useApplicationStore((state) => state.PageSwitch)
export const useApplications = () => useApplicationStore((state) => state.applications)
export const useIsAppMutating = () => useApplicationStore((state) => state.isAppMutating);
export const useIsAppPageLoading = () => useApplicationStore((state) => state.isAppPageLoading);

