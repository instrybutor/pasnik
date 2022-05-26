import { SubmitHandler, useForm, UseFormProps } from 'react-hook-form';
import { Children, createElement, ReactElement } from 'react';

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
  const methods = useForm<TFormValues>(formProps);
  const { handleSubmit, register, control } = methods;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-1 flex-col space-y-6"
    >
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
    </form>
  );
};
