import { OrderModel } from '@pasnik/api/data-transfer';
import { OrderSection } from '../order-section/order-section';

export interface OrderSettingsSectionProps {
  order: OrderModel;
}

export function OrderSettingsSection({ order }: OrderSettingsSectionProps) {
  return (
    <OrderSection defaultOpen={false} header="Ustawienia" action="accordion">
      Section
    </OrderSection>
  );
}
