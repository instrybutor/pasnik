import { Price } from '@pasnik/components';
import { useMemo } from 'react';
import { useOrderDishes } from '@pasnik/features/orders';
import { useSlug } from '@pasnik/shared/utils';
import { useTranslation } from 'react-i18next';

export function OrderDishesSectionFooter() {
  const { t } = useTranslation();
  const slug = useSlug();
  const { data: expenses } = useOrderDishes(slug);
  const totalCents = useMemo(
    () => expenses?.reduce((acc, expense) => acc + expense.priceCents, 0),
    [expenses]
  );

  return (expenses?.length ?? 0) > 0 ? (
    <div className="px-4 py-4 sm:px-6 flex items-center space-between">
      <span className="text-sm text-gray-500 flex-1">
        {t('order.position_count')}: {expenses?.length}
      </span>
      <span className="text-sm text-gray-500 pr-2.5 flex-row flex sm:pr-0.5">
        <Price className="font-bold" priceCents={totalCents} />
        <div className="w-16 sm:w-32"></div>
      </span>
    </div>
  ) : null;
}
