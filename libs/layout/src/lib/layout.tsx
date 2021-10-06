import Footer from './footer/footer';
import { PropsWithChildren, useCallback, useState } from 'react';
import Sidebar from './sidebar/sidebar';
import Header from './header/header';

export interface LayoutProps {
  version?: string;
}

export function Layout({ children, version }: PropsWithChildren<LayoutProps>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);
  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);
  return (
    <div className="relative h-screen flex overflow-hidden bg-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
        version={version}
      />
      <div className="flex-1 overflow-auto focus:outline-none flex-col flex">
        <Header sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
        <main className="flex-1 relative pb-8 z-0 overflow-y-auto flex-grow">
          {children}
        </main>
      </div>
    </div>
  );
}

Layout.Footer = Footer;

export default Layout;
