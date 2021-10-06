import { Fragment, useCallback, useState, MouseEvent } from 'react';
import { CheckIcon } from '@heroicons/react/outline';
import { PencilIcon, TrashIcon, XIcon } from '@heroicons/react/solid';
import { DishModel } from '@pasnik/api/data-transfer';

export interface OrderDishProps {
  dish: DishModel;
}

export function OrderDish({ dish }: OrderDishProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteHandler = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const buttonValue = event.currentTarget.value;
    if (isDeleting && buttonValue) {
      // delete
    } else if (isDeleting) {
      setIsDeleting(!isDeleting);
    }
  }, []);

  return (
    <tr>
      <td className="px-6 py-4 text-sm text-gray-500 w-8/12">{dish.name}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium w-2/12">
        {dish.createdAt}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/12">
        {dish.priceCents}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium w-1/12 space-x-2">
        {isDeleting ? (
          <Fragment>
            <button
              type="button"
              onClick={deleteHandler}
              className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={deleteHandler}
              value={dish.id}
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
    </tr>
  );
}

export default OrderDish;
