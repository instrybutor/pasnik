import { MarkAsOrderedDto } from '@pasnik/api/data-transfer';
import {
  CurrencyInput,
  currencyTransform,
  FormField,
  Price,
} from '@pasnik/components';
import { useOrderState } from '../order-state/order-state';
import { useOrderProcessSection } from './order-process-section.hook';
import { useTranslation } from 'react-i18next';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

export function OrderProcessSectionFooter() {
  const { t } = useTranslation();
  const { setShippingCents, shippingCents } = useOrderState();
  const { dishes, totalCents } = useOrderProcessSection();

  return (
    <div className="px-4 py-4 sm:px-6 flex items-center space-between">
      <span className="text-sm text-gray-500 flex-1">
        {t('order.position_count')}: {dishes.length}
      </span>
      <span className="text-sm text-gray-500 flex flex-col flex-shrink-0 gap-2 items-end">
        <div className="flex items-center">
          <FormField
            defaultValue={shippingCents}
            label={t('order.shipping')}
            name="shippingCents"
            suffix="zł"
            transform={currencyTransform}
            onChange={setShippingCents}
            resolver={classValidatorResolver(MarkAsOrderedDto)}
            vertical
            errorTooltip
          >
            <CurrencyInput className="w-24 text-right" />
          </FormField>
        </div>
        <div className="flex w-full font-bold">
          <div className="flex-1">{t('order.total')}</div>
          <Price
            className=" mr-3 gap-3 flex"
            priceCents={totalCents + shippingCents}
          />
        </div>
      </span>
    </div>
  );
}
