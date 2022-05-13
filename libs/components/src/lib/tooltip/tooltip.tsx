import { PropsWithChildren, ReactNode, useState } from 'react';
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  Placement,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';

export interface TooltipProps {
  title: ReactNode;
  disabled?: boolean;
  placement?: Placement;
}

export const Tooltip = ({
  children,
  title,
  disabled,
  placement = 'top',
}: PropsWithChildren<TooltipProps>) => {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [offset(5), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  return (
    <>
      <span ref={reference} {...getReferenceProps()}>
        {children}
      </span>
      <FloatingPortal>
        {open && !disabled && (
          <div
            {...getFloatingProps({
              ref: floating,
              className: 'flex flex-col items-center mb-6',
              style: {
                position: strategy,
                top: y ?? '',
                left: x ?? '',
              },
            })}
          >
            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
              {title}
            </span>
            <div className="w-3 h-3 -mt-2 transform rotate-45 bg-black" />
          </div>
        )}
      </FloatingPortal>
    </>
  );
};
