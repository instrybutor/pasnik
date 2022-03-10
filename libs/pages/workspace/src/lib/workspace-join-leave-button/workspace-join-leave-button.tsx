import { LoginIcon, LogoutIcon } from '@heroicons/react/outline';
import { WorkspaceModel } from '@pasnik/api/data-transfer';
import {
  useWorkspaceJoinMutation,
  useWorkspaceLeaveMutation,
} from '@pasnik/features/workspaces';
import { useCallback } from 'react';
import { Can, WorkspacesAction } from '@pasnik/ability';

export interface WorkspaceJoinLeaveButtonProps {
  workspace: WorkspaceModel;
}

export function WorkspaceJoinLeaveButton({
  workspace,
}: WorkspaceJoinLeaveButtonProps) {
  const leaveWorkspace = useWorkspaceLeaveMutation(workspace.slug);
  const joinWorkspace = useWorkspaceJoinMutation(workspace.slug);

  const onWorkspaceJoin = useCallback(async () => {
    await joinWorkspace.mutateAsync();
  }, [joinWorkspace]);

  return (
    <span className="sm:ml-3 flex gap-3">
      <Can I={WorkspacesAction.Join} this={workspace}>
        <button
          onClick={onWorkspaceJoin}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
        >
          <LoginIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Dołącz
        </button>
      </Can>
      <Can I={WorkspacesAction.Leave} this={workspace}>
        <button
          onClick={() => leaveWorkspace.mutateAsync()}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <LogoutIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Opuść
        </button>
      </Can>
    </span>
  );
}
