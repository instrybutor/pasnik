import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useOrdersFacade } from '@pasnik/orders-data-access';
import { orderValidator, OrderModel } from '@pasnik/api/data-transfer';

interface FormOrder {
  from: string;
  menuUrl: string;
  shippingCents?: string;
}

export const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

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
  const { orderId } = useParams<{ orderId: string }>();

  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    fetchOrder(orderId).then((order: OrderModel) => {
      reset({
        from: order.from,
        menuUrl: order.menuUrl,
        shippingCents: `${order.shippingCents}`,
      });
    });
  }, [fetchOrder, orderId, reset]);

  const onSubmit = useCallback(
    (data: FormOrder) => {
      const newPrice = +formatter
        .format(+(data.shippingCents ?? 0))
        .replace(/,/, '.');

      updateOrder(orderId, {
        from: data.from,
        menuUrl: data.menuUrl,
        shippingCents: newPrice * 100,
      })
        .then((params: OrderModel) => history.push(`/order/${params.id}`))
        .catch((err: Error) => setError(err.message));
    },
    [history, orderId, updateOrder]
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
