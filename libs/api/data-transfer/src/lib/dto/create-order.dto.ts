import {
  IsDefined,
  IsNumber,
  IsOptional,
  Length,
  Matches,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateOrderDto {
  @IsDefined({ message: 'validation.required' })
  @Length(3, 50, { message: 'validation.length::{ "min": 3, "max": 50 }' })
  from!: string;

  @Matches(
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    {
      message: 'validation.invalid',
    }
  )
  @IsOptional()
  @ValidateIf(({ menuUrl }) => menuUrl?.length > 0)
  menuUrl?: string;

  @Min(0, { message: 'validation.positive' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'validation.invalid' })
  @IsOptional()
  shippingCents?: number;
}
