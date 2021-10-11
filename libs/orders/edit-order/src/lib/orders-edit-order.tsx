import { FC } from 'react';
import { useEditOrder } from './orders-edit-order.hook';

export const EditOrder: FC = () => {
  const { error, handleSubmit, onSubmit, register, errors } = useEditOrder();

  return (
    <div className="w-2/4 mx-auto bg-white shadow overflow-hidden sm:rounded-md p-4 mt-8">
      {error && (
        <div className="bg-red-100 border border-red-400 p-2">
          Request Failed!
        </div>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="mb-2">Restaurant</label>
          <input
            autoFocus
            type="text"
            placeholder="Put restaurant name"
            className="border rounded border-gray-300 p-4"
            {...register('from')}
          />
          {errors.from?.message && (
            <div className="bg-red-100 border border-red-400 p-2">
              {errors.from?.message}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2">Menu URL</label>
          <input
            type="text"
            placeholder="Put Menu URL"
            className="border rounded border-gray-300 p-4"
            {...register('menuUrl')}
          />
        </div>

        {errors.menuUrl?.message && (
          <div className="bg-red-100 border border-red-400 p-2">
            {errors.menuUrl?.message}
          </div>
        )}

        <div className="flex flex-col">
          <label className="mb-2">Delivery Price (optional)</label>
          <input
            type="text"
            placeholder="Put delivery price"
            className="border rounded border-gray-300 p-4"
            {...register('shippingCents')}
          />
        </div>

        <button
          type="submit"
          className="items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};
