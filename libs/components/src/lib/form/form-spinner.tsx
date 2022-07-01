import { Spinner, SpinnerProps } from '../spinner';
import { useFormState } from 'react-hook-form';

export interface FormSpinnerProps {
  className?: string;
}

export function FormSpinner({
  className,
  ...props
}: SpinnerProps & FormSpinnerProps) {
  const { isSubmitting } = useFormState();
  if (!isSubmitting) {
    return null;
  }
  return (
    <div className="absolute z-10 inset-0 flex-1 flex-col flex justify-center">
      <div className="absolute inset-0 bg-white opacity-70" />
      <Spinner {...props} />
    </div>
  );
}
