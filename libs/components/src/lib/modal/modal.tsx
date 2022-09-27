import { Fragment, PropsWithChildren, useContext } from 'react';
import { ModalTitle } from './modal-title';
import { ModalFooter } from './modal-footer';
import { ModalContext } from './modal-context';
import { FloatingPortal } from '@floating-ui/react-dom-interactions';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { ModalOverlay } from './modal-overlay';

export interface ModalProps {
  closeButton?: boolean;
  noPadding?: boolean;
  className?: string;
  maxWidthClass?: string;
}

export function Modal({
  children,
  closeButton,
  noPadding,
  className,
  maxWidthClass,
}: PropsWithChildren<ModalProps>) {
  const { closeModal, afterClose, beforeOpen, isOpen } =
    useContext(ModalContext);
  return (
    <FloatingPortal>
      <Transition.Root
        show={isOpen}
        as={Fragment}
        beforeEnter={beforeOpen}
        appear={true}
      >
        <Dialog
          static={true}
          as="div"
          className="fixed z-20 inset-0 overflow-hidden"
          onClose={closeModal}
        >
          <ModalOverlay />
          <div className="flex sm:items-end justify-center min-h-screen xsm:pt-4 xsm:px-4 sm:pb-20 xsm:pb-4 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              afterLeave={afterClose}
              enter="ease-out duration-300"
              enterFrom="opacity-0 xsm:translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 xsm:translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 xsm:translate-y-0 sm:scale-100"
              leaveTo="opacity-0 xsm:translate-y-4 xsm:translate-y-0 sm:scale-95"
            >
              <div
                className={classNames(
                  'inline-flex flex-col align-bottom bg-white xsm:rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full',
                  {
                    'px-4 pt-5 pb-4 sm:p-6': !noPadding,
                    'sm:max-w-lg': !maxWidthClass,
                  },
                  maxWidthClass,
                  className
                )}
              >
                {children}
                {closeButton !== false && (
                  <div className="block absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                      onClick={closeModal}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </FloatingPortal>
  );
}

Modal.Title = ModalTitle;
Modal.Footer = ModalFooter;
