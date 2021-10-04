import { FC } from 'react';

import { Alert } from '@mui/material';

import { useCreateOrder } from './create-order.hook';

export const CreateOrder: FC = () => {
  const { error, handleSubmit, onSubmit, register, errors } = useCreateOrder();

  return (
    <div className="w-2/4 mx-auto border border-gray-300 shadow-md p-6 rounded">
      {error && <Alert severity="error">Request Failed!</Alert>}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="mb-2">Restaurant</label>
          <input
            autoFocus
            type="text"
            placeholder="Put restaurant name"
            className="border rounded border-gray-300 p-4"
            {...register('from')}
          />
          {errors.from?.message && (
            <Alert severity="error">{errors.from?.message}</Alert>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2">Menu URL</label>
          <input
            type="text"
            placeholder="Put Menu URL"
            className="border rounded border-gray-300 p-4"
            {...register('menuUrl')}
          />
        </div>

        {errors.menuUrl?.message && (
          <Alert severity="error">{errors.menuUrl?.message}</Alert>
        )}

        <div className="flex flex-col">
          <label className="mb-2">Delivery Price (optional)</label>
          <input
            type="text"
            placeholder="Put delivery price"
            className="border rounded border-gray-300 p-4"
            {...register('shippingCents')}
          />
          {errors.shippingCents?.message && (
            <Alert severity="error">{errors.shippingCents?.message}</Alert>
          )}
        </div>

        <button type="submit" className="bg-blue-300 p-3 mt-4 rounded">
          Confirm
        </button>
      </form>
    </div>
  );
};
