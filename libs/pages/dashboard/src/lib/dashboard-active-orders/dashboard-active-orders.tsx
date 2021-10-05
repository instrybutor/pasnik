import { BeakerIcon } from '@heroicons/react/outline';
import OrderList from '../order-list/order-list';
import { OrderModel } from '@pasnik/api/data-transfer';

export interface DashboardActiveOrdersProps {
  orders: OrderModel[];
}

export function DashboardActiveOrders({ orders }: DashboardActiveOrdersProps) {
  return orders.length === 0 ? (
    <div className="text-center bg-white px-4 py-12">
      <BeakerIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">Brak zamówień</h3>
      <p className="mt-1 text-sm text-gray-500">
        Zacznij od utworzenia nowego zamówienia
      </p>
    </div>
  ) : (
    <OrderList orders={orders} />
  );
}

export default DashboardActiveOrders;
