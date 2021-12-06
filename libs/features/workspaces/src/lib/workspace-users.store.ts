import create from 'zustand';
import { WorkspaceModel, WorkspaceUserModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';
import {
  CallState,
  Dictionary,
  LoadingState,
  toEntities,
} from '@pasnik/shared/utils';

export interface WorkspaceUsersState {
  users: Dictionary<WorkspaceUserModel>;
  callState: CallState;

  fetchUsers: (workspace: WorkspaceModel) => Promise<void>;
  joinWorkspace: (workspace: WorkspaceModel) => Promise<WorkspaceUserModel>;
  leaveWorkspace: (workspace: WorkspaceModel) => Promise<void>;

  resetState: () => void;
}

export const useWorkspaceUsersStore = create<WorkspaceUsersState>(
  (set, get) => ({
    users: {},
    callState: LoadingState.INIT,

    fetchUsers: async (workspace) => {
      set({ callState: LoadingState.LOADING });
      const { data } = await axios.get<WorkspaceUserModel[]>(
        `/api/workspaces/${workspace.slug}/users`
      );

      set({ users: toEntities(data), callState: LoadingState.LOADED });
    },

    joinWorkspace: async (workspace: WorkspaceModel) => {
      const { data } = await axios.put<WorkspaceUserModel>(
        `api/workspaces/${workspace.slug}/join`
      );

      const users = {
        ...get().users,
        [data.id]: data,
      };

      set({ users });

      return data;
    },

    leaveWorkspace: async (workspace: WorkspaceModel) => {
      const { data } = await axios.put<WorkspaceUserModel>(
        `api/workspaces/${workspace.slug}/leave`
      );

      const users = {
        ...get().users,
      };

      delete users[data.id];

      set({ users });
    },
    resetState: () => {
      set({
        users: {},
        callState: LoadingState.INIT,
      });
    },
  })
);
