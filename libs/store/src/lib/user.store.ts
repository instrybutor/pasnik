import create from 'zustand';
import { UserModel, WorkspaceModel } from '@pasnik/api/data-transfer';
import {
  CallState,
  getAxiosErrorMessage,
  LoadingState,
} from '@pasnik/shared/utils';
import axios from '@pasnik/axios';

export interface UserState {
  user?: UserModel;
  users: UserModel[];

  userCallState: CallState;
  usersCallState: CallState;

  fetchMe: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  changeWorkspace: (workspace: WorkspaceModel) => void;

  resetState: () => void;
}

const initialState = {
  user: undefined,
  users: [],

  userCallState: LoadingState.INIT,
  usersCallState: LoadingState.INIT,
};

export const useUserStore = create<UserState>((set) => ({
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
  changeWorkspace: async ({ id }: WorkspaceModel) => {
    const { data } = await axios.post<UserModel>(
      `/auth/set-default-workspace/${id}`
    );

    set({ user: data });
  },
}));
