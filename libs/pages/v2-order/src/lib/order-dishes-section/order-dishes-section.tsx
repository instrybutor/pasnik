import { PlusIcon } from '@heroicons/react/outline';
import { OrderSection } from '../order-section/order-section';
import { OrderModel } from '@pasnik/api/data-transfer';
import { useOrderDishes } from '@pasnik/features/orders';
import { useMemo, useState } from 'react';
import { OrderDishes } from '../order-dishes/order-dishes';
import { Price, Spinner } from '@pasnik/components';
import { OrderDishManage } from '../order-dish-add/order-dish-manage';

export interface OrderDishesProps {
  order: OrderModel;
}

export function OrderDishesSection({ order }: OrderDishesProps) {
  const { data } = useOrderDishes(order);
  const [isAdding, setIsAdding] = useState(false);
  const totalCents = useMemo(
    () => data?.reduce((acc, dish) => acc + dish.priceCents, 0),
    [data]
  );
  return (
    <OrderSection
      noPadding={true}
      header="Zamówienie"
      footer={
        <div className="divide-y divide-gray-200">
          {isAdding && (
            <OrderDishManage order={order} onClose={() => setIsAdding(false)} />
          )}
          {!!data?.length && (
            <div className="px-4 py-4 sm:px-6 flex items-center space-between">
              <span className="text-sm text-gray-500 flex-1">
                Ilość pozycji: {data.length}
              </span>
              <span className="text-sm text-gray-500 mr-32 pr-1">
                Suma: <Price className="font-bold" priceCents={totalCents} />
              </span>
            </div>
          )}
        </div>
      }
      action={
        <div className="flex gap-2">
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
