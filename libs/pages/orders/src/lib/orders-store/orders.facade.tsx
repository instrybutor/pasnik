import { useOrdersStore } from './orders.store';

export const useOrdersFacade = () => {
  const store = useOrdersStore();

  return store;
};
