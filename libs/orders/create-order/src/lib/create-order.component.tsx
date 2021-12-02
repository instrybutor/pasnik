import { t } from 'i18next';
import { useCreateOrder } from './create-order.hook';
import { OrderHeader } from './components/order-header';

export function CreateOrder() {
  const { error, handleSubmit, onSubmit, register, errors } = useCreateOrder();

  return (
    <>
      <OrderHeader />
      <div className="w-full md:w-1/2 mx-auto bg-white shadow overflow-hidden sm:rounded-md p-4 mt-8">
        {error && (
          <div className="bg-red-100 border border-red-400 p-2">
            Request Failed!
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="mb-2">{t('order.form.restaurant_label')}</label>
            <input
              autoFocus
              type="text"
              placeholder={t('order.form.restaurant_placeholder')}
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
            <label className="mb-2">{t('order.form.menu_label')}</label>
            <input
              type="text"
              placeholder={t('order.form.menu_placeholder')}
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
            <label className="mb-2">
              {t('order.form.delivery_price_label')}
            </label>
            <input
              type="number"
              step="0.01"
              placeholder={t('order.form.delivery_price_placeholder')}
              className="border rounded border-gray-300 p-4"
              {...register('shippingCents')}
            />
            {errors.shippingCents?.message && (
              <div className="bg-red-100 border border-red-400 p-2">
                {errors.shippingCents?.message}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            {t('order.form.create')}
          </button>
        </form>
      </div>
    </>
  );
}
