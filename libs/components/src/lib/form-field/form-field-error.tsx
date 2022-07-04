import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';

export interface FormFieldErrorProps {
  message: string;
}

export function FormFieldError({ message }: FormFieldErrorProps) {
  const { t } = useTranslation();
  const translate = useCallback(
    (_msg: string) => {
      const [msg, par] = _msg.split('::');
      const params = par ? JSON.parse(par) : undefined;

      return t(msg, params);
    },
    [t]
  );

  return <>{translate(message)}</>;
}
