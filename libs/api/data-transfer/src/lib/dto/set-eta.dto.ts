import { IsIn } from 'class-validator';

export class SetETADto {
  @IsIn([15, 30, 45, 60, 90, 120], { message: 'validation.invalid' })
  eta!: number;
}
