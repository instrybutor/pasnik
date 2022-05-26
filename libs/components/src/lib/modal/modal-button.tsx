import React, { ReactElement, useCallback, useState } from 'react';
import { ModalContainer } from './modal-container';

export interface ModalProps {
  close: () => void;
}

export interface ModalButtonProps extends React.HTMLProps<HTMLButtonElement> {
  modal: (props: ModalProps) => ReactElement;
  type?: 'submit' | 'button';
}

export const ModalButton = React.forwardRef<
  HTMLButtonElement,
  ModalButtonProps
>(({ modal, ...props }, ref) => {
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
        children={modal({ close: closeModal })}
      />
      <button ref={ref} onClick={() => setIsOpen(true)} {...props} />
    </>
  );
});

export default ModalButton;
