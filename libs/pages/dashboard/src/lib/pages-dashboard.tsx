import { Fragment, useCallback, useEffect, useState } from 'react';
import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import { useOrdersFacade } from '@pasnik/orders-data-access';
import { useHistory } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import OrderList from './order-list/order-list';
import { BeakerIcon } from '@heroicons/react/outline';
import classnames from 'classnames';

/* eslint-disable-next-line */
export interface PagesDashboardProps {}

export function PagesDashboard(_: PagesDashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);
  const [activeOrders, setActiveOrders] = useState<OrderModel[]>([]);
  const [completedOrders, setCompletedOrders] = useState<OrderModel[]>([]);
  const { fetchOrders } = useOrdersFacade();
  const history = useHistory();

  useEffect(() => {
    fetchOrders().then((fetchedOrders) => {
      const [active, completed] = fetchedOrders.reduce(
        (acc, cur) => {
          if (cur.status === OrderStatus.InProgress) {
            acc[0].push(cur);
          } else {
            acc[1].push(cur);
          }
          return acc;
        },
        [[], []] as Array<OrderModel[]>
      );
      setActiveOrders(active);
      setCompletedOrders(completed);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = [
    { name: 'Aktywne', count: activeOrders.length },
    { name: 'Zakończone', count: completedOrders.length },
  ];

  const handleTabGroupChange = useCallback((index) => {
    setCurrentTab(index);
  }, []);

  const createOrderHandler = useCallback(() => {
    history.push('/create-order');
  }, [history]);

  return (
    <Fragment>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Dashboard
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              onClick={createOrderHandler}
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Utwórz zamówienie
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        {isLoading ? (
          <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50" />
        ) : (
          <div className="max-w-8xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="border-b border-gray-200">
                  <Tab.Group
                    onChange={handleTabGroupChange}
                    defaultIndex={currentTab}
                  >
                    <Tab.List>
                      {tabs.map((tab) => (
                        <Tab key={tab.name} as={Fragment}>
                          {({ selected }) => (
                            <button
                              key={tab.name}
                              className={classnames(
                                selected
                                  ? 'border-purple-500 text-purple-600'
                                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                                'whitespace-nowrap py-4 px-4 border-b-2 font-medium text-sm'
                              )}
                            >
                              {tab.name}
                              {tab.count ? (
                                <span
                                  className={classnames(
                                    selected
                                      ? 'bg-purple-100 text-purple-600'
                                      : 'bg-gray-100 text-gray-900',
                                    'hidden ml-2 px-2 rounded-full text-xs font-medium md:inline-block'
                                  )}
                                >
                                  {tab.count}
                                </span>
                              ) : null}
                            </button>
                          )}
                        </Tab>
                      ))}
                    </Tab.List>
                    <Tab.Panels>
                      <Tab.Panel>
                        {activeOrders.length === 0 ? (
                          <div className="text-center bg-white px-4 py-12">
                            <BeakerIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                              Brak zamówień
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Zacznij od utworzenia nowego zamówienia
                            </p>
                          </div>
                        ) : (
                          <OrderList orders={activeOrders} />
                        )}
                      </Tab.Panel>
                      <Tab.Panel>
                        {completedOrders.length === 0 ? (
                          <div className="text-center bg-white px-4 py-12">
                            <BeakerIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                              Brak zakończonych zamówień
                            </h3>
                          </div>
                        ) : (
                          <OrderList orders={completedOrders} />
                        )}
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Fragment>
  );
}

export default PagesDashboard;
