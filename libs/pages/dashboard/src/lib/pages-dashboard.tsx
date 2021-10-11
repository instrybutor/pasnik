import { Fragment, useEffect } from 'react';
import DashboardHeader from './dashboard-header/dashboard-header';
import DashboardOverview from './dashboard-overview/dashboard-overview';
import DashboardOrders from './dashboard-orders/dashboard-orders';
import { useDashboardFacade } from './dashboard-store/dashboard.facade';

/* eslint-disable-next-line */
export interface PagesDashboardProps {}

export function PagesDashboard(_: PagesDashboardProps) {
  const { fetchActiveOrders } = useDashboardFacade();
  useEffect(() => {
    fetchActiveOrders().then();
  }, []);
  return (
    <Fragment>
      <header className="bg-white shadow">
        <DashboardHeader />
      </header>
      <main className="flex-grow flex-1">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <DashboardOverview />
            <DashboardOrders />
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default PagesDashboard;
