import {
  UpdateWorkspaceDrawer,
  useWorkspaceFacade,
  useWorkspaceStore,
  useWorkspaceUsersFacade,
  useWorkspaceUsersStore,
} from '@pasnik/features/workspaces';
import { Users } from '@pasnik/components';
import { useMemo, useState } from 'react';
import {
  LoginIcon,
  LogoutIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { WorkspaceUserPopover } from '../workspace-user-popover/workspace-user-popover';
import {
  WorkspaceUserModel,
  WorkspaceUserRole,
} from '@pasnik/api/data-transfer';

export const WorkspaceHeader = () => {
  const [editWorkspace, setEditWorkspace] = useState(false);
  const { workspace } = useWorkspaceStore();
  const { currentWorkspaceUser, mappedWorkspaceUsers, workspaceUsers } =
    useWorkspaceUsersFacade();
  const { joinWorkspace, leaveWorkspace } = useWorkspaceUsersStore(
    ({ leaveWorkspace, joinWorkspace }) => ({
      joinWorkspace,
      leaveWorkspace,
    })
  );
  const userToWorkspaceUserMap = useMemo(() => {
    return workspaceUsers.reduce((acc, workspaceUser) => {
      acc[workspaceUser.userId] = workspaceUser;
      return acc;
    }, {} as Record<number, WorkspaceUserModel>);
  }, [workspaceUsers]);
  const { removeWorkspace } = useWorkspaceFacade();

  return (
    <div className="px-4 sm:px-6 lg:max-w-6xl md:mx-auto lg:px-8">
      <div className="py-6 xl:flex xl:items-center lg:justify-between lg:border-t lg:border-gray-200">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate">
            {workspace?.name}
          </h2>
          <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <Users
                usersToShow={5}
                avatarSize="sm"
                users={mappedWorkspaceUsers}
                popoverElement={({ user }) => (
                  <div className="bg-white p-4 w-72">
                    <WorkspaceUserPopover
                      user={userToWorkspaceUserMap[user.id]}
                    />
                  </div>
                )}
              />
              {/*<WorkspaceUserInviteButton /> hidden */}
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          {currentWorkspaceUser &&
            currentWorkspaceUser.role !== WorkspaceUserRole.User && (
              <span className="block">
                <button
                  onClick={() => setEditWorkspace(true)}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  <PencilIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  Edytuj
                </button>
              </span>
            )}

          {!currentWorkspaceUser && (
            <span className="sm:ml-3">
              <button
                onClick={() => joinWorkspace(workspace!)}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <LoginIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Dołącz
              </button>
            </span>
          )}
          {currentWorkspaceUser &&
            currentWorkspaceUser.role !== WorkspaceUserRole.Owner && (
              <span className="sm:ml-3">
                <button
                  onClick={() => leaveWorkspace(workspace!)}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <LogoutIcon
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Opuść
                </button>
              </span>
            )}
          {currentWorkspaceUser &&
            currentWorkspaceUser.role === WorkspaceUserRole.Owner && (
              <span className="sm:ml-3">
                <button
                  onClick={() => removeWorkspace(workspace!)}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <TrashIcon
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Usuń
                </button>
              </span>
            )}
        </div>
      </div>
      {workspace && (
        <UpdateWorkspaceDrawer
          workspace={workspace}
          isOpen={editWorkspace}
          onSuccess={() => setEditWorkspace(false)}
          onCancel={() => setEditWorkspace(false)}
        />
      )}
    </div>
  );
};
