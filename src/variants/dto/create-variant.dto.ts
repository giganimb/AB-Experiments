import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVariantDto {
  @IsString()
  readonly option: string;

  @Type(() => Number)
  @IsNumber()
  readonly distribution: number;
}