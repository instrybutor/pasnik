import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { Fragment, MouseEvent, Suspense, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { WorkspaceModel } from '@pasnik/api/data-transfer';
import { useCurrentWorkspace, useWorkspaces } from '../queries';
import { Can, WorkspacesAction } from '@pasnik/ability';

export interface SelectWorkspaceProps {
  onAddClick: () => void;
  onChange: (workspace: WorkspaceModel) => void;
}

export function SelectWorkspaceDropdown({
  onAddClick,
  onChange,
}: SelectWorkspaceProps) {
  const currentWorkspace = useCurrentWorkspace();
  const { data: workspaces } = useWorkspaces();
  const refButton = useRef<HTMLButtonElement | null>(null);

  const onClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button === 0 && event.ctrlKey) {
      event.stopPropagation();
    }
  }, []);

  const onClickCapture = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button === 0) {
      event.nativeEvent.preventDefault();
    }
  }, []);

  return (
    <Suspense fallback="Ładowanie">
      <Listbox onChange={onChange} value={currentWorkspace}>
        {({ open }) => (
          <>
            <Listbox.Label className="flex justify-between w-full text-sm font-medium text-white pl-3 pr-2">
              Przestrzenie robocze
            </Listbox.Label>
            <div className="mt-1 relative">
              <Listbox.Button
                ref={refButton}
                className="bg-white relative w-full bg-cyan-800 rounded-md pl-3 pr-10 py-3 text-left text-white hover:bg-cyan-800 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
              >
                <Suspense fallback="Ładowanie">
                  <span className="block truncate">
                    {currentWorkspace?.name ?? 'Wybierz przestrzeń'}
                  </span>
                </Suspense>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-200"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  as="div"
                  static={true}
                  className="focus:outline-none absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 sm:text-sm flex flex-col divide-y divide-gray-200"
                >
                  <div className="overflow-auto">
                    {workspaces?.map((workspace) => (
                      <Listbox.Option
                        as="a"
                        key={workspace.id}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-cyan-600' : 'text-gray-900',
                            'cursor-pointer select-none relative py-2 pl-3 pr-9 block'
                          )
                        }
                        value={workspace}
                        href={`/workspace/${workspace.slug}`}
                        onClickCapture={onClickCapture}
                        onClick={onClick}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? 'font-semibold' : 'font-normal',
                                'block truncate'
                              )}
                            >
                              {workspace.name}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? 'text-white' : 'text-cyan-600',
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
                  </div>
                  <Can I={WorkspacesAction.Create} a="WorkspaceModel">
                    <button
                      onClick={() => {
                        onAddClick();
                        refButton.current?.click(); // nasty hack to close listbox
                      }}
                      className="relative py-2 pl-3 text-left pr-9 hover:bg-cyan-700 hover:text-white w-full focus:outline-none"
                    >
                      Dodaj przestrzeń
                    </button>
                  </Can>
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </Suspense>
  );
}
