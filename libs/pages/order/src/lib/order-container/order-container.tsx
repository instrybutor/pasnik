import { OrderContainerDynamicSections } from './order-container-dynamic-sections';
import { OrderSection } from '../order-section/order-section';
import { QueryBoundary } from '@pasnik/components';
import { OrderPaymentsSection } from '../order-payments-section/order-payments-section';

export function OrderContainer() {
  return (
    <main className="mt-8 w-full max-w-4xl mx-auto grid grid-cols-1 gap-6 sm:px-6 xl:max-w-7xl xl:grid-flow-col-dense xl:grid-cols-3">
      <div className="space-y-6 xl:col-start-1 xl:col-span-2">
        <QueryBoundary fallback={<OrderSection isLoading={true} />}>
          <OrderContainerDynamicSections />
        </QueryBoundary>
      </div>
      <div className="space-y-6 xl:col-start-3 xl:col-span-1">
        <OrderPaymentsSection />
      </div>
    </main>
  );
}
