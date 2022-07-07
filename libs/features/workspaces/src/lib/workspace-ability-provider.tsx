import { AbilityContext, defineWorkspaceRulesFor } from '@pasnik/ability';
import { PropsWithChildren } from 'react';
import { useWorkspaceUser } from './queries';
import { useCurrentUser } from '@pasnik/auth';

export interface WorkspaceAbilityProviderProps {
  slug?: string;
}

export function WorkspaceAbilityProvider({
  slug,
  children,
}: PropsWithChildren<WorkspaceAbilityProviderProps>) {
  const { user } = useCurrentUser();
  const currentWorkspaceUser = useWorkspaceUser(slug, user);
  return (
    <AbilityContext.Provider
      value={defineWorkspaceRulesFor(user, currentWorkspaceUser)}
    >
      {children}
    </AbilityContext.Provider>
  );
}
