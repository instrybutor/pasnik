import React, {
  ChangeEvent,
  cloneElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
} from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import {
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
  useForm,
  useFormContext,
  useFormState,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FieldPathValue } from 'react-hook-form/dist/types';
import { Tooltip } from '../tooltip/tooltip';
import { Label } from './label';
import classNames from 'classnames';
import { Resolver } from 'react-hook-form/dist/types/resolvers';
import { FormFieldError } from './form-field-error';

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
  suffix?: ReactNode;
  required?: boolean;
  transform?: {
    input?: (value: any) => string;
    output?: (value: string) => any;
  };
  defaultValue?: FieldPathValue<TFieldValues, TName>;
  errorTooltip?: boolean;
  labelClassName?: string;
  onChange?: (value: FieldPathValue<TFieldValues, TName>) => void;
  vertical?: boolean;
  resolver?: Resolver<TFieldValues>;
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
  onChange,
  vertical,
  resolver,
}: FormFieldProps<TFieldValues>) {
  const formContext = useFormContext<TFieldValues>();
  const form = useForm({ resolver, mode: 'onChange' });
  const { control, watch } = formContext ?? form;
  const currentValue = watch(name);
  const { t } = useTranslation();
  const state = useFormState({ control, name });
  const error: FieldError | undefined = state?.errors[name];
  const inputId = useMemo(() => `form-field-id:${nextId++}`, []);

  useEffect(() => {
    onChange?.(currentValue);
  }, [onChange, currentValue]);
  return (
    <div
      className={classNames('flex', {
        'flex-col gap-1': !vertical,
        'flex-row gap-4 items-center': vertical,
      })}
    >
      {label && (
        <Label className={labelClassName} required={required} htmlFor={inputId}>
          {label}
        </Label>
      )}
      <div className="relative rounded-md shadow-sm">
        <Controller
          control={control}
          name={name}
          defaultValue={defaultValue}
          render={({ field }) => {
            return cloneElement(children, {
              error: Boolean(error),
              ref: field.ref,
              name: field.name,
              onBlur: () => field.onBlur(),
              onChange: (e: ChangeEvent<HTMLInputElement>) =>
                field.onChange(
                  transform?.output?.(e.currentTarget.value) ??
                    e.currentTarget.value
                ),
              value: transform?.input?.(field.value) ?? field.value,
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
        {error?.message && !errorTooltip && (
          <p className="absolute mt-1 text-sm text-red-600">
            <FormFieldError message={error.message} />
          </p>
        )}
      </div>
    </div>
  );
}
