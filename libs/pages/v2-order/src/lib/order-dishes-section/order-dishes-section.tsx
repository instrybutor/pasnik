import { ExternalLinkIcon, PlusIcon } from '@heroicons/react/outline';
import { OrderSection } from '../order-section/order-section';
import { OrderModel } from '@pasnik/api/data-transfer';
import { useOrderDishes } from '@pasnik/features/orders';
import { useState } from 'react';
import { OrderDishes } from '../order-dishes/order-dishes';
import { Spinner } from '@pasnik/components';
import { OrderDishManage } from '../order-dish-add/order-dish-manage';

export interface OrderDishesProps {
  order: OrderModel;
}

export function OrderDishesSection({ order }: OrderDishesProps) {
  const { data } = useOrderDishes(order);
  const [isAdding, setIsAdding] = useState(false);
  return (
    <OrderSection
      noPadding={true}
      header="Zamówienie"
      footer={
        isAdding && (
          <OrderDishManage order={order} onClose={() => setIsAdding(false)} />
        )
      }
      action={
        <div className="flex gap-2">
          <a
            href={order.menuUrl}
            rel="noreferrer"
            target="_blank"
            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <ExternalLinkIcon className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            onClick={() => setIsAdding(true)}
            type="button"
            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      }
    >
      {data ? (
        <OrderDishes isAdding={isAdding} order={order} dishes={data} />
      ) : (
        <Spinner />
      )}
    </OrderSection>
  );
}
