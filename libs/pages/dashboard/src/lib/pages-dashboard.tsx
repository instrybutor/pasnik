import { Fragment, Suspense } from 'react';
import { DashboardHeader } from './dashboard-header/dashboard-header';
import { DashboardOrders } from './dashboard-orders/dashboard-orders';

export function PagesDashboard() {
  return (
    <Fragment>
      <header className="bg-white shadow">
        <Suspense fallback={<DashboardHeader.Skeleton />}>
          <DashboardHeader />
        </Suspense>
      </header>
      <main className="flex-grow flex-1">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<DashboardOrders.Skeleton />}>
              <DashboardOrders />
            </Suspense>
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default PagesDashboard;
