import { Popover as HeadlessPopover, Transition } from '@headlessui/react';
import {
  MutableRefObject,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { autoUpdate, shift, useFloating } from '@floating-ui/react-dom';
import { FloatingPortal } from '@floating-ui/react-dom-interactions';

export interface PopoverPanelProps {
  open: boolean;
  close: (
    focusableElement?: HTMLElement | MutableRefObject<HTMLElement | null>
  ) => void;
}

export interface PopoverProps {
  className?: string;
  panel: ReactNode | ((props: PopoverPanelProps) => ReactElement);
}

export function Popover({
  className,
  panel,
  children,
}: PropsWithChildren<PopoverProps>) {
  const popperElRef = useRef(null);

  const { x, y, strategy, reference, floating, update, refs } = useFloating({
    placement: 'bottom',
    middleware: [shift({ padding: 5 })],
  });

  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return;
    }

    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference.current, refs.floating.current, update]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HeadlessPopover className="relative">
      <HeadlessPopover.Button className={className} ref={reference}>
        {children}
      </HeadlessPopover.Button>

      <FloatingPortal>
        <div
          ref={popperElRef}
          style={{
            position: strategy,
            top: y ?? '',
            left: x ?? '',
          }}
        >
          <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
            beforeEnter={() => floating(popperElRef.current)}
            afterLeave={() => floating(null)}
          >
            <HeadlessPopover.Panel
              static={true}
              children={panel}
              className="bg-white rounded-lg"
            />
          </Transition>
        </div>
      </FloatingPortal>
    </HeadlessPopover>
  );
}

Popover.Group = HeadlessPopover.Group;
