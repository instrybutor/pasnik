import { OrderModel } from '@pasnik/api/data-transfer';
import { authFetch } from '@pasnik/shared/utils-auth';

export const fetchOrders = () =>
  authFetch<OrderModel[]>(`/api/orders/inactive`);
