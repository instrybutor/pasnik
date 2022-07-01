import { IsDefined, IsEmail, ValidateNested } from 'class-validator';

export class AddMemberToWorkspaceDto {
  @IsEmail({ message: 'validation.invalid' })
  @IsDefined({ message: 'validation.required' })
  email!: string;
}

export class AddMembersToWorkspaceDto {
  @ValidateNested({ message: 'validation.invalid', each: true })
  members!: AddMemberToWorkspaceDto[];
}
