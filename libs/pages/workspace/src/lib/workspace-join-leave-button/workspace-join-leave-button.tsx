import { LoginIcon, LogoutIcon, TrashIcon } from '@heroicons/react/outline';
import { WorkspaceModel, WorkspaceUserRole } from '@pasnik/api/data-transfer';
import {
  useWorkspaceFacade,
  useWorkspaceStore,
  useWorkspaceUsersFacade,
} from '@pasnik/features/workspaces';
import { useCallback } from 'react';

export interface WorkspaceJoinLeaveButtonProps {
  workspace: WorkspaceModel;
}

export function WorkspaceJoinLeaveButton({
  workspace,
}: WorkspaceJoinLeaveButtonProps) {
  const { currentWorkspaceUser } = useWorkspaceUsersFacade();
  const { joinWorkspace, leaveWorkspace, removeWorkspace } =
    useWorkspaceStore();

  const { changeWorkspace, workspaces } = useWorkspaceFacade();

  const onWorkspaceJoin = useCallback(async () => {
    await joinWorkspace(workspace);
    await changeWorkspace(workspace);
  }, [joinWorkspace, changeWorkspace, workspace]);

  const onWorkspaceLeave = useCallback(async () => {
    await leaveWorkspace(workspace);
    const nextWorkspace = workspaces.find(
      (_workspace) => _workspace.id !== workspace.id
    );
    if (nextWorkspace) {
      await changeWorkspace(nextWorkspace, false);
    }
  }, [leaveWorkspace, workspace, workspaces, changeWorkspace]);

  const onWorkspaceRemove = useCallback(async () => {
    await removeWorkspace(workspace);
    const nextWorkspace = workspaces.find(
      (_workspace) => _workspace.id !== workspace.id
    );
    if (nextWorkspace) {
      await changeWorkspace(nextWorkspace);
    }
  }, [removeWorkspace, workspace, workspaces, changeWorkspace]);

  return (
    <span className="sm:ml-3">
      {!currentWorkspaceUser ? (
        <button
          onClick={onWorkspaceJoin}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          <LoginIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Dołącz
        </button>
      ) : currentWorkspaceUser.role !== WorkspaceUserRole.Owner ? (
        <button
          onClick={onWorkspaceLeave}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <LogoutIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Opuść
        </button>
      ) : (
        <button
          onClick={onWorkspaceRemove}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Usuń
        </button>
      )}
    </span>
  );
}
