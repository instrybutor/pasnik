import {
  CreateOrderDto,
  OrderModel,
  UpdateOrderDto,
} from '@pasnik/api/data-transfer';
import { authFetch } from '@pasnik/shared/utils-auth';

export const fetchOrders = () => authFetch<OrderModel[]>('/api/orders');

export const createOrder = (payload: CreateOrderDto) => {
  return authFetch<OrderModel>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const fetchOrderById = (orderId: string) => {
  return authFetch<OrderModel>(`/api/orders/${orderId}`, { method: 'GET' });
};

export const updateOrder = (orderId: string, payload: UpdateOrderDto) => {
  return authFetch<OrderModel>(`/api/orders/${orderId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
};
