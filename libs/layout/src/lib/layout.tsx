import Footer from './footer/footer';
import { PropsWithChildren, useCallback, useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from './sidebar/sidebar';
import Header from './header/header';
import { useAuth } from '@pasnik/auth';
import { FullscreenSpinner } from '@pasnik/components';

export interface LayoutProps {
  version?: string;
}

export function Layout({ version }: PropsWithChildren<LayoutProps>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);
  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);
  return !user ? (
    <FullscreenSpinner />
  ) : (
    <div className="relative h-screen flex overflow-hidden bg-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
        version={version}
      />
      <div className="flex-1 overflow-auto focus:outline-none flex-col flex">
        <Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
        <main className="flex-1 relative pb-8 z-0 overflow-y-auto flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

Layout.Footer = Footer;

export default Layout;
