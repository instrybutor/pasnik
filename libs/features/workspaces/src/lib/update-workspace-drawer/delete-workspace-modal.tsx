import { WorkspaceModel } from '@pasnik/api/data-transfer';
import { Button, ConfirmModal } from '@pasnik/components';
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
        <Button
          onClick={onWorkspaceRemove}
          type="button"
          color="warn"
          className="w-full px-4 py-2 sm:ml-3 sm:w-auto sm:text-sm"
        >
          {t('actions.yes')}
        </Button>
        <Button
          onClick={onCancel}
          type="button"
          color="secondary"
          className="mt-3 px-4 py-2 sm:mt-0 sm:w-auto sm:text-sm"
        >
          {t('actions.no')}
        </Button>
      </div>
    </ConfirmModal>
  );
};
