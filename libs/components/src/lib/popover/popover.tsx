import { Popover as HeadlessPopover } from '@headlessui/react';
import {
  MutableRefObject,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';
import { Float } from '@headlessui-float/react';

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
  return (
    <HeadlessPopover className="relative">
      <Float
        placement="bottom"
        shift={true}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
        portal
      >
        <HeadlessPopover.Button className={className}>
          {children}
        </HeadlessPopover.Button>
        <HeadlessPopover.Panel
          static={true}
          children={panel}
          className="bg-white rounded-lg"
        />
      </Float>
    </HeadlessPopover>
  );
}

Popover.Group = HeadlessPopover.Group;
