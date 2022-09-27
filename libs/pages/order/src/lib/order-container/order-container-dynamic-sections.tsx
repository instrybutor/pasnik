import { OrderStatus } from '@pasnik/api/data-transfer';
import { useCurrentOrder } from '@pasnik/features/orders';

import { OrderDishesSection } from '../order-dishes-section/order-dishes-section';
import { OrderProcessSection } from '../order-process-section/order-process-section';
import { OrderETASection } from '../order-eta-section/order-eta-section';
import { OrderSummarySection } from '../order-summary-section/order-summary-section';
import { OrderPaymentsSection } from '../order-payments-section/order-payments-section';

export function OrderContainerDynamicSections() {
  const { order } = useCurrentOrder();
  return order?.status === OrderStatus.InProgress ? (
    <OrderDishesSection />
  ) : order?.status === OrderStatus.Processing ? (
    <OrderProcessSection />
  ) : (
    <>
      {order?.status === OrderStatus.Ordered ? (
        <OrderETASection />
      ) : (
        <OrderPaymentsSection />
      )}

      <OrderSummarySection />
    </>
  );
}
