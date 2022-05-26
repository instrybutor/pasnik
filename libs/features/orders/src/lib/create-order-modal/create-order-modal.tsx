import { Form, FormField, Input, Modal, ModalProps } from '@pasnik/components';
import {
  CreateOrderDto,
  createOrderValidator,
} from '@pasnik/api/data-transfer';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';

export function CreateOrderModal({ close }: ModalProps) {
  const { t } = useTranslation();
  return (
    <Modal>
      <Modal.Title>{t('order.create_order')}</Modal.Title>
      <Form<CreateOrderDto>
        resolver={yupResolver(createOrderValidator)}
        onSubmit={(data) => {
          console.log(data);
        }}
      >
        <FormField
          required
          label={t('order.form.restaurant_label')}
          name="from"
        >
          <Input placeholder={t('order.form.restaurant_placeholder')} />
        </FormField>
        <FormField label={t('order.form.menu_label')} name="menuURL">
          <Input placeholder={t('order.form.menu_placeholder')} />
        </FormField>
        <FormField
          label={t('order.form.delivery_price_label')}
          name="shippingCents"
          suffix="zł"
        >
          <Input placeholder={t('order.form.delivery_price_placeholder')} />
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
      </Form>
    </Modal>
  );
}
