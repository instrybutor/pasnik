import { useWorkspaceOrdersStore } from '../workspace-store/workspace-orders.store';
import { WorkspaceOrderList } from '../workspace-order-list/workspace-order-list';
import { useEffect } from 'react';
import { useWorkspaceStore } from '@pasnik/features/workspaces';
import { CallStateWrapper } from '@pasnik/components';
import { WorkspaceInactiveOrdersEmpty } from '../workspace-inactive-orders-empty/workspace-inactive-orders-empty';

export function WorkspacePageInactiveOrders() {
  const { workspace } = useWorkspaceStore();
  const { fetchInactiveOrders } = useWorkspaceOrdersStore();
  const [orders, callState] = useWorkspaceOrdersStore(
    ({ inactiveOrders, inactiveOrdersCallState }) => [
      inactiveOrders,
      inactiveOrdersCallState,
    ]
  );

  useEffect(() => {
    if (workspace) {
      fetchInactiveOrders(workspace);
    }
  }, [fetchInactiveOrders, workspace]);
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
