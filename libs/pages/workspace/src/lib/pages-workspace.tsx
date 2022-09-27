import { Route, Routes } from 'react-router-dom';
import { PagesWorkspaceOrders } from '@pasnik/pages/workspace-orders';
import { PagesWorkspaceBalances } from '@pasnik/pages/workspace-balances';
import { PagesWorkspaceLayout } from './pages-workspace-layout';
import { RedirectToCurrentWorkspace } from '@pasnik/features/workspaces';

export function PagesWorkspace() {
  return (
    <Routes>
      <Route element={<PagesWorkspaceLayout />}>
        <Route path="/" element={<RedirectToCurrentWorkspace />} />
        <Route path="/:slug/orders/*" element={<PagesWorkspaceOrders />} />
        <Route path="/:slug/balances/*" element={<PagesWorkspaceBalances />} />
      </Route>
    </Routes>
  );
}
