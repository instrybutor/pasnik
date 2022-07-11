import { Route, Routes } from 'react-router-dom';
import { RedirectToCurrentWorkspace } from '@pasnik/features/workspaces';
import { PagesWorkspaceOrders } from '@pasnik/pages/workspace-orders';
import { PagesWorkspaceBalances } from '@pasnik/pages/workspace-balances';
import { PagesWorkspaceLayout } from './pages-workspace-layout';

export function PagesWorkspace() {
  return (
    <Routes>
      <Route path="/" element={<PagesWorkspaceLayout />}>
        <Route path="/" element={<RedirectToCurrentWorkspace />} />
        <Route path="/:slug" element={<PagesWorkspaceOrders />} />
        <Route path="/:slug/balances" element={<PagesWorkspaceBalances />} />
      </Route>
    </Routes>
  );
}
