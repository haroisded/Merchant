import { create } from 'zustand'

const useApplicationStore = create((set) => ({
  currentApplication: null,
  applications: undefined,
  PageSwitch: true, 
  isAppMutating: false,
  isAppPageLoading: false,
  
  actions: {
    setCurrentApplication: (currentApplication) => set({ currentApplication: currentApplication }),
    setApplications: (applications) => set({ applications: applications }),
    setPageSwitch: (PageSwitch) => set({ PageSwitch: !!PageSwitch }),
    setIsAppMutating: (isAppMutating) => set({ isAppMutating: !!isAppMutating }),
    setIsAppPageLoading: (isAppPageLoading) => set({ isAppPageLoading: !!isAppPageLoading }),
  },
}))

// Actions
export const useAppActions = () => useApplicationStore((state) => state.actions)

// Selectors
export const useCurrentApplication = () => useApplicationStore((state) => state.currentApplication)
export const useApplications = () => useApplicationStore((state) => state.applications)
export const usePageSwitch = () => useApplicationStore((state) => state.PageSwitch)
export const useIsAppMutating = () => useApplicationStore((state) => state.isAppMutating);
export const useIsAppPageLoading = () => useApplicationStore((state) => state.isAppPageLoading);

