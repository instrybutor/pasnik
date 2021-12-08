import { useWorkspaces } from './use-workspaces';
import { useMemo } from 'react';

export const useCurrentWorkspaceById = (id?: number) => {
  const { data } = useWorkspaces();
  return useMemo(() => {
    return data?.find((workspace) => workspace.id === id);
  }, [data, id]);
};
