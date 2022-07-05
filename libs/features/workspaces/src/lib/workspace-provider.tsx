import { WorkspaceContext } from './workspace-context';
import { PropsWithChildren } from 'react';
import { useCurrentUser } from '@pasnik/auth';
import { AbilityContext, defineWorkspaceRulesFor } from '@pasnik/ability';
import { useWorkspaceById, useWorkspaceUser } from './queries';

export interface WorkspaceProviderProps {
  workspaceId?: number;
}

export function WorkspaceProvider({
  children,
  workspaceId,
}: PropsWithChildren<WorkspaceProviderProps>) {
  const { user } = useCurrentUser({ suspense: false });
  const workspace = useWorkspaceById(
    workspaceId ?? user?.currentWorkspaceId,
    false
  );
  const workspaceUser = useWorkspaceUser(workspace?.slug, user, false);

  return (
    <WorkspaceContext.Provider value={workspace?.slug}>
      <AbilityContext.Provider
        value={defineWorkspaceRulesFor(user, workspaceUser)}
      >
        {children}
      </AbilityContext.Provider>
    </WorkspaceContext.Provider>
  );
}
