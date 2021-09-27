import React, { ChangeEvent, FC, useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import type { CreateOrderDto, OrderModel } from '@pasnik/api/data-transfer';
import { useOrdersFacade } from '@pasnik/orders-data-access';
import { Alert, Button, InputAdornment, Paper, TextField } from '@mui/material';
import { formatter, validUrl } from '../../utils';

export const CreateOrder: FC = () => {
  const { register, handleSubmit } = useForm();
  const { createOrder } = useOrdersFacade();

  const [restaurant, setRestaurant] = useState<string>('');
  const [menu, setMenu] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const [DeliveryPrice, setDeliveryPrice] = useState<string>('');

  const deliveryRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const onSubmit = (data: CreateOrderDto) => {
    const newPrice = data.shippingCents
      ? +formatter.format(data.shippingCents)
      : -1;
    createOrder({
      ...data,
      orderAt: new Date().toISOString(),
      shippingCents: newPrice * 100,
    })
      .then((params: OrderModel) => {
        history.push(`order/` + params.id);
      })
      .catch((err: Error) => setError(err.message));
  };

  const handleChangeRestaurant = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRestaurant(e.currentTarget.value);
    },
    [setRestaurant]
  );

  const handleChangeMenu = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setMenu(e.currentTarget.value);
      setIsValid(validUrl(e.currentTarget.value));
      setIsValidInput(validUrl(e.currentTarget.value));
    },
    [setMenu]
  );

  const handleChangeDeliveryPrice = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setDeliveryPrice(e.currentTarget.value);
    },
    [setDeliveryPrice]
  );

  return (
    <div>
      <Paper elevation={3} className="formSquare">
        {error && <Alert severity="error">Request Failed!</Alert>}

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
            margin="normal"
            label="Restaurant"
            value={restaurant}
            inputProps={{
              fullWidth: true,
            }}
            {...register('from')}
            onChange={handleChangeRestaurant}
            type="text"
            required
          />
          <TextField
            margin="normal"
            error={isValidInput}
            label="Menu URL"
            value={menu}
            inputProps={{
              fullWidth: true,
            }}
            {...register('menuUrl')}
            onChange={handleChangeMenu}
            type="text"
            required
          />
          {isValidInput && (
            <Alert severity="error">This URL is not valid!</Alert>
          )}

          <TextField
            inputRef={deliveryRef}
            margin="normal"
            label="Delivery Price (optional)"
            sx={{ m: 1, width: '25ch' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">PLN</InputAdornment>
              ),
            }}
            value={DeliveryPrice}
            {...register('shippingCents')}
            onChange={handleChangeDeliveryPrice}
            type="number"
          />

          <Button
            type="submit"
            color="success"
            disabled={isValid}
            variant="outlined"
          >
            Confirm
          </Button>
        </form>
      </Paper>
    </div>
  );
};
