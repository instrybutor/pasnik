import { AbilityContext, defineWorkspaceRulesFor } from '@pasnik/ability';
import { PropsWithChildren } from 'react';
import { useCurrentWorkspaceUser } from './queries';
import { useCurrentUser } from '@pasnik/auth';

export interface WorkspaceAbilityProviderProps {
  slug?: string;
}

export function WorkspaceAbilityProvider({
  slug,
  children,
}: PropsWithChildren<WorkspaceAbilityProviderProps>) {
  const currentWorkspaceUser = useCurrentWorkspaceUser(slug);
  const user = useCurrentUser();
  return (
    <AbilityContext.Provider
      value={defineWorkspaceRulesFor(user, currentWorkspaceUser)}
    >
      {children}
    </AbilityContext.Provider>
  );
}
