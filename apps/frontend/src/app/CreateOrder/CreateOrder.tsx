import React, { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import type { CreateOrderDto, OrderModel } from '@pasnik/api/data-transfer';
import { useOrdersFacade } from '@pasnik/orders-data-access';
import { Alert, Button, InputAdornment, Paper, TextField } from '@mui/material';

export const CreateOrder: FC = () => {
  const { register, handleSubmit } = useForm();
  const { createOrder } = useOrdersFacade();

  const [restaurant, setRestaurant] = useState<string>('');
  const [menu, setMenu] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const [DeliveryPrice, setDeliveryPrice] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const onSubmit = (data: CreateOrderDto) => {
    const newPrice =
      typeof data.shippingCents === 'string'
        ? data.shippingCents.replace(/,|\./, '')
        : '';
    createOrder({
      ...data,
      orderAt: new Date().toISOString(),
      shippingCents: +newPrice,
    })
      .then((params: OrderModel) => history.push(`order/` + params.id))
      .catch((err: Error) => setError(err.message));
  };

  function handleChangeRestaurant(e: ChangeEvent<HTMLInputElement>) {
    setRestaurant(e.currentTarget.value);
  }

  function handleChangeMenu(e: ChangeEvent<HTMLInputElement>) {
    setMenu(e.currentTarget.value);
    setIsValid(validUrl(e.currentTarget.value));
    setIsValidInput(validUrl(e.currentTarget.value));
  }

  function handleChangeDeliveryPrice(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.currentTarget.value.replace(/[^0-9.,]/g, '');
    const priceRefactor = inputValue.split(/,|\./, 2);
    let price = priceRefactor[0];
    if (priceRefactor[1] === '' || priceRefactor[1]) {
      const secondPricePart = ',' + priceRefactor[1].replace(/,|\./, '');
      price += secondPricePart.replace(/(?<=[0-9]{2}).+/, '');
    }
    setDeliveryPrice(price);
  }

  function validUrl(text: string) {
    const regex = RegExp(
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/
    );

    return !regex.test(text);
  }

  return (
    <div>
      <Paper elevation={3} className="formSquare">
        {error && <Alert severity="error">Request Failed!</Alert>}

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            label="Restaurant"
            id="email"
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
            id="password"
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
            margin="normal"
            label="Delivery Price (optional)"
            id="outlined-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">PLN</InputAdornment>
              ),
            }}
            value={DeliveryPrice}
            {...register('shippingCents')}
            onChange={handleChangeDeliveryPrice}
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
