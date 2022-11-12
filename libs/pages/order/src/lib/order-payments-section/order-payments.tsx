import { OrderPaymentsSkeleton } from './order-payments-skeleton';
import { useCurrentOrder, useOrderPayments } from '@pasnik/features/orders';
import { OrderPayment } from './order-payment';
import {
  useWorkspaceById,
  useWorkspaceUsers,
} from '@pasnik/features/workspaces';
import { useMemo } from 'react';
import { toEntities, useSlug } from '@pasnik/shared/utils';
import { AddPayerToOrderDto } from '@pasnik/api/data-transfer';

export function OrderPayments() {
  // const { t } = useTranslation();
  const slug = useSlug();
  const { data: order } = useCurrentOrder();
  const workspace = useWorkspaceById(order?.operation.workspaceId);
  const { data: users } = useWorkspaceUsers(workspace?.slug);
  const { data: payments } = useOrderPayments(slug);
  const paymentEntities = useMemo(() => {
    return toEntities(payments ?? [], ({ workspaceUserId }) => workspaceUserId);
  }, [payments]);
  const _payments = useMemo((): AddPayerToOrderDto[] => {
    return (
      users?.map(({ id }) => ({
        amountCents: paymentEntities[id]?.amountCents,
        workspaceUserId: id ?? -1,
        id: paymentEntities[id]?.id,
      })) ?? []
    );
  }, [users, paymentEntities]);
  return (
    <ul className="divide-y divide-gray-200">
      {_payments?.map((payment) => (
        <li key={payment.workspaceUserId}>
          <OrderPayment payment={payment} />
        </li>
      ))}
    </ul>
  );
}

OrderPayments.Skeleton = OrderPaymentsSkeleton;
