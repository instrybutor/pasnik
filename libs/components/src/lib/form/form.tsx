import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
  UseFormProps,
} from 'react-hook-form';
import { ReactElement, useCallback, useState } from 'react';
import Spinner from '../spinner/spinner';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

export interface FormProps<TFormValues extends FieldValues, TContext>
  extends UseFormProps<TFormValues, TContext> {
  onSubmit: SubmitHandler<TFormValues>;
  children: ReactElement | ReactElement[];
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Form = <
  TFormValues extends FieldValues = FieldValues,
  TContext = any
>({
  onSubmit,
  children,
  className,
  ...formProps
}: FormProps<TFormValues, TContext>) => {
  const { t } = useTranslation();
  const [hasServerError, setHasServerError] = useState(false);
  const methods = useForm<TFormValues, TContext>(formProps);

  const { handleSubmit, formState } = methods;

  const _onSubmit = useCallback(
    (data: UnpackNestedValue<TFormValues>) => {
      setHasServerError(false);
      return onSubmit(data);
    },
    [onSubmit]
  );
  const _onError = useCallback(
    (error: Error) => {
      setHasServerError(true);
    },
    [setHasServerError]
  );
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(event) => handleSubmit(_onSubmit)(event).catch(_onError)}
        className={classNames('relative', className)}
      >
        {formState.isSubmitting && (
          <div className="absolute z-10 h-full w-full flex-1 flex-col flex justify-center">
            <div className="absolute h-full w-full bg-white opacity-70" />
            <Spinner />
          </div>
        )}
        <div className="flex flex-1 flex-col space-y-6">
          {hasServerError && (
            <span className="text-center text-red-500">
              {t('errors.server')}
            </span>
          )}
          {children}
        </div>
      </form>
    </FormProvider>
  );
};
