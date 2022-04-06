import { Drawer } from '@pasnik/components';
import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

export interface DrawerWithHeadingChildrenProps {
  lock: (locked: boolean) => void;
}

export interface CreateWorkspaceDrawerProps {
  onClose: () => void;
  show: boolean;
  title: ReactNode;
  subtitle?: ReactNode;
  children: FunctionComponent<DrawerWithHeadingChildrenProps>;
}

export const DrawerWithHeading = ({
  show,
  onClose,
  title,
  subtitle,
  children,
}: CreateWorkspaceDrawerProps) => {
  const [isLocked, setIsLocked] = useState(false);

  const _onClose = useCallback(() => {
    if (isLocked) {
      return;
    }
    onClose();
  }, [onClose, isLocked]);

  useEffect(() => {
    if (!show) {
      setIsLocked(false);
    }
  }, [show]);

  return (
    <Drawer show={show} onClose={_onClose}>
      <div className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="py-6 px-4 bg-cyan-700 sm:px-6">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-lg font-medium text-white">
                {title}
              </Dialog.Title>
              {!isLocked && (
                <div className="ml-3 h-7 flex items-center">
                  <button
                    type="button"
                    className="bg-cyan-700 rounded-md text-cyan-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    onClick={onClose}
                  >
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
            {subtitle && (
              <div className="mt-1">
                <p className="text-sm text-cyan-300">{subtitle}</p>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            {children({ lock: setIsLocked })}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
