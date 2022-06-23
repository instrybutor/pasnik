import { Can, OrdersAction } from '@pasnik/ability';
import { ButtonMutate, ModalButton } from '@pasnik/components';
import {
  EditOrderModal,
  useOrderMarkAsDeliveredMutation,
  useOrderMarkAsOpenMutation,
  useOrderMarkAsOrderedMutation,
  useOrderMarkAsProcessingMutation,
} from '@pasnik/features/orders';
import {
  CheckIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilIcon,
} from '@heroicons/react/outline';
import { OrderModel } from '@pasnik/api/data-transfer';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useOrderState } from '../order-state/order-state';

export interface OrderHeaderActionsProps {
  order: OrderModel;
}

export function OrderHeaderActions({ order }: OrderHeaderActionsProps) {
  const { t } = useTranslation();
  const { shippingCents } = useOrderState();
  const props = useMemo(() => ({ order }), [order]);

  const markAsProcessingMutation = useOrderMarkAsProcessingMutation(order);
  const markAsOpenMutation = useOrderMarkAsOpenMutation(order);
  const markAsOrderedMutation = useOrderMarkAsOrderedMutation(order);
  const markAsDeliveredMutation = useOrderMarkAsDeliveredMutation(order);

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
      <Can I={OrdersAction.MarkAsOpen} this={order}>
        <span className="sm:ml-3">
          <ButtonMutate
            type="button"
            mutation={markAsOpenMutation}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <LockOpenIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            {t('dish.header_menu.open')}
          </ButtonMutate>
        </span>
      </Can>
      <Can I={OrdersAction.MarkAsProcessing} this={order}>
        <span className="sm:ml-3">
          <ButtonMutate
            type="button"
            mutation={markAsProcessingMutation}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <LockClosedIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            {t('dish.header_menu.order')}
          </ButtonMutate>
        </span>
      </Can>
      <Can I={OrdersAction.MarkAsOrdered} this={order}>
        <span className="sm:ml-3">
          <ButtonMutate
            type="button"
            mutation={markAsOrderedMutation}
            mutationData={{ shippingCents }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            {t('dish.header_menu.ordered')}
          </ButtonMutate>
        </span>
      </Can>
      <Can I={OrdersAction.MarkAsDelivered} this={order}>
        <span className="ml-3">
          <ButtonMutate
            type="button"
            mutation={markAsDeliveredMutation}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            {t('dish.header_menu.delivered')}
          </ButtonMutate>
        </span>
      </Can>
    </div>
  );
}
