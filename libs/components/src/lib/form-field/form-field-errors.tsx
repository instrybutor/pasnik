import { FormFieldError } from './form-field-error';

export interface FormFieldErrorsProps {
  messages: string | string[];
}

export function FormFieldErrors({ messages }: FormFieldErrorsProps) {
  if (Array.isArray(messages)) {
    return (
      <>
        {messages.map((message) => (
          <>
            <FormFieldError message={message} />
            <br />
          </>
        ))}
      </>
    );
  }
  return <FormFieldError message={messages} />;
}
