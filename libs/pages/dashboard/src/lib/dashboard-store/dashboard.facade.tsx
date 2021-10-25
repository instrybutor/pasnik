import { useDashboardStore } from './dashboard.store';

export const useDashboardFacade = () => {
  const store = useDashboardStore();

  return store;
};
