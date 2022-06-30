import { Price, UserInfo } from '@pasnik/components';
import { useEffect } from 'react';
import { DishModel, OrderModel } from '@pasnik/api/data-transfer';
import { useOrderSummary } from './order-summary.hook';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export interface OrderSummaryProps {
  order: OrderModel;
  dishes: DishModel[];
}

export function OrderSummary({ order, dishes }: OrderSummaryProps) {
  const { t } = useTranslation();
  const { groupedSummaries, setDishes } = useOrderSummary(order);

  useEffect(() => {
    setDishes(dishes);
  }, [dishes, setDishes]);

  return (
    <div className="divide-y divide-gray-200">
      {groupedSummaries?.map((summary, index) => (
        <Disclosure key={summary.user.id}>
          {({ open }) => (
            <div className="py-5 px-3 sm:px-6">
              <div className="flex flex-1 flex-row">
                <div className="flex flex-1 items-center">
                  <UserInfo user={summary.user}>
                    <Price priceCents={summary.total + summary.shipping} />
                  </UserInfo>
                </div>
                <div className="flex items-center">
                  <Disclosure.Button className="-my-1 -ml-1 mr-1 p-1 text-gray-500 border border-transparent rounded-full text-white hover:bg-gray-200 focus:outline-none">
                    <ChevronDownIcon
                      className={classNames(
                        open ? '-rotate-180' : 'rotate-0',
                        'h-5 w-5 transform'
                      )}
                      aria-hidden="true"
                    />
                  </Disclosure.Button>
                </div>
              </div>
              <Disclosure.Panel>
                <div className="mt-4 text-base italic text-gray-600 px-4">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      {summary.dishes?.map((dish) => (
                        <tr key={dish.id}>
                          <td className="pl-8 py-4 text-sm text-gray-500 w-11/12">
                            {dish.name}
                          </td>
                          <td className="pr-8 py-4 whitespace-nowrap text-sm text-gray-500 w-1/12 text-right">
                            <Price priceCents={dish.priceCents} />
                          </td>
                        </tr>
                      ))}
                      {summary.shipping > 0 && (
                        <tr>
                          <td className="pl-8 py-4 text-sm text-gray-500 w-11/12">
                            {t('v2-order.common.total')}
                          </td>
                          <td className="pr-8 py-4 whitespace-nowrap text-sm text-gray-500 w-1/12 text-right">
                            <Price priceCents={summary.shipping} />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
