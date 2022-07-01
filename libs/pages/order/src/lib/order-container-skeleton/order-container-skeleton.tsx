import { OrderSection } from '../order-section/order-section';
import { Header } from '@pasnik/components';

export function OrderContainerSkeleton() {
  return (
    <div className="animate-pulse">
      <Header
        left={
          <div className="flex flex-col gap-1">
            <div className="w-52 h-6 bg-gray-300"></div>
            <p className="text-gray-500 w-96 h-4 bg-gray-300" />
          </div>
        }
        className="bg-white shadow"
      />
      <main className="mt-8 max-w-4xl mx-auto grid grid-cols-1 gap-6 sm:px-6 xl:max-w-7xl xl:grid-flow-col-dense xl:grid-cols-3 w-full">
        <div className="space-y-6 xl:col-start-1 xl:col-span-2">
          <OrderSection
            header={<div className="w-52 h-5 bg-gray-300"></div>}
            isLoading={true}
          />
          <OrderSection
            header={<div className="w-52 h-5 bg-gray-300"></div>}
            isLoading={true}
          />
        </div>
        <div className="space-y-6 xl:col-start-3 xl:col-span-1">
          <OrderSection
            header={<div className="w-52 h-5 bg-gray-300"></div>}
            isLoading={true}
          />
        </div>
      </main>
    </div>
  );
}
