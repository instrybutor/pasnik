import { ForwardedRef, ReactElement, useCallback, useState } from 'react';
import { Button, ButtonProps } from '../button';
import { ModalContext } from './modal-context';

export interface ModalButtonProps<T extends ReactElement>
  extends Omit<ButtonProps, 'onClick'> {
  modal: ReactElement;
  onClose?: (data?: unknown) => void;
  type?: 'submit' | 'button';
  props?: T['props'];
  ref?: ForwardedRef<HTMLButtonElement>;
}

export const ModalButton = <T extends ReactElement>({
  modal,
  props,
  onClose,
  ...buttonProps
}: ModalButtonProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const closeModal = useCallback(
    (data: unknown) => {
      setIsOpen(false);
      onClose?.(data);
    },
    [onClose]
  );
  return (
    <>
      <ModalContext.Provider
        value={{
          isOpen,
          closeModal,
          afterClose: () => {
            setIsOpen(false);
            setShowContent(false);
          },
          beforeOpen: () => {
            console.log('elo');
            setShowContent(true);
          },
        }}
      >
        {showContent && modal}
      </ModalContext.Provider>
      <Button
        onClick={() => {
          setIsOpen(true);
          setShowContent(true);
        }}
        {...buttonProps}
      />
    </>
  );
};
