import create from 'zustand';

export interface LayoutStore {
  addWorkspaceModalOpen: boolean;
  sidebarOpen: boolean;
  currentWorkspaceSlugContext: string | null;
  showAddWorkspaceModal: () => void;
  hideAddWorkspaceModal: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  setCurrentWorkspaceSlugContext: (
    currentWorkspaceSlugContext: string | null
  ) => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  addWorkspaceModalOpen: false,
  sidebarOpen: false,
  currentWorkspaceSlugContext: null,

  showAddWorkspaceModal: () => {
    set({ addWorkspaceModalOpen: true });
  },
  hideAddWorkspaceModal: () => {
    set({ addWorkspaceModalOpen: false });
  },

  openSidebar: () => {
    set({ sidebarOpen: true });
  },
  closeSidebar: () => {
    set({ sidebarOpen: false });
  },
  setCurrentWorkspaceSlugContext: (
    currentWorkspaceSlugContext: string | null
  ) => {
    set({ currentWorkspaceSlugContext });
  },
}));
