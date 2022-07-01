import { WorkspacePrivacy } from '../models';
import {
  IsDefined,
  IsIn,
  IsNumber,
  IsOptional,
  Length,
  Min,
} from 'class-validator';

export class UpdateWorkspaceDto {
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

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'validation.invalid' })
  @Min(0, { message: 'validation.invalid' })
  workspaceOwnerId?: number;
}
