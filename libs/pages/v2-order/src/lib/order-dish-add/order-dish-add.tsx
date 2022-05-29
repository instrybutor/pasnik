import { useTranslation } from 'react-i18next';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { Button, FormField, Input, UserAvatar } from '@pasnik/components';
import {
  AddDishDto,
  addDishValidator,
  OrderModel,
} from '@pasnik/api/data-transfer';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Controller, useForm } from 'react-hook-form';
import { useUsersInWorkspace } from '@pasnik/features/workspaces';
import { useUserStore } from '@pasnik/store';
import { UsersDropdown } from '../users-dropdown/users-dropdown';

export interface OrderDishAddProps {
  onClose: () => void;
  order: OrderModel;
}

export function OrderDishAdd({ onClose, order }: OrderDishAddProps) {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const { handleSubmit, control, register } = useForm<AddDishDto>({
    resolver: yupResolver(addDishValidator),
    defaultValues: {
      userId: user!.id,
    },
  });
  const users = useUsersInWorkspace(order.workspace?.slug);
  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className="flex flex-col items-stretch py-3 pl-6 pr-6 gap-3 xsm:flex-row"
    >
      <div className="flex gap-3 w-full items-stretch sm:flex-row flex-row-reverse">
        <div className="flex items-center flex-shrink-0">
          <Controller
            control={control}
            name="userId"
            render={({ field: { value, onChange } }) => (
              <UsersDropdown
                users={users}
                userId={value!}
                button={({ user }) => <UserAvatar size="sm" user={user} />}
              />
            )}
          />
        </div>
        <div className="text-sm text-gray-500 w-full">
          <FormField
            name="name"
            control={control}
            register={register}
            errorTooltip={true}
          >
            <Input
              type="text"
              autoFocus={true}
              placeholder={t('dish.form.name')}
            />
          </FormField>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-500 w-full xsm:w-32">
          <FormField
            name="priceCents"
            control={control}
            register={register}
            errorTooltip={true}
            suffix={
              <span className="text-gray-500 xsm:text-sm" id="price-currency">
                zł
              </span>
            }
          >
            <Input
              type="text"
              inputMode="numeric"
              placeholder="0.00"
              aria-describedby="price-currency"
              className="text-right"
            />
          </FormField>
        </div>

        <div className="text-right text-sm font-medium space-x-2 flex-shrink-0">
          <Button type="submit">
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </Button>

          <Button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
          >
            <XIcon className="h-5 w-5 pointer-events-none" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </form>
  );
}
