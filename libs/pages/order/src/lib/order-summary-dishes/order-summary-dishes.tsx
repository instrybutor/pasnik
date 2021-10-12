import { Price, UserInfo } from '@pasnik/components';
import { UserDishesSummary } from '../order-summary/order-summary.hook';

export interface OrderSummaryDishesProps {
  userDishesSummaries: UserDishesSummary[];
}

export function OrderSummaryDishes({
  userDishesSummaries,
}: OrderSummaryDishesProps) {
  return (
    <section aria-labelledby="notes-title">
      <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
        <div className="divide-y divide-gray-200">
          <div className="px-4 py-5 sm:px-6 sm:flex sm:items-center sm:justify-between">
            <h2 id="notes-title" className="text-lg font-medium text-gray-900">
              Podsumowanie zamówienia
            </h2>
          </div>
          {userDishesSummaries?.map((summary) => (
            <div key={summary.user.id} className="py-5 px-6">
              <div className="flex items-center px-5">
                <UserInfo user={summary.user}>
                  <Price priceCents={summary.total + summary.shipping} />
                </UserInfo>
              </div>
              <div className="mt-4 text-base italic text-gray-600">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    {summary.dishes?.map((dish) => (
                      <tr key={dish.id}>
                        <td className="px-6 py-4 text-sm text-gray-500 w-11/12">
                          {dish.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/12">
                          <Price priceCents={dish.priceCents} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OrderSummaryDishes;
