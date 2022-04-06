import { WorkspaceModel } from '@pasnik/api/data-transfer';
import { DrawerWithHeading } from '@pasnik/components';
import { UpdateWorkspaceForm } from './update-workspace-form';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { DeleteWorkspaceModal } from './delete-workspace-modal';

export interface UpdateWorkspaceDrawerProps {
  isOpen: boolean;
  workspace: WorkspaceModel;
  onSuccess: (workspace: WorkspaceModel) => void;
  onCancel: () => void;
}

export const UpdateWorkspaceDrawer = ({
  workspace,
  onCancel,
  onSuccess,
  isOpen,
}: UpdateWorkspaceDrawerProps) => {
  const { t } = useTranslation();
  const [workspaceToDelete, setWorkspaceToDelete] =
    useState<WorkspaceModel | null>(null);

  return (
    <DrawerWithHeading
      title={t('workspace.updateDrawer.title')}
      subtitle={t('workspace.updateDrawer.subtitle')}
      show={isOpen}
      onClose={onCancel}
    >
      {({ lock }) => (
        <>
          <UpdateWorkspaceForm
            onSuccess={onSuccess}
            onCancel={onCancel}
            onDelete={(workspace) => setWorkspaceToDelete(workspace)}
            workspace={workspace}
            lock={lock}
          />
          {workspaceToDelete && (
            <DeleteWorkspaceModal
              workspace={workspaceToDelete!}
              onConfirm={(newWorkspace) => {
                setWorkspaceToDelete(null);
                onSuccess(newWorkspace);
              }}
              onCancel={() => {
                setWorkspaceToDelete(null);
              }}
            />
          )}
        </>
      )}
    </DrawerWithHeading>
  );
};
