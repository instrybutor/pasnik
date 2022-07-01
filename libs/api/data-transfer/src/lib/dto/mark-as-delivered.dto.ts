import { IsNumber, IsOptional, Min } from 'class-validator';

export class MarkAsDeliveredDto {
  @Min(0, { message: 'validation.positive' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'validation.invalid' })
  @IsOptional()
  shippingCents!: number;
}
