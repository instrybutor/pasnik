import { useTranslation } from 'react-i18next';
import { PlusIcon } from '@heroicons/react/outline';
import { Transition } from '@headlessui/react';

import { DishModel, OrderModel, OrderStatus } from '@pasnik/api/data-transfer';

import OrderDish from '../order-dish/order-dish';
import AddDish from '../add-dish/add-dish';

import UpdateDish from '../update-dish/update-dish';
import { useOrderDishes } from './use-order-dishes';

export interface OrderDishesProps {
  dishes: DishModel[] | null;
  order: OrderModel | null;
}

const sortByCreateAt = (dish: DishModel, nextDish: DishModel) =>
  new Date(dish.createdAt).getTime() > new Date(nextDish.createdAt).getTime()
    ? 1
    : -1;

export function OrderDishes({ dishes, order }: OrderDishesProps) {
  const {
    isAdding,
    inProgress,
    updateId,

    onAddCancel,
    duplicateDish,
    addDishClickHandler,
    addDishHandler,
    cancelUpdateHandler,
    deleteDishHandler,
    editClickHandler,
    updateDishHandler,
  } = useOrderDishes({ order });
  const { t } = useTranslation();

  return (
    <section aria-labelledby="notes-title">
      <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
        <div className="divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
            <h2 id="notes-title" className="text-lg font-medium text-gray-900">
              {t('dish.title')}
            </h2>
            {inProgress && (
              <div className="flex">
                <button
                  onClick={addDishClickHandler}
                  type="button"
                  className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
          <ul className="divide-y divide-gray-200">
            {dishes?.sort(sortByCreateAt).map((dish) => (
              <Transition
                as="li"
                key={dish.id}
                show
                className="flex items-center gap-4 px-6"
                enter="transition ease-out duration-[1000ms]"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-[1000ms]"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                {updateId === dish.id ? (
                  <UpdateDish
                    key={dish.id}
                    onUpdateDish={updateDishHandler}
                    dish={dish}
                    onCancelUpdate={cancelUpdateHandler}
                  />
                ) : (
                  <OrderDish
                    inProgress={order?.status === OrderStatus.InProgress}
                    key={dish.id}
                    dish={dish}
                    onDelete={deleteDishHandler}
                    onDuplicate={duplicateDish}
                    onEdit={editClickHandler}
                  />
                )}
              </Transition>
            ))}
          </ul>
          {isAdding && (
            <AddDish onAdd={addDishHandler} onCancel={onAddCancel} />
          )}
        </div>
      </div>
    </section>
  );
}

export default OrderDishes;
