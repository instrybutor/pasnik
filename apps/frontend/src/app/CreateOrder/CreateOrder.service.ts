import { authFetch } from '../utils/authFetch';
import { CreateOrderDto } from '@pasnik/api/data-transfer';

export const CreateOrderService = () => {
  const createOrder = (payload: CreateOrderDto): Promise<Response> => {
    return authFetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  };

  return {
    createOrder,
  };
};
