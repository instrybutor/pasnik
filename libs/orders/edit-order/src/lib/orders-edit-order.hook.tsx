import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useOrdersFacade } from '@pasnik/orders-data-access';
import {
  updateOrderValidator,
  UpdateOrderDto,
} from '@pasnik/api/data-transfer';

export const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const useEditOrder = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { updateOrder, fetchOrder } = useOrdersFacade();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateOrderValidator),
  });

  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    fetchOrder(orderId).then((order) => {
      reset({
        from: order.from,
        menuUrl: order.menuUrl,
        shippingCents: order.shippingCents?.toFixed(2),
      });
    });
  }, [fetchOrder, orderId, reset]);

  const onSubmit = useCallback(
    (data: UpdateOrderDto) => {
      const shippingCents = data.shippingCents
        ? +formatter.format(data.shippingCents).replace(/,/, '.')
        : undefined;

      updateOrder(orderId, {
        ...data,
        shippingCents,
      })
        .then(() => history.push(`/order/${orderId}`))
        .catch((err: Error) => setError(err.message));
    },
    [updateOrder, orderId, history]
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
