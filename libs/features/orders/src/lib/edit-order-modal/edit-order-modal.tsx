import {
  CurrencyInput,
  currencyTransform,
  Form,
  FormField,
  Input,
  Modal,
  ModalProps,
} from '@pasnik/components';
import { CreateOrderDto, OrderModel } from '@pasnik/api/data-transfer';
import { useTranslation } from 'react-i18next';
import { useOrderUpdateMutation } from '../mutations/use-order-update-mutation';
import currency from 'currency.js';
import { useNavigate } from 'react-router-dom';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

export interface EditOrderModelProps {
  order: OrderModel;
}

export function EditOrderModal({
  close,
  order,
}: ModalProps<EditOrderModelProps>) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutateAsync } = useOrderUpdateMutation(order);
  return (
    <Modal>
      <Modal.Title>{t('order.edit_order')}</Modal.Title>
      <Form<CreateOrderDto>
        successMessage={t('order.create_form.order_updated')}
        resolver={classValidatorResolver(CreateOrderDto)}
        onSubmit={async (data) => {
          const { slug } = await mutateAsync({
            ...data,
            shippingCents: currency(data.shippingCents ?? 0).value,
          });
          navigate(`/order/${slug}`);
          close();
        }}
      >
        <div className="flex flex-1 flex-col space-y-6">
          <FormField
            required
            label={t('order.create_form.restaurant_label')}
            name="from"
            defaultValue={order.from}
          >
            <Input
              placeholder={t('order.create_form.restaurant_placeholder')}
            />
          </FormField>
          <FormField
            defaultValue={order.menuUrl}
            label={t('order.create_form.menu_label')}
            name="menuUrl"
          >
            <Input placeholder={t('order.create_form.menu_placeholder')} />
          </FormField>
          <FormField
            defaultValue={order.shippingCents}
            label={t('order.create_form.delivery_price_label')}
            name="shippingCents"
            suffix="zł"
            transform={currencyTransform}
          >
            <CurrencyInput
              placeholder={t('order.create_form.delivery_price_placeholder')}
            />
          </FormField>
          <div className="block flex-grow sm:hidden" />
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {t('actions.submit')}
            </button>
            <button
              onClick={close}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              {t('actions.cancel')}
            </button>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
