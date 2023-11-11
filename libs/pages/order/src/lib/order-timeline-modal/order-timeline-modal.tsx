import { Modal } from '@pasnik/components';
import { useTranslation } from 'react-i18next';
import OrderTimeline from '../order-timeline-section/order-timeline';
import { OrderModel } from '@pasnik/api/data-transfer';

export interface OrderTimelineModalProps {
  order: OrderModel;
}

export function OrderTimelineModal({ order }: OrderTimelineModalProps) {
  const { t } = useTranslation();
  return (
    <Modal>
      <Modal.Title>{t('order.timeline.title')}</Modal.Title>
      <div>
        <div className="flex flex-1 flex-col space-y-6">
          <OrderTimeline order={order} isDetailed={false} />
        </div>
      </div>
    </Modal>
  );
}
