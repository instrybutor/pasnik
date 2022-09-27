import { Fragment, PropsWithChildren, useContext } from 'react';
import { FloatingPortal } from '@floating-ui/react-dom-interactions';

import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { ModalContext } from './modal-context';

export const ModalContainer = ({ children }: PropsWithChildren) => {
  const { closeModal, afterClose, isOpen } = useContext(ModalContext);
  return (
    <FloatingPortal>
      <Transition.Root
        show={isOpen}
        as={Fragment}
        afterLeave={afterClose}
        appear={true}
      >
        <Dialog
          static={true}
          as="div"
          className="fixed z-20 inset-0 overflow-y-auto"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="flex sm:items-end justify-center min-h-screen xsm:pt-4 xsm:px-4 sm:pb-20 xsm:pb-4 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 xsm:translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 xsm:translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 xsm:translate-y-0 sm:scale-100"
              leaveTo="opacity-0 xsm:translate-y-4 xsm:translate-y-0 sm:scale-95"
            >
              <div className="inline-flex flex-col align-bottom bg-white xsm:rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full sm:p-6">
                {children}
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
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </FloatingPortal>
  );
};
