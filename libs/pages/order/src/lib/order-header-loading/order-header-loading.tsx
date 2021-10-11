import {
  BookOpenIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  TruckIcon,
} from '@heroicons/react/outline';

/* eslint-disable-next-line */
export interface OrderHeaderLoadingProps {}

export function OrderHeaderLoading(props: OrderHeaderLoadingProps) {
  return (
    <div className="bg-white shadow animate-pulse">
      <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="pt-8 pb-7 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="flex-1 min-w-0 ml-3">
            <div className="h-6 bg-gray-400 w-52" />
            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <BookOpenIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <div className="w-8 h-4 bg-gray-400" />
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <TruckIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <div className="w-6 h-4 bg-gray-400" />
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CurrencyDollarIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <div className="w-6 h-4 bg-gray-400" />
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <CalendarIcon
                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <div className="w-52 h-4 bg-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHeaderLoading;
