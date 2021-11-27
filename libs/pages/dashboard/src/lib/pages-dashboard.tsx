import { Fragment, useEffect } from 'react';
import DashboardHeader from './dashboard-header/dashboard-header';
import DashboardOrders from './dashboard-orders/dashboard-orders';
import { useDashboardFacade } from './dashboard-store/dashboard.facade';

export function PagesDashboard() {
  const { fetchActiveOrders } = useDashboardFacade();

  useEffect(() => {
    fetchActiveOrders();
  }, [fetchActiveOrders]);

  return (
    <Fragment>
      <header className="bg-white shadow">
        <DashboardHeader />
      </header>
      <main className="flex-grow flex-1">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <DashboardOrders />
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default PagesDashboard;
