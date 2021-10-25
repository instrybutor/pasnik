import { useOrderStore } from './order.store';

export const useOrderFacade = () => {
  const store = useOrderStore();

  return store;
};
