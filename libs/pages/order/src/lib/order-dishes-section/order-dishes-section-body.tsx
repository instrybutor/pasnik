import { useOrderDishes } from '@pasnik/features/orders';
import { useSlug } from '@pasnik/shared/utils';
import { OrderDishes } from '../order-dishes/order-dishes';

export interface OrderDishesSectionBodyProps {
  isAdding: boolean;
}

export function OrderDishesSectionBody({
  isAdding,
}: OrderDishesSectionBodyProps) {
  const slug = useSlug();
  const { data: dishes } = useOrderDishes(slug);

  return dishes ? <OrderDishes dishes={dishes} isAdding={isAdding} /> : null;
}
