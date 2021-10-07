import { Fragment, useCallback, useEffect, useState } from 'react';
import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import { useOrdersFacade } from '@pasnik/orders-data-access';
import { Tab } from '@headlessui/react';
import DashboardCompletedOrders from './dashboard-completed-orders/dashboard-completed-orders';
import DashboardActiveOrders from './dashboard-active-orders/dashboard-active-orders';
import DashboardHeader from './dashboard-header/dashboard-header';
import DashboardTabs from './dashboard-tabs/dashboard-tabs';
import { Spinner } from '@pasnik/layout';

/* eslint-disable-next-line */
export interface PagesDashboardProps {}

export function PagesDashboard(_: PagesDashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);
  const [activeOrders, setActiveOrders] = useState<OrderModel[]>([]);
  const [completedOrders, setCompletedOrders] = useState<OrderModel[]>([]);
  const { fetchOrders } = useOrdersFacade();

  useEffect(() => {
    fetchOrders().then((fetchedOrders) => {
      const [active, completed] = fetchedOrders.reduce(
        (acc, cur) => {
          if (
            [OrderStatus.InProgress, OrderStatus.Ordered].includes(cur.status)
          ) {
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

  return (
    <Fragment>
      <header className="bg-white shadow">
        <DashboardHeader />
      </header>
      <main className="flex-grow flex-1">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="border-b border-gray-200">
                  <Tab.Group
                    onChange={handleTabGroupChange}
                    defaultIndex={currentTab}
                  >
                    <DashboardTabs tabs={tabs} />
                    <Tab.Panels>
                      <Tab.Panel>
                        <DashboardActiveOrders orders={activeOrders} />
                      </Tab.Panel>
                      <Tab.Panel>
                        <DashboardCompletedOrders orders={completedOrders} />
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
