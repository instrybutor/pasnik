import { CreateOrderPayload } from './createOrder.model';
import { authFetch } from '../utils/authFetch';

export const CreateOrderService = () => {
  const createOrder = (payload: CreateOrderPayload): Promise<Response> => {
    return authFetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  };

  return {
    createOrder,
  };
};
