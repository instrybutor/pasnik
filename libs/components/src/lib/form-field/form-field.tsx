import React, {
  ChangeEvent,
  cloneElement,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
  useFormContext,
  UseFormRegister,
  useFormState,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FieldPathValue } from 'react-hook-form/dist/types';
import { Tooltip } from '../tooltip/tooltip';
import { Label } from './label';

export interface FormFieldInputProps extends React.HTMLProps<HTMLInputElement> {
  error?: boolean;
}

export interface FormFieldProps<
  TFieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  label?: string;
  children: ReactElement<FormFieldInputProps>;
  errorIcon?: JSX.Element;
  register?: UseFormRegister<TFieldValues>;
  control?: Control<TFieldValues>;
  suffix?: ReactNode;
  required?: boolean;
  transform?: {
    input?: (value: any) => string;
    output?: (value: string) => any;
  };
  defaultValue?: FieldPathValue<TFieldValues, TName>;
  errorTooltip?: boolean;
  labelClassName?: string;
}

let nextId = 0;

export function FormField<TFieldValues extends FieldValues>({
  children,
  name,
  label,
  errorIcon,
  suffix,
  transform,
  defaultValue,
  required,
  errorTooltip,
  labelClassName,
}: FormFieldProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();
  const { t } = useTranslation();
  const state = useFormState({ control, name });
  const error: FieldError | undefined = state?.errors[name];
  const inputId = useMemo(() => `form-field-id:${nextId++}`, []);
  return (
    <div>
      {label && (
        <Label className={labelClassName} required={required}>
          {label}
        </Label>
      )}
      <div className="relative rounded-md shadow-sm">
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field, fieldState: { isDirty } }) => {
            return cloneElement(children, {
              error: Boolean(error),
              onBlur: (e: ChangeEvent<HTMLInputElement>) => {
                field.onBlur();
              },
              onChange: (e: ChangeEvent<HTMLInputElement>) =>
                field.onChange(
                  transform?.output
                    ? transform.output(e.currentTarget.value)
                    : e.currentTarget.value
                ),
              value: transform?.input
                ? transform.input(field.value)
                : field.value,
              id: inputId,
            });
          }}
        />

        {(error || suffix) && (
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
            {error?.message && errorTooltip ? (
              <span className="ml-1">
                <Tooltip title={t(error.message)}>
                  {errorIcon ? (
                    errorIcon
                  ) : (
                    <ExclamationCircleIcon
                      className="h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  )}
                </Tooltip>
              </span>
            ) : (
              suffix && (
                <span className="text-gray-500 xsm:text-sm pr-1">{suffix}</span>
              )
            )}
          </div>
        )}
      </div>
      {error?.message && !errorTooltip && (
        <p className="absolute mt-1 text-sm text-red-600">{t(error.message)}</p>
      )}
    </div>
  );
}
