import { Fragment, MouseEvent, useCallback, useEffect, useState } from 'react';
import {
  CheckIcon,
  DotsHorizontalIcon,
  DuplicateIcon,
} from '@heroicons/react/outline';
import { PencilIcon, TrashIcon, XIcon } from '@heroicons/react/solid';
import { DishModel } from '@pasnik/api/data-transfer';
import OrderDishUser from '../order-dish-users/order-dish-user';
import { Price } from '@pasnik/components';
import { Menu, Transition } from '@headlessui/react';

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
  const [isShown, setShown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteHandler = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const buttonValue = event.currentTarget.value;
      if (isDeleting && buttonValue) {
        setShown(false);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShown(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Transition
      as={Fragment}
      show={isShown}
      enter="transition ease-out duration-[1000ms]"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-[1000ms]"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <li className="flex items-center gap-4 px-6">
        <div className="flex-1 w-full">
          <div className="text-sm text-gray-500 min-w-0 flex-1">
            {dish.name}
          </div>
        </div>

        <OrderDishUser user={dish.user} />

        <div className="flex-0 text-sm text-gray-500 w-20 text-right">
          <Price priceCents={dish.priceCents} />
        </div>
        {isDeleting && (
          <div className="absolute w-full h-full flex bg-black bg-opacity-50 z-10 items-stretch sm:hidden">
            <button
              type="button"
              onClick={deleteHandler}
              value={dish.id}
              className="flex flex-1 items-center justify-center p-1 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <CheckIcon className="h-10 w-10" aria-hidden="true" />
            </button>
            <button
              onClick={deleteHandler}
              type="button"
              className="flex flex-1 items-center justify-center p-1 border border-transparent rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <XIcon className="h-10 w-10" aria-hidden="true" />
            </button>
          </div>
        )}
        {inProgress && (
          <div className="py-4">
            <div className="hidden sm:block whitespace-nowrap space-x-2 flex-shrink-0">
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
                    value={dish.id}
                    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                    <DuplicateIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
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
            </div>
            <Menu as="span" className="ml-3 relative sm:hidden">
              <Menu.Button className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                <DotsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
                    >
                      <DuplicateIcon
                        className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                      Duplikuj
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={editHandler}
                      type="button"
                      className="inline-flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
                    >
                      <PencilIcon
                        className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                      Edytuj
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={deleteHandler}
                      value={dish.id}
                      type="button"
                      className="w-full inline-flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <TrashIcon
                        className="-ml-1 mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      Usuń
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}
      </li>
    </Transition>
  );
}

export default OrderDish;
