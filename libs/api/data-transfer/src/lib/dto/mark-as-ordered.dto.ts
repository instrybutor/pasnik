import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

export class MarkAsOrderedDto {
  @Min(0, { message: 'validation.positive' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'validation.invalid' })
  @IsOptional()
  shippingCents?: number;
  @IsOptional()
  @IsBoolean({ message: 'validation.invalid' })
  paid?: boolean;
}
