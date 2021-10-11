import { DishModel, OrderModel, UserModel } from '@pasnik/api/data-transfer';
import { useAuth } from '@pasnik/shared/utils-auth';
import { useState } from 'react';

export interface UserDishesSummary {
  user: UserModel;
  total: number;
  shipping: number;
  dishes: DishModel[];
}

export const useOrderSummary = (order: OrderModel) => {
  const { user } = useAuth();
  const [grouppedSummaries, setGrouppedSummaries] = useState<
    UserDishesSummary[]
  >([]);
  const [currentUserSummary, setCurrentUserSummary] =
    useState<UserDishesSummary | null>(null);

  const applyShipping = (summaries: UserDishesSummary[]) => {
    summaries.forEach((userSummary) => {
      userSummary.shipping += order.shippingCents! / summaries.length;
    });
  };

  const groupSummaries = (dishes: DishModel[]) => {
    const summaries = dishes.reduce((acc, dish) => {
      dish.usersDishes.forEach(({ user }) => {
        const userSummary: UserDishesSummary = acc[user.id] || {
          user,
          dishes: [],
          total: 0,
          shipping: 0,
        };
        userSummary.dishes.push(dish);
        userSummary.total += dish.priceCents;
        acc[user.id] = userSummary;
      });
      return acc;
    }, {} as Record<UserModel['id'], UserDishesSummary>);
    if (order.shippingCents) {
      applyShipping(Object.values(summaries));
    }
    return {
      currentUserSummary: summaries[user!.id],
      userDishesSummaries: Object.values(summaries),
    };
  };

  const sortSummaries = (userDishesSummaries: UserDishesSummary[]) => {
    return userDishesSummaries.sort((summary) =>
      summary.user.id === user!.id ? 0 : 1
    );
  };

  const setDishes = (dishes: DishModel[]) => {
    const { userDishesSummaries, currentUserSummary } = groupSummaries(dishes);
    setGrouppedSummaries(sortSummaries(userDishesSummaries));
    setCurrentUserSummary(currentUserSummary);
  };

  return {
    grouppedSummaries,
    currentUserSummary,
    setDishes,
  };
};
