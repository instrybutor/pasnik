import { OrderSection } from '../order-section/order-section';

export function OrderContainerSkeleton() {
  return (
    <div className="animate-pulse">
      <main className="mt-8 max-w-4xl mx-auto grid grid-cols-1 gap-6 sm:px-6 xl:max-w-7xl xl:grid-flow-col-dense xl:grid-cols-3 w-full">
        <div className="space-y-6 xl:col-start-1 xl:col-span-2">
          <OrderSection isLoading={true} />
          <OrderSection isLoading={true} />
        </div>
        <div className="space-y-6 xl:col-start-3 xl:col-span-1">
          <OrderSection isLoading={true} />
        </div>
      </main>
    </div>
  );
}
