import { useMemo } from 'react';
import { ProcessDish } from './order-process-section';
import { useOrderDishes } from '@pasnik/features/orders';
import { useSlug } from '@pasnik/shared/utils';

export function useOrderProcessSection() {
  const slug = useSlug();
  const { data, isLoading } = useOrderDishes(slug, false);
  const dishes = useMemo(() => {
    return Object.values(
      data?.reduce((acc, expense) => {
        const key = expense.name + expense.priceCents;
        acc[key] = acc[key] || {
          name: expense.name,
          priceCents: expense.priceCents,
          expenses: [],
          users: [],
        };
        acc[key].expenses.push(expense);
        if (
          !acc[key].users.some((value) => value.id === expense.workspaceUserId)
        ) {
          // acc[key].users.push(expense.user);
        }
        return acc;
      }, {} as Record<string, ProcessDish>) ?? []
    ).sort((dishA, dishB) => {
      if (dishA.name < dishB.name) {
        return -1;
      }
      if (dishA.name > dishB.name) {
        return 1;
      }
      return 0;
    });
  }, [data]);

  const totalCents = useMemo(() => {
    return data?.reduce((acc, dish) => acc + dish.priceCents, 0) ?? 0;
  }, [data]);

  return {
    dishes,
    totalCents,
    isLoading,
  };
}
