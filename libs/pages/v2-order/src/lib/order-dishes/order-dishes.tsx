import { BeakerIcon } from '@heroicons/react/outline';
import OrderDish from '../order-dish/order-dish';
import { DishModel, OrderModel } from '@pasnik/api/data-transfer';
import { useTranslation } from 'react-i18next';

export interface OrderDishesProps {
  order: OrderModel;
  dishes: DishModel[];
}

export function OrderDishes({ dishes, order }: OrderDishesProps) {
  const { t } = useTranslation();
  return dishes.length === 0 ? (
    <div className="text-center bg-white px-4 py-12">
      <BeakerIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        {t('dish.empty')}
      </h3>
    </div>
  ) : (
    <ul className="divide-y divide-gray-200">
      {dishes.map((dish) => (
        <li className="flex items-center gap-6 px-6 py-4">
          <OrderDish dish={dish} order={order} />
        </li>
      ))}
    </ul>
  );
}
