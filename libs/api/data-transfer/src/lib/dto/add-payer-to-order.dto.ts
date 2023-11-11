import { IsDefined, IsNumber, Min } from 'class-validator';

export class AddPayerToOrderDto {
  workspaceUserId!: number;
  @Min(0, { message: 'validation.positive' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'validation.invalid' })
  @IsDefined({ message: 'validation.required' })
  amountCents!: number;
  id?: number;
}
