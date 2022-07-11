import { TruckIcon } from '@heroicons/react/outline';
import { ButtonMutate, DateDistance, FlipDate } from '@pasnik/components';
import { Can, OrdersAction } from '@pasnik/ability';
import { OrderModel } from '@pasnik/api/data-transfer';
import { useTranslation } from 'react-i18next';
import { useOrderSetETAMutation } from '@pasnik/features/orders';

export interface OrderEtaProps {
  order: OrderModel;
}

export function OrderEta({ order }: OrderEtaProps) {
  const { t } = useTranslation();
  const eta = [15, 30, 45, 60, 90, 120];
  const setOrderETAMutation = useOrderSetETAMutation(order.slug);

  return (
    <div className="text-center bg-white py-3 flex gap-3 flex-col">
      <div className="flex flex-row justify-center gap-4">
        <TruckIcon className="h-12 w-12 text-gray-400" />
        {order.deliveredAt && (
          <FlipDate endAt={order.deliveredAt} className="text-2xl" />
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-900">
        {t('order.order_placed')} <DateDistance date={order.orderedAt} />
      </h3>
      {order.deliveredAt && (
        <h3 className="text-sm font-medium text-gray-900">
          {t('order.estimated_delivery')}{' '}
          <DateDistance date={order.deliveredAt} />
        </h3>
      )}
      <Can I={OrdersAction.SetETA} this={order}>
        {!order.deliveredAt && (
          <h3 className="text-sm font-medium text-gray-900">
            {t('order.estimated_delivery')}
          </h3>
        )}
        <div className="flex flex-1 justify-center gap-3">
          {eta.map((val) => (
            <ButtonMutate
              key={val}
              mutation={setOrderETAMutation}
              mutationData={{ eta: val }}
              color="secondary"
              type="button"
              className="px-2.5 py-1.5 text-xs font-medium"
            >
              +{val} min
            </ButtonMutate>
          ))}
        </div>
      </Can>
    </div>
  );
}
