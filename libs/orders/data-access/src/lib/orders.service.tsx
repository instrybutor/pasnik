import { CreateOrderDto, OrderModel } from '@pasnik/api/data-transfer';
import { authFetch } from '@pasnik/shared/utils-auth';

export const fetchOrders = () => authFetch<OrderModel[]>('/api/orders');

export const createOrder = (payload: CreateOrderDto) => {
  return authFetch<OrderModel>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

export const fetchOrder = (slug: string) =>
  authFetch<OrderModel>(`/api/orders/${slug}`);

export const updateOrder = (slug: string, payload: Partial<OrderModel>) => {
  return authFetch<OrderModel>(`/api/orders/${slug}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
};
