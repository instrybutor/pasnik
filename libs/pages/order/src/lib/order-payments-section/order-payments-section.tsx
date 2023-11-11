import { OrderSection } from '../order-section/order-section';
import { useTranslation } from 'react-i18next';
import { Price, QueryBoundary } from '@pasnik/components';
import { OrderPayments } from './order-payments';
import { usePayments } from './use-payments';

export function OrderPaymentsSection() {
  const { t } = useTranslation();
  const { totalPayments, balanceCents } = usePayments();

  return (
    <OrderSection
      action={
        <span className="text-gray-500">
          <Price priceCents={totalPayments} /> (
          <Price className="text-sm" priceCents={balanceCents} /> )
        </span>
      }
      noPadding={true}
      header={t('order.payment')}
    >
      <QueryBoundary fallback={<OrderPayments.Skeleton />}>
        <OrderPayments />
      </QueryBoundary>
    </OrderSection>
  );
}
