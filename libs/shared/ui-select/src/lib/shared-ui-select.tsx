import React, { Fragment } from 'react';
import { Listbox, Portal, Transition } from '@headlessui/react';
import { usePopper } from 'react-popper';
import classNames from 'classnames';

export interface Props<T extends unknown> {
  items: T[];
  selected?: T;
  keyExtraction?(item: T): string;
  onSelect(item: T): void;
  children: React.ReactChildren | React.ReactChild;
  renderItem({
    selected,
    active,
    item,
  }: {
    selected: boolean;
    active: boolean;
    item: T;
  }): JSX.Element;
}

export const Select = <T extends unknown>({
  selected,
  onSelect,
  items,
  children,
  renderItem,
}: Props<T>) => {
  const popperElRef = React.useRef<HTMLDivElement>(null);
  const [targetElement, setTargetElement] = React.useState<HTMLElement | null>(
    null
  );
  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(targetElement, popperElement, {
    placement: 'bottom-start',
  });

  const onOpen = React.useCallback(
    () => setPopperElement(popperElRef.current),
    []
  );

  const onClose = React.useCallback(() => setPopperElement(null), []);

  return (
    <Listbox value={selected} onChange={onSelect}>
      <div className="relative">
        <Listbox.Button
          ref={setTargetElement}
          className={classNames(
            'relative bg-white text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 rounded-full w-8'
          )}
        >
          {children}
        </Listbox.Button>

        <Portal>
          <div ref={popperElRef} style={styles.popper} {...attributes.popper}>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              beforeEnter={onOpen}
              afterLeave={onClose}
            >
              <Listbox.Options className="flex flex-col absolute z-10 mt-1 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {items.map((item, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-cyan-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9',
                        'w-60'
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) =>
                      renderItem({ selected, active, item })
                    }
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Portal>
      </div>
    </Listbox>
  );
};

export default Select;
