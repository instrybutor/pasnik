import { PropsWithRef, Ref, useCallback } from 'react';
import { Button, ButtonProps } from './button';
import { useToast } from '../toast';
import { UseMutationResult } from 'react-query';
import { useTranslation } from 'react-i18next';
import { AxiosForbiddenError } from '@pasnik/axios';
import { FormFieldErrors } from '../form-field';

export interface ButtonMutateProps<TData, TError, TVariables, TContext>
  extends Omit<ButtonProps, 'onClick'> {
  mutation: UseMutationResult<TData, TError, TVariables, TContext>;
  mutationData?: TVariables;
  successMessage?: string;
  mutationSuccess?: (data: TData) => void;
  ref?: Ref<HTMLButtonElement>;
}

export const ButtonMutate = <TData, TError, TVariables, TContext>({
  mutation: { mutateAsync, isLoading },
  mutationData,
  mutationSuccess,
  successMessage,
  ref,
  ...buttonProps
}: PropsWithRef<ButtonMutateProps<TData, TError, TVariables, TContext>>) => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const _onSuccess = useCallback(
    (data: TData) => {
      mutationSuccess?.(data);
      if (successMessage) {
        toast({ type: 'success', title: successMessage });
      }
    },
    [successMessage, toast, mutationSuccess]
  );

  const _onError = useCallback(
    (error: AxiosForbiddenError) => {
      if (error.prompt) {
        toast({
          type: 'error',
          title: t('errors.server.title'),
          subTitle: <FormFieldErrors messages={error.message} />,
          autoClose: 3000,
        });
        return;
      }
      toast({
        type: 'error',
        title: t('errors.server.title'),
        autoClose: 3000,
      });
    },
    [toast, t]
  );

  return (
    <Button
      disabled={isLoading}
      ref={ref}
      onClickCapture={() => {
        mutateAsync(mutationData ?? ({} as TVariables))
          .then(_onSuccess)
          .catch(_onError);
      }}
      {...buttonProps}
    />
  );
};
