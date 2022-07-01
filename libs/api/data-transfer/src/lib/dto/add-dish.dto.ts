import { IsDefined, IsNumber, IsOptional, Length, Min } from 'class-validator';

export class AddDishDto {
  @Min(0, { message: 'validation.positive' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'validation.invalid' })
  @IsDefined({ message: 'validation.required' })
  priceCents!: number;

  @IsDefined({ message: 'validation.required' })
  @Length(3, 50, { message: 'validation.length::{ "min": 3, "max": 50 }' })
  name!: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'validation.invalid' })
  @Min(0, { message: 'validation.invalid' })
  userId?: number;
}
