import { OrderSection } from '../order-section/order-section';
import { ExpenseModel, UserModel } from '@pasnik/api/data-transfer';
import { useTranslation } from 'react-i18next';

export interface ProcessDish {
  name: string;
  priceCents: number;
  users: UserModel[];
  expenses: ExpenseModel[];
}

export function OrderProcessSection() {
  const { t } = useTranslation();
  // const { dishes, isLoading } = useOrderProcessSection();

  return (
    <OrderSection
      noPadding={true}
      header={t('order.order_summary')}
      //   footer={
      //     isLoading ? (
      //       <OrderProcessSectionFooterSkeleton />
      //     ) : (
      //       <OrderProcessSectionFooter />
      //     )
      //   }
      // >
      //   {isLoading ? <OrderProcessSkeleton /> : <OrderProcess dishes={dishes} />}
    />
  );
}
