import { createOrdersStore } from './orders.store';

export const useOrdersFacade = () => {
  const store = createOrdersStore();

  return store;
};
