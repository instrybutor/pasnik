import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

export interface LabelProps {
  className?: string;
  required?: boolean;
  htmlFor?: string;
}

export const Label = React.forwardRef<
  HTMLLabelElement,
  PropsWithChildren<LabelProps>
>(({ className, required, children, ...props }, ref) => {
  return (
    <label
      className={classNames('text-sm font-medium', className)}
      ref={ref}
      {...props}
    >
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
});
