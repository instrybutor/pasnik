import { useLayoutStore } from '../layout.store';

export function useSidebarContext() {
  const { setCurrentWorkspaceSlugContext } = useLayoutStore();

  return {
    setCurrentWorkspaceSlugContext,
  };
}
