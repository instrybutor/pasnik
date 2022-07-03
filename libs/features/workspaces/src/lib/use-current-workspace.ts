import { useContext } from 'react';
import { WorkspaceContext } from './workspace-context';

export function useCurrentWorkspace() {
  return useContext(WorkspaceContext);
}
