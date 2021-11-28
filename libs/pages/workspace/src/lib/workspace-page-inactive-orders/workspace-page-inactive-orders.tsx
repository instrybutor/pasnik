import { useWorkspaceOrdersStore } from '../workspace-store/workspace-orders.store';
import { WorkspaceOrderList } from '../workspace-order-list/workspace-order-list';
import { useEffect } from 'react';
import { useWorkspaceFacade } from '@pasnik/features/workspaces';
import { CallStateWrapper } from '@pasnik/components';
import { WorkspaceInactiveOrdersEmpty } from '../workspace-inactive-orders-empty/workspace-inactive-orders-empty';

export function WorkspacePageInactiveOrders() {
  const { currentWorkspace } = useWorkspaceFacade();
  const { fetchInactiveOrders } = useWorkspaceOrdersStore();
  const [orders, callState] = useWorkspaceOrdersStore(
    ({ inactiveOrders, inactiveOrdersCallState }) => [
      inactiveOrders,
      inactiveOrdersCallState,
    ]
  );

  useEffect(() => {
    if (currentWorkspace) {
      fetchInactiveOrders(currentWorkspace);
    }
  }, [fetchInactiveOrders, currentWorkspace]);
  return (
    <CallStateWrapper callState={callState}>
      {orders.length === 0 ? (
        <WorkspaceInactiveOrdersEmpty />
      ) : (
        <WorkspaceOrderList orders={orders} />
      )}
    </CallStateWrapper>
  );
}
