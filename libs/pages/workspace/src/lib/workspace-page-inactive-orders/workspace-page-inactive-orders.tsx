import { useWorkspaceOrdersStore } from '../workspace-store/workspace-orders.store';
import { WorkspaceOrderList } from '../workspace-order-list/workspace-order-list';
import { useEffect } from 'react';
import { useWorkspaceFacade } from '@pasnik/features/workspaces';

export function WorkspacePageInactiveOrders() {
  const { currentWorkspace } = useWorkspaceFacade();
  const { fetchInactiveOrders } = useWorkspaceOrdersStore();
  const orders = useWorkspaceOrdersStore(
    ({ inactiveOrders }) => inactiveOrders
  );

  useEffect(() => {
    if (currentWorkspace) {
      fetchInactiveOrders(currentWorkspace);
    }
  }, [fetchInactiveOrders, currentWorkspace]);
  return <WorkspaceOrderList orders={orders} />;
}
