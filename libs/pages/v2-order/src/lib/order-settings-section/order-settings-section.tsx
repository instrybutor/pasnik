import { OrderModel } from '@pasnik/api/data-transfer';
import { OrderSection } from '../order-section/order-section';

export interface OrderSettingsSectionProps {
  order: OrderModel;
}

export function OrderSettingsSection() {
  return <OrderSection title="Ustawienia"></OrderSection>;
}
