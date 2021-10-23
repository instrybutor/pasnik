import { OrderModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const fetchActiveOrders = () =>
  axios.get<OrderModel[]>(`/api/orders/active`).then(({ data }) => data);
