import { CheckIcon } from '@heroicons/react/outline';
import { XIcon } from '@heroicons/react/solid';
import {
  FocusEvent,
  forwardRef,
  MouseEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Button, ButtonProps } from '../button';

export const ConfirmButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, ...props }: ButtonProps, ref) => {
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const [isConfirm, setIsConfirm] = useState(false);
    const focusPrevButton = useCallback(() => {
      btnRef?.current?.focus();
    }, [btnRef]);
    const confirmClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        setIsConfirm(false);
        onClick && onClick(event);
        focusPrevButton();
      },
      [focusPrevButton, onClick, setIsConfirm]
    );
    const denyClick = useCallback(() => {
      setIsConfirm(false);
      setTimeout(() => {
        focusPrevButton();
      }, 0);
    }, [focusPrevButton, setIsConfirm]);

    const onBlur = useCallback(
      (event: FocusEvent) => {
        const currentTarget = event.currentTarget as HTMLDivElement;
        const relatedTarget = event.relatedTarget as HTMLElement;
        if (!currentTarget.contains?.(relatedTarget)) {
          setIsConfirm(false);
        }
      },
      [setIsConfirm]
    );

    useLayoutEffect(() => {
      if (ref) {
        if (ref instanceof Function) {
          ref(btnRef.current);
        } else {
          (ref as any).current = btnRef.current;
        }
      }
    }, [btnRef]);

    return (
      <div className="inline-flex gap-2 relative" onBlur={onBlur}>
        {isConfirm && (
          <div className="absolute whitespace-nowrap space-x-2 flex-shrink-0 right-0">
            <Button
              type="button"
              onClick={confirmClick}
              color="warn"
              rounded="full"
              className="ml-1 p-1"
            >
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
            </Button>

            <Button
              autoFocus={true}
              onClick={denyClick}
              type="button"
              rounded="full"
              className="p-1"
            >
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        )}
        <Button
          ref={btnRef}
          onClick={(e) => {
            if (e.ctrlKey) {
              confirmClick(e);
            } else {
              setIsConfirm(true);
            }
          }}
          {...props}
        />
      </div>
    );
  }
);
