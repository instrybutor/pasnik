import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckIcon, XIcon } from '@heroicons/react/outline';

import { AddDishDto, DishModel } from '@pasnik/api/data-transfer';
import { Input } from '@pasnik/components';
import { Button } from '@pasnik/components';

import { useUpdateDish } from './update-dish.hook';
import { UserSelection } from '../user-selection';
import { useWorkspaceUsers } from '@pasnik/features/workspaces';
import { useOrderFacade } from '../order-store/order.facade';

export interface UpdateDishProps {
  dish: DishModel;
  onUpdateDish: (addDishDto: AddDishDto, dishModel: DishModel) => void;
  onCancelUpdate: () => void;
}

export function UpdateDish({
  dish,
  onUpdateDish,
  onCancelUpdate,
}: UpdateDishProps) {
  const {
    orderQuery: { data: order },
  } = useOrderFacade();
  const { handleSubmit, register, errors, reset, setValue, getValues } =
    useUpdateDish();
  const { data: users } = useWorkspaceUsers(order?.workspace?.slug);

  const selectedUser = useMemo(
    () =>
      users?.find((item) => item.userId === getValues('userId'))?.user ??
      dish.user,
    [getValues, users, dish.user]
  );

  const onUserSelect = useCallback(
    (pickedUser) => {
      setValue('userId', pickedUser.id);
    },
    [setValue]
  );

  useEffect(() => {
    reset({
      name: dish.name,
      userId: dish.user.id,
      priceCents: dish.priceCents / 100,
    });
  }, [dish, reset]);

  const onSubmit = useCallback(() => {
    const data = getValues();
    onUpdateDish(data, dish);
    reset();
  }, [getValues, onUpdateDish, dish, reset]);

  const { t } = useTranslation();

  return (
    <form
      className="flex flex-col items-stretch py-3 gap-4 w-full xsm:flex-row"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center">
        <UserSelection
          type="slim"
          user={selectedUser}
          selectUser={onUserSelect}
        />
      </div>
      <div className="text-sm text-gray-500 w-full">
        <Input
          type="text"
          autoFocus={true}
          placeholder={t('dish.form.name')}
          error={Boolean(errors.name)}
          {...register('name')}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-500 w-full xsm:w-32">
          <Input
            type="text"
            inputMode="numeric"
            placeholder="0.00"
            error={Boolean(errors.priceCents)}
            aria-describedby="price-currency"
            className="text-right"
            errorMessage={
              <span className="text-gray-500 xsm:text-sm" id="price-currency">
                zł
              </span>
            }
            {...register('priceCents')}
          />
        </div>

        <div className="text-right text-sm font-medium space-x-2 flex-shrink-0">
          <Button type="submit">
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </Button>

          <Button
            onClick={onCancelUpdate}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
          >
            <XIcon className="h-5 w-5 pointer-events-none" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </form>
  );
}

export default UpdateDish;
