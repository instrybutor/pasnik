import { Can, OrdersAction } from '@pasnik/ability';
import { ModalButton } from '@pasnik/components';
import { EditOrderModal } from '@pasnik/features/orders';
import { PencilIcon } from '@heroicons/react/outline';
import { OrderModel } from '@pasnik/api/data-transfer';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export interface OrderHeaderActionsProps {
  order: OrderModel;
}

export function OrderHeaderActions({ order }: OrderHeaderActionsProps) {
  const { t } = useTranslation();
  const props = useMemo(() => ({ order }), [order]);

  return (
    <div className="flex space-x-3">
      <Can I={OrdersAction.Update} this={order}>
        <span className="hidden sm:block">
          <ModalButton
            props={props}
            modal={EditOrderModal}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <PencilIcon
              className="-ml-1 mr-2 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
            {t('dish.header_menu.edit')}
          </ModalButton>
        </span>
      </Can>
    </div>
  );
}
