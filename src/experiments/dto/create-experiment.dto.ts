import { IsArray, IsIn, IsString, ValidateNested } from 'class-validator';
import { EXPERIMENT_STATUSES, TExperimentStatus } from '../experiments.constants';
import { Type } from 'class-transformer';
import { CreateVariantDto } from '../../variants/dto/create-variant.dto';

export class CreateExperimentDto {
  @IsString({message: 'Must be string'})
  readonly name: string;

  @IsString({message: 'Must be string'})
  readonly key: string;

  @IsIn(EXPERIMENT_STATUSES, {message: 'Invalid status'})
  readonly status: TExperimentStatus;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVariantDto)
  readonly variants: CreateVariantDto[];
}
