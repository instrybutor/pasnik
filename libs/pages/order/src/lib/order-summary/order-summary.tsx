import { DishModel, OrderModel } from '@pasnik/api/data-transfer';
import { useEffect } from 'react';
import OrderSummaryDishes from '../order-summary-dishes/order-summary-dishes';
import { useOrderSummary } from './order-summary.hook';
import OrderPayment from '../order-payment/order-payment';

export interface OrderDishesSummaryProps {
  dishes: DishModel[];
  order: OrderModel;
}

export function OrderSummary({ dishes, order }: OrderDishesSummaryProps) {
  const { currentUserSummary, groupedSummaries, setDishes } =
    useOrderSummary(order);
  useEffect(() => {
    setDishes(dishes);
  }, [dishes, setDishes]);

  return (
    <>
      {currentUserSummary && (
        <OrderPayment userDishesSummary={currentUserSummary} order={order} />
      )}
      <OrderSummaryDishes userDishesSummaries={groupedSummaries} />
    </>
  );
}

export default OrderSummary;
