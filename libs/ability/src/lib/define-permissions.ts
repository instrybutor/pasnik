import { WorkspaceUserModel } from '@pasnik/api/data-transfer';
import { AbilityBuilder, AnyAbility } from '@casl/ability';

export type DefinePermissions<T extends AnyAbility> = (
  user: WorkspaceUserModel,
  builder: AbilityBuilder<T>
) => void;
