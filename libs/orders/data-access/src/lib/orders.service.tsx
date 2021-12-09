import {
  CreateOrderDto,
  OrderModel,
  WorkspaceModel,
} from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const fetchOrders = () =>
  axios.get<OrderModel[]>('/api/orders').then(({ data }) => data);

export const createOrder = (
  { slug }: WorkspaceModel,
  payload: CreateOrderDto
) => {
  return axios
    .post<OrderModel>(`/api/workspaces/${slug}/orders`, payload)
    .then(({ data }) => data);
};

export const fetchOrder = (slug: string) =>
  axios.get<OrderModel>(`/api/orders/slug/${slug}`).then(({ data }) => data);

export const updateOrder = (slug: string, payload: Partial<OrderModel>) => {
  return axios
    .put<OrderModel>(`/api/orders/slug/${slug}`, payload)
    .then(({ data }) => data);
};
