import { WorkspaceUserModel } from '@pasnik/api/data-transfer';
import { UserInfo } from '@pasnik/components';

export interface WorkspaceUserPopoverProps {
  user: WorkspaceUserModel;
}
export function WorkspaceUserPopover({ user }: WorkspaceUserPopoverProps) {
  return <UserInfo user={user.user} />;
}
