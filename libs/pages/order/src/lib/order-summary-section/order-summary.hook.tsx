import { DishModel, OrderModel, UserModel } from '@pasnik/api/data-transfer';
import { useCallback, useState } from 'react';
import {
  useCurrentWorkspaceUser,
  useWorkspaceById,
  useWorkspaceUsers,
} from '@pasnik/features/workspaces';

export interface UserDishesSummary {
  user: UserModel;
  total: number;
  shipping: number;
  dishes: DishModel[];
}

export const useOrderSummary = (order?: OrderModel) => {
  const user = useCurrentWorkspaceUser();
  const [groupedSummaries, setGroupedSummaries] = useState<UserDishesSummary[]>(
    []
  );
  const [currentUserSummary, setCurrentUserSummary] =
    useState<UserDishesSummary | null>(null);
  const workspace = useWorkspaceById(order?.workspaceId);
  const { data: workspaceUsers } = useWorkspaceUsers(workspace?.slug);

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
        dish.expense.shares.forEach((share) => {
          const workspaceUser = workspaceUsers?.find(
            ({ id }) => id === share.workspaceUserId
          );
          if (!user) {
            return;
          }
          const userSummary: UserDishesSummary = acc[share.workspaceUserId] || {
            user: workspaceUser?.user,
            dishes: [],
            total: 0,
            shipping: 0,
          };

          userSummary.dishes.push(dish);
          userSummary.total += dish.expense.priceCents;
          acc[share.workspaceUserId] = userSummary;
        });
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
    [applyShipping, order, user, workspaceUsers]
  );

  const sortSummaries = useCallback(
    (userDishesSummaries: UserDishesSummary[]) => {
      return userDishesSummaries.sort((summary) =>
        summary.user.id === user?.userId ? 0 : 1
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
