import {
  DishModel,
  OrderModel,
  ShareModel,
  ShareType,
} from '@pasnik/api/data-transfer';
import { useMemo } from 'react';

export function useOrderDelivery(order: OrderModel, dishes: DishModel[]) {
  const shares = useMemo(
    () =>
      Object.values(
        dishes.reduce((acc, dish) => {
          dish.expense.shares.forEach((share) => {
            if (acc[share.workspaceUserId]) {
              return;
            }
            acc[share.workspaceUserId] = {
              share: 1,
              workspaceUserId: share.workspaceUserId,
              id: -1,
              shareType: ShareType.Coefficient,
            };
          });
          return acc;
        }, {} as Record<string, ShareModel>)
      ),
    [dishes]
  );

  return {
    shares,
  };
}
