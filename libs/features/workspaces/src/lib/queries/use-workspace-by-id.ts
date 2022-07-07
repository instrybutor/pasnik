import { useWorkspaces } from './use-workspaces';
import { useMemo } from 'react';

export const useWorkspaceById = (id?: number, suspense = true) => {
  const { data } = useWorkspaces(suspense);
  return useMemo(() => {
    return data?.find((workspace) => workspace.id === id);
  }, [data, id]);
};
