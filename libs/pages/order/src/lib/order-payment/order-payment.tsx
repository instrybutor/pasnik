import { OrderModel } from '@pasnik/api/data-transfer';
import { useAuth } from '@pasnik/shared/utils-auth';
import { Price, UserAvatar, UserName } from '@pasnik/components';
import { SwitchHorizontalIcon } from '@heroicons/react/outline';

export interface OrderPaymentProps {
  order?: OrderModel | null;
}

export function OrderPayment({ order }: OrderPaymentProps) {
  const { user } = useAuth();
  return (
    <section>
      <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
        <div className="divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6 sm:flex sm:items-center sm:justify-between">
            <h2 id="notes-title" className="text-lg font-medium text-gray-900">
              Twój wkład
            </h2>
          </div>
          <div className="py-5 px-6">
            <div className="flex sm:items-center sm:justify-between px-5">
              <div className="flex items-center">
                <UserAvatar user={order?.payer} />
                <div className="ml-3">
                  <UserName
                    user={order?.payer}
                    fallbackValue="Wybierz płacącego"
                  >
                    <Price priceCents={-3621} />
                  </UserName>
                </div>
              </div>
              <div className="mt-3 flex sm:mt-0 sm:ml-4">
                <button
                  type="button"
                  className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <SwitchHorizontalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className="flex items-center">
                <div className="mr-3 text-right">
                  <UserName user={user}>
                    <Price priceCents={3621} />
                  </UserName>
                </div>
                <UserAvatar user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderPayment;
