import { useCallback, useEffect, useRef } from 'react';
import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import {
  CreateWorkspaceDto,
  updateWorkspaceValidator,
  WorkspaceModel,
  WorkspacePrivacy,
} from '@pasnik/api/data-transfer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useWorkspaceUpdateMutation } from '../mutations';
import { Drawer } from '@pasnik/components';

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

  const updateWorkspace = useWorkspaceUpdateMutation(workspace.slug);
  const nameInputLabel = useRef(null);

  useEffect(() => {
    if (isOpen) {
      reset({
        name: workspace.name,
        privacy: workspace.privacy,
      });
    }
  }, [isOpen, reset, workspace]);

  const onSubmit = useCallback(
    (data: CreateWorkspaceDto) => {
      updateWorkspace.mutateAsync(data).then(onSuccess);
    },
    [updateWorkspace, onSuccess]
  );

  return (
    <Drawer show={isOpen} onClose={onCancel} initialFocus={nameInputLabel}>
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
              <p className="text-sm text-cyan-300" />
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
                      <div className="relative flex items-start">
                        <div className="absolute flex items-center h-5">
                          <input
                            {...register('privacy')}
                            id="privacy-private-to-project"
                            type="radio"
                            className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"
                            value={WorkspacePrivacy.PrivateToMembers}
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
                            Tylko członkowie tej przestrzeni mają do niej
                            dostęp.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="relative flex items-start">
                        <div className="absolute flex items-center h-5">
                          <input
                            {...register('privacy')}
                            id="privacy-private"
                            type="radio"
                            className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"
                            value={WorkspacePrivacy.PrivateToYou}
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
            disabled={updateWorkspace.isLoading}
            className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Zapisz
          </button>
        </div>
      </form>
    </Drawer>
  );
};
