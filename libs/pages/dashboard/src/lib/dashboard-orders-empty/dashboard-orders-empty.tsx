import { t } from 'i18next';
import { Link } from 'react-router-dom';
import { BeakerIcon } from '@heroicons/react/outline';

export function DashboardOrdersEmpty() {
  return (
    <div className="text-center bg-white px-4 py-12 flex flex-col gap-4 items-center">
      <BeakerIcon className="mx-auto h-12 w-12 text-gray-400" />
      <div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          {t('dashboard.no_active_orders')}
        </h3>
        <span className="mt-1 text-sm text-gray-500">
          {t('dashboard.starting_info')}
        </span>
      </div>

      <Link
        to="/create-order"
        className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 text-sm rounded w-48"
      >
        {t('dashboard.create_order')}
      </Link>
    </div>
  );
}

export default DashboardOrdersEmpty;
