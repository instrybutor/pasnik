import { Dialog } from '@headlessui/react';
import { PropsWithChildren } from 'react';

/* eslint-disable-next-line */
export interface ModalTitleProps {}

export function ModalTitle({ children }: PropsWithChildren<ModalTitleProps>) {
  return (
    <div className="sm:flex sm:items-center">
      <div className="mt-3 text-center sm:mt-0 mb-5 sm:text-left items-center">
        <Dialog.Title
          as="h3"
          className="text-lg leading-6 font-medium text-gray-900"
        >
          {children}
        </Dialog.Title>
      </div>
    </div>
  );
}
