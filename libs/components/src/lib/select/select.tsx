import React, { PropsWithChildren } from 'react';
import { Listbox } from '@headlessui/react';
import classNames from 'classnames';
import { CheckIcon } from '@heroicons/react/outline';
import { Float } from '@headlessui-float/react';

export interface Props<T> {
  items: T[];
  selected?: T;
  keyExtraction(item: T): string;
  onSelect(item: T): void;
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

export const Select = <T,>({
  selected: selectedItem,
  onSelect,
  items,
  keyExtraction,
  children,
  renderItem,
}: PropsWithChildren<Props<T>>) => {
  const isElementSelected = React.useCallback(
    (item: T) =>
      selectedItem
        ? keyExtraction(selectedItem) === keyExtraction(item)
        : false,
    [selectedItem, keyExtraction]
  );

  return (
    <Listbox value={selectedItem} onChange={onSelect}>
      <Float
        placement="bottom-start"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        portal
      >
        <Listbox.Button
          className={classNames(
            'relative bg-white text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 rounded-full w-8'
          )}
        >
          {children}
        </Listbox.Button>

        <Listbox.Options className="flex flex-col absolute z-10 mt-1 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {items.map((item, index) => (
            <Listbox.Option
              key={keyExtraction ? keyExtraction(item) : index}
              className={({ active }) =>
                classNames(
                  active ? 'text-white bg-cyan-600' : 'text-gray-900',
                  'cursor-default select-none relative py-2 px-3 w-60 flex'
                )
              }
              value={item}
            >
              {({ selected, active }) => (
                <>
                  <div className="flex flex-1">
                    {renderItem({ selected, active, item })}
                  </div>
                  {isElementSelected(item) ? (
                    <CheckIcon
                      className={classNames(
                        'w-6 h-6 ',
                        active ? 'text-white' : 'text-slate-600'
                      )}
                    />
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Float>
    </Listbox>
  );
};

export default Select;
