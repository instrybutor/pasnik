import { OrderModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const fetchOrders = (workspaceId: number) =>
  axios
    .get<OrderModel[]>(`/api/workspaces/${workspaceId}/orders/inactive`)
    .then(({ data }) => data);
