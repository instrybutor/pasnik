import { AbilityContext, defineWorkspaceRulesFor } from '@pasnik/ability';
import { PropsWithChildren } from 'react';
import { useWorkspaceUser } from './queries';
import { useCurrentUser } from '@pasnik/auth';
import { useCurrentWorkspace } from './use-current-workspace';

export interface WorkspaceAbilityProviderProps {
  slug?: string;
}

export function WorkspaceAbilityProvider({
  slug,
  children,
}: PropsWithChildren<WorkspaceAbilityProviderProps>) {
  const currentWorkspace = useCurrentWorkspace();
  const user = useCurrentUser();
  const currentWorkspaceUser = useWorkspaceUser(currentWorkspace, user);
  return (
    <AbilityContext.Provider
      value={defineWorkspaceRulesFor(user, currentWorkspaceUser)}
    >
      {children}
    </AbilityContext.Provider>
  );
}
