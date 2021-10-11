import { Fragment, MouseEvent, useCallback, useEffect, useState } from 'react';
import { CheckIcon } from '@heroicons/react/outline';
import { PencilIcon, TrashIcon, XIcon } from '@heroicons/react/solid';
import { DishModel } from '@pasnik/api/data-transfer';
import OrderDishUsers from '../order-dish-users/order-dish-user';
import { Price } from '@pasnik/components';

export interface OrderDishProps {
  inProgress: boolean;
  dish: DishModel;
  onDeleteDish: (dish: DishModel) => void;
  onEditClick: (dish: DishModel) => void;
}
export function OrderDish({
  dish,
  inProgress,
  onDeleteDish,
  onEditClick,
}: OrderDishProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteHandler = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const buttonValue = event.currentTarget.value;
      if (isDeleting && buttonValue) {
        onDeleteDish(dish);
      } else {
        setIsDeleting(!isDeleting);
      }
    },
    [isDeleting, onDeleteDish, dish]
  );

  const editHandler = useCallback(() => {
    onEditClick(dish);
  }, [onEditClick, dish]);

  useEffect(() => {
    setIsDeleting(false);
  }, [inProgress]);

  return (
    <tr>
      <td className="px-6 py-4 text-sm text-gray-500 w-8/12">{dish.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium w-1/12">
        <OrderDishUsers userDishes={dish.usersDishes} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/12">
        <Price priceCents={dish.priceCents} />
      </td>
      {inProgress && (
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium w-2/12 space-x-2">
          {isDeleting ? (
            <Fragment>
              <button
                type="button"
                onClick={deleteHandler}
                value={dish.id}
                className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <CheckIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={deleteHandler}
                type="button"
                className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <button
                type="button"
                onClick={editHandler}
                className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <PencilIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={deleteHandler}
                value={dish.id}
                type="button"
                className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <TrashIcon
                  className="h-5 w-5 pointer-events-none"
                  aria-hidden="true"
                />
              </button>
            </Fragment>
          )}
        </td>
      )}
    </tr>
  );
}

export default OrderDish;
