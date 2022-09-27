import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ShareDto } from '@pasnik/api/data-transfer';

@ValidatorConstraint({ name: 'shareDtos', async: false })
export class ShareDtoValidator implements ValidatorConstraintInterface {
  validate(dtos: ShareDto[], args: ValidationArguments) {
    return (
      dtos.reduce((set, dto) => {
        set.add(dto.workspaceUserId);
        return set;
      }, new Set()).size === dtos.length
    );
  }
}
