import * as yup from 'yup';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useOrdersFacade } from '@pasnik/orders-data-access';
import { CreateOrderDto, OrderModel } from '@pasnik/api/data-transfer';

import { formatter } from './create-order.utils';

const schema = yup
  .object({
    from: yup.string().required(),
    menuUrl: yup
      .string()
      .required()
      .test('validURL', 'This URL is not valid', (number) => {
        if (number) {
          return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)|www\.\w+\..+$/.test(
            number.toString()
          );
        }

        return false;
      }),
    shippingCents: yup
      .string()
      .test(
        'maxDigitsAfterDecimal',
        'number field must have 2 digits after decimal or less',
        (number: string | undefined) => {
          if (number) {
            return /^\d+(\.|,\d{1,2})?$/.test(number);
          }
          return false;
        }
      ),
  })
  .required();

export const useCreateOrder = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
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
