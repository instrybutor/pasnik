import { OrderSection } from '../order-section/order-section';
import { OrderModel } from '@pasnik/api/data-transfer';
import { useOrderDishes } from '@pasnik/features/orders';
import { Spinner } from '@pasnik/components';
import { OrderSummary } from '../order-summary/order-summary';
import { useTranslation } from 'react-i18next';

export interface OrderSummarySectionProps {
  order: OrderModel;
}

export function OrderSummarySection({ order }: OrderSummarySectionProps) {
  const { t } = useTranslation();
  const { data } = useOrderDishes(order);

  return (
    <OrderSection noPadding={true} header={t('v2-order.order_summary')}>
      {data ? <OrderSummary order={order} dishes={data} /> : <Spinner />}
    </OrderSection>
  );
}
