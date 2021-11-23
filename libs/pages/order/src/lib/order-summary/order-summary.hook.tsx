import { DishModel, OrderModel, UserModel } from '@pasnik/api/data-transfer';
import { useUserStore } from '@pasnik/store';
import { useCallback, useState } from 'react';

export interface UserDishesSummary {
  user: UserModel;
  total: number;
  shipping: number;
  dishes: DishModel[];
}

export const useOrderSummary = (order: OrderModel) => {
  const { user } = useUserStore();
  const [groupedSummaries, setGroupedSummaries] = useState<UserDishesSummary[]>(
    []
  );
  const [currentUserSummary, setCurrentUserSummary] =
    useState<UserDishesSummary | null>(null);

  const applyShipping = useCallback(
    (summaries: UserDishesSummary[]) => {
      summaries.forEach((userSummary) => {
        userSummary.shipping += order.shippingCents! / summaries.length;
      });
    },
    [order]
  );

  const groupSummaries = useCallback(
    (dishes: DishModel[]) => {
      const summaries = dishes.reduce((acc, dish) => {
        if (!dish.user) {
          return acc;
        }
        const userSummary: UserDishesSummary = acc[dish.user.id] || {
          user: dish.user,
          dishes: [],
          total: 0,
          shipping: 0,
        };
        userSummary.dishes.push(dish);
        userSummary.total += dish.priceCents;
        acc[dish.user.id] = userSummary;
        return acc;
      }, {} as Record<UserModel['id'], UserDishesSummary>);
      if (order.shippingCents) {
        applyShipping(Object.values(summaries));
      }
      return {
        currentUserSummary: summaries[user!.id],
        userDishesSummaries: Object.values(summaries),
      };
    },
    [applyShipping, order, user]
  );

  const sortSummaries = useCallback(
    (userDishesSummaries: UserDishesSummary[]) => {
      return userDishesSummaries.sort((summary) =>
        summary.user.id === user!.id ? 0 : 1
      );
    },
    [user]
  );

  const setDishes = useCallback(
    (dishes: DishModel[]) => {
      const { userDishesSummaries, currentUserSummary } =
        groupSummaries(dishes);
      setGroupedSummaries(sortSummaries(userDishesSummaries));
      setCurrentUserSummary(currentUserSummary);
    },
    [groupSummaries, sortSummaries]
  );

  return {
    groupedSummaries,
    currentUserSummary,
    setDishes,
  };
};
