import create from 'zustand';
import { OrderModel, WorkspaceModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export interface WorkspaceOrdersState {
  orders: OrderModel[];

  fetchActiveOrders: (workspace: WorkspaceModel) => Promise<void>;
}

export const useWorkspaceOrdersStore = create<WorkspaceOrdersState>((set) => ({
  orders: [],

  fetchActiveOrders: async (workspace) => {
    const { data } = await axios.get<OrderModel[]>(
      `/api/workspaces/${workspace.slug}/orders/active`
    );

    set({ orders: data });
  },
}));
