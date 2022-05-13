import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import currency from 'currency.js';
import { OrderModel } from '@pasnik/api/data-transfer';
import { Price, UserAvatar, UserName } from '@pasnik/components';
import { Can, OrdersAction } from '@pasnik/ability';
import {
  SwitchHorizontalIcon,
  SwitchVerticalIcon,
} from '@heroicons/react/outline';

import { UserDishesSummary } from '../order-summary/order-summary.hook';
import OrderSelectPayer from '../order-select-payer/order-select-payer';
import * as service from '../order-store/order.service';
import { useOrderFacade } from '../order-store/order.facade';

export interface OrderPaymentProps {
  order: OrderModel;
  userDishesSummary: UserDishesSummary;
}

export function OrderPayment({ order, userDishesSummary }: OrderPaymentProps) {
  const { orderQuery } = useOrderFacade();
  const { t } = useTranslation();
  const payerUpdate = useMutation((payerId: number) =>
    service.setPayer(order, {
      payerId,
    })
  );

  const setPayer = useCallback(
    async (payerId: number) => {
      await payerUpdate.mutateAsync(payerId);
      orderQuery.refetch();
    },
    [orderQuery, payerUpdate]
  );

  return (
    <section>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6 sm:flex sm:items-center sm:justify-between">
            <h2 id="notes-title" className="text-lg font-medium text-gray-900">
              {t('dish.paying.you_paid')}
            </h2>
          </div>
          <div className="py-5 px-4 sm:px-6">
            <div className="flex flex-col xsm:flex-row xsm:items-center xsm:justify-between">
              <div className="flex justify-center">
                <Can I={OrdersAction.SetPayer} this={order}>
                  <OrderSelectPayer
                    payer={order.payer}
                    totalCents={
                      currency(-userDishesSummary.total).subtract(
                        userDishesSummary.shipping
                      ).value
                    }
                    setPayer={setPayer}
                  />
                </Can>
                <Can not I={OrdersAction.SetPayer} this={order}>
                  <UserAvatar user={order.payer} />
                  <div className="ml-3 truncate">
                    <UserName
                      user={order.payer}
                      fallbackValue={t('dish.paying.pick_payer')}
                    >
                      <Price
                        priceCents={
                          currency(-userDishesSummary.total).subtract(
                            userDishesSummary.shipping
                          ).value
                        }
                      />
                    </UserName>
                  </div>
                </Can>
              </div>
              <div className="flex my-3 xsm:my-0 xsm:mx-3 justify-center">
                <button
                  type="button"
                  className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <SwitchHorizontalIcon
                    className="h-5 w-5 hidden xsm:block"
                    aria-hidden="true"
                  />
                  <SwitchVerticalIcon
                    className="h-5 w-5 xsm:hidden"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className="flex justify-center xsm:items-center flex-row-reverse">
                <div className="ml-3 xsm:text-right truncate">
                  <UserName user={userDishesSummary.user}>
                    <Price
                      priceCents={
                        currency(userDishesSummary.shipping).add(
                          userDishesSummary.total
                        ).value
                      }
                    />{' '}
                    ({t('dish.delivery')}{' '}
                    <Price priceCents={userDishesSummary.shipping} />)
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
