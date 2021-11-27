import create from 'zustand';
import { CreateWorkspaceDto, WorkspaceModel } from '@pasnik/api/data-transfer';
import {
  CallState,
  getAxiosErrorMessage,
  LoadingState,
} from '@pasnik/shared/utils';
import axios from '@pasnik/axios';

export interface WorkspaceState {
  workspaces: WorkspaceModel[];
  ids: number[];

  workspacesCallState: CallState;

  fetchWorkspaces: () => Promise<void>;
  createWorkspace: (dto: CreateWorkspaceDto) => Promise<void>;

  resetState: () => void;
}

const initialState = {
  workspaces: [],
  ids: [],
  workspacesCallState: LoadingState.INIT,
};

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  ...initialState,
  fetchWorkspaces: async () => {
    set({ workspacesCallState: LoadingState.LOADING, workspaces: [], ids: [] });
    try {
      const { data } = await axios.get<WorkspaceModel[]>('/api/workspaces');
      set({
        workspaces: [...data],
        ids: data.map((workspace) => workspace.id),
        workspacesCallState: LoadingState.LOADED,
      });
    } catch (e: unknown) {
      set({ workspacesCallState: { errorMsg: getAxiosErrorMessage(e) } });
    }
  },
  createWorkspace: async (createWorkspaceDto) => {
    const { workspaces, ids } = get();
    const { data } = await axios.post<WorkspaceModel>(
      '/api/workspaces',
      createWorkspaceDto
    );
    set({
      workspaces: [...workspaces, data],
      ids: [...ids, data.id],
    });
  },
  updateWorkspace: async () => {},
  removeWorkspace: async () => {},
  resetState: () => {
    set(initialState);
  },
}));
