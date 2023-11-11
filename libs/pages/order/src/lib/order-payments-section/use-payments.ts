import { useSlug } from '@pasnik/shared/utils';
import { useOrderDishes, useOrderPayments } from '@pasnik/features/orders';
import { useMemo } from 'react';

export function usePayments() {
  const slug = useSlug();
  const { data: expenses } = useOrderDishes(slug);
  const { data: payments } = useOrderPayments(slug);

  const totalExpenses = useMemo(
    () => expenses?.reduce((acc, expense) => acc + expense.priceCents, 0) ?? 0,
    [expenses]
  );

  const totalPayments = useMemo(
    () => payments?.reduce((acc, payment) => acc + payment.amountCents, 0) ?? 0,
    [payments]
  );

  const balanceCents = useMemo(() => {
    return totalPayments - totalExpenses;
  }, [totalPayments, totalExpenses]);

  return {
    balanceCents,
    totalExpenses,
    totalPayments,
  };
}
