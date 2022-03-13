import { CheckIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import { ButtonHTMLAttributes, useCallback, useRef, useState } from 'react';

export type ConfirmButtonProps = {
  color?: 'red' | 'green';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function ConfirmButton({ onClick, ...props }: ConfirmButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isConfirm, setIsConfirm] = useState(false);
  const confirmClick = useCallback(
    (event) => {
      setIsConfirm(false);
      onClick && onClick(event);
      btnRef?.current?.focus();
    },
    [btnRef, onClick, setIsConfirm]
  );
  const denyClick = useCallback(() => {
    setIsConfirm(false);
    setTimeout(() => {
      btnRef?.current?.focus();
    }, 0);
  }, [btnRef, setIsConfirm]);

  return (
    <div className="inline-flex gap-2 relative">
      {isConfirm ? (
        <>
          <button
            type="button"
            onClick={confirmClick}
            className="absolute right-10 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            autoFocus={true}
            onClick={denyClick}
            type="button"
            className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <XIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </>
      ) : (
        <button ref={btnRef} onClick={() => setIsConfirm(true)} {...props} />
      )}
    </div>
  );
}
