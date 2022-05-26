import {
  SubmitHandler,
  UnpackNestedValue,
  useForm,
  UseFormProps,
} from 'react-hook-form';
import {
  Children,
  createElement,
  ReactElement,
  useCallback,
  useState,
} from 'react';
import Spinner from '../spinner/spinner';
import { useTranslation } from 'react-i18next';

export interface FormProps<TFormValues> extends UseFormProps<TFormValues> {
  onSubmit: SubmitHandler<TFormValues>;
  children: ReactElement | ReactElement[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Form = <TFormValues extends Record<string, any>>({
  onSubmit,
  children,
  ...formProps
}: FormProps<TFormValues>) => {
  const { t } = useTranslation();
  const [hasServerError, setHasServerError] = useState(false);
  const methods = useForm<TFormValues>(formProps);

  const { handleSubmit, register, control, formState } = methods;

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
    <form
      onSubmit={(event) => handleSubmit(_onSubmit)(event).catch(_onError)}
      className="relative"
    >
      {formState.isSubmitting && (
        <div className="absolute z-10 h-full w-full flex-1 flex-col flex justify-center">
          <div className="absolute h-full w-full bg-white opacity-70" />
          <Spinner />
        </div>
      )}
      <div className="flex flex-1 flex-col space-y-6">
        {hasServerError && (
          <span className="text-center text-red-500">{t('errors.server')}</span>
        )}
        {Children.map(children, (child) => {
          return child.props.name
            ? createElement(child.type, {
                ...{
                  ...child.props,
                  key: child.props.name,
                  register,
                  control,
                },
              })
            : child;
        })}
      </div>
    </form>
  );
};
