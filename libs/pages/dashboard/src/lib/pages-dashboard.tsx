import { DashboardHeader } from './dashboard-header/dashboard-header';
import { DashboardOrders } from './dashboard-orders/dashboard-orders';
import { QueryBoundary } from '@pasnik/components';

export function PagesDashboard() {
  return (
    <>
      <header className="bg-white shadow">
        <QueryBoundary fallback={<DashboardHeader.Skeleton />}>
          <DashboardHeader />
        </QueryBoundary>
      </header>
      <main className="flex-grow flex-1">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <QueryBoundary fallback={<DashboardOrders.Skeleton />}>
              <DashboardOrders />
            </QueryBoundary>
          </div>
        </div>
      </main>
    </>
  );
}

export default PagesDashboard;
