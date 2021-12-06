import { Fragment, useCallback, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import {
  CreateWorkspaceDto,
  updateWorkspaceValidator,
  WorkspaceModel,
  WorkspacePrivacy,
} from '@pasnik/api/data-transfer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useWorkspaceStore } from '../workspace.store';

export interface UpdateWorkspaceDrawerProps {
  workspace: WorkspaceModel;
  isOpen: boolean;
  onSuccess: (workspace: WorkspaceModel) => void;
  onCancel: () => void;
}

export const UpdateWorkspaceDrawer = ({
  workspace,
  onCancel,
  onSuccess,
  isOpen,
}: UpdateWorkspaceDrawerProps) => {
  const { register, handleSubmit, reset } = useForm<CreateWorkspaceDto>({
    resolver: yupResolver(updateWorkspaceValidator),
    defaultValues: {
      name: workspace.name,
      privacy: workspace.privacy,
    },
  });

  const { updateWorkspace } = useWorkspaceStore();
  const nameInputLabel = useRef(null);

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = useCallback(
    (data: CreateWorkspaceDto) => {
      updateWorkspace(workspace, data).then(onSuccess);
    },
    [updateWorkspace, onSuccess, workspace]
  );

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-20"
        onClose={onCancel}
        initialFocus={nameInputLabel}
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
                          Edytuj przestrzeń
                        </Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="bg-cyan-700 rounded-md text-cyan-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={onCancel}
                          >
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-cyan-300"></p>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="px-4 divide-y divide-gray-200 sm:px-6">
                        <div className="space-y-6 pt-6 pb-5">
                          <div>
                            <label
                              htmlFor="workspace-name"
                              className="block text-sm font-medium text-gray-900"
                              ref={nameInputLabel}
                            >
                              Nazwa
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="workspace-name"
                                className="block w-full shadow-sm sm:text-sm focus:ring-cyan-500 focus:border-cyan-500 border-gray-300 rounded-md"
                                {...register('name')}
                              />
                            </div>
                          </div>
                          <fieldset>
                            <legend className="text-sm font-medium text-gray-900">
                              Prywatność
                            </legend>
                            <div className="mt-2 space-y-5">
                              <div className="relative flex items-start">
                                <div className="absolute flex items-center h-5">
                                  <input
                                    {...register('privacy')}
                                    id="privacy-public"
                                    aria-describedby="privacy-public-description"
                                    type="radio"
                                    className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"
                                    value={WorkspacePrivacy.Public}
                                  />
                                </div>
                                <div className="pl-7 text-sm">
                                  <label
                                    htmlFor="privacy-public"
                                    className="font-medium text-gray-900"
                                  >
                                    Publiczna
                                  </label>
                                  <p
                                    id="privacy-public-description"
                                    className="text-gray-500"
                                  >
                                    Każdy z linkiem może widzieć tą przestrzeń.
                                  </p>
                                </div>
                              </div>
                              <div>
                                <div className="relative flex items-start opacity-50">
                                  <div className="absolute flex items-center h-5">
                                    <input
                                      disabled={true}
                                      id="privacy-private-to-project"
                                      aria-describedby="privacy-private-to-project-description"
                                      type="radio"
                                      className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"
                                      value={WorkspacePrivacy.PrivateToMembers}
                                      {...register('privacy')}
                                    />
                                  </div>
                                  <div className="pl-7 text-sm">
                                    <label
                                      htmlFor="privacy-private-to-project"
                                      className="font-medium text-gray-900"
                                    >
                                      Prywatna dla członków
                                    </label>
                                    <p
                                      id="privacy-private-to-project-description"
                                      className="text-gray-500"
                                    >
                                      Tylko członkowie tej przestrzeni mają do
                                      niej dostęp.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="relative flex items-start opacity-50">
                                  <div className="absolute flex items-center h-5">
                                    <input
                                      disabled={true}
                                      id="privacy-private"
                                      aria-describedby="privacy-private-to-project-description"
                                      type="radio"
                                      className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"
                                      value={WorkspacePrivacy.PrivateToYou}
                                      {...register('privacy')}
                                    />
                                  </div>
                                  <div className="pl-7 text-sm">
                                    <label
                                      htmlFor="privacy-private"
                                      className="font-medium text-gray-900"
                                    >
                                      Prywatna dla ciebie
                                    </label>
                                    <p
                                      id="privacy-private-description"
                                      className="text-gray-500"
                                    >
                                      Tylko ty masz dostęp do tej przestrzeni.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </fieldset>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 px-4 py-4 flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                      onClick={onCancel}
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
