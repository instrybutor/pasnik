import { useWorkspaceOrders } from '@pasnik/features/workspaces';
import { WorkspaceOrderList } from '../workspace-order-list/workspace-order-list';
import { useParams } from 'react-router-dom';
import { ReactElement } from 'react';

export interface WorkspaceOrdersProps {
  type: 'active' | 'inactive';
  empty: ReactElement;
}

export function WorkspaceOrders({ type, empty }: WorkspaceOrdersProps) {
  const { slug } = useParams<'slug'>();
  const { data: orders } = useWorkspaceOrders(slug, type);

  if (!orders) {
    return null;
  }

  return orders.length === 0 ? empty : <WorkspaceOrderList orders={orders} />;
}
