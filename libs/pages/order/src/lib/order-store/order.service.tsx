import {
  AddDishDto,
  DishModel,
  OrderModel,
  SetPayerDto,
} from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const fetchOrder = (slug: string) =>
  axios.get<OrderModel>(`/api/orders/${slug}`).then(({ data }) => data);

export const fetchDishes = (orderId: string) =>
  axios
    .get<DishModel[]>(`/api/orders/${orderId}/dishes`)
    .then(({ data }) => data);

export const markAsClosed = (id: string) =>
  axios
    .post<OrderModel>(`/api/orders/${id}/mark-as-closed`)
    .then(({ data }) => data);

export const markAsOpen = (id: string) =>
  axios
    .post<OrderModel>(`/api/orders/${id}/mark-as-open`)
    .then(({ data }) => data);

export const setPayer = (orderId: string, setPayerDto: SetPayerDto) =>
  axios
    .post<OrderModel>(`/api/orders/${orderId}/set-payer`, {
      data: setPayerDto,
    })
    .then(({ data }) => data);

export const markAsDelivered = (orderId: string) =>
  axios
    .post<OrderModel>(`/api/orders/${orderId}/mark-as-delivered`)
    .then(({ data }) => data);

export const markAsOrdered = (id: string) =>
  axios
    .post<OrderModel>(`/api/orders/${id}/mark-as-ordered`)
    .then(({ data }) => data);
export const markAsPaid = (id: string, payerId: number) =>
  axios
    .post<OrderModel>(`/api/orders/${id}/mark-as-paid`, {
      payerId,
    })
    .then(({ data }) => data);

export const addDish = (orderId: string, addDishDto: AddDishDto) =>
  axios
    .post<DishModel>(`/api/orders/${orderId}/dishes`, addDishDto)
    .then(({ data }) => data);

export const deleteDish = (orderId: string, dishId: number) =>
  axios
    .delete<DishModel>(`/api/orders/${orderId}/dishes/${dishId}`)
    .then(({ data }) => data);

export const updateDish = (
  orderId: string,
  dishId: number,
  addDishDto: AddDishDto
) =>
  axios
    .put<DishModel>(`/api/orders/${orderId}/dishes/${dishId}`, addDishDto)
    .then(({ data }) => data);
