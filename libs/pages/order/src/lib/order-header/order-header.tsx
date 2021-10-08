import { Fragment, useCallback, useState } from 'react';
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
import classNames from 'classnames';
import { OrderModel, OrderStatus, UserModel } from '@pasnik/api/data-transfer';
import { formatDistance } from 'date-fns';
import { pl } from 'date-fns/locale';
import { OrderStatusBadge } from '../order-status-badge/order-status-badge';
import { useOrderFacade } from '../order-store/order.facade';
import { useAuth } from '@pasnik/shared/utils-auth';

export interface OrderHeaderProps {
  order: OrderModel;
}

export function OrderHeader({ order }: OrderHeaderProps) {
  const {
    markAsClosed,
    markAsOpen,
    markAsOrdered,
    markAsPaid,
    markAsDelivered,
  } = useOrderFacade();
  const { user } = useAuth();
  const [users] = useState([user!]);

  const markAsDeliveredHandler = useCallback(async () => {
    await markAsDelivered();
  }, []);

  const closeOrderHandler = useCallback(async () => {
    await markAsClosed();
  }, []);

  const openOrderHandler = useCallback(async () => {
    await markAsOpen();
  }, []);

  const makeOrderHandler = useCallback(async () => {
    await markAsOrdered();
  }, []);

  const payHandler = useCallback(async (payer: UserModel) => {
    await markAsPaid(payer);
  }, []);

  return (
    <div className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="flex-1 min-w-0 ml-3">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate flex items-center">
              {order.from}
              <div className="inline-flex ml-4">
                <OrderStatusBadge order={order} />
              </div>
            </h1>
            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <TruckIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                5zł
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <BookOpenIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <a href={order.menuUrl} target="_blank" rel="noreferrer">
                  Menu
                </a>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CurrencyDollarIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                83zł
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CalendarIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Utworzone&nbsp;
                {formatDistance(new Date(order.createdAt), new Date(), {
                  addSuffix: true,
                  locale: pl,
                })}
              </div>
            </div>
          </div>
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
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
              <span className="hidden sm:block">
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

            {/*{[OrderStatus.Ordered, OrderStatus.Delivered].includes(*/}
            {/*  order.status*/}
            {/*) && (*/}
            {/*  <span className="hidden sm:block sm:ml-3">*/}
            {/*    <OrderPaidButton users={users} onClick={payHandler} />*/}
            {/*  </span>*/}
            {/*)}*/}

            {[OrderStatus.Ordered].includes(order.status) && (
              <span className="sm:ml-3">
                <button
                  type="button"
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
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <PencilIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  Edytuj
                </button>
              </span>
            )}

            {order.status === OrderStatus.InProgress && (
              <span className="sm:ml-3">
                <button
                  type="button"
                  onClick={makeOrderHandler}
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

            {/* Dropdown */}
            <Menu as="span" className="ml-3 relative sm:hidden">
              <Menu.Button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                More
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
                      <a
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        Edytuj
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        View
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHeader;