import WorkspaceUserRoleSelect from '../workspace-user-role-select/workspace-user-role-select';
import { WorkspaceUserRole } from '@pasnik/api/data-transfer';
import { useState } from 'react';

export function WorkspaceUserInvitePopover() {
  const [role, setRole] = useState(WorkspaceUserRole.User);
  return <WorkspaceUserRoleSelect role={role} onChange={setRole} />;
}
