import { WorkspaceUserRole } from '../models/workspace-user.model';
import { IsDefined, IsIn } from 'class-validator';

export class UpdateWorkspaceUserDto {
  @IsIn(
    [WorkspaceUserRole.User, WorkspaceUserRole.Owner, WorkspaceUserRole.Admin],
    { message: 'validation.invalid' }
  )
  @IsDefined({ message: 'validation.required' })
  role!: WorkspaceUserRole;
}
