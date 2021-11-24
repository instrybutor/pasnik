import { Fragment, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpenIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LockOpenIcon,
  PencilIcon,
  TruckIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react';
import { Price } from '@pasnik/components';
import { DishModel, OrderModel, OrderStatus } from '@pasnik/api/data-transfer';

import { OrderStatusBadge } from '../order-status-badge/order-status-badge';
import { OrderTimestamp } from '../order-timestamp/order-timestamp';
import { useOrderFacade } from '../order-store/order.facade';

export interface OrderHeaderProps {
  order: OrderModel;
  dishes: DishModel[];
}

export function OrderHeader({ order, dishes }: OrderHeaderProps) {
  const [totalPrice, setTotalPrice] = useState(0);
  const {
    markAsClosedMutation,
    markAsDeliveredMutation,
    markAsOpenMutation,
    markAsOrderedMutation,
  } = useOrderFacade();

  const markAsDeliveredHandler = useCallback(
    () => markAsDeliveredMutation.mutateAsync(order.id),
    [markAsDeliveredMutation, order.id]
  );

  const closeOrderHandler = useCallback(
    () => markAsClosedMutation.mutateAsync(order.id),
    [markAsClosedMutation, order.id]
  );

  const openOrderHandler = useCallback(
    () => markAsOpenMutation.mutateAsync(order.id),
    [markAsOpenMutation, order.id]
  );

  const makeOrderHandler = useCallback(
    () => markAsOrderedMutation.mutateAsync(order.id),
    [markAsOrderedMutation, order.id]
  );

  useEffect(() => {
    setTotalPrice(dishes.reduce((acc, cur) => acc + cur.priceCents, 0));
  }, [dishes]);

  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:max-w-6xl md:mx-auto lg:px-8">
        <div className="py-6 xl:flex xl:items-center lg:justify-between lg:border-t lg:border-gray-200">
          <div className="flex-1 min-w-0 ml-3">
            <h1 className="text-2xl font-semibold leading-7 text-gray-900 sm:leading-9 sm:truncate flex items-center">
              {order.from}
              <div className="inline-flex ml-4">
                <OrderStatusBadge order={order} />
              </div>
            </h1>
            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
              <div className="mt-1.5 flex items-center text-sm text-gray-500">
                <a
                  href={order.menuUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-2 p-0.5 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <BookOpenIcon
                    className="flex-shrink-0 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                  />
                  Menu
                </a>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <TruckIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <Price priceCents={order.shippingCents} />
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CurrencyDollarIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <Price priceCents={totalPrice} />
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CalendarIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <OrderTimestamp order={order} showLabel />
              </div>
            </div>
          </div>
          <div className="mt-5 flex xl:mt-0 xl:ml-4">
            {order.status === OrderStatus.InProgress && (
              <span className="hidden sm:block">
                <button
                  type="button"
                  onClick={closeOrderHandler}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <XIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Anuluj
                </button>
              </span>
            )}

            {[OrderStatus.Canceled, OrderStatus.Ordered].includes(
              order.status
            ) && (
              <span className="sm:ml-3">
                <button
                  type="button"
                  onClick={openOrderHandler}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <LockOpenIcon
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Otwórz
                </button>
              </span>
            )}

            {[OrderStatus.Ordered].includes(order.status) && (
              <span className="ml-3">
                <button
                  type="button"
                  disabled={!order.payer}
                  onClick={markAsDeliveredHandler}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <CheckIcon
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Dostarczone
                </button>
              </span>
            )}

            {order.status === OrderStatus.InProgress && (
              <span className="hidden sm:block sm:ml-3">
                <Link
                  to="edit"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <PencilIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  Edytuj
                </Link>
              </span>
            )}

            {order.status === OrderStatus.InProgress && (
              <span className="sm:ml-3">
                <button
                  type="button"
                  onClick={makeOrderHandler}
                  disabled={dishes.length === 0}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <CheckIcon
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Zamów
                </button>
              </span>
            )}

            {order.status === OrderStatus.InProgress && (
              <Menu as="span" className="ml-3 relative sm:hidden">
                <Menu.Button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                  Więcej
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="edit"
                          className="inline-flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
                        >
                          <PencilIcon
                            className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                            aria-hidden="true"
                          />
                          Edytuj
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          type="button"
                          onClick={closeOrderHandler}
                          className="w-full inline-flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <XIcon
                            className="-ml-1 mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                          Anuluj
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHeader;
