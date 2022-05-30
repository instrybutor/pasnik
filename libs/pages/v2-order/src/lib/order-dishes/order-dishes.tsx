import { BeakerIcon } from '@heroicons/react/outline';
import OrderDish from '../order-dish/order-dish';
import { DishModel, OrderModel } from '@pasnik/api/data-transfer';
import { useTranslation } from 'react-i18next';
import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { OrderDishManage } from '../order-dish-add/order-dish-manage';

export interface OrderDishesProps {
  order: OrderModel;
  dishes: DishModel[];
  isAdding: boolean;
}

export function OrderDishes({ dishes, order, isAdding }: OrderDishesProps) {
  const { t } = useTranslation();
  const [updateId, setUpdateId] = useState(-1);

  useEffect(() => {
    if (isAdding) {
      setUpdateId(-1); // exit update if adding new entry
    }
  }, [isAdding]);

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
        <Transition
          as="li"
          key={dish.id}
          show
          enter="transition ease-out duration-[1000ms]"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-[1000ms]"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {dish.id === updateId ? (
            <OrderDishManage
              onClose={() => setUpdateId(-1)}
              order={order}
              dish={dish}
            />
          ) : (
            <OrderDish
              dish={dish}
              order={order}
              onUpdate={() => setUpdateId(dish.id)}
            />
          )}
        </Transition>
      ))}
    </ul>
  );
}
