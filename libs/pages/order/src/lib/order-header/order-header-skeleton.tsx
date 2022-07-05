import { Header } from '@pasnik/components';

export function OrderHeaderSkeleton() {
  return (
    <Header
      left={
        <div className="flex flex-col gap-1 sm:gap-2 pb-0.5 sm:py-0.5">
          <div className="w-52 h-7 bg-gray-300 rounded-md"></div>
          <div className="text-gray-500 w-96 h-5 bg-gray-300 rounded-md" />
        </div>
      }
      right={
        <div className="flex flex-row space-x-3 h-9">
          <div className="w-24 bg-gray-300 rounded-md"></div>
          <div className="w-28 bg-gray-300 rounded-md"></div>
          <div className="w-24 bg-gray-300 rounded-md"></div>
        </div>
      }
      className="bg-white shadow animate-pulse"
    />
  );
}
