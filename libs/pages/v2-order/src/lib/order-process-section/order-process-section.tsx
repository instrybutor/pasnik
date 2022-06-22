import { OrderSection } from '../order-section/order-section';
import {
  DishModel,
  markAsOrderedValidator,
  OrderModel,
  UserModel,
} from '@pasnik/api/data-transfer';
import { useOrderDishes } from '@pasnik/features/orders';
import {
  CurrencyInput,
  currencyTransform,
  FormField,
  Price,
  Spinner,
} from '@pasnik/components';
import { useMemo } from 'react';
import { OrderProcess } from '../order-process/order-process';
import { useOrderState } from '../order-state/order-state';
import { yupResolver } from '@hookform/resolvers/yup';

export interface OrderDishesProps {
  order: OrderModel;
}

export interface ProcessDish {
  name: string;
  priceCents: number;
  users: UserModel[];
  dishes: DishModel[];
}

export function OrderProcessSection({ order }: OrderDishesProps) {
  const { setShippingCents, shippingCents } = useOrderState();
  const { data } = useOrderDishes(order);
  const total = useMemo(() => {
    return data?.reduce((acc, dish) => acc + dish.priceCents, 0) ?? 0;
  }, [data]);
  const reducedDishes = useMemo(() => {
    return Object.values(
      data?.reduce((acc, dish) => {
        const key = dish.name + dish.priceCents;
        acc[key] = acc[key] || {
          name: dish.name,
          priceCents: dish.priceCents,
          dishes: [],
          users: [],
        };
        acc[key].dishes.push(dish);
        if (!acc[key].users.some((value) => value.id === dish.userId)) {
          acc[key].users.push(dish.user);
        }
        return acc;
      }, {} as Record<string, ProcessDish>) ?? []
    ).sort((dishA, dishB) => {
      if (dishA.name < dishB.name) {
        return -1;
      }
      if (dishA.name > dishB.name) {
        return 1;
      }
      return 0;
    });
  }, [data]);
  return (
    <OrderSection
      noPadding={true}
      header="Podsumowanie zamówienia"
      footer={
        <div className="px-4 py-4 sm:px-6 flex items-center space-between">
          <span className="text-sm text-gray-500 flex-1">
            Ilość pozycji: {reducedDishes.length}
          </span>
          <span className="text-sm text-gray-500 flex flex-col flex-shrink-0 gap-2 items-end">
            <div className="flex items-center">
              <FormField
                defaultValue={shippingCents}
                label="Dostawa"
                name="shippingCents"
                suffix="zł"
                transform={currencyTransform}
                onChange={setShippingCents}
                resolver={yupResolver(markAsOrderedValidator)}
                vertical
                errorTooltip
              >
                <CurrencyInput className="w-24 text-right" />
              </FormField>
            </div>
            <div className="flex w-full font-bold">
              <div className="flex-1">Suma</div>
              <Price
                className=" mr-3 gap-3 flex"
                priceCents={total + shippingCents}
              />
            </div>
          </span>
        </div>
      }
    >
      {data ? (
        <OrderProcess order={order} dishes={reducedDishes} />
      ) : (
        <Spinner />
      )}
    </OrderSection>
  );
}
