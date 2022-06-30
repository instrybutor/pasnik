import { OrderSection } from '../order-section/order-section';
import {
  DishModel,
  markAsOrderedValidator,
  OrderModel,
  UserModel,
} from '@pasnik/api/data-transfer';
import {
  CurrencyInput,
  currencyTransform,
  FormField,
  Price,
  Spinner,
} from '@pasnik/components';
import { OrderProcess } from '../order-process/order-process';
import { useOrderState } from '../order-state/order-state';
import { yupResolver } from '@hookform/resolvers/yup';
import { useOrderProcessSection } from './order-process-section.hook';
import { useTranslation } from 'react-i18next';

export interface OrderDishesProps {
  order: OrderModel;
}

export interface ProcessDish {
  name: string;
  priceCents: number;
  users: UserModel[];
  dishes: DishModel[];
}

export function OrderProcessSection({ order }: OrderDishesProps) {
  const { t } = useTranslation();
  const { setShippingCents, shippingCents } = useOrderState();
  const { dishes, totalCents, isLoading } = useOrderProcessSection(order);

  return (
    <OrderSection
      noPadding={true}
      header={t('v2-order.order_summary')}
      footer={
        <div className="px-4 py-4 sm:px-6 flex items-center space-between">
          <span className="text-sm text-gray-500 flex-1">
            {t('v2-order.position_count')}: {dishes.length}
          </span>
          <span className="text-sm text-gray-500 flex flex-col flex-shrink-0 gap-2 items-end">
            <div className="flex items-center">
              <FormField
                defaultValue={shippingCents}
                label={t('v2-order.form.shipping')}
                name="shippingCents"
                suffix="zł"
                transform={currencyTransform}
                onChange={setShippingCents}
                resolver={yupResolver(markAsOrderedValidator)}
                vertical
                errorTooltip
              >
                <CurrencyInput className="w-24 text-right" />
              </FormField>
            </div>
            <div className="flex w-full font-bold">
              <div className="flex-1">{t('v2-order.total')}</div>
              <Price
                className=" mr-3 gap-3 flex"
                priceCents={totalCents + shippingCents}
              />
            </div>
          </span>
        </div>
      }
    >
      {!isLoading ? (
        <OrderProcess order={order} dishes={dishes} />
      ) : (
        <Spinner />
      )}
    </OrderSection>
  );
}
