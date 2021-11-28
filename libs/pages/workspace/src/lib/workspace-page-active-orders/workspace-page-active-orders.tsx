import { useWorkspaceOrdersStore } from '../workspace-store/workspace-orders.store';
import { WorkspaceOrderList } from '../workspace-order-list/workspace-order-list';
import { useWorkspaceFacade } from '@pasnik/features/workspaces';
import { useEffect } from 'react';

export function WorkspacePageActiveOrders() {
  const { currentWorkspace } = useWorkspaceFacade();
  const { fetchActiveOrders } = useWorkspaceOrdersStore();
  const orders = useWorkspaceOrdersStore(({ activeOrders }) => activeOrders);

  useEffect(() => {
    if (currentWorkspace) {
      fetchActiveOrders(currentWorkspace);
    }
  }, [fetchActiveOrders, currentWorkspace]);
  return <WorkspaceOrderList orders={orders} />;
}
