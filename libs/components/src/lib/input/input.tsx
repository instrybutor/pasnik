import React from 'react';
import classNames from 'classnames';
import { FormFieldInputProps } from '../form-field/form-field';

export const Input = React.forwardRef<HTMLInputElement, FormFieldInputProps>(
  ({ error, className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type ?? 'text'}
        className={classNames(
          {
            'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500':
              error,
            'focus:ring-cyan-500 focus:border-cyan-500': !error,
          },
          'block w-full pr-8 xsm:text-sm rounded-md border-gray-300 focus:outline-none',
          className
        )}
        {...props}
      />
    );
  }
);

export default Input;
