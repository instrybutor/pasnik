import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLayoutStore } from '../layout.store';
import { PlusIcon, XIcon } from '@heroicons/react/outline';
import { useAddWorkspace } from './add-workspace.hook';
import {
  Controller,
  FieldArrayWithId,
  useFieldArray,
  useWatch,
} from 'react-hook-form';
import { AddWorkspaceMemberItem } from '../add-workspace-member-item/add-workspace-member-item';
import {
  CreateWorkspaceDto,
  UserModel,
  WorkspaceUserRole,
} from '@pasnik/api/data-transfer';
import { Control } from 'react-hook-form/dist/types/form';
import { useUserStore } from '@pasnik/store';
import { SelectUserDropdown } from '../select-user-dropdown/select-user-dropdown';

export interface _AddWorkspaceModalProps {
  control: Control<CreateWorkspaceDto>;
  index: number;
  field: FieldArrayWithId<CreateWorkspaceDto, 'members', 'id'>;
  remove: (index: number) => void;
}

const ConditionalInput = ({
  control,
  index,
  field: f,
  remove,
}: _AddWorkspaceModalProps) => {
  const value = useWatch({
    name: 'members',
    control,
  });

  return (
    <Controller
      control={control}
      name={`members.${index}.role`}
      render={({ field }) => (
        <AddWorkspaceMemberItem
          createUserDto={value?.[index]}
          onRemove={() => {
            remove(index);
          }}
          onRoleChange={(role) => {
            field.onChange(role);
            console.log(field);
          }}
        />
      )}
    />
  );
};

export const AddWorkspaceModal = (_: AddWorkspaceModalProps) => {
  const isOpen = useLayoutStore((store) => store.addWorkspaceModalOpen);
  const { hideAddWorkspaceModal } = useLayoutStore();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, onSubmit, control } = useAddWorkspace();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  });
  const nameInput = register('name');
  nameInput.ref(nameInputRef);

  const users = useUserStore(({ users }) => users);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-20"
        onClose={hideAddWorkspaceModal}
        initialFocus={nameInputRef}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 pr-16 max-w-full left-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="w-screen max-w-md">
                <form
                  className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="flex-1 h-0 overflow-y-auto">
                    <div className="py-6 px-4 bg-cyan-700 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-medium text-white">
                          Nowa przestrzeń
                        </Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="bg-cyan-700 rounded-md text-cyan-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={hideAddWorkspaceModal}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-cyan-300">
                          Utwórz nową przestrzeń podając jej nazwę oraz
                          zapraszając użytkowników
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="px-4 divide-y divide-gray-200 sm:px-6">
                        <div className="space-y-6 pt-6 pb-5">
                          <div>
                            <label
                              htmlFor="project-name"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Nazwa
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                className="block w-full shadow-sm sm:text-sm focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 rounded-md"
                                {...nameInput}
                                ref={nameInputRef}
                              />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              Członkowie
                            </h3>
                            <ul className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                              {fields.map((field, index) => (
                                <section key={field.id}>
                                  <ConditionalInput
                                    {...{ control, index, field, remove }}
                                  />
                                </section>
                              ))}
                              <li className="py-2 flex justify-between items-center">
                                <SelectUserDropdown
                                  users={users}
                                  onSelect={(user: UserModel) => {
                                    append({
                                      userId: user.id,
                                      role: WorkspaceUserRole.User,
                                    });
                                  }}
                                >
                                  <button
                                    type="button"
                                    className="group -ml-1 bg-white p-1 rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                  >
                                    <span className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                    <span className="ml-4 text-sm font-medium text-cyan-600 group-hover:text-cyan-500">
                                      Dodaj
                                    </span>
                                  </button>
                                </SelectUserDropdown>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 px-4 py-4 flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                      onClick={hideAddWorkspaceModal}
                    >
                      Anuluj
                    </button>
                    <button
                      type="submit"
                      className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    >
                      Zapisz
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
