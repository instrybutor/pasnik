import {
  Button,
  CurrencyInput,
  currencyTransform,
  Form,
  FormField,
  Input,
  Modal,
  useModalContext,
} from '@pasnik/components';
import { CreateOrderDto, WorkspaceModel } from '@pasnik/api/data-transfer';
import { useTranslation } from 'react-i18next';
import { useOrderCreateMutation } from '../mutations/use-order-create-mutation';
import { useNavigate } from 'react-router-dom';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

export interface CreateOrderModelProps {
  workspace: WorkspaceModel;
}

export function CreateOrderModal({ workspace }: CreateOrderModelProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutateAsync } = useOrderCreateMutation(workspace.slug);
  const { closeModal } = useModalContext();
  return (
    <Modal>
      <Modal.Title>{t('order.order_create')}</Modal.Title>
      <Form<CreateOrderDto>
        successMessage={t('order.create_form.order_created')}
        resolver={classValidatorResolver(CreateOrderDto)}
        onSubmit={async (data) => {
          const { slug } = await mutateAsync(data);
          navigate(`/order/${slug}`);
          closeModal();
        }}
      >
        <div className="flex flex-1 flex-col space-y-6">
          <FormField
            required
            label={t('order.create_form.restaurant_label')}
            name="name"
            defaultValue={''}
          >
            <Input
              placeholder={t('order.create_form.restaurant_placeholder')}
            />
          </FormField>
          <FormField label={t('order.create_form.menu_label')} name="menuUrl">
            <Input placeholder={t('order.create_form.menu_placeholder')} />
          </FormField>
          <FormField
            label={t('order.create_form.delivery_price_label')}
            name="shippingCents"
            suffix="zł"
            transform={currencyTransform}
          >
            <CurrencyInput
              placeholder={t('order.create_form.delivery_price_placeholder')}
            />
          </FormField>
          <Modal.Footer>
            <Button
              type="submit"
              className="px-4 py-2 sm:text-sm justify-center"
            >
              {t('actions.submit')}
            </Button>
            <Button
              onClick={closeModal}
              type="button"
              color="secondary"
              className="px-4 py-2 sm:text-sm justify-center"
            >
              {t('actions.cancel')}
            </Button>
          </Modal.Footer>
        </div>
      </Form>
    </Modal>
  );
}
