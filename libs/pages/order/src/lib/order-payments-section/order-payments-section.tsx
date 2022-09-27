import { OrderSection } from '../order-section/order-section';
import { useTranslation } from 'react-i18next';
import { QueryBoundary } from '@pasnik/components';
import { OrderPayments } from './order-payments';

export function OrderPaymentsSection() {
  const { t } = useTranslation();

  return (
    <OrderSection noPadding={true} header={t('order.payment')}>
      <QueryBoundary fallback={<OrderPayments.Skeleton />}>
        <OrderPayments />
      </QueryBoundary>
    </OrderSection>
  );
}
