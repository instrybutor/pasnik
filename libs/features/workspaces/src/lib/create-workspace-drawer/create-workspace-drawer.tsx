import { WorkspaceModel } from '@pasnik/api/data-transfer';
import { CreateWorkspaceForm } from './create-workspace-form';
import { DrawerWithHeading } from '@pasnik/components';
import { useTranslation } from 'react-i18next';

export interface CreateWorkspaceDrawerProps {
  onSuccess: (workspace: WorkspaceModel) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export const CreateWorkspaceDrawer = ({
  isOpen,
  onCancel,
  onSuccess,
}: CreateWorkspaceDrawerProps) => {
  const { t } = useTranslation();

  return (
    <DrawerWithHeading
      title={t('workspace.createDrawer.title')}
      subtitle={t('workspace.createDrawer.subtitle')}
      show={isOpen}
      onClose={onCancel}
    >
      {({ lock }) => (
        <CreateWorkspaceForm
          onSuccess={onSuccess}
          onCancel={onCancel}
          lock={lock}
        />
      )}
    </DrawerWithHeading>
  );
};
