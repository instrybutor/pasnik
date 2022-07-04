import { useMemo } from 'react';
import { ProcessDish } from './order-process-section';
import { useOrderDishes } from '@pasnik/features/orders';
import { useSlug } from '@pasnik/shared/utils';

export function useOrderProcessSection() {
  const slug = useSlug();
  const { data, isLoading } = useOrderDishes(slug, false);
  const dishes = useMemo(() => {
    return Object.values(
      data?.reduce((acc, dish) => {
        const key = dish.name + dish.priceCents;
        acc[key] = acc[key] || {
          name: dish.name,
          priceCents: dish.priceCents,
          dishes: [],
          users: [],
        };
        acc[key].dishes.push(dish);
        if (!acc[key].users.some((value) => value.id === dish.userId)) {
          acc[key].users.push(dish.user);
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
