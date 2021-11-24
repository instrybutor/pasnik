import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import currency from 'currency.js';
import { yupResolver } from '@hookform/resolvers/yup';

import { useOrdersFacade } from '@pasnik/orders-data-access';
import {
  CreateOrderDto,
  OrderModel,
  orderValidator,
} from '@pasnik/api/data-transfer';

interface FormData extends Omit<CreateOrderDto, 'shippingCents'> {
  shippingCents: string;
}

const STORAGE_KEY = 'pasnik-order';

export const useCreateOrder = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormData>({
    resolver: yupResolver(orderValidator),
  });
  const { createOrder } = useOrdersFacade();
  const watchAll = watch();

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = sessionStorage.getItem(STORAGE_KEY);

    if (data) {
      const fields = JSON.parse(data) as FormData;
      reset({
        from: fields.from,
        menuUrl: fields.menuUrl,
        shippingCents: fields.shippingCents,
      });
    }
  }, [reset]);

  useEffect(() => {
    if (isSubmitting || isSubmitted) {
      sessionStorage.removeItem(STORAGE_KEY);
    } else if (Object.values(watchAll).some(Boolean)) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(watchAll));
    }
  }, [watch, watchAll, isSubmitting, isSubmitted]);

  const onSubmit = useCallback(
    (data: FormData) => {
      createOrder({
        ...data,
        orderAt: new Date().toISOString(),
        shippingCents: currency(data.shippingCents).multiply(100).value,
      })
        .then((params: OrderModel) => navigate(`/order/${params.slug}`))
        .catch((err: Error) => setError(err.message));
    },
    [createOrder, navigate]
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
