import React, { cloneElement, ReactElement, ReactNode, useMemo } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  UseFormRegister,
  useFormState,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface FormFieldInputProps extends React.HTMLProps<HTMLInputElement> {
  error?: boolean;
}

export interface FormFieldProps<TFieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  children: ReactElement<FormFieldInputProps>;
  errorIcon?: JSX.Element;
  register?: UseFormRegister<TFieldValues>;
  control?: Control<TFieldValues>;
  suffix?: ReactNode;
  required?: boolean;
}

let nextId = 0;

export function FormField<TFieldValues extends FieldValues>({
  children,
  name,
  label,
  errorIcon,
  register,
  control,
  suffix,
  required,
}: FormFieldProps<TFieldValues>) {
  const { t } = useTranslation();
  const state = useFormState({ control, name });
  const error: FieldError | undefined = state?.errors[name];
  const inputId = useMemo(() => `form-field-id:${nextId++}`, []);
  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {cloneElement(children, {
          ...register?.(name),
          error: Boolean(error),
          id: inputId,
          disabled: state.isSubmitting,
        })}
        {(error || suffix) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {error ? (
              <span className="ml-1">
                {errorIcon ? (
                  errorIcon
                ) : (
                  <ExclamationCircleIcon
                    className="h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )}
              </span>
            ) : (
              suffix && (
                <span className="text-gray-500 xsm:text-sm">{suffix}</span>
              )
            )}
          </div>
        )}
      </div>
      {error?.message && (
        <p className="absolute mt-1 text-sm text-red-600">{t(error.message)}</p>
      )}
    </div>
  );
}
