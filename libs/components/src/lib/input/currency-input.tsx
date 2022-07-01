import React, {
  ChangeEventHandler,
  FocusEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FormFieldInputProps } from '../form-field';
import Input from './input';

export const CurrencyInput = React.forwardRef<
  HTMLInputElement,
  FormFieldInputProps
>(({ value, onBlur, onFocus, onChange, ref, ...props }) => {
  const [_value, setValue] = useState<string | undefined>(String(value));
  const [hasFocus, setHasFocus] = useState(false);
  const _onBlur: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setHasFocus(false);
      return onBlur?.(e);
    },
    [setHasFocus, onBlur]
  );
  const _onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onChange?.(e);
      setValue(e.currentTarget.value);
    },
    [onChange, setValue]
  );
  const _onFocus: FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setHasFocus(true);
      e.target.select();
      onFocus?.(e);
    },
    [setHasFocus, onFocus]
  );
  useEffect(() => {
    if (!hasFocus) {
      setValue(String(value));
    }
  }, [value, setValue, hasFocus]);
  return (
    <Input
      onBlur={_onBlur}
      onFocus={_onFocus}
      value={_value}
      onChange={_onChange}
      {...props}
    />
  );
});

export default CurrencyInput;
