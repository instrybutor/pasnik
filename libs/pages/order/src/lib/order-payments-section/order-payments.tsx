import { OrderPaymentsSkeleton } from './order-payments-skeleton';
import { CashIcon } from '@heroicons/react/outline';
import { Button } from '@pasnik/components';
import { useOrderPayments } from '@pasnik/features/orders';
import { useSlug } from '@pasnik/shared/utils';
import { OrderPayment } from './order-payment';

export function OrderPayments() {
  // const { t } = useTranslation();
  const slug = useSlug();
  const { data: payments } = useOrderPayments(slug);
  return (
    <>
      {payments?.map((payment) => (
        <OrderPayment payment={payment} />
      ))}
      {(payments?.length ?? 0) === 0 && (
        <div className="text-center bg-white px-4 py-6 flex gap-2 flex-col">
          <CashIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="text-sm font-medium text-gray-900">
            Czy chciałbyś rozliczyć zamówienie?
          </h3>
          <Button className="px-4 py-2 mx-auto">Dodaj płacącego</Button>
        </div>
      )}
    </>
  );
}

OrderPayments.Skeleton = OrderPaymentsSkeleton;
