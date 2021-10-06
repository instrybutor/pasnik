import { OrderModel } from '@pasnik/api/data-transfer';
import OrderDish from '../order-dish/order-dish';
import AddDish from '../add-dish/add-dish';
import { BeakerIcon, PlusIcon } from '@heroicons/react/outline';
import { useCallback, useState } from 'react';

export interface OrderDishesProps {
  order: OrderModel;
}

export function OrderDishes({ order }: OrderDishesProps) {
  const [isAdding, setIsAdding] = useState(false);

  const addDishHandler = useCallback(() => {
    setIsAdding(true);
  }, []);

  return (
    <section aria-labelledby="notes-title">
      <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
        <div className="divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6 sm:flex sm:items-center sm:justify-between">
            <h2 id="notes-title" className="text-lg font-medium text-gray-900">
              Dania
            </h2>
            <div className="mt-3 flex sm:mt-0 sm:ml-4">
              <button
                onClick={addDishHandler}
                type="button"
                className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {order.dishes?.map((dish) => (
                <OrderDish dish={dish} />
              ))}
              {(!order.dishes || order.dishes.length === 0) && (
                <tr>
                  <td colSpan={4}>
                    <div className="text-center bg-white px-4 py-12">
                      <BeakerIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        Brak dań
                      </h3>
                    </div>
                  </td>
                </tr>
              )}
              {isAdding && <AddDish />}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default OrderDishes;
