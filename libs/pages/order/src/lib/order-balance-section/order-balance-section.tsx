import { OrderSection } from '../order-section/order-section';
import { useTranslation } from 'react-i18next';
import { QueryBoundary } from '@pasnik/components';
import { OrderBalance } from './order-balance';

export function OrderBalanceSection() {
  const { t } = useTranslation();

  return (
    <OrderSection noPadding={true} header={t('order.balance')}>
      <QueryBoundary fallback={<OrderBalance.Skeleton />}>
        <OrderBalance />
      </QueryBoundary>
    </OrderSection>
  );
}
