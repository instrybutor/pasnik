import { useTranslation } from 'react-i18next';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import {
  Button,
  CurrencyInput,
  currencyTransform,
  Form,
  FormField,
  FormSpinner,
  Input,
  useToast,
} from '@pasnik/components';
import { AddDishDto, ExpenseModel } from '@pasnik/api/data-transfer';
import { useCurrentWorkspace } from '@pasnik/features/workspaces';
import {
  useDishAddMutation,
  useDishUpdateMutation,
} from '@pasnik/features/orders';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { useSlug } from '@pasnik/shared/utils';
import { OrderDishSharesField } from './order-dish-shares-field';

export interface OrderDishAddProps {
  onClose: () => void;
  expense?: ExpenseModel;
}

export function OrderDishManage({ onClose, expense }: OrderDishAddProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const slug = useSlug();
  const { data: workspace } = useCurrentWorkspace();

  const { mutateAsync: mutateAddAsync } = useDishAddMutation(slug);
  const { mutateAsync: mutateDishAsync } = useDishUpdateMutation(
    slug,
    expense!
  );

  return (
    <Form<AddDishDto>
      resolver={classValidatorResolver(AddDishDto)}
      onSubmit={async (formData) => {
        if (expense) {
          mutateDishAsync(formData).then(() =>
            toast({
              type: 'success',
              title: t('order.toast.update_dish'),
            })
          );
        } else {
          mutateAddAsync(formData).then(() =>
            toast({ type: 'success', title: t('order.toast.add_dish') })
          );
        }
        onClose();
      }}
      className="flex flex-col items-stretch py-3 pl-6 pr-6 gap-3 xsm:flex-row mt-[1px] mb-[1px]"
    >
      <FormSpinner size="sm" />
      <div className="flex gap-3 w-full items-stretch xsm:flex-row flex-col-reverse">
        <div className="flex items-center flex-shrink-0">
          {workspace && (
            <OrderDishSharesField dish={expense} workspace={workspace} />
          )}
        </div>
        <div className="text-sm text-gray-500 w-full">
          <FormField
            label={t('order.form.name')}
            labelClassName="xsm:hidden block"
            name="name"
            errorTooltip={true}
            defaultValue={expense?.name}
          >
            <Input
              type="text"
              autoFocus={true}
              placeholder={t('order.form.name')}
            />
          </FormField>
        </div>
      </div>
      <div className="flex items-center gap-4 xsm:flex-row flex-col">
        <div className="text-sm text-gray-500 w-full xsm:w-32">
          <FormField
            label={t('order.form.price')}
            labelClassName="xsm:hidden block"
            defaultValue={expense?.priceCents}
            name="priceCents"
            errorTooltip={true}
            suffix="zł"
            transform={currencyTransform}
          >
            <CurrencyInput
              type="text"
              inputMode="numeric"
              placeholder="0.00"
              className="text-right"
            />
          </FormField>
        </div>

        <div className="text-right text-sm font-medium space-x-2 flex-shrink-0 ml-9">
          <Button className="flex-1" type="submit" rounded="full">
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </Button>

          <Button
            onClick={onClose}
            color="warn"
            className="flex-1"
            rounded="full"
          >
            <XIcon className="h-5 w-5 pointer-events-none" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </Form>
  );
}
