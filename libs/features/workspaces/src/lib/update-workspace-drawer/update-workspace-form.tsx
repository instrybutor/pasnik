import { useCallback, useRef } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import {
  CreateWorkspaceDto,
  updateWorkspaceValidator,
  WorkspaceModel,
  WorkspacePrivacy,
} from '@pasnik/api/data-transfer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useWorkspaceUpdateMutation } from '../mutations';
import { Can, WorkspacesAction } from '@pasnik/ability';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

export interface UpdateWorkspaceDrawerProps {
  workspace: WorkspaceModel;
  onSuccess: (workspace: WorkspaceModel) => void;
  onCancel: () => void;
  onDelete: (workspace: WorkspaceModel) => void;
  lock: (locked: boolean) => void;
}

export const UpdateWorkspaceForm = ({
  workspace,
  onCancel,
  onSuccess,
  onDelete,
  lock,
}: UpdateWorkspaceDrawerProps) => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState } = useForm<CreateWorkspaceDto>({
    resolver: yupResolver(updateWorkspaceValidator),
    defaultValues: {
      name: workspace.name,
      privacy: workspace.privacy,
    },
  });

  const updateWorkspace = useWorkspaceUpdateMutation(workspace.slug);
  const nameInputLabel = useRef(null);

  const onSubmit = useCallback(
    (data: CreateWorkspaceDto) => {
      lock(true);
      updateWorkspace
        .mutateAsync(data)
        .then(onSuccess)
        .catch(() => {
          lock(false);
        });
    },
    [updateWorkspace, onSuccess, lock]
  );

  return (
    <form className="flex-1 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-1 flex flex-col justify-between">
        <div className="px-4 divide-y divide-gray-200 sm:px-6">
          <div className="space-y-6 pt-6 pb-5">
            <div>
              <label
                htmlFor="workspace-name"
                className="block text-sm font-medium text-gray-900"
                ref={nameInputLabel}
              >
                {t('workspace.name')}
              </label>
              <div className="mt-1">
                <input
                  disabled={updateWorkspace.isLoading}
                  autoFocus={true}
                  type="text"
                  id="workspace-name"
                  className={classNames(
                    'block w-full shadow-sm sm:text-sm rounded-md',
                    {
                      'focus:ring-cyan-500 focus:border-cyan-500 border-gray-300':
                        !formState.errors.name,
                      'border-red-300 focus:ring-red-500 focus:border-red-500':
                        formState.errors.name,
                    }
                  )}
                  {...register('name')}
                />
                {formState.errors.name && (
                  <p className="text-red-500 text-xs absolute mt-1">
                    {t('workspace.errors.name')}
                  </p>
                )}
              </div>
            </div>
            <fieldset>
              <legend className="text-sm font-medium text-gray-900">
                {t('workspace.privacy.label')}
              </legend>
              <div className="mt-2 space-y-5">
                <div className="relative flex items-start">
                  <div className="absolute flex items-center h-5">
                    <input
                      id="privacy-public"
                      aria-describedby="privacy-public-description"
                      type="radio"
                      className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"
                      value={WorkspacePrivacy.Public}
                      {...register('privacy')}
                    />
                  </div>
                  <div className="pl-7 text-sm">
                    <label
                      htmlFor="privacy-public"
                      className="font-medium text-gray-900"
                    >
                      {t('workspace.privacy.public.label')}
                    </label>
                    <p
                      id="privacy-public-description"
                      className="text-gray-500"
                    >
                      {t('workspace.privacy.public.description')}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="relative flex items-start">
                    <div className="absolute flex items-center h-5">
                      <input
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
                        {t('workspace.privacy.privateToMembers.label')}
                      </label>
                      <p
                        id="privacy-private-to-project-description"
                        className="text-gray-500"
                      >
                        {t('workspace.privacy.privateToMembers.description')}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="relative flex items-start">
                    <div className="absolute flex items-center h-5">
                      <input
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
                        {t('workspace.privacy.privateToYou.label')}
                      </label>
                      <p
                        id="privacy-private-description"
                        className="text-gray-500"
                      >
                        {t('workspace.privacy.privateToYou.description')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div className="flex-shrink-0 px-4 py-4 flex justify-between">
          <Can I={WorkspacesAction.Delete} this={workspace}>
            <button
              onClick={() => onDelete(workspace)}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              {t('actions.delete')}
            </button>
          </Can>
          <div>
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              onClick={onCancel}
            >
              {t('actions.cancel')}
            </button>
            <button
              type="submit"
              disabled={updateWorkspace.isLoading}
              className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              {t('actions.submit')}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};