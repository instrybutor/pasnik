import { useTranslation } from 'react-i18next';
import { BeakerIcon } from '@heroicons/react/outline';
import { CreateOrderModal } from '../create-order-modal/create-order-modal';
import { ModalButton } from '@pasnik/components';
import { WorkspaceModel } from '@pasnik/api/data-transfer';

export interface OrdersEmptyProps {
  workspace?: WorkspaceModel;
}

export function OrdersEmpty({ workspace }: OrdersEmptyProps) {
  const { t } = useTranslation();
  return (
    <div className="text-center bg-white px-4 py-14 flex flex-col items-center">
      <BeakerIcon className="mx-auto h-12 w-12 text-gray-400" />
      <div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          {t('dashboard.no_active_orders')}
        </h3>
        <span className="mt-1 text-sm text-gray-500">
          {t('dashboard.starting_info')}
        </span>
      </div>
      {workspace && (
        <ModalButton
          className="bg-cyan-500 hover:bg-cyan-600 text-white py-2 text-sm rounded px-10 mt-4"
          modal={CreateOrderModal}
          props={{ workspace }}
        >
          {t('dashboard.create_order')}
        </ModalButton>
      )}
    </div>
  );
}

export default OrdersEmpty;
