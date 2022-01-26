import { Popover as HeadlessPopover, Transition } from '@headlessui/react';
import {
  Fragment,
  FunctionComponent,
  MutableRefObject,
  PropsWithChildren,
  useRef,
  useState,
} from 'react';
import { usePopper } from 'react-popper';
import { Portal } from 'react-portal';

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
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom',
  });

  return (
    <HeadlessPopover className="relative">
      <HeadlessPopover.Button className={className} ref={setReferenceElement}>
        {children}
      </HeadlessPopover.Button>

      <Portal>
        <div ref={popperElRef} style={styles.popper} {...attributes.popper}>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
            beforeEnter={() => setPopperElement(popperElRef.current ?? null)}
            afterLeave={() => setPopperElement(null)}
          >
            <HeadlessPopover.Panel
              focus={true}
              unmount={false}
              children={panel}
              className="bg-white px-4 sm:px-0 rounded-lg"
            />
          </Transition>
        </div>
      </Portal>
    </HeadlessPopover>
  );
}
