import {
  Button,
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
      <Modal.Title>{t('order.order_edit')}</Modal.Title>
      <Form<CreateOrderDto>
        successMessage={t('order.create_form.order_updated')}
        resolver={classValidatorResolver(CreateOrderDto)}
        onSubmit={async (data) => {
          const { slug } = await mutateAsync(data);
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
            defaultValue={order.menuUrl ?? ''}
            label={t('order.create_form.menu_label')}
            name="menuUrl"
          >
            <Input placeholder={t('order.create_form.menu_placeholder')} />
          </FormField>
          <FormField
            defaultValue={order.shippingCents ?? 0}
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
            <Button
              type="submit"
              className="w-full px-4 py-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              {t('actions.submit')}
            </Button>
            <Button
              onClick={close}
              type="button"
              color="secondary"
              className="mt-3 w-full px-4 py-2 sm:mt-0 sm:w-auto sm:text-sm"
            >
              {t('actions.cancel')}
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
