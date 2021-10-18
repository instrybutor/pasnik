import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import currency from 'currency.js';
import { yupResolver } from '@hookform/resolvers/yup';

import { useOrdersFacade } from '@pasnik/orders-data-access';
import {
  orderValidator,
  OrderModel,
  CreateOrderDto,
} from '@pasnik/api/data-transfer';

interface FormData extends Omit<CreateOrderDto, 'shippingCents'> {
  shippingCents: string;
}

export const useEditOrder = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(orderValidator),
  });
  const { updateOrder, fetchOrder } = useOrdersFacade();
  const { slug } = useParams<{ slug: string }>();

  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    fetchOrder(slug).then((order: OrderModel) => {
      reset({
        from: order.from,
        menuUrl: order.menuUrl,
        shippingCents: currency(order.shippingCents ?? 0, {
          fromCents: true,
        }).toString(),
      });
    });
  }, [fetchOrder, slug, reset]);

  const onSubmit = useCallback(
    (data: FormData) => {
      updateOrder(slug, {
        from: data.from,
        menuUrl: data.menuUrl,
        shippingCents: currency(data.shippingCents).multiply(100).value,
      })
        .then((params: OrderModel) => history.push(`/order/${params.slug}`))
        .catch((err: Error) => setError(err.message));
    },
    [history, slug, updateOrder]
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
