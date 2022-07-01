import { WorkspacePrivacy } from '../models';
import { IsDefined, IsIn, Length } from 'class-validator';

export class CreateWorkspaceDto {
  @IsDefined({ message: 'validation.required' })
  @Length(3, 50, { message: 'validation.length::{ "min": 3, "max": 50 }' })
  name!: string;
  @IsDefined({ message: 'validation.required' })
  @IsIn(
    [
      WorkspacePrivacy.PrivateToMembers,
      WorkspacePrivacy.Public,
      WorkspacePrivacy.PrivateToYou,
    ],
    { message: 'validation.invalid' }
  )
  privacy!: WorkspacePrivacy;
}
