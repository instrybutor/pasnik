import { Fragment, Suspense, useEffect } from 'react';
import DashboardHeader from './dashboard-header/dashboard-header';
import DashboardOrders from './dashboard-orders/dashboard-orders';
import { useDashboardFacade } from './dashboard-store/dashboard.facade';
import { DashboardHeaderSkeleton } from './dashboard-header/dashboard-header-skeleton';
import { Spinner } from '@pasnik/components';

export function PagesDashboard() {
  const { fetchActiveOrders } = useDashboardFacade();

  useEffect(() => {
    fetchActiveOrders();
  }, [fetchActiveOrders]);

  return (
    <Fragment>
      <header className="bg-white shadow">
        <Suspense fallback={<DashboardHeaderSkeleton />}>
          <DashboardHeader />
        </Suspense>
      </header>
      <main className="flex-grow flex-1">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<Spinner />}>
              <DashboardOrders />
            </Suspense>
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default PagesDashboard;
