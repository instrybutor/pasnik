import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

export interface LabelProps {
  className?: string;
  required?: boolean;
}

export const Label = React.forwardRef<
  HTMLLabelElement,
  PropsWithChildren<LabelProps>
>(({ className, required, children, ...props }, ref) => {
  return (
    <label
      className={classNames(
        'text-sm font-medium text-gray-700 mb-1',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
});
