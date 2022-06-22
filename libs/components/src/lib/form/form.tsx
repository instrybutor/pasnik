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

export interface FormProps<TFormValues extends FieldValues, TContext>
  extends UseFormProps<TFormValues, TContext> {
  onSubmit?: SubmitHandler<TFormValues>;
  children: ReactElement | ReactElement[];
  className?: string;
  successMessage?: string;
}

// eslint-disable-next-line
const noop = () => {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Form = <
  TFormValues extends FieldValues = FieldValues,
  TContext = any
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

  const _onSuccess = useCallback(() => {
    if (successMessage) {
      toast({ type: 'success', title: successMessage });
    }
  }, [successMessage, toast]);

  const _onError = useCallback(
    (error: Error) => {
      toast({
        type: 'error',
        title: t('errors.server'),
        autoClose: 3000,
      });
    },
    [toast, t]
  );
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(event) =>
          handleSubmit(onSubmit ?? noop)(event)
            .then(_onSuccess)
            .catch(_onError)
        }
        className={classNames('relative', className)}
      >
        {children}
      </form>
    </FormProvider>
  );
};
