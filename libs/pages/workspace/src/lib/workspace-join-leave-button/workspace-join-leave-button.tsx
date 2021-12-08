import { LoginIcon, LogoutIcon, TrashIcon } from '@heroicons/react/outline';
import { WorkspaceModel, WorkspaceUserRole } from '@pasnik/api/data-transfer';
import {
  useCurrentWorkspaceUser,
  useWorkspaceJoinMutation,
  useWorkspaceLeaveMutation,
  useWorkspaceRemoveMutation,
  useWorkspaces,
} from '@pasnik/features/workspaces';
import { useCallback } from 'react';
import { useUserStore } from '@pasnik/store';
import { useNavigate } from 'react-router-dom';

export interface WorkspaceJoinLeaveButtonProps {
  workspace: WorkspaceModel;
}

export function WorkspaceJoinLeaveButton({
  workspace,
}: WorkspaceJoinLeaveButtonProps) {
  const { changeWorkspace } = useUserStore();
  const { data: workspaces } = useWorkspaces();
  const navigate = useNavigate();

  const leaveWorkspace = useWorkspaceLeaveMutation(workspace.slug);
  const joinWorkspace = useWorkspaceJoinMutation(workspace.slug);
  const removeWorkspace = useWorkspaceRemoveMutation(workspace.slug);

  const onWorkspaceJoin = useCallback(async () => {
    await joinWorkspace.mutateAsync();
    // await changeWorkspace(workspace);
  }, [joinWorkspace]);

  const onWorkspaceRemove = useCallback(async () => {
    await removeWorkspace.mutateAsync();
    const nextWorkspace = workspaces?.find(
      (_workspace) => _workspace.id !== workspace.id
    );
    if (nextWorkspace) {
      await changeWorkspace(nextWorkspace);
      navigate(`/workspace/${nextWorkspace.slug}`);
    }
  }, [removeWorkspace, workspace, changeWorkspace, workspaces]);

  const currentWorkspaceUser = useCurrentWorkspaceUser(workspace.slug);

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
          onClick={() => leaveWorkspace.mutateAsync()}
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
