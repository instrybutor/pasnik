import { CreateOrderDto, OrderModel } from '@pasnik/api/data-transfer';
import { authFetch } from '@pasnik/shared/utils-auth';

export const fetchOrders = () => authFetch<OrderModel[]>('/api/orders');

export const createOrder = (payload: CreateOrderDto) => {
  return authFetch<OrderModel>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const fetchOrder = (id: string) =>
  authFetch<OrderModel>(`/api/orders/${id}`);

export const updateOrder = (orderId: string, payload: Partial<OrderModel>) => {
  return authFetch<OrderModel>(`/api/orders/${orderId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
};
