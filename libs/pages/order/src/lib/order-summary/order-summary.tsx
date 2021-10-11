import { DishModel, OrderModel, UserModel } from '@pasnik/api/data-transfer';
import { useEffect, useState } from 'react';
import { Price, UserInfo } from '@pasnik/components';

export interface OrderDishesSummaryProps {
  dishes?: DishModel[] | null;
  order?: OrderModel | null;
}

interface UserDishesSummary {
  user: UserModel;
  total: number;
  shipping: number;
  dishes: DishModel[];
}

export function OrderSummary({ dishes, order }: OrderDishesSummaryProps) {
  const [userDishesSummaries, setUserDishesSummaries] = useState<
    UserDishesSummary[]
  >([]);
  useEffect(() => {
    const grouppedDishes = dishes?.reduce((acc, dish) => {
      dish.usersDishes.forEach(({ user }) => {
        const userSummary: UserDishesSummary = acc[user.id] || {
          user,
          dishes: [],
          total: 0,
          shipping: 0,
        };
        userSummary.dishes.push(dish);
        userSummary.total += dish.priceCents;
        acc[user.id] = userSummary;
      });
      return acc;
    }, {} as Record<UserModel['id'], UserDishesSummary>);
    const userDishesSummaries = Object.values(grouppedDishes ?? []);
    if (order?.shippingCents) {
      userDishesSummaries.forEach((userSummary) => {
        userSummary.shipping +=
          order!.shippingCents! / userDishesSummaries.length;
      });
    }
    setUserDishesSummaries(Object.values(userDishesSummaries));
  }, [dishes]);
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
                      <tr>
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

export default OrderSummary;
