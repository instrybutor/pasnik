import create from 'zustand';
import { WorkspaceModel, WorkspaceUserModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export interface WorkspaceUsersState {
  users: WorkspaceUserModel[];

  fetchUsers: (workspace: WorkspaceModel) => Promise<void>;
}

export const useWorkspaceUsersStore = create<WorkspaceUsersState>((set) => ({
  users: [],

  fetchUsers: async (workspace) => {
    const { data } = await axios.get<WorkspaceUserModel[]>(
      `/api/workspaces/${workspace.slug}/users`
    );

    set({ users: data });
  },
}));
