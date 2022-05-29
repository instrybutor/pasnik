import { PlusIcon } from '@heroicons/react/outline';
import { OrderSection } from '../order-section/order-section';
import { OrderModel } from '@pasnik/api/data-transfer';
import { useOrderDishes } from '@pasnik/features/orders';
import { useState } from 'react';
import { OrderDishAdd } from '../order-dish-add/order-dish-add';
import { OrderDishes } from '../order-dishes/order-dishes';
import { Spinner } from '@pasnik/components';

export interface OrderDishesProps {
  order: OrderModel;
}

export function OrderDishesSection({ order }: OrderDishesProps) {
  const { data } = useOrderDishes(order);
  const [isAdding, setIsAdding] = useState(true);
  return (
    <OrderSection
      noPadding={true}
      header="Zamówienie"
      footer={
        isAdding && (
          <OrderDishAdd order={order} onClose={() => setIsAdding(false)} />
        )
      }
      action={
        <button
          onClick={() => setIsAdding(true)}
          type="button"
          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      }
    >
      {data ? <OrderDishes order={order} dishes={data} /> : <Spinner />}
    </OrderSection>
  );
}
