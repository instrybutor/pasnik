import { PropsWithRef, useCallback } from 'react';
import { ButtonProps, useToast } from '@pasnik/components';
import Button from './button';
import { UseMutationResult } from 'react-query';
import { useTranslation } from 'react-i18next';

export interface ButtonMutateProps<TData, TError, TVariables, TContext>
  extends Omit<ButtonProps, 'onClick'> {
  mutation: UseMutationResult<TData, TError, TVariables, TContext>;
  mutationData?: TVariables;
  successMessage?: string;
}

export const ButtonMutate = <TData, TError, TVariables, TContext>({
  mutation: { mutateAsync, isLoading },
  mutationData,
  successMessage,
  ref,
  ...buttonProps
}: PropsWithRef<ButtonMutateProps<TData, TError, TVariables, TContext>>) => {
  const { toast } = useToast();
  const { t } = useTranslation();

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
    <Button
      disabled={isLoading}
      ref={ref}
      onClick={() =>
        mutateAsync(mutationData ?? ({} as TVariables))
          .then(_onSuccess)
          .catch(_onError)
      }
      {...buttonProps}
    />
  );
};

// export const ButtonMutate = React.forwardRef(XDD);

// export default ButtonMutate;
