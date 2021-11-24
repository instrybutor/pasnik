import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import currency from 'currency.js';
import { yupResolver } from '@hookform/resolvers/yup';

import { useOrdersFacade } from '@pasnik/orders-data-access';
import {
  CreateOrderDto,
  OrderModel,
  orderValidator,
} from '@pasnik/api/data-transfer';
import { useUserStore } from '@pasnik/store';

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
  const workspaceId = useUserStore(({ user }) => user?.currentWorkspaceId);

  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const onSubmit = useCallback(
    (data: FormData) => {
      createOrder(workspaceId, {
        ...data,
        orderAt: new Date().toISOString(),
        shippingCents: currency(data.shippingCents).multiply(100).value,
      })
        .then((params: OrderModel) => history.push(`/order/${params.slug}`))
        .catch((err: Error) => setError(err.message));
    },
    [workspaceId, createOrder, history]
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
