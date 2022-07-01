import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from 'react-hook-form';
import { ReactElement, useCallback } from 'react';
import classNames from 'classnames';
import { useToast } from '../toast';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import { FormFieldErrors } from '../form-field';

export interface FormProps<TFormValues extends FieldValues, TContext>
  extends UseFormProps<TFormValues, TContext> {
  onSubmit?: SubmitHandler<TFormValues>;
  children: ReactElement | ReactElement[];
  className?: string;
  successMessage?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Form = <
  TFormValues extends FieldValues = FieldValues,
  TContext extends object = object
>({
  onSubmit,
  children,
  className,
  successMessage,
  ...formProps
}: FormProps<TFormValues, TContext>) => {
  const methods = useForm<TFormValues, TContext>({
    reValidateMode: 'onBlur',
    ...formProps,
  });
  const { toast } = useToast();
  const { t } = useTranslation();

  const { handleSubmit } = methods;

  const _onError = useCallback(
    (error: AxiosError<{ message: string }>) => {
      if (error.isAxiosError && error.response?.status === 400) {
        toast({
          type: 'error',
          title: t('errors.server.title'),
          subTitle: (
            <FormFieldErrors messages={error?.response?.data?.message} />
          ),
          autoClose: 3000,
        });
      } else {
        toast({
          type: 'error',
          title: t('errors.server.title'),
          autoClose: 3000,
        });
      }
    },
    [toast, t]
  );

  const submitHandler: SubmitHandler<TFormValues> = useCallback(
    async (...args) => {
      await onSubmit?.(...args);
      if (successMessage) {
        toast({ type: 'success', title: successMessage });
      }
    },
    [onSubmit, successMessage, toast]
  );

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(event) => handleSubmit(submitHandler)(event).catch(_onError)}
        className={classNames('relative', className)}
      >
        {children}
      </form>
    </FormProvider>
  );
};
