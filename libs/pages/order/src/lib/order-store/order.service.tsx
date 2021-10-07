import { OrderModel } from '@pasnik/api/data-transfer';
import { authFetch } from '@pasnik/shared/utils-auth';

export const fetchOrder = (id: string) =>
  authFetch<OrderModel>(`/api/orders/${id}`);

export const markAsClosed = (id: string) =>
  authFetch<OrderModel>(`/api/orders/${id}/mark-as-closed`, { method: 'POST' });

export const markAsOpen = (id: string) =>
  authFetch<OrderModel>(`/api/orders/${id}/mark-as-open`, { method: 'POST' });

export const markAsOrdered = (id: string) =>
  authFetch<OrderModel>(`/api/orders/${id}/mark-as-ordered`, {
    method: 'POST',
  });
