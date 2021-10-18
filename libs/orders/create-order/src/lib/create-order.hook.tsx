import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useOrdersFacade } from '@pasnik/orders-data-access';
import {
  CreateOrderDto,
  orderValidator,
  OrderModel,
} from '@pasnik/api/data-transfer';

import { formatter } from './create-order.utils';

export const useCreateOrder = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderValidator),
  });
  const { createOrder } = useOrdersFacade();

  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const onSubmit = useCallback(
    (data: CreateOrderDto) => {
      const newPrice = data.shippingCents
        ? +formatter.format(data.shippingCents).replace(/,/, '.')
        : null;

      createOrder({
        ...data,
        orderAt: new Date().toISOString(),
        shippingCents: newPrice ? newPrice * 100 : undefined,
      })
        .then((params: OrderModel) => history.push(`order/` + params.id))
        .catch((err: Error) => setError(err.message));
    },
    [createOrder, history]
  );

  return {
    error,
    errors,
    register,
    setError,
    handleSubmit,
    onSubmit,
  };
};
