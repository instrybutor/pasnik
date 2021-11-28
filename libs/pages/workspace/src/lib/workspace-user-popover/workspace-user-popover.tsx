import { UserModel } from '@pasnik/api/data-transfer';
import { UserInfo } from '@pasnik/components';

export interface WorkspaceUserPopoverProps {
  user: UserModel;
}
export function WorkspaceUserPopover({ user }: WorkspaceUserPopoverProps) {
  return <UserInfo user={user} />;
}
