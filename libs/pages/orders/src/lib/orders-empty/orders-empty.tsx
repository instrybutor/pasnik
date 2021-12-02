import { BeakerIcon } from '@heroicons/react/outline';
import { t } from 'i18next';

export function OrdersEmpty() {
  return (
    <div className="text-center bg-white px-4 py-12">
      <BeakerIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        {t('order.closed.title')}
      </h3>
    </div>
  );
}

export default OrdersEmpty;
