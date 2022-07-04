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
  const currentUser = useCurrentUser();
  const workspace = useWorkspaceById(
    workspaceId ?? currentUser.currentWorkspaceId
  );
  const workspaceUser = useWorkspaceUser(workspace, currentUser);

  // const { setCurrentWorkspaceSlugContext } = useSidebarContext();
  //
  // useEffect(() => {
  //   setCurrentWorkspaceSlugContext(workspace?.slug ?? null);
  //   return () => {
  //     setCurrentWorkspaceSlugContext(null);
  //   };
  // }, [workspace?.slug, setCurrentWorkspaceSlugContext]);

  return (
    <WorkspaceContext.Provider value={workspace}>
      <AbilityContext.Provider
        value={defineWorkspaceRulesFor(currentUser, workspaceUser)}
      >
        {children}
      </AbilityContext.Provider>
    </WorkspaceContext.Provider>
  );
}
