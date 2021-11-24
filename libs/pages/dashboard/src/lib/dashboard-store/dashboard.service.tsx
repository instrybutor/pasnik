import { OrderModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const fetchActiveOrders = (workspaceId: number) =>
  axios
    .get<OrderModel[]>(`/api/workspaces/${workspaceId}/orders/active`)
    .then(({ data }) => data);
