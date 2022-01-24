import create from 'zustand';
import produce from 'immer';

import { UserModel, WorkspaceModel } from '@pasnik/api/data-transfer';
import { CallState, LoadingState } from '@pasnik/shared/utils';
import axios, { getAxiosErrorMessage } from '@pasnik/axios';

export interface UserState {
  user?: UserModel;
  users: UserModel[];

  userCallState: CallState;
  usersCallState: CallState;

  fetchMe: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  changeWorkspace: (workspace: WorkspaceModel) => void;

  resetState: () => void;

  updateCurrentUser(payload: Partial<UserModel>): Promise<void>;
}

const initialState = {
  user: undefined,
  users: [],

  userCallState: LoadingState.INIT,
  usersCallState: LoadingState.INIT,
};

export const useUserStore = create<UserState>((set, get) => ({
  ...initialState,
  fetchMe: async () => {
    set({ userCallState: LoadingState.LOADING });
    try {
      const { data } = await axios.get<UserModel>('/auth/me');
      set({ user: data, userCallState: LoadingState.LOADED });
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          set({ userCallState: LoadingState.LOADED });
          return;
        }
      }
      set({ userCallState: { errorMsg: getAxiosErrorMessage(e) } });
    }
  },
  fetchUsers: async () => {
    set({ usersCallState: LoadingState.LOADING });
    try {
      const { data } = await axios.get<UserModel[]>('/api/users');
      set({ users: data, usersCallState: LoadingState.LOADED });
    } catch (e: unknown) {
      set({ usersCallState: { errorMsg: getAxiosErrorMessage(e) } });
    }
  },
  resetState: () => {
    set(initialState);
  },
  updateCurrentUser: async (payload: Partial<UserModel>) => {
    try {
      const { data } = await axios.put<UserModel>('/api/users/me', payload);
      set({ user: data });
    } catch (e: unknown) {
      throw new Error('User update error');
    }
  },
  changeWorkspace: async ({ id }: WorkspaceModel) => {
    const currentWorkspaceId = get().user?.currentWorkspaceId;
    set(
      produce((draft) => {
        draft.user.currentWorkspaceId = id;
      })
    );
    try {
      const { data } = await axios.post<UserModel>(
        `/auth/set-default-workspace/${id}`
      );
      set({ user: data });
    } catch (e) {
      set(
        produce((draft) => {
          draft.user.currentWorkspaceId = currentWorkspaceId;
        })
      );
    }
  },
}));
