import React, {
  ForwardedRef,
  ReactElement,
  useCallback,
  useState,
} from 'react';
import { ModalContainer } from './modal-container';

export type ModalProps<T> = T & {
  close: () => void;
};

export interface ModalButtonProps<T extends ReactElement>
  extends React.HTMLProps<HTMLButtonElement> {
  modal: (props: ModalProps<T['props']>) => ReactElement;
  type?: 'submit' | 'button';
  props?: T['props'];
}

export const ModalButton = React.forwardRef(
  <T extends ReactElement>(
    { modal, props, ...buttonProps }: ModalButtonProps<T>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
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
        <button ref={ref} onClick={() => setIsOpen(true)} {...buttonProps} />
      </>
    );
  }
);

export default ModalButton;
