import { ExclamationCircleIcon } from '@heroicons/react/solid';
import { CheckIcon } from '@heroicons/react/outline';
import { useAddDish } from './add-dish.hook';
import { AddDishDto } from '@pasnik/api/data-transfer';
import classNames from 'classnames';
import { useCallback } from 'react';

export interface AddDishProps {
  onAdd: (addDishDto: AddDishDto) => void;
}

export function AddDish({ onAdd }: AddDishProps) {
  const { handleSubmit, register, errors, reset } = useAddDish();

  const onSubmit = useCallback(
    async (data: AddDishDto) => {
      onAdd(data);
      reset();
    },
    [onAdd, reset]
  );

  return (
    <tr>
      <td className="px-6 whitespace-nowrap text-sm text-gray-500 w-8/12">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 sr-only"
          >
            Dish
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              autoFocus={true}
              type="text"
              placeholder="Nazwa"
              className={classNames(
                {
                  'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500':
                    errors.name,
                },
                'block w-full pr-10 sm:text-sm rounded-md border-gray-300'
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
      </td>
      <td
        colSpan={2}
        className="px-3 whitespace-nowrap text-sm text-gray-500 w-3/12"
      >
        <div>
          <label htmlFor="price" className="sr-only">
            Price
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">zł</span>
            </div>
            <input
              type="text"
              id="price"
              className={classNames(
                {
                  'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500':
                    errors.priceCents,
                },
                'block w-full pr-10 sm:text-sm rounded-md border-gray-300 pl-7 pr-12'
              )}
              placeholder="0.00"
              aria-describedby="price-currency"
              {...register('priceCents')}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm" id="price-currency">
                PLN
              </span>
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium w-1/12 space-x-2">
        <button
          onClick={handleSubmit(onSubmit)}
          type="button"
          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </td>
    </tr>
  );
}

export default AddDish;
