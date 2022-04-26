import { useUserStore } from '@pasnik/store';
import { AbilityContext, defineWorkspaceRulesFor } from '@pasnik/ability';
import { PropsWithChildren } from 'react';
import { useCurrentWorkspaceUser } from './queries';

export interface WorkspaceAbilityProviderProps {
  slug?: string;
}

export function WorkspaceAbilityProvider({
  slug,
  children,
}: PropsWithChildren<WorkspaceAbilityProviderProps>) {
  const currentWorkspaceUser = useCurrentWorkspaceUser(slug);
  const { user } = useUserStore();
  return (
    <AbilityContext.Provider
      value={defineWorkspaceRulesFor(user!, currentWorkspaceUser)}
    >
      {children}
    </AbilityContext.Provider>
  );
}
