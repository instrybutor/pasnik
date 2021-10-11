import { OrderModel } from '@pasnik/api/data-transfer';
import { authFetch } from '@pasnik/shared/utils-auth';

export const fetchActiveOrders = () =>
  authFetch<OrderModel[]>(`/api/orders/active`);
