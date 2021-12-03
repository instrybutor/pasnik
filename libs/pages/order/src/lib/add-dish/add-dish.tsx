import { useTranslation } from 'react-i18next';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { useAddDish } from './add-dish.hook';
import { AddDishDto } from '@pasnik/api/data-transfer';

import classNames from 'classnames';
import { useCallback } from 'react';

export interface AddDishProps {
  onAdd: (addDishDto: AddDishDto) => void;
  onCancel: () => void;
}

export function AddDish({ onAdd, onCancel }: AddDishProps) {
  const { handleSubmit, register, errors, reset } = useAddDish();
  const { t } = useTranslation();

  const onSubmit = useCallback(
    async (data: AddDishDto) => {
      onAdd(data);
      reset();
    },
    [onAdd, reset]
  );

  return (
    <form
      className="flex items-center py-3 px-6 gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="whitespace-nowrap text-sm text-gray-500 flex-grow">
        <div>
          <label className="block text-sm font-medium text-gray-700 sr-only">
            {t('dish.title')}
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              autoFocus={true}
              type="text"
              placeholder={t('dish.form.name')}
              className={classNames(
                {
                  'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500':
                    errors.name,
                  'focus:ring-cyan-500 focus:border-cyan-500': !errors.name,
                },
                'block w-full sm:text-sm rounded-md border-gray-300 focus:outline-none'
              )}
              {...register('name')}
            />
            {errors.name && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="whitespace-nowrap text-sm text-gray-500 w-36 sm:w-44 flex-shrink-0">
        <div>
          <label htmlFor="price" className="sr-only">
            {t('dish.form.price')}
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              inputMode="numeric"
              id="price"
              className={classNames(
                {
                  'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500':
                    errors.priceCents,
                  'focus:ring-cyan-500 focus:border-cyan-500':
                    !errors.priceCents,
                },
                'block text-right w-full pr-8 sm:text-sm rounded-md border-gray-300 pl-7 focus:outline-none'
              )}
              placeholder="0.00"
              aria-describedby="price-currency"
              {...register('priceCents')}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm" id="price-currency">
                zł
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="whitespace-nowrap text-right text-sm font-medium space-x-2">
        <button
          type="submit"
          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <XIcon className="h-5 w-5 pointer-events-none" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

export default AddDish;
