import React, { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import type { CreateOrderDto, OrderModel } from '@pasnik/api/data-transfer';
import { useOrdersFacade } from '@pasnik/orders-data-access';
import { Button, TextField } from '@mui/material';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

export const CreateOrder: FC = () => {
  const { register, handleSubmit } = useForm();
  const { createOrder } = useOrdersFacade();

  const [restaurant, setRestaurant] = useState<string>('');
  const [menu, setMenu] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isValidInput, setIsValidInput] = useState<boolean>(false);
  const [DeliveryPrice, setDeliveryPrice] = useState<number>(0);

  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const onSubmit = (data: CreateOrderDto) => {
    createOrder({ ...data, orderAt: new Date().toISOString() })
      .then((params: OrderModel) => history.push(`/`))
      .catch((err: Error) => setError(err.message));
  };

  const clearError = () => {
    setError(null);
  };

  function handleChangeRestaurant(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setRestaurant(e.currentTarget.value);
  }

  function handleChangeMenu(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setMenu(e.currentTarget.value);
    setIsValid(validUrl(e.currentTarget.value));
    setIsValidInput(validUrl(e.currentTarget.value));
  }

  function validUrl(text: string) {
    const regex = RegExp(
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/
    );

    return !regex.test(text);
  }

  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Restaurant"
          id="email"
          value={restaurant}
          inputProps={{
            fullWidth: true,
          }}
          onChange={handleChangeRestaurant}
          type="text"
        />
        &nbsp;
        <TextField
          error={isValidInput}
          label="Menu URL"
          id="password"
          value={menu}
          inputProps={{
            fullWidth: true,
          }}
          onChange={handleChangeMenu}
          type="text"
        />
        &nbsp;
        <CurrencyTextField
          label="Amount"
          variant="standard"
          // value={value}
          currencySymbol="$"
          //minimumValue="0"
          outputFormat="string"
          decimalCharacter="."
          digitGroupSeparator=","
          //  onChange={(event, value) => setValue(value)}
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
    </div>

    // <div className="bg-gray-100 w-full h-screen">
    //   <div className="container flex justify-center">
    //     <div className=" bg-white p-6 rounded">
    //       <div>{error}</div>
    //       <form onSubmit={handleSubmit(onSubmit)}>
    //         <input
    //           className="w-full p-4 border border-gray-400 rounded mb-2"
    //           {...register('from')}
    //           placeholder="Restaurant name"
    //         />
    //         <input
    //           className="w-full p-4 border border-gray-400 rounded mb-2"
    //           {...register('menuUrl')}
    //           placeholder="Menu URL"
    //         />
    //         <button
    //           className="p-4 px-6 bg-blue-400 text-white rounded"
    //           type="submit"
    //         >
    //           Create order
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
};
