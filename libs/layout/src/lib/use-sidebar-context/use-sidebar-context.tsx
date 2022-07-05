import { useLayoutStore } from '../layout.store';

export function useSidebarContext() {
  const { setCurrentWorkspaceIdContext } = useLayoutStore();

  return {
    setCurrentWorkspaceIdContext,
  };
}
