import create from 'zustand';

export interface LayoutStore {
  addWorkspaceModalOpen: boolean;
  sidebarOpen: boolean;
  currentWorkspaceIdContext: number | null;
  showAddWorkspaceModal: () => void;
  hideAddWorkspaceModal: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  setCurrentWorkspaceIdContext: (currentWorkspaceIdContext: number | null) => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  addWorkspaceModalOpen: false,
  sidebarOpen: false,
  currentWorkspaceIdContext: null,

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
  setCurrentWorkspaceIdContext: (currentWorkspaceIdContext: number | null) => {
    set({ currentWorkspaceIdContext })
  },

}));
