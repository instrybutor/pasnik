import { OrderModel } from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const fetchOrders = () =>
  axios.get<OrderModel[]>(`/api/orders/inactive`).then(({ data }) => data);
