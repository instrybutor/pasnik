import { ToastContainer as ToastifyContainer } from 'react-toastify';
import { CloseButtonProps } from 'react-toastify/dist/components';
import { XIcon } from '@heroicons/react/outline';

const CloseButton = ({ closeToast }: CloseButtonProps) => {
  return (
    <div className="flex-shrink-0 flex">
      <button
        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        onClick={closeToast}
      >
        <span className="sr-only">Close</span>
        <XIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export function ToastContainer() {
  return (
    <ToastifyContainer
      toastClassName="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden p-4 flex items-start"
      bodyClassName="w-0 flex-1 p-0"
      closeButton={CloseButton}
    />
  );
}
