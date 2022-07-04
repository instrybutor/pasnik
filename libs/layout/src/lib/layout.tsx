import Footer from './footer/footer';
import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router';
import Sidebar from './sidebar/sidebar';
import Header from './header/header';
import { useLayoutStore } from './layout.store';
import { WorkspaceProvider } from '@pasnik/features/workspaces';

export interface LayoutProps {
  version?: string;
}

export function Layout({ version }: PropsWithChildren<LayoutProps>) {
  const sidebarOpen = useLayoutStore((store) => store.sidebarOpen);
  const { openSidebar, closeSidebar } = useLayoutStore();

  return (
    <WorkspaceProvider>
      <div className="relative h-screen flex overflow-hidden bg-gray-100">
        <Sidebar
          sidebarOpen={sidebarOpen}
          closeSidebar={closeSidebar}
          version={version}
        />
        <div className="flex-1 overflow-auto focus:outline-none flex-col flex">
          <Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
          <main className="flex-1 relative z-0 flex-grow flex flex-col pb-8">
            <Outlet />
          </main>
        </div>
      </div>
    </WorkspaceProvider>
  );
}

Layout.Footer = Footer;

export default Layout;
