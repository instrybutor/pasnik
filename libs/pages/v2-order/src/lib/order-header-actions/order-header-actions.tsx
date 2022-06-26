import { Can, OrdersAction } from '@pasnik/ability';
import { Button, ButtonMutate, ModalButton, Tooltip } from '@pasnik/components';
import {
  EditOrderModal,
  useOrderCreateMutation,
  useOrderDishes,
  useOrderMarkAsClosedMutation,
  useOrderMarkAsDeliveredMutation,
  useOrderMarkAsOpenMutation,
  useOrderMarkAsOrderedMutation,
  useOrderMarkAsProcessingMutation,
} from '@pasnik/features/orders';
import {
  CheckIcon,
  DuplicateIcon,
  LockClosedIcon,
  LockOpenIcon,
  PencilIcon,
  XIcon,
} from '@heroicons/react/outline';
import { OrderModel } from '@pasnik/api/data-transfer';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useOrderState } from '../order-state/order-state';
import { useNavigate } from 'react-router-dom';

export interface OrderHeaderActionsProps {
  order: OrderModel;
}

export function OrderHeaderActions({ order }: OrderHeaderActionsProps) {
  const { t } = useTranslation();
  const { shippingCents } = useOrderState();
  const { data: dishes } = useOrderDishes(order);
  const navigate = useNavigate();
  const props = useMemo(() => ({ order }), [order]);

  const markAsProcessingMutation = useOrderMarkAsProcessingMutation(order);
  const markAsOpenMutation = useOrderMarkAsOpenMutation(order);
  const markAsClosedMutation = useOrderMarkAsClosedMutation(order);
  const markAsOrderedMutation = useOrderMarkAsOrderedMutation(order);
  const markAsDeliveredMutation = useOrderMarkAsDeliveredMutation(order);
  const createOrderMutation = useOrderCreateMutation(order.workspace!.slug);

  return (
    <div className="flex space-x-3 ">
      <Can I={OrdersAction.Update} this={order}>
        <ModalButton
          props={props}
          modal={EditOrderModal}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          <PencilIcon
            className="-ml-1 mr-2 h-5 w-5 text-gray-500"
            aria-hidden="true"
          />
          {t('v2-order.actions.edit')}
        </ModalButton>
      </Can>
      <Can I={OrdersAction.MarkAsOpen} this={order}>
        <ButtonMutate
          type="button"
          mutation={markAsOpenMutation}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          <LockOpenIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          {t('v2-order.actions.open')}
        </ButtonMutate>
      </Can>
      <Can I={OrdersAction.MarkAsClosed} this={order}>
        <ButtonMutate
          type="button"
          mutation={markAsClosedMutation}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          <XIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          {t('v2-order.actions.close')}
        </ButtonMutate>
      </Can>
      <Can I={OrdersAction.MarkAsProcessing} this={order}>
        {(dishes?.length ?? 0) > 0 ? (
          <ButtonMutate
            type="button"
            mutation={markAsProcessingMutation}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <LockClosedIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            {t('v2-order.actions.order')}
          </ButtonMutate>
        ) : (
          <Tooltip title="Brak pozycji w zamówieniu">
            <Button
              disabled
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-300"
            >
              <LockClosedIcon
                className="-ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
              />
              {t('v2-order.actions.order')}
            </Button>
          </Tooltip>
        )}
      </Can>
      <Can I={OrdersAction.MarkAsOrdered} this={order}>
        <ButtonMutate
          type="button"
          mutation={markAsOrderedMutation}
          mutationData={{ shippingCents }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          {t('v2-order.actions.ordered')}
        </ButtonMutate>
      </Can>
      <Can I={OrdersAction.MarkAsDelivered} this={order}>
        <ButtonMutate
          type="button"
          mutation={markAsDeliveredMutation}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          {t('v2-order.actions.delivered')}
        </ButtonMutate>
      </Can>
      <Can I={OrdersAction.Duplicate} this={order}>
        <ButtonMutate
          type="button"
          mutation={createOrderMutation}
          mutationData={order}
          mutationSuccess={({ slug }) => {
            navigate(`/v2/order/${slug}`);
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <DuplicateIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          {t('v2-order.actions.duplicate')}
        </ButtonMutate>
      </Can>
    </div>
  );
}
