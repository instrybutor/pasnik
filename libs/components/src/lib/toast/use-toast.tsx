import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/outline';
import { ReactElement, useCallback } from 'react';
import { toast as toastify, ToastOptions } from 'react-toastify';

export interface ToastProps {
  title: string;
  subTitle?: string | ReactElement;
  type?: 'success' | 'error';
}

const ToastComponent = ({ title, subTitle, type }: ToastProps) => (
  <div className="flex gap-3">
    {type && (
      <div className="flex-shrink-0">
        {type === 'success' ? (
          <CheckCircleIcon className="h-6 w-6 text-green-400" />
        ) : type === 'error' ? (
          <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
        ) : null}
      </div>
    )}
    <div className="w-0 flex-1 pt-0.5">
      <p className="text-sm font-bold text-gray-900">{title}</p>
      {subTitle && <p className="mt-1 text-sm text-gray-500">{subTitle}</p>}
    </div>
  </div>
);

export function useToast() {
  const toast = useCallback(
    ({ title, subTitle, type, ...options }: ToastProps & ToastOptions) => {
      const toastFn =
        type === 'success'
          ? toastify.success
          : type === 'error'
          ? toastify.error
          : toastify;
      toastFn(<ToastComponent title={title} subTitle={subTitle} />, options);
    },
    []
  );
  return {
    toast,
  };
}
