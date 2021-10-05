import { OrderModel } from '@pasnik/api/data-transfer';
import { BeakerIcon } from '@heroicons/react/outline';
import OrderList from '../order-list/order-list';

export interface DashboardCompletedOrdersProps {
  orders: OrderModel[];
}

export function DashboardCompletedOrders({
  orders,
}: DashboardCompletedOrdersProps) {
  return orders.length === 0 ? (
    <div className="text-center bg-white px-4 py-12">
      <BeakerIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        Brak zakończonych zamówień
      </h3>
    </div>
  ) : (
    <OrderList orders={orders} />
  );
}

export default DashboardCompletedOrders;
