import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { WorkspaceModel } from '@pasnik/api/data-transfer';
import { Drawer } from '@pasnik/components';
import { UpdateWorkspaceForm } from '../update-workspace-form/update-workspace-form';
import { useTranslation } from 'react-i18next';

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

  return (
    <Drawer show={isOpen} onClose={onCancel}>
      <div className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="py-6 px-4 bg-cyan-700 sm:px-6">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-lg font-medium text-white">
                {t('workspace.updateDrawer.title')}
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
              <p className="text-sm text-cyan-300">
                {t('workspace.updateDrawer.subtitle')}
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <UpdateWorkspaceForm
              workspace={workspace}
              onSuccess={onSuccess}
              onCancel={onCancel}
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
};
