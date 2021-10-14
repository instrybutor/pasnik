import { OrderModel } from '@pasnik/api/data-transfer';
import { Price, UserAvatar, UserName } from '@pasnik/components';
import { SwitchHorizontalIcon } from '@heroicons/react/outline';
import { UserDishesSummary } from '../order-summary/order-summary.hook';
import OrderSelectPayer from '../order-select-payer/order-select-payer';

export interface OrderPaymentProps {
  order: OrderModel;
  userDishesSummary: UserDishesSummary;
}

export function OrderPayment({ order, userDishesSummary }: OrderPaymentProps) {
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
              <OrderSelectPayer
                payer={order.payer}
                shippingCents={userDishesSummary.shipping}
                totalCents={userDishesSummary.total}
              />
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
                  <UserName user={userDishesSummary.user}>
                    <Price
                      priceCents={
                        userDishesSummary.shipping + userDishesSummary.total
                      }
                    />{' '}
                    (dostawa <Price priceCents={userDishesSummary.shipping} />)
                  </UserName>
                </div>
                <UserAvatar user={userDishesSummary.user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderPayment;
