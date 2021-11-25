import create from 'zustand';
import { CreateWorkspaceDto, WorkspaceModel } from '@pasnik/api/data-transfer';
import {
  CallState,
  getAxiosErrorMessage,
  LoadingState,
} from '@pasnik/shared/utils';
import axios from '@pasnik/axios';
import { Dictionary } from './entitity/models';
import { toEntities } from './entitity/to-entities';
import produce from 'immer';

export interface WorkspaceState {
  entities: Dictionary<WorkspaceModel>;

  workspacesCallState: CallState;

  fetchWorkspaces: () => Promise<void>;
  createWorkspace: (dto: CreateWorkspaceDto) => Promise<void>;

  resetState: () => void;
}

const initialState = {
  entities: {},
  workspacesCallState: LoadingState.INIT,
};

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  ...initialState,
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
  },
  resetState: () => {
    set(initialState);
  },
}));
