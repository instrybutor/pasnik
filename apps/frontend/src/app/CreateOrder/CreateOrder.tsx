import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { CreateOrderService } from './CreateOrder.service';

import type { CreateOrderDto } from '@pasnik/api/data-transfer';

export const CreateOrder: FC = () => {
  const { register, handleSubmit } = useForm();

  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  const service = CreateOrderService();

  const onSubmit = (data: CreateOrderDto) => {
    service
      .createOrder({ ...data, orderAt: new Date().toISOString() })
      .then(() => history.push('/'))
      .catch((err: Error) => setError(err.message));
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="bg-gray-100 w-full h-screen">
      <div className="container flex justify-center">
        <div className=" bg-white p-6 rounded">
          <div>{error}</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="w-full p-4 border border-gray-400 rounded mb-2"
              {...register('from')}
              placeholder="Restaurant name"
            />

            <input
              className="w-full p-4 border border-gray-400 rounded mb-2"
              {...register('menuUrl')}
              placeholder="Menu URL"
            />
            <button
              className="p-4 px-6 bg-blue-400 text-white rounded"
              type="submit"
            >
              Create order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
