import create from 'zustand';
import {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
  WorkspaceModel,
  WorkspaceUserModel,
} from '@pasnik/api/data-transfer';
import {
  CallState,
  Dictionary,
  getAxiosErrorMessage,
  LoadingState,
  toEntities,
} from '@pasnik/shared/utils';
import axios from '@pasnik/axios';
import produce from 'immer';

export interface WorkspaceState {
  workspace?: WorkspaceModel;
  users: Dictionary<WorkspaceUserModel>;

  entities: Dictionary<WorkspaceModel>;

  usersCallState: CallState;
  workspacesCallState: CallState;

  fetchUsers: (workspace: WorkspaceModel) => Promise<void>;
  fetchWorkspace: (workspaceSlug: string) => Promise<void>;
  fetchWorkspaces: () => Promise<void>;
  createWorkspace: (dto: CreateWorkspaceDto) => Promise<WorkspaceModel>;
  updateWorkspace: (
    workspace: WorkspaceModel,
    dto: UpdateWorkspaceDto
  ) => Promise<WorkspaceModel>;
  removeWorkspace: (workspace: WorkspaceModel) => Promise<void>;
  joinWorkspace: (workspace: WorkspaceModel) => Promise<void>;
  leaveWorkspace: (workspace: WorkspaceModel) => Promise<void>;

  resetState: () => void;
}

const initialState = {
  users: {},
  entities: {},
  usersCallState: LoadingState.INIT,
  workspacesCallState: LoadingState.INIT,
};

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  ...initialState,
  fetchWorkspace: async (workspaceSlug: string) => {
    const entities = get().entities;
    const foundWorkspace = Object.values(entities).find(
      (workspace) => workspace.slug === workspaceSlug
    );
    if (foundWorkspace) {
      // user is member of this workspace
      set({ workspace: foundWorkspace });
    } else {
      const { data } = await axios.get<WorkspaceModel>(
        `/api/workspaces/${workspaceSlug}`
      );

      set({ workspace: data });
    }
  },
  fetchWorkspaces: async () => {
    set({ workspacesCallState: LoadingState.LOADING });
    try {
      const { data } = await axios.get<WorkspaceModel[]>('/api/workspaces');
      set({
        entities: toEntities(data),
        workspacesCallState: LoadingState.LOADED,
      });
    } catch (e: unknown) {
      set({ workspacesCallState: { errorMsg: getAxiosErrorMessage(e) } });
    }
  },
  createWorkspace: async (createWorkspaceDto) => {
    const { data } = await axios.post<WorkspaceModel>(
      '/api/workspaces',
      createWorkspaceDto
    );
    set(
      produce((draft) => {
        draft.entities[data.id] = data;
      })
    );
    return data;
  },
  updateWorkspace: async (workspace, updateWorkspaceDto) => {
    const { data } = await axios.put<WorkspaceModel>(
      `/api/workspaces/${workspace.slug}`,
      updateWorkspaceDto
    );
    set(
      produce((draft) => {
        draft.entities[data.id] = data;
      })
    );
    return data;
  },
  removeWorkspace: async (workspace: WorkspaceModel) => {
    const { data } = await axios.delete<WorkspaceModel>(
      `api/workspaces/${workspace.slug}`
    );

    set(
      produce((draft) => {
        if (draft.workspace.id === data.id) {
          delete draft.workspace;
        }
        delete draft.entities[data.id];
      })
    );
  },
  joinWorkspace: async (workspace: WorkspaceModel) => {
    const { data } = await axios.put<WorkspaceUserModel>(
      `api/workspaces/${workspace.slug}/join`
    );

    set(
      produce((draft) => {
        draft.users[data.id] = data;
        draft.entities[workspace.id] = workspace;
      })
    );
  },

  leaveWorkspace: async (workspace: WorkspaceModel) => {
    const { data } = await axios.put<WorkspaceUserModel>(
      `api/workspaces/${workspace.slug}/leave`
    );

    set(
      produce((draft) => {
        delete draft.entities[workspace.id];
        delete draft.users[data.id];
      })
    );
  },
  fetchUsers: async (workspace) => {
    set({ usersCallState: LoadingState.LOADING });
    const { data } = await axios.get<WorkspaceUserModel[]>(
      `/api/workspaces/${workspace.slug}/users`
    );

    set(
      produce((draft) => {
        draft.users = toEntities(data);
        draft.usersCallState = LoadingState.LOADED;
      })
    );
  },
  resetState: () => {
    set(initialState);
  },
}));
