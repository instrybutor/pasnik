import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import currency from 'currency.js';
import { yupResolver } from '@hookform/resolvers/yup';

import { useOrdersFacade } from '@pasnik/orders-data-access';
import {
  CreateOrderDto,
  orderValidator,
  OrderModel,
} from '@pasnik/api/data-transfer';

interface FormData extends Omit<CreateOrderDto, 'shippingCents'> {
  shippingCents: string;
}

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
    (data: FormData) => {
      createOrder({
        ...data,
        orderAt: new Date().toISOString(),
        shippingCents: currency(data.shippingCents).multiply(100).value,
      })
        .then((params: OrderModel) => history.push(`order/${params.id}`))
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
