import { ForwardedRef, ReactElement, useCallback, useState } from 'react';
import { ModalContainer } from './modal-container';
import { Button, ButtonProps } from '../button';

export type ModalProps<T> = T & {
  close: () => void;
};

export interface ModalButtonProps<T extends ReactElement>
  extends Omit<ButtonProps, 'onClick'> {
  modal: (props: ModalProps<T['props']>) => ReactElement;
  type?: 'submit' | 'button';
  props?: T['props'];
  ref?: ForwardedRef<HTMLButtonElement>;
}

export const ModalButton = <T extends ReactElement>({
  modal,
  props,
  ...buttonProps
}: ModalButtonProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  return (
    <>
      <ModalContainer
        isOpen={isOpen}
        closeModal={closeModal}
        afterClose={() => setIsOpen(false)}
        children={modal({
          close: closeModal,
          ...props,
        })}
      />
      <Button onClick={() => setIsOpen(true)} {...buttonProps} />
    </>
  );
};
