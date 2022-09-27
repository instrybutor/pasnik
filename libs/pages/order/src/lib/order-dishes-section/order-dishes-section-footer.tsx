import { Price } from '@pasnik/components';
import { useMemo } from 'react';
import { useCurrentOrder, useOrderDishes } from '@pasnik/features/orders';
import { useSlug } from '@pasnik/shared/utils';
import { useTranslation } from 'react-i18next';

export function OrderDishesSectionFooter() {
  const { t } = useTranslation();
  const slug = useSlug();
  const { data: dishes } = useOrderDishes(slug);
  const { order } = useCurrentOrder();
  const totalCents = useMemo(
    () => dishes?.reduce((acc, dish) => acc + dish.expense.priceCents, 0),
    [dishes]
  );

  return (dishes?.length ?? 0) > 0 ? (
    <div className="px-4 py-4 sm:px-6 flex items-center space-between">
      <span className="text-sm text-gray-500 flex-1">
        {t('order.position_count')}: {dishes?.length}
      </span>
      <span className="text-sm text-gray-500 pr-2 flex-row flex sm:pr-0.5">
        <Price className="font-bold" priceCents={totalCents} />
        <div className="w-18 sm:w-32 pl-1">
          {order ? (
            <>
              + <Price priceCents={order.shippingCents} />
            </>
          ) : null}
        </div>
      </span>
    </div>
  ) : null;
}
