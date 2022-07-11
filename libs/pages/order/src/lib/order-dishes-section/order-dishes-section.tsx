import { PlusIcon } from '@heroicons/react/outline';
import { OrderSection } from '../order-section/order-section';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OrderDishesSectionFooter } from './order-dishes-section-footer';
import { OrderDishManage } from '../order-dish-add/order-dish-manage';
import { OrderDishesSectionBody } from './order-dishes-section-body';
import { useSlug } from '@pasnik/shared/utils';
import { useOrderDishes } from '@pasnik/features/orders';
import { OrderDishesSkeleton } from '../order-dishes/order-dishes-skeleton';
import { QueryBoundary } from '@pasnik/components';

export function OrderDishesSection() {
  const { t } = useTranslation();
  const [isAdding, setIsAdding] = useState(false);
  const slug = useSlug();
  const { isLoading } = useOrderDishes(slug, false);

  return (
    <OrderSection
      noPadding={true}
      header={t('order.order')}
      footer={
        <div className="divide-y divide-gray-200">
          <QueryBoundary
            fallback={
              <div className="px-4 py-4 sm:px-6 flex items-center space-between animate-pulse">
                <div className="flex-1">
                  <div className="h-4 w-24 bg-gray-300 rounded-md"></div>
                </div>
                <div className="text-sm text-gray-500 pr-2 flex-row flex sm:pr-0.5">
                  <div className="h-4 w-12 bg-gray-300 rounded-md"></div>
                  <div className="w-18 sm:w-32 flex mr-1.5">
                    <div className="h-4 w-4 bg-gray-300 rounded-md mx-1"></div>
                    <div className="h-4 w-12 bg-gray-300 rounded-md"></div>
                  </div>
                </div>
              </div>
            }
          >
            {isAdding && <OrderDishManage onClose={() => setIsAdding(false)} />}
            <OrderDishesSectionFooter />
          </QueryBoundary>
        </div>
      }
      action={
        !isLoading ? (
          <div className="flex gap-2">
            <button
              onClick={() => setIsAdding(true)}
              type="button"
              className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="animate-pulse">
            <div className="h-8 w-8 rounded-full bg-gray-300 rounded-md" />
          </div>
        )
      }
    >
      <QueryBoundary fallback={<OrderDishesSkeleton />}>
        <OrderDishesSectionBody isAdding={isAdding} />
      </QueryBoundary>
    </OrderSection>
  );
}
