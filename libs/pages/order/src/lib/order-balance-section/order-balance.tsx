import { OrderBalanceSkeleton } from './order-balance-skeleton';
import { CashIcon } from '@heroicons/react/outline';
import { Button } from '@pasnik/components';

export function OrderBalance() {
  // const { t } = useTranslation();
  return (
    <div className="text-center bg-white px-4 py-6 flex gap-2 flex-col">
      <CashIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="text-sm font-medium text-gray-900">
        Czy chciałbyś rozliczyć zamówienie?
      </h3>
      <Button className="px-4 py-2 mx-auto">Dodaj płacącego</Button>
    </div>
  );
}

OrderBalance.Skeleton = OrderBalanceSkeleton;
