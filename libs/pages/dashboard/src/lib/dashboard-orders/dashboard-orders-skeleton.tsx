import { DashboardOrderList } from '../dashboard-order-list/dashboard-order-list';

export function DashboardOrdersSkeleton() {
  return (
    <div className="animate-pulse">
      <h2 className="max-w-6xl mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
        <div className="skeleton w-52" />
      </h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md mt-2">
        <div className="border-b border-gray-200">
          <DashboardOrderList.Skeleton />
        </div>
      </div>

      <h2 className="max-w-6xl mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
        <div className="skeleton w-72" />
      </h2>

      <div className="bg-white shadow overflow-hidden sm:rounded-md mt-2">
        <div className="border-b border-gray-200">
          <ul className="divide-y divide-gray-200">
            <DashboardOrderList.Skeleton />
          </ul>
        </div>
      </div>
    </div>
  );
}
