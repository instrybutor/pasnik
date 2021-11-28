import create from 'zustand';
import { OrderModel, WorkspaceModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export interface WorkspaceOrdersState {
  activeOrders: OrderModel[];
  inactiveOrders: OrderModel[];

  fetchActiveOrders: (workspace: WorkspaceModel) => Promise<void>;
  fetchInactiveOrders: (workspace: WorkspaceModel) => Promise<void>;
}

export const useWorkspaceOrdersStore = create<WorkspaceOrdersState>((set) => ({
  activeOrders: [],
  inactiveOrders: [],

  fetchActiveOrders: async (workspace) => {
    const { data } = await axios.get<OrderModel[]>(
      `/api/workspaces/${workspace.slug}/orders/active`
    );

    set({ activeOrders: data });
  },

  fetchInactiveOrders: async (workspace) => {
    const { data } = await axios.get<OrderModel[]>(
      `/api/workspaces/${workspace.slug}/orders/inactive`
    );

    set({ inactiveOrders: data });
  },
}));
