import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { AddDishDto } from '@pasnik/api/data-transfer';
import { Button, Input } from '@pasnik/components';

import { useAddDish } from './add-dish.hook';
import { UserSelection } from '../user-selection';
import { Controller } from 'react-hook-form';
import { useOrderFacade } from '../order-store/order.facade';
import { useWorkspaceUsers } from '@pasnik/features/workspaces';

export interface AddDishProps {
  onAdd(addDishDto: AddDishDto): void;
  onCancel(): void;
}

export function AddDish({ onAdd, onCancel }: AddDishProps) {
  const {
    orderQuery: { data: order },
  } = useOrderFacade();
  const { data: workspaceUsers } = useWorkspaceUsers(order?.workspace?.slug);
  const users = useMemo(
    () => workspaceUsers?.map(({ user }) => user!) ?? [],
    [workspaceUsers]
  );
  const { handleSubmit, register, errors, reset, getValues, control } =
    useAddDish();
  const { t } = useTranslation();

  const onSubmit = useCallback(async () => {
    const data = getValues();
    onAdd(data);
    reset();
  }, [getValues, onAdd, reset]);

  return (
    <form
      className="flex flex-col items-stretch py-3 pl-3 pr-6 gap-4 xsm:flex-row"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center">
        <Controller
          control={control}
          name="userId"
          render={({ field: { value, onChange } }) => (
            <UserSelection
              type="slim"
              userId={value}
              users={users}
              selectUser={onChange}
            />
          )}
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
            errorIcon={
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
            onClick={onCancel}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
          >
            <XIcon className="h-5 w-5 pointer-events-none" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddDish;
