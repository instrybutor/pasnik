import { useCallback, useRef, useState } from 'react';
import { RefreshIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import {
  UpdateWorkspaceDto,
  WorkspaceModel,
  WorkspacePrivacy,
  WorkspaceUserRole,
} from '@pasnik/api/data-transfer';
import { Controller, useForm } from 'react-hook-form';
import { useWorkspaceUpdateMutation } from '../mutations';
import { Can, WorkspacesAction } from '@pasnik/ability';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { useWorkspaceUsers } from '../queries/use-workspace-users';
import { SelectWorkspaceUser } from '../select-workspace-user/select-workspace-user';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button } from '@pasnik/components';

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
  const [changeOwner, setChangeOwner] = useState(false);
  const { t } = useTranslation();
  const { register, handleSubmit, formState, setValue, control, resetField } =
    useForm<UpdateWorkspaceDto>({
      resolver: classValidatorResolver(UpdateWorkspaceDto),
      defaultValues: {
        name: workspace.name,
        privacy: workspace.privacy,
      },
    });
  const updateWorkspace = useWorkspaceUpdateMutation(workspace.slug);
  const nameInputLabel = useRef(null);

  const onSubmit = useCallback(
    (data: UpdateWorkspaceDto) => {
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

  const { data: users } = useWorkspaceUsers(workspace.slug);

  const changeOwnerClick = useCallback(() => {
    const owner = users?.find((user) => user.role === WorkspaceUserRole.Owner);
    if (owner) {
      setChangeOwner(true);
      setValue('workspaceOwnerId', owner.id);
    }
  }, [setChangeOwner, setValue, users]);

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
            <Can I={WorkspacesAction.ChangeOwner} this={workspace}>
              <div>
                <label
                  htmlFor="workspace-owner"
                  className="block text-sm font-medium text-gray-900 mb-1"
                  ref={nameInputLabel}
                >
                  Właściciel
                </label>
                {!changeOwner ? (
                  <Button
                    onClick={changeOwnerClick}
                    type="button"
                    color="warn"
                    className="px-4 py-2 text-sm font-medium"
                  >
                    <RefreshIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Zmień
                  </Button>
                ) : (
                  <div className="flex flex-row gap-2 items-center">
                    <div className="flex-grow">
                      <Controller
                        control={control}
                        name="workspaceOwnerId"
                        render={({ field: { value, onChange } }) => (
                          <SelectWorkspaceUser
                            setUser={onChange}
                            users={users ?? []}
                            userId={value}
                          />
                        )}
                      />
                    </div>
                    <Button
                      onClick={() => {
                        resetField('workspaceOwnerId');
                        setChangeOwner(false);
                      }}
                      color="warn"
                      type="button"
                      className="p-1"
                      rounded="full"
                    >
                      <XIcon
                        className="h-5 w-5 pointer-events-none"
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                )}
              </div>
            </Can>
          </div>
        </div>
        <div className="flex-shrink-0 px-4 py-4 flex justify-between">
          <div>
            <Can I={WorkspacesAction.Delete} this={workspace}>
              <Button
                onClick={() => onDelete(workspace)}
                type="button"
                color="warn"
                className="px-4 py-2 text-sm font-medium"
              >
                <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                {t('actions.delete')}
              </Button>
            </Can>
          </div>
          <div>
            <Button
              type="button"
              color="secondary"
              className="text-sm font-medium py-2 px-4"
              onClick={onCancel}
            >
              {t('actions.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={updateWorkspace.isLoading}
              className="ml-4 justify-center py-2 px-4 text-sm font-medium"
            >
              {t('actions.submit')}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
