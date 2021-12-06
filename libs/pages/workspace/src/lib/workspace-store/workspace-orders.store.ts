import create from 'zustand';
import { OrderModel, WorkspaceModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';
import {
  CallState,
  getAxiosErrorMessage,
  LoadingState,
} from '@pasnik/shared/utils';

export interface WorkspaceOrdersState {
  activeOrders: OrderModel[];
  inactiveOrders: OrderModel[];

  activeOrdersCallState: CallState;
  inactiveOrdersCallState: CallState;

  fetchActiveOrders: (workspace: WorkspaceModel) => Promise<void>;
  fetchInactiveOrders: (workspace: WorkspaceModel) => Promise<void>;
}

export const useWorkspaceOrdersStore = create<WorkspaceOrdersState>((set) => ({
  activeOrders: [],
  inactiveOrders: [],

  activeOrdersCallState: LoadingState.INIT,
  inactiveOrdersCallState: LoadingState.INIT,

  fetchActiveOrders: async (workspace) => {
    try {
      set({ activeOrdersCallState: LoadingState.LOADING });

      const { data } = await axios.get<OrderModel[]>(
        `/api/workspaces/${workspace.slug}/orders/active`
      );

      set({ activeOrders: data, activeOrdersCallState: LoadingState.LOADED });
    } catch (e) {
      set({ activeOrdersCallState: { errorMsg: getAxiosErrorMessage(e) } });
    }
  },

  fetchInactiveOrders: async (workspace) => {
    try {
      set({ inactiveOrdersCallState: LoadingState.LOADING });

      const { data } = await axios.get<OrderModel[]>(
        `/api/workspaces/${workspace.slug}/orders/inactive`
      );

      set({
        inactiveOrders: data,
        inactiveOrdersCallState: LoadingState.LOADED,
      });
    } catch (e) {
      set({ inactiveOrdersCallState: { errorMsg: getAxiosErrorMessage(e) } });
    }
  },
}));
