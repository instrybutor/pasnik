import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import type { CreateOrderDto, OrderModel } from '@pasnik/api/data-transfer';
import { useOrdersFacade } from '@pasnik/orders-data-access';
import { Alert, Button, InputAdornment, Paper, TextField } from '@mui/material';
import { formatter } from '../../utils';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

export const CreateOrder: FC = () => {
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

  const onSubmit = (data: CreateOrderDto) => {
    const newPrice = data.shippingCents
      ? +formatter.format(data.shippingCents).replace(/,/, '.')
      : null;
    createOrder({
      ...data,
      orderAt: new Date().toISOString(),
      shippingCents: newPrice ? newPrice * 100 : undefined,
    })
      .then((params: OrderModel) => {
        history.push(`order/` + params.id);
      })
      .catch((err: Error) => setError(err.message));
  };

  return (
    <div>
      <Paper elevation={3} className="formSquare">
        {error && <Alert severity="error">Request Failed!</Alert>}

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
            margin="normal"
            label="Restaurant"
            inputProps={{
              fullWidth: true,
            }}
            {...register('from')}
            type="text"
          />
          {errors.from?.message && (
            <Alert severity="error">{errors.from?.message}</Alert>
          )}

          <TextField
            margin="normal"
            label="Menu URL"
            inputProps={{
              fullWidth: true,
            }}
            {...register('menuUrl')}
            type="text"
          />

          {errors.menuUrl?.message && (
            <Alert severity="error">{errors.menuUrl?.message}</Alert>
          )}

          <TextField
            margin="normal"
            label="Delivery Price (optional)"
            sx={{ m: 1, width: '25ch' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">PLN</InputAdornment>
              ),
            }}
            {...register('shippingCents')}
          />
          {errors.shippingCents?.message && (
            <Alert severity="error">{errors.shippingCents?.message}</Alert>
          )}

          <Button type="submit" color="success" variant="outlined">
            Confirm
          </Button>
        </form>
      </Paper>
    </div>
  );
};
