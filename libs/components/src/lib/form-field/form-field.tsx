import { cloneElement, ReactElement } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

export interface FormFieldInputProps {
  htmlFor: string;
  id: string;
  error?: boolean;
}

export interface FormFieldProps {
  children: ReactElement<FormFieldInputProps>;
  error?: boolean;
  errorIcon?: JSX.Element;
  errorMessage?: string;
}

export function FormField({
  children,
  error,
  errorIcon,
  errorMessage,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {cloneElement(children, { htmlFor: 'email', id: 'email', error })}
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
      {error && errorMessage && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
