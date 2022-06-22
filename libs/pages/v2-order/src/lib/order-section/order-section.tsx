import { PropsWithChildren, ReactNode, useMemo } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { Spinner, useBreakpoint } from '@pasnik/components';

export interface OrderSectionProps {
  header: string | ReactNode;
  footer?: string | ReactNode;
  subTitle?: string | ReactNode;
  action?: ReactNode | 'accordion';
  accordion?: 'always' | 'mobile';
  className?: string;
  defaultOpen?: 'mobile' | 'desktop' | boolean;
  noPadding?: boolean;
  isLoading?: boolean;
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
  isLoading,
  accordion,
}: PropsWithChildren<OrderSectionProps>) {
  const { breakpoint } = useBreakpoint();
  const _defaultOpen = useMemo(() => {
    if (defaultOpen === 'mobile') {
      return breakpoint === 'sm';
    } else if (defaultOpen === 'desktop') {
      return breakpoint !== 'sm';
    }
    return defaultOpen ?? true;
  }, [breakpoint, defaultOpen]);

  return (
    <Disclosure as="section" defaultOpen={_defaultOpen} className={className}>
      {({ open }) => (
        <div className="bg-white shadow sm:rounded-lg overflow-hidden">
          <div className="px-4 py-4 sm:px-6 flex items-center">
            <div className="flex-grow">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                {header}
              </h2>
              {subTitle && (
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {subTitle}
                </p>
              )}
            </div>
            <div className="inline-flex gap-2 -my-1">
              {action}
              <Disclosure.Button
                className={classNames(
                  'items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500',
                  {
                    'sm:hidden': accordion === 'mobile',
                    hidden: !accordion,
                  }
                )}
              >
                <ChevronDownIcon
                  className={classNames(
                    open ? '-rotate-180' : 'rotate-0',
                    'h-5 w-5 transform'
                  )}
                  aria-hidden="true"
                />
              </Disclosure.Button>
            </div>
          </div>
          <Disclosure.Panel
            as="div"
            className={classNames('border-t border-gray-200', {
              'px-4 py-5 sm:px-6': !noPadding,
            })}
          >
            {isLoading ? <Spinner /> : children}
          </Disclosure.Panel>
          {footer && <div className="border-t border-gray-200">{footer}</div>}
        </div>
      )}
    </Disclosure>
  );
}
