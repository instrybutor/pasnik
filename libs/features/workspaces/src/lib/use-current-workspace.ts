import { useContext } from 'react';
import { WorkspaceContext } from './workspace-context';
import { useWorkspace } from './queries';

export function useCurrentWorkspace(suspense = true) {
  const workspaceSlug = useContext(WorkspaceContext);
  return useWorkspace(workspaceSlug, suspense);
}
