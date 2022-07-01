import { PropsWithChildren } from 'react';
import { ModalTitle } from './modal-title';

export function Modal({ children }: PropsWithChildren<any>) {
  return children;
}

Modal.Title = ModalTitle;
