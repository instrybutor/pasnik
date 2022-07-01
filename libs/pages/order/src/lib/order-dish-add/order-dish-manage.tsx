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
  Label,
  UserAvatar,
  UserInfo,
  useToast,
} from '@pasnik/components';
import { AddDishDto, DishModel, OrderModel } from '@pasnik/api/data-transfer';
import { Controller } from 'react-hook-form';
import { useUsersInWorkspace } from '@pasnik/features/workspaces';
import { useUserStore } from '@pasnik/store';
import { UsersDropdown } from '../users-dropdown/users-dropdown';
import {
  useDishAddMutation,
  useDishUpdateMutation,
} from '@pasnik/features/orders';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';

export interface OrderDishAddProps {
  onClose: () => void;
  order: OrderModel;
  dish?: DishModel;
}

export function OrderDishManage({ onClose, order, dish }: OrderDishAddProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useUserStore();
  const users = useUsersInWorkspace(order.workspace?.slug);

  const { mutateAsync: mutateAddAsync } = useDishAddMutation(order);
  const { mutateAsync: mutateDishAsync } = useDishUpdateMutation(order, dish!);
  return (
    <Form<AddDishDto>
      resolver={classValidatorResolver(AddDishDto)}
      onSubmit={async (formData) => {
        if (dish) {
          mutateDishAsync(formData).then(() =>
            toast({
              type: 'success',
              title: t('order.toast.duplicate_dish'),
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
          <Controller
            name="userId"
            defaultValue={dish?.userId ?? user!.id}
            render={({ field: { value, onChange } }) => (
              <UsersDropdown
                users={users}
                userId={value!}
                onChange={onChange}
                button={({ user }) => (
                  <>
                    <span className="xsm:flex hidden">
                      <UserAvatar size="sm" user={user} />
                    </span>
                    <span className="xsm:hidden flex flex-col gap-1">
                      <Label className="text-left block text-gray-500">
                        {t('order.form.user_name')}
                      </Label>
                      <UserInfo size="sm" user={user} />
                    </span>
                  </>
                )}
              />
            )}
          />
        </div>
        <div className="text-sm text-gray-500 w-full -ml-[1px]">
          <FormField
            label={t('order.form.name')}
            labelClassName="xsm:hidden block"
            name="name"
            errorTooltip={true}
            defaultValue={dish?.name}
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
            defaultValue={dish?.priceCents}
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

        <div className="text-right text-sm font-medium space-x-2 flex-shrink-0">
          <Button className="flex-1" type="submit">
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </Button>

          <Button
            onClick={onClose}
            className="flex-1 bg-red-600 hover:bg-red-700 focus:ring-red-500"
          >
            <XIcon className="h-5 w-5 pointer-events-none" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </Form>
  );
}
