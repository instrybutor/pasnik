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
    <form className="flex items-center" onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 sm:px-6 whitespace-nowrap text-sm text-gray-500 flex-grow">
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
      <div className="px-3 whitespace-nowrap text-sm text-gray-500 w-36 sm:w-44 flex-shrink-0">
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
                  'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500':
                    errors.priceCents,
                  'focus:ring-cyan-500 focus:border-cyan-500':
                    !errors.priceCents,
                },
                'block w-full pr-10 sm:text-sm rounded-md border-gray-300 pl-7 pr-12 focus:outline-none'
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
      </div>
      <div className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
        <button
          type="submit"
          className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

export default AddDish;
