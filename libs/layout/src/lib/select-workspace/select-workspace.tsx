import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon, CogIcon } from '@heroicons/react/outline';
import { Fragment, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { useUserStore, useWorkspaceStore } from '@pasnik/store';

export interface SelectWorkspaceProps {
  onAddClick: () => void;
}

export function SelectWorkspace({ onAddClick }: SelectWorkspaceProps) {
  const { user, changeWorkspace } = useUserStore();
  const { workspaces, fetchWorkspaces } = useWorkspaceStore();
  const selectedWorkspace = useWorkspaceStore(
    useCallback(
      ({ workspaces, ids }) => {
        if (user?.currentWorkspaceId) {
          return workspaces[ids.indexOf(user.currentWorkspaceId)];
        }
        return null;
      },
      [user?.currentWorkspaceId]
    )
  );

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  const onChange = useCallback(
    async (workspaceId: number) => {
      await changeWorkspace(workspaceId);
    },
    [changeWorkspace]
  );
  return (
    <Listbox onChange={onChange} value={user?.currentWorkspaceId}>
      {({ open }) => (
        <>
          <Listbox.Label className="flex justify-between w-full text-sm font-medium text-white pl-3 pr-2">
            Przestrzenie robocze
            <div className="self-end">
              <CogIcon className="h-5 w-5 text-gray-200" aria-hidden="true" />
            </div>
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="bg-white relative w-full bg-cyan-800 rounded-md pl-3 pr-10 py-3 text-left text-white hover:bg-cyan-800 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
              <span className="block truncate">{selectedWorkspace?.name}</span>
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
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {workspaces.map((workspace) => (
                  <Listbox.Option
                    key={workspace.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
                        'cursor-default select-none relative py-2 pl-3 pr-9'
                      )
                    }
                    value={workspace.id}
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
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
                <button
                  onClick={onAddClick}
                  className="relative py-2 pl-3 text-left pr-9 hover:bg-indigo-700 hover:text-white w-full"
                >
                  Dodaj przestrzeń
                </button>
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
