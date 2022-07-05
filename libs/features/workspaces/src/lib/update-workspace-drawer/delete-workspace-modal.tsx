import { WorkspaceModel } from '@pasnik/api/data-transfer';
import { ConfirmModal } from '@pasnik/components';
import { useTranslation } from 'react-i18next';
import { ExclamationIcon } from '@heroicons/react/outline';
import { useCallback } from 'react';
import { useWorkspaces } from '../queries/use-workspaces';
import { useWorkspaceRemoveMutation } from '../mutations/use-workspace-remove-mutation';
import { useChangeWorkspaceMutation } from '@pasnik/auth';

export interface DeleteWorkspaceModalProps {
  workspace: WorkspaceModel;
  onConfirm: (workspace: WorkspaceModel) => void;
  onCancel: () => void;
}

export const DeleteWorkspaceModal = ({
  workspace,
  onCancel,
  onConfirm,
}: DeleteWorkspaceModalProps) => {
  const { t } = useTranslation();
  const { mutateAsync: changeWorkspace } = useChangeWorkspaceMutation();
  const { data: workspaces } = useWorkspaces(false);
  const removeWorkspace = useWorkspaceRemoveMutation(workspace.slug);

  const onWorkspaceRemove = useCallback(async () => {
    await removeWorkspace.mutateAsync();
    const nextWorkspace = workspaces?.find(
      (_workspace) => _workspace.id !== workspace.id
    );
    if (nextWorkspace) {
      await changeWorkspace(nextWorkspace);
      onConfirm(nextWorkspace);
    } else {
      onCancel();
    }
  }, [
    removeWorkspace,
    workspace,
    changeWorkspace,
    workspaces,
    onConfirm,
    onCancel,
  ]);

  return (
    <ConfirmModal
      onClose={onCancel}
      icon={ExclamationIcon}
      title={t('workspace.areYouSure')}
    >
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          onClick={onWorkspaceRemove}
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          {t('actions.yes')}
        </button>
        <button
          onClick={onCancel}
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:mt-0 sm:w-auto sm:text-sm"
        >
          {t('actions.no')}
        </button>
      </div>
    </ConfirmModal>
  );
};
