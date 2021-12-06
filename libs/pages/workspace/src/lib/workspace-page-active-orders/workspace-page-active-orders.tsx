import { useWorkspaceOrdersStore } from '../workspace-store/workspace-orders.store';
import { WorkspaceOrderList } from '../workspace-order-list/workspace-order-list';
import { useWorkspaceStore } from '@pasnik/features/workspaces';
import { useEffect } from 'react';
import { CallStateWrapper } from '@pasnik/components';
import { OrdersEmpty } from '@pasnik/features/orders';

export function WorkspacePageActiveOrders() {
  const { workspace } = useWorkspaceStore();
  const { fetchActiveOrders } = useWorkspaceOrdersStore();
  const [orders, callState] = useWorkspaceOrdersStore(
    ({ activeOrders, activeOrdersCallState }) => [
      activeOrders,
      activeOrdersCallState,
    ]
  );

  useEffect(() => {
    if (workspace) {
      fetchActiveOrders(workspace);
    }
  }, [fetchActiveOrders, workspace]);
  return (
    <CallStateWrapper callState={callState}>
      {orders.length === 0 ? (
        <OrdersEmpty />
      ) : (
        <WorkspaceOrderList orders={orders} />
      )}
    </CallStateWrapper>
  );
}
