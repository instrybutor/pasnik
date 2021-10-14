import {
  AddDishDto,
  DishModel,
  OrderModel,
  OrderStatus,
} from '@pasnik/api/data-transfer';
import OrderDish from '../order-dish/order-dish';
import AddDish from '../add-dish/add-dish';
import { BeakerIcon, PlusIcon } from '@heroicons/react/outline';
import { useCallback, useEffect, useState } from 'react';
import { useOrderFacade } from '../order-store/order.facade';
import UpdateDish from '../update-dish/update-dish';

export interface OrderDishesProps {
  dishes: DishModel[] | null;
  order: OrderModel | null;
}

export function OrderDishes({ dishes, order }: OrderDishesProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const { addDish, deleteDish, updateDish } = useOrderFacade();
  const inProgress = order?.status === OrderStatus.InProgress;

  const addDishClickHandler = useCallback(() => {
    setIsAdding(true);
  }, []);

  const addDishHandler = useCallback(
    async (data: AddDishDto) => {
      const dish = await addDish(order!.id, {
        ...data,
        priceCents: data.priceCents * 100,
      });

      setIsAdding(false);

      return dish;
    },
    [addDish, order]
  );

  const deleteDishHandler = useCallback(
    async (dish: DishModel) => {
      await deleteDish(dish);
    },
    [deleteDish]
  );

  const updateDishHandler = useCallback(
    async (dishDto: AddDishDto, dish: DishModel) => {
      await updateDish(dish.id, {
        ...dishDto,
        priceCents: dishDto.priceCents * 100,
      });
      setUpdateId(null);
    },
    [updateDish]
  );

  const editClickHandler = useCallback(async (dish: DishModel) => {
    setUpdateId(dish.id);
  }, []);

  const cancelUpdateHandler = useCallback(() => {
    setUpdateId(null);
  }, []);

  useEffect(() => {
    setUpdateId(null);
    setIsAdding(false);
  }, [inProgress]);

  return (
    <section aria-labelledby="notes-title">
      <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
        <div className="divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
            <h2 id="notes-title" className="text-lg font-medium text-gray-900">
              Zamówienie
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
            {dishes?.map((dish) =>
              updateId === dish.id ? (
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
                  onDeleteDish={deleteDishHandler}
                  dish={dish}
                  onEditClick={editClickHandler}
                />
              )
            )}
            {!dishes?.length && (
              <li>
                <div className="text-center bg-white px-4 py-12">
                  <BeakerIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Brak dań
                  </h3>
                </div>
              </li>
            )}
          </ul>
          {isAdding && <AddDish onAdd={addDishHandler} />}
        </div>
      </div>
    </section>
  );
}

export default OrderDishes;
