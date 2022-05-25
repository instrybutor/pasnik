import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  error?: boolean;
  errorIcon?: JSX.Element;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, errorIcon, ...props }, ref) => {
    return (
      <div className="relative rounded-md shadow-sm">
        <input
          ref={ref}
          type="text"
          {...props}
          className={classNames(
            {
              'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500':
                error,
              'focus:ring-cyan-500 focus:border-cyan-500': !error,
            },
            'block w-full pr-8 xsm:text-sm rounded-md border-gray-300 focus:outline-none',
            className
          )}
          aria-describedby="price-currency"
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {errorIcon ? (
              errorIcon
            ) : (
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
