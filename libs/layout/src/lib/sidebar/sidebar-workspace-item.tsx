import {
  OfficeBuildingIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/outline';
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
    >
      <SidebarItem
        to={`/workspace/${currentWorkspace.slug}`}
        icon={(props) => (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            {...props}
          >
            <path d="M352 176a16 16 0 1 0-16-16 16 16 0 0 0 16 16zm-96-32a16 16 0 1 0-16-16 16 16 0 0 0 16 16zm-96 32a16 16 0 1 0-16-16 16 16 0 0 0 16 16zm352 112a79.45 79.45 0 0 0-28.07-60.4c.36-.54.85-.92 1.2-1.48a72.63 72.63 0 0 0 .63-75.43C442.33 78.69 352.18 32.09 256 32c-96.11.09-186.26 46.67-229.7 118.67a72.65 72.65 0 0 0 .6 75.44c.35.55.85.94 1.21 1.49a79.32 79.32 0 0 0 5.65 125.46c-.66 2.83-1.73 5.51-1.73 8.53v34.68A83.82 83.82 0 0 0 115.72 480h280.56A83.82 83.82 0 0 0 480 396.27v-34.68c0-3-1.07-5.7-1.73-8.53A79.75 79.75 0 0 0 512 288zM67.37 175.46C102.3 117.56 176.32 80.09 256 80c79.69.09 153.75 37.57 188.69 95.47a24.59 24.59 0 0 1-.21 25.17c-2.93 4.68-7.38 7.36-12.2 7.36H79.75c-4.82 0-9.26-2.69-12.2-7.37a24.56 24.56 0 0 1-.18-25.17zM432 396.27A35.77 35.77 0 0 1 396.28 432H115.72A35.77 35.77 0 0 1 80 396.27v-25.6h352zm0-76.27H80a32 32 0 0 1 0-64h352a32 32 0 0 1 0 64z" />
          </svg>
        )}
        label="Zamówienia"
        forceActive={currentWorkspace.id === currentWorkspaceIdContext}
      />
      <SidebarItem
        to={`/workspace/${currentWorkspace.slug}/balances`}
        icon={SwitchHorizontalIcon}
        label="Bilans"
      />
    </SidebarItem>
  ) : null;
}
