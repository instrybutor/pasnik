import {
  UpdateWorkspaceDrawer,
  useWorkspace,
  WorkspaceUsers,
} from '@pasnik/features/workspaces';
import { Suspense, useCallback, useState } from 'react';
import { CogIcon } from '@heroicons/react/outline';
import { WorkspaceModel } from '@pasnik/api/data-transfer';
import { WorkspaceJoinLeaveButton } from '../workspace-join-leave-button/workspace-join-leave-button';
import { useNavigate, useParams } from 'react-router-dom';
import { WorkspaceHeaderUsers } from '../workspace-header-users/workspace-header-users';
import { Can, WorkspacesAction } from '@pasnik/ability';
import { useTranslation } from 'react-i18next';

export const WorkspaceHeader = () => {
  const { t } = useTranslation();
  const { slug } = useParams<'slug'>();
  const navigate = useNavigate();
  const [editWorkspace, setEditWorkspace] = useState(false);
  const { data: workspace } = useWorkspace(slug!);

  const onUpdateWorkspaceSuccess = useCallback(
    (workspace: WorkspaceModel) => {
      navigate(`/workspace/${workspace.slug}`);
      setEditWorkspace(false);
    },
    [navigate, setEditWorkspace]
  );

  const onUpdateWorkspaceCancel = useCallback(() => {
    setEditWorkspace(false);
  }, [setEditWorkspace]);

  return (
    <div className="px-4 sm:px-6 lg:max-w-6xl md:mx-auto lg:px-8">
      <div className="py-6 sm:flex sm:items-center justify-between border-t border-gray-200">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate">
            {workspace?.name}
          </h2>
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Suspense
                fallback={
                  <WorkspaceUsers.Skeleton usersToShow={11} avatarSize="sm" />
                }
              >
                <WorkspaceHeaderUsers />
              </Suspense>
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <Can I={WorkspacesAction.Update} this={workspace}>
            <span className="block">
              <button
                onClick={() => setEditWorkspace(true)}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <CogIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
                {t('workspace.settings')}
              </button>
            </span>
          </Can>
          {workspace && <WorkspaceJoinLeaveButton workspace={workspace} />}
        </div>
      </div>
      {workspace && (
        <UpdateWorkspaceDrawer
          workspace={workspace}
          isOpen={editWorkspace}
          onSuccess={onUpdateWorkspaceSuccess}
          onCancel={onUpdateWorkspaceCancel}
        />
      )}
    </div>
  );
};
