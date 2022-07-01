import { OrderModel } from '@pasnik/api/data-transfer';
import { OrderSection } from '../order-section/order-section';
import { Switch } from '@headlessui/react';
import { useState } from 'react';
import classNames from 'classnames';
import { OrderTimeline } from '../order-timeline/order-timeline';
import { useTranslation } from 'react-i18next';

export interface OrderHistoryProps {
  order: OrderModel;
}

export function OrderTimelineSection({ order }: OrderHistoryProps) {
  const { t } = useTranslation();
  const [isDetailed, setIsDetailed] = useState(false);
  return (
    <OrderSection
      header={t('order.timeline.title')}
      accordion="mobile"
      defaultOpen="desktop"
      action={
        <Switch.Group as="div" className="flex items-center">
          <Switch.Label as="span" className="mr-3">
            <span className="text-sm text-gray-500">{t('order.detailed')}</span>
          </Switch.Label>
          <Switch
            checked={isDetailed}
            onChange={setIsDetailed}
            className={classNames(
              isDetailed ? 'bg-cyan-600' : 'bg-gray-200',
              'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                isDetailed ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
              )}
            />
          </Switch>
        </Switch.Group>
      }
    >
      <OrderTimeline actions={order.actions ?? []} isDetailed={isDetailed} />
    </OrderSection>
  );
}
