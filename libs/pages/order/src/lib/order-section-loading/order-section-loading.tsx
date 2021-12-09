import { Spinner } from '@pasnik/components';
import classNames from 'classnames';

/* eslint-disable-next-line */
export interface OrderSectionLoadingProps {
  className?: string;
}

export function OrderSectionLoading({ className }: OrderSectionLoadingProps) {
  return (
    <div className="bg-white shadow animate-pulse">
      <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div
          className={classNames(
            className,
            'relative md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200'
          )}
        >
          <Spinner />
        </div>
      </div>
    </div>
  );
}

export default OrderSectionLoading;
