import { PaymentModel } from '@pasnik/api/data-transfer';
import { Price, UserAvatar, UserName } from '@pasnik/components';
import {
  useWorkspaceById,
  useWorkspaceUsers,
} from '@pasnik/features/workspaces';
import { useMemo } from 'react';
import { useCurrentOrder } from '@pasnik/features/orders';

export interface OrderPaymentProps {
  payment: PaymentModel;
}
export function OrderPayment({ payment }: OrderPaymentProps) {
  const { data: order } = useCurrentOrder();
  const workspace = useWorkspaceById(order?.operation.workspaceId);
  const { data: users } = useWorkspaceUsers(workspace?.slug);
  const user = useMemo(
    () => users?.find((user) => user.id === payment.workspaceUserId),
    [users, payment?.workspaceUserId]
  );
  return (
    <div className="flex items-center gap-6 px-6 py-4">
      <div className="flex items-center">
        <div className="flex relative">
          <UserAvatar showTooltip={true} user={user?.user} size="sm" />
        </div>
      </div>

      <div className="flex-1 w-full">
        <div className="text-sm text-gray-500 min-w-0 flex-1 text-left">
          <UserName user={user?.user} />
        </div>
      </div>

      <div className="flex-0 text-sm text-gray-500 w-20 text-right">
        <Price priceCents={payment.amountCents} />
      </div>
    </div>
  );
}
