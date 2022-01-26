import Footer from './footer/footer';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router';
import Sidebar from './sidebar/sidebar';
import Header from './header/header';
import { useLayoutStore } from './layout.store';
import {
  useCurrentWorkspace,
  WorkspaceAbilityProvider,
} from '@pasnik/features/workspaces';

export interface LayoutProps {
  version?: string;
}

export function Layout({ version }: PropsWithChildren<LayoutProps>) {
  const sidebarOpen = useLayoutStore((store) => store.sidebarOpen);
  const { openSidebar, closeSidebar } = useLayoutStore();

  const workspace = useCurrentWorkspace();

  return (
    <WorkspaceAbilityProvider slug={workspace?.slug}>
      <div className="relative h-screen flex overflow-hidden bg-gray-100">
        <Sidebar
          sidebarOpen={sidebarOpen}
          closeSidebar={closeSidebar}
          version={version}
        />
        <div className="flex-1 overflow-auto focus:outline-none flex-col flex">
          <Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
          <main className="flex-1 relative z-0 overflow-y-auto flex-grow flex flex-col">
            <Outlet />
          </main>
        </div>
      </div>
    </WorkspaceAbilityProvider>
  );
}

Layout.Footer = Footer;

export default Layout;
