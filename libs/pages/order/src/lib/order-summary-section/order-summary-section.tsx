import { Suspense } from 'react';
import { OrderSection } from '../order-section/order-section';
import { OrderSummary } from './order-summary';
import { useTranslation } from 'react-i18next';
import { OrderSummarySkeleton } from './order-summary-skeleton';

export function OrderSummarySection() {
  const { t } = useTranslation();

  return (
    <OrderSection noPadding={true} header={t('order.order_summary')}>
      <Suspense fallback={<OrderSummarySkeleton />}>
        <OrderSummary />
      </Suspense>
    </OrderSection>
  );
}
