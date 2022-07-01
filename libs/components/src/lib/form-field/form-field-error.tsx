import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export interface FormFieldErrorProps {
  message: string;
}

export function FormFieldError({ message }: FormFieldErrorProps) {
  const { t } = useTranslation();
  const translate = useCallback(
    (message: string) => {
      const [msg, par] = message.split('::');
      const params = par ? JSON.parse(par) : undefined;

      return t(msg, params);
    },
    [t]
  );

  return <>{translate(message)}</>;
}
