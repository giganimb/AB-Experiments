import { IsString, IsNumber } from 'class-validator';

export class CreateVariantDto {
  @IsString()
  readonly option: string;

  @IsNumber()
  readonly distribution: number;
}