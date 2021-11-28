import create from 'zustand';

export interface LayoutStore {
  addWorkspaceModalOpen: boolean;
  sidebarOpen: boolean;
  showAddWorkspaceModal: () => void;
  hideAddWorkspaceModal: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  addWorkspaceModalOpen: false,
  sidebarOpen: false,

  showAddWorkspaceModal: () => {
    console.log('show');
    set({ addWorkspaceModalOpen: true });
  },
  hideAddWorkspaceModal: () => {
    console.log('close');
    set({ addWorkspaceModalOpen: false });
  },

  openSidebar: () => {
    set({ sidebarOpen: true });
  },
  closeSidebar: () => {
    set({ sidebarOpen: false });
  },
}));
