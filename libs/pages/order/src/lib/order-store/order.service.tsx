import {
  AddDishDto,
  DishModel,
  OrderModel,
  SetPayerDto,
} from '@pasnik/api/data-transfer';
import axios from '@pasnik/axios';

export const fetchOrder = (slug: string) =>
  axios.get<OrderModel>(`/api/orders/slug/${slug}`).then(({ data }) => data);

export const fetchDishes = (slug: string) =>
  axios
    .get<DishModel[]>(`/api/orders/slug/${slug}/dishes`)
    .then(({ data }) => data);

export const markAsClosed = ({ slug }: OrderModel) =>
  axios
    .post<OrderModel>(`/api/orders/slug/${slug}/mark-as-closed`)
    .then(({ data }) => data);

export const markAsOpen = ({ slug }: OrderModel) =>
  axios
    .post<OrderModel>(`/api/orders/slug/${slug}/mark-as-open`)
    .then(({ data }) => data);

export const setPayer = ({ slug }: OrderModel, setPayerDto: SetPayerDto) =>
  axios
    .post<OrderModel>(`/api/orders/slug/${slug}/set-payer`, {
      data: setPayerDto,
    })
    .then(({ data }) => data);

export const markAsDelivered = ({ slug }: OrderModel) =>
  axios
    .post<OrderModel>(`/api/orders/slug/${slug}/mark-as-delivered`)
    .then(({ data }) => data);

export const markAsOrdered = ({ slug }: OrderModel) =>
  axios
    .post<OrderModel>(`/api/orders/slug/${slug}/mark-as-ordered`)
    .then(({ data }) => data);
export const markAsPaid = ({ slug }: OrderModel, payerId: number) =>
  axios
    .post<OrderModel>(`/api/orders/slug/${slug}/mark-as-paid`, {
      payerId,
    })
    .then(({ data }) => data);

export const addDish = ({ slug }: OrderModel, addDishDto: AddDishDto) =>
  axios
    .post<DishModel>(`/api/orders/slug/${slug}/dishes`, addDishDto)
    .then(({ data }) => data);

export const deleteDish = ({ slug }: OrderModel, dishId: number) =>
  axios
    .delete<DishModel>(`/api/orders/slug/${slug}/dishes/${dishId}`)
    .then(({ data }) => data);

export const updateDish = (
  { slug }: OrderModel,
  dishId: number,
  addDishDto: AddDishDto
) =>
  axios
    .put<DishModel>(`/api/orders/slug/${slug}/dishes/${dishId}`, addDishDto)
    .then(({ data }) => data);
