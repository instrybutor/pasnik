import React from 'react';
import classNames from 'classnames';
import { currencyTransform, FormFieldInputProps } from '../form-field';

export const Input = React.forwardRef<HTMLInputElement, FormFieldInputProps>(
  ({ error, value, className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type ?? 'text'}
        onBlur={(e) =>
          (e.currentTarget.value = currencyTransform.input(value as number))
        }
        className={classNames(
          {
            'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500':
              error,
            'focus:ring-cyan-500 focus:border-cyan-500 border-gray-300': !error,
          },
          'block w-full pr-8 xsm:text-sm rounded-md focus:outline-none',
          className
        )}
        {...props}
      />
    );
  }
);

export default Input;
