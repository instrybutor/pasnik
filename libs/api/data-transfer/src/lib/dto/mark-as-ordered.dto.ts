import { IsBoolean, IsOptional, Min } from 'class-validator';

export class MarkAsOrderedDto {
  @Min(0, { message: 'validation.positive' })
  @IsOptional()
  shippingCents?: number;
  @IsOptional()
  @IsBoolean({ message: 'validation.invalid' })
  paid?: boolean;
}
