import { useTranslation } from 'react-i18next';
import { BeakerIcon } from '@heroicons/react/outline';

export function OrdersEmpty() {
  const { t } = useTranslation();

  return (
    <div className="text-center bg-white px-4 py-14">
      <BeakerIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        {t('order.closed.title')}
      </h3>
    </div>
  );
}

export default OrdersEmpty;
