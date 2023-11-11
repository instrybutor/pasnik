import {
  ExpenseModel,
  OrderModel,
  ShareModel,
  ShareType,
} from '@pasnik/api/data-transfer';
import { useMemo } from 'react';

export function useOrderDelivery(order: OrderModel, expenses: ExpenseModel[]) {
  const shares = useMemo(
    () =>
      Object.values(
        expenses.reduce((acc, expense) => {
          expense.shares.forEach((share) => {
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
    [expenses]
  );

  return {
    shares,
  };
}
