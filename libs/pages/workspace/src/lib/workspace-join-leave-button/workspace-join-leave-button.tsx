import { LoginIcon, LogoutIcon, TrashIcon } from '@heroicons/react/outline';
import { WorkspaceModel, WorkspaceUserRole } from '@pasnik/api/data-transfer';
import {
  useWorkspaceFacade,
  useWorkspaceStore,
  useWorkspaceUsersFacade,
} from '@pasnik/features/workspaces';
import { useCallback } from 'react';
import { useUserStore } from '@pasnik/store';

export interface WorkspaceJoinLeaveButtonProps {
  workspace: WorkspaceModel;
}

export function WorkspaceJoinLeaveButton({
  workspace,
}: WorkspaceJoinLeaveButtonProps) {
  const { currentWorkspaceUser } = useWorkspaceUsersFacade();
  const { joinWorkspace, leaveWorkspace, removeWorkspace } =
    useWorkspaceStore();

  const { workspaces } = useWorkspaceFacade();
  const { changeWorkspace } = useUserStore();

  const onWorkspaceJoin = useCallback(async () => {
    await joinWorkspace(workspace);
    await changeWorkspace(workspace);
  }, [joinWorkspace, changeWorkspace, workspace]);

  const onWorkspaceLeave = useCallback(async () => {
    await leaveWorkspace(workspace);
    if (workspaces[0]) {
      await changeWorkspace(workspaces[0]);
    }
  }, [leaveWorkspace, workspace, workspaces, changeWorkspace]);

  return !currentWorkspaceUser ? (
    <span className="sm:ml-3">
      <button
        onClick={onWorkspaceJoin}
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
      >
        <LoginIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Dołącz
      </button>
    </span>
  ) : currentWorkspaceUser.role !== WorkspaceUserRole.Owner ? (
    <span className="sm:ml-3">
      <button
        onClick={onWorkspaceLeave}
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <LogoutIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Opuść
      </button>
    </span>
  ) : (
    <span className="sm:ml-3">
      <button
        onClick={() => removeWorkspace(workspace)}
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Usuń
      </button>
    </span>
  );
}
