import { Fragment, useCallback, useEffect, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { CheckIcon, SelectorIcon } from '@heroicons/react/outline';
import { Listbox, Transition } from '@headlessui/react';

import { WorkspaceUserModel } from '@pasnik/api/data-transfer';
import { UserAvatar, UserInfo, UserName } from '@pasnik/components';
import {
  flip,
  FloatingPortal,
  size,
} from '@floating-ui/react-dom-interactions';
import { autoUpdate, shift, useFloating } from '@floating-ui/react-dom';

export interface SelectWorkspaceUserProps {
  setUser: (userId: number) => void;
  userId?: number;
  users: WorkspaceUserModel[];
}

export function SelectWorkspaceUser({
  userId,
  users,
  setUser,
}: SelectWorkspaceUserProps) {
  const { t } = useTranslation();
  const setPayerHandler = useCallback(
    (newPayer: WorkspaceUserModel) => {
      if (newPayer.id !== userId) {
        setUser(newPayer.id);
      }
    },
    [setUser, userId]
  );

  const popperElRef = useRef<HTMLDivElement>(null);

  const { x, y, strategy, reference, floating, update, refs } = useFloating({
    placement: 'bottom',
    middleware: [
      flip(),
      shift({ padding: 5 }),
      size({
        apply({ reference }) {
          if (popperElRef.current) {
            Object.assign(popperElRef.current.style, {
              width: `${reference.width}px`,
            });
          }
        },
      }),
    ],
  });

  const user = useMemo(() => {
    return users.find((user) => user.id === userId);
  }, [users, userId]);

  useEffect(() => {
    if (!refs.reference.current || !refs.floating.current) {
      return;
    }

    return autoUpdate(refs.reference.current, refs.floating.current, update);
  }, [refs.reference.current, refs.floating.current, update]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex items-center">
      <Listbox value={user} onChange={setPayerHandler}>
        <div className="relative flex-1">
          <Listbox.Button
            ref={reference}
            className="focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 border relative w-full bg-white rounded-md pl-3 pr-10 py-1 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
          >
            <div className="flex items-center">
              <UserAvatar user={user?.user} size="sm" />
              <div className="ml-3 truncate">
                <UserName
                  user={user?.user}
                  fallbackValue={t('dish.paying.pick_payer')}
                />
              </div>
            </div>
            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <FloatingPortal>
            <div
              ref={popperElRef}
              style={{
                position: strategy,
                top: y ?? '',
                left: x ?? '',
                zIndex: '30',
              }}
            >
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                beforeEnter={() => floating(popperElRef.current)}
                afterLeave={() => floating(null)}
              >
                <Listbox.Options
                  className="mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                  static={true}
                >
                  {users.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-cyan-600' : 'text-gray-900',
                          'cursor-default select-none relative py-2 pl-3 pr-9'
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <div
                            className={classNames(
                              {
                                'font-semibold': selected,
                                'font-normal': !selected,
                              },
                              'flex items-center'
                            )}
                          >
                            <UserInfo user={person.user} size="xsm" />
                          </div>

                          {selected ? (
                            <span
                              className={classNames(
                                {
                                  'text-white': active,
                                  'text-cyan-600': !active,
                                },
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </FloatingPortal>
        </div>
      </Listbox>
    </div>
  );
}
