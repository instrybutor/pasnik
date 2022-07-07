import { OfficeBuildingIcon } from '@heroicons/react/outline';
import { SidebarItem } from '../components/sidebar-item/sidebar-item';
import { useWorkspaceById } from '@pasnik/features/workspaces';
import { useLayoutStore } from '../layout.store';
import { useCurrentUser } from '@pasnik/auth';

export function SidebarWorkspaceItem() {
  const { data: currentUser } = useCurrentUser();
  const currentWorkspace = useWorkspaceById(currentUser?.currentWorkspaceId);
  const { currentWorkspaceIdContext } = useLayoutStore();
  return currentWorkspace ? (
    <SidebarItem
      to={`/workspace/${currentWorkspace.slug}`}
      icon={OfficeBuildingIcon}
      label={currentWorkspace.name}
      forceActive={currentWorkspace.id === currentWorkspaceIdContext}
    />
  ) : null;
}
