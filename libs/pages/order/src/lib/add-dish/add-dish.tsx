import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckIcon, XIcon } from '@heroicons/react/outline';

import { useUserStore } from '@pasnik/store';
import { AddDishDto, UserModel } from '@pasnik/api/data-transfer';
import { Input } from '@pasnik/shared/ui-input';
import { Button } from '@pasnik/shared/ui-button';

import { useAddDish } from './add-dish.hook';
import { UserSelection } from '../user-selection';

export interface AddDishProps {
  onAdd(addDishDto: AddDishDto): void;
  onCancel(): void;
}

export function AddDish({ onAdd, onCancel }: AddDishProps) {
  const { user } = useUserStore();
  const [selectedUser, setSelectedUser] = useState<UserModel>(user!);
  const { handleSubmit, register, errors, reset } = useAddDish();
  const { t } = useTranslation();

  const onSubmit = useCallback(
    async (data: AddDishDto) => {
      onAdd({
        ...data,
        userId: selectedUser.id,
      });
      reset();
    },
    [onAdd, reset, selectedUser]
  );

  const onUserSelect = useCallback((pickedUser: UserModel) => {
    setSelectedUser(pickedUser);
  }, []);

  return (
    <form
      className="flex flex-col items-stretch py-3 pl-3 pr-6 gap-4 xsm:flex-row"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-sm text-gray-500 w-full">
        <Input
          type="text"
          autoFocus={true}
          placeholder={t('dish.form.name')}
          error={errors.name}
          {...register('name')}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-500 w-full xsm:w-32">
          <Input
            type="text"
            inputMode="numeric"
            placeholder="0.00"
            error={errors.priceCents}
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
        <div className="flex items-center">
          <UserSelection
            type="slim"
            user={selectedUser}
            selectUser={onUserSelect}
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
