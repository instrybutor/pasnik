// import { Popover as HeadlessPopover, Transition } from '@headlessui/react';
import {
  FunctionComponent,
  MutableRefObject,
  PropsWithChildren,
  useRef,
} from 'react';
import { Portal } from 'react-portal';
import { useFloating } from '@floating-ui/react-dom';

/* eslint @typescript-eslint/no-var-requires: "off" */
const HeadlessPopover = require('@headlessui/react').Popover;
const Transition = require('@headlessui/react').Transition;

export interface PopoverPanelProps {
  open: boolean;
  close: (
    focusableElement?: HTMLElement | MutableRefObject<HTMLElement | null>
  ) => void;
}

export interface PopoverProps {
  className?: string;
  panel: FunctionComponent<PopoverPanelProps>;
}

export function Popover({
  className,
  panel,
  children,
}: PropsWithChildren<PopoverProps>) {
  const popperElRef = useRef(null);

  const { x, y, strategy, reference, floating } = useFloating({
    placement: 'bottom',
    strategy: 'absolute',
  });

  return (
    <HeadlessPopover className="relative">
      <HeadlessPopover.Button className={className} ref={reference}>
        {children}
      </HeadlessPopover.Button>

      <Portal>
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
              focus={true}
              children={panel}
              className="bg-white px-4 sm:px-0 rounded-lg"
            />
          </Transition>
        </div>
      </Portal>
    </HeadlessPopover>
  );
}
