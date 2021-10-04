import { Fragment, useCallback, useEffect, useState } from 'react';
import { OrderModel, OrderStatus } from '@pasnik/api/data-transfer';
import { useOrdersFacade } from '@pasnik/orders-data-access';
import { Tab } from '@headlessui/react';
import DashboardCompletedOrders from './dashboard-completed-orders/dashboard-completed-orders';
import DashboardActiveOrders from './dashboard-active-orders/dashboard-active-orders';
import DashboardHeader from './dashboard-header/dashboard-header';
import DashboardTabs from './dashboard-tabs/dashboard-tabs';

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

  return (
    <Fragment>
      <header className="bg-white shadow">
        <DashboardHeader />
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
