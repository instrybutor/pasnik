import { PlusIcon, TruckIcon } from '@heroicons/react/outline';
import { OrderSection } from '../order-section/order-section';
import { OrderModel } from '@pasnik/api/data-transfer';

export interface OrderDishesProps {
  order: OrderModel;
}

export function OrderDishesSection({ order }: OrderDishesProps) {
  return (
    <OrderSection
      title="Zamówienie"
      action={
        <div className="flex space-x-3">
          <button
            type="button"
            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <TruckIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      }
    ></OrderSection>
  );
}
