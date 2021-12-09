import { PlusIcon } from '@heroicons/react/outline';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { WorkspaceUserInvitePopover } from '../workspace-user-invite-popover/workspace-user-invite-popover';

export function WorkspaceUserInviteButton() {
  return (
    <Popover className="relative flex flex-col items-center group">
      <Popover.Button className="ml-2 flex-shrink-0 bg-white inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-200 text-gray-400 hover:text-gray-500 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
        <span className="sr-only">Add team member</span>
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-30 w-screen bg-white px-4 mt-3 top-full transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-sm">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 flex flex-wrap p-4 gap-2">
            <WorkspaceUserInvitePopover />
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
