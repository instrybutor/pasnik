import { PropsWithChildren, ReactNode } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

export interface OrderSectionProps {
  header: string | ReactNode;
  footer?: string | ReactNode;
  subTitle?: string | ReactNode;
  action?: ReactNode | 'accordion';
  className?: string;
  defaultOpen?: boolean;
  noPadding?: boolean;
}

export function OrderSection({
  children,
  header,
  subTitle,
  action,
  className,
  defaultOpen,
  noPadding,
  footer,
}: PropsWithChildren<OrderSectionProps>) {
  return (
    <Disclosure
      as="section"
      defaultOpen={defaultOpen ?? true}
      className={className}
    >
      {({ open }) => (
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
            <div className="">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                {header}
              </h2>
              {subTitle && (
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {subTitle}
                </p>
              )}
            </div>
            {action === 'accordion' ? (
              <Disclosure.Button className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                <ChevronDownIcon
                  className={classNames(
                    open ? '-rotate-180' : 'rotate-0',
                    'h-5 w-5 transform'
                  )}
                  aria-hidden="true"
                />
              </Disclosure.Button>
            ) : (
              action
            )}
          </div>
          <Disclosure.Panel
            as="div"
            className={classNames('border-t border-gray-200', {
              'px-4 py-5 sm:px-6': !noPadding,
            })}
          >
            {children}
          </Disclosure.Panel>
          {footer && <div className="border-t border-gray-200">{footer}</div>}
        </div>
      )}
    </Disclosure>
  );
}
