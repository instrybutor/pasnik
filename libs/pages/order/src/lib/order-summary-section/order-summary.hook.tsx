import { DishModel, OrderModel, UserModel } from '@pasnik/api/data-transfer';
import { useCallback, useState } from 'react';
import { useCurrentUser } from '@pasnik/auth';

export interface UserDishesSummary {
  user: UserModel;
  total: number;
  shipping: number;
  dishes: DishModel[];
}

export const useOrderSummary = (order?: OrderModel) => {
  const { user } = useCurrentUser();
  const [groupedSummaries, setGroupedSummaries] = useState<UserDishesSummary[]>(
    []
  );
  const [currentUserSummary, setCurrentUserSummary] =
    useState<UserDishesSummary | null>(null);

  const applyShipping = useCallback(
    (summaries: UserDishesSummary[]) => {
      if (!order?.shippingCents) {
        return;
      }
      summaries.forEach((userSummary) => {
        userSummary.shipping += order.shippingCents! / summaries.length;
      });
    },
    [order]
  );

  const groupSummaries = useCallback(
    (dishes: DishModel[]) => {
      const summaries = dishes.reduce((acc, dish) => {
        if (!dish.user || !user) {
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
      if (order?.shippingCents) {
        applyShipping(Object.values(summaries));
      }
      return {
        currentUserSummary: user ? summaries[user?.id] : null,
        userDishesSummaries: Object.values(summaries),
      };
    },
    [applyShipping, order, user]
  );

  const sortSummaries = useCallback(
    (userDishesSummaries: UserDishesSummary[]) => {
      return userDishesSummaries.sort((summary) =>
        summary.user.id === user?.id ? 0 : 1
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
