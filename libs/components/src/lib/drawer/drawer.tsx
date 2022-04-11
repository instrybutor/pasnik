import { Fragment, MutableRefObject, PropsWithChildren, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export interface DrawerProps {
  show: boolean;
  onClose: (value: boolean) => void;
  initialFocus?: MutableRefObject<HTMLElement | null>;
}

export const Drawer = ({
  children,
  onClose,
  show,
  initialFocus,
}: PropsWithChildren<DrawerProps>) => {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <Transition.Root
      show={show}
      as={Fragment}
      beforeEnter={() => {
        setShowChildren(true);
      }}
      afterLeave={() => {
        setShowChildren(false);
      }}
    >
      <Dialog
        unmount={false}
        className="fixed inset-0 overflow-hidden z-20"
        onClose={onClose}
        initialFocus={initialFocus}
      >
        <div className="inset-0 overflow-hidden">
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

          <div className="fixed inset-y-0 pr-16 max-w-full left-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="w-screen max-w-md">
                {showChildren ? children : <div tabIndex={0} />}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
