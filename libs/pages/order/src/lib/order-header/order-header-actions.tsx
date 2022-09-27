import { Can, OrdersAction } from '@pasnik/ability';
import { Button, ButtonMutate, ModalButton, Tooltip } from '@pasnik/components';
import {
  EditOrderModal,
  useCurrentOrder,
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
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useOrderState } from '../order-state/order-state';
import { useNavigate } from 'react-router-dom';
import { useSlug } from '@pasnik/shared/utils';
import { useCurrentWorkspace } from '@pasnik/features/workspaces';

export function OrderHeaderActions() {
  const { t } = useTranslation();
  const { shippingCents } = useOrderState();
  const { order } = useCurrentOrder();
  const slug = useSlug();
  const { data: workspace } = useCurrentWorkspace();
  const { data: dishes } = useOrderDishes(slug, false);
  const navigate = useNavigate();

  const markAsProcessingMutation = useOrderMarkAsProcessingMutation(slug);
  const markAsOpenMutation = useOrderMarkAsOpenMutation(slug);
  const markAsClosedMutation = useOrderMarkAsClosedMutation(slug);
  const markAsOrderedMutation = useOrderMarkAsOrderedMutation(slug);
  const markAsDeliveredMutation = useOrderMarkAsDeliveredMutation(slug);
  const createOrderMutation = useOrderCreateMutation(workspace?.slug);

  const processingErrorMessage = useMemo(() => {
    if ((dishes?.length ?? 0) === 0) {
      return 'order.no_dishes';
    }
    const hasNonSharedDishes = dishes!.some(
      (dish) => (dish.expense.shares?.length ?? 0) === 0
    );
    if (hasNonSharedDishes) {
      return 'order.missing_shares';
    }
    return null;
  }, [dishes]);

  return (
    <div className="flex space-x-3">
      <Can I={OrdersAction.Update} this={order}>
        <ModalButton
          color="secondary"
          modal={<EditOrderModal order={order!} />}
          className="px-4 py-2 text-sm font-medium"
        >
          <PencilIcon
            className="-ml-1 mr-2 h-5 w-5 text-gray-500"
            aria-hidden="true"
          />
          {t('order.actions.edit')}
        </ModalButton>
      </Can>
      <Can I={OrdersAction.MarkAsOpen} this={order}>
        <ButtonMutate
          type="button"
          color="tertiary"
          mutation={markAsOpenMutation}
          className="px-4 py-2 text-sm font-medium"
        >
          <LockOpenIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          {t('order.actions.open')}
        </ButtonMutate>
      </Can>
      <Can I={OrdersAction.MarkAsClosed} this={order}>
        <ButtonMutate
          type="button"
          color="warn"
          mutation={markAsClosedMutation}
          className="px-4 py-2 text-sm font-medium"
        >
          <XIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          {t('order.actions.close')}
        </ButtonMutate>
      </Can>
      <Can I={OrdersAction.MarkAsProcessing} this={order}>
        {!processingErrorMessage ? (
          <ButtonMutate
            type="button"
            mutation={markAsProcessingMutation}
            className="px-4 py-2 text-sm font-medium"
          >
            <LockClosedIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            {t('order.actions.order')}
          </ButtonMutate>
        ) : (
          <Tooltip title={t(processingErrorMessage)}>
            <Button disabled className="px-4 py-2 text-sm font-medium">
              <LockClosedIcon
                className="-ml-1 mr-2 h-5 w-5"
                aria-hidden="true"
              />
              {t('order.actions.order')}
            </Button>
          </Tooltip>
        )}
      </Can>
      <Can I={OrdersAction.MarkAsOrdered} this={order}>
        <ButtonMutate
          type="button"
          mutation={markAsOrderedMutation}
          mutationData={{ shippingCents }}
          className="px-4 py-2 text-sm font-medium"
        >
          <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          {t('order.actions.ordered')}
        </ButtonMutate>
      </Can>
      <Can I={OrdersAction.MarkAsDelivered} this={order}>
        <ButtonMutate
          type="button"
          mutation={markAsDeliveredMutation}
          className="px-4 py-2 text-sm font-medium"
        >
          <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          {t('order.actions.delivered')}
        </ButtonMutate>
      </Can>
      <Can I={OrdersAction.Duplicate} this={order}>
        <ButtonMutate
          type="button"
          color="tertiary"
          mutation={createOrderMutation}
          mutationData={{
            shippingCents: order!.shippingCents,
            menuUrl: order!.menuUrl,
            name: order!.operation.name,
          }}
          mutationSuccess={({ slug }) => {
            navigate(`/order/${slug}`);
          }}
          className="px-4 py-2 text-sm font-medium"
        >
          <DuplicateIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          {t('order.actions.re_order')}
        </ButtonMutate>
      </Can>
    </div>
  );
}
