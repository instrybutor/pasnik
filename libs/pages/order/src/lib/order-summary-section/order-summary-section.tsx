import { OrderSection } from '../order-section/order-section';
import { OrderSummary } from './order-summary';
import { useTranslation } from 'react-i18next';
import { OrderSummarySkeleton } from './order-summary-skeleton';
import { QueryBoundary } from '@pasnik/components';

export function OrderSummarySection() {
  const { t } = useTranslation();

  return (
    <OrderSection noPadding={true} header={t('order.order_summary')}>
      <QueryBoundary fallback={<OrderSummarySkeleton />}>
        <OrderSummary />
      </QueryBoundary>
    </OrderSection>
  );
}
