import { PropsWithChildren, ReactNode } from 'react';

export interface OrderSectionProps {
  title: string;
  subTitle?: string | ReactNode;
  action?: ReactNode;
  className?: string;
}

export function OrderSection({
  children,
  title,
  subTitle,
  action,
  className,
}: PropsWithChildren<OrderSectionProps>) {
  return (
    <section className={className}>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <div className="">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              {title}
            </h2>
            {subTitle && (
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{subTitle}</p>
            )}
          </div>
          {action}
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          {children}
        </div>
      </div>
    </section>
  );
}
