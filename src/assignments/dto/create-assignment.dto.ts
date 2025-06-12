import { IsNumber, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @IsString({message: 'Must be string'})
  readonly deviceId: string;

  @IsNumber({}, {message: 'Must be number'})
  readonly experimentId: number;

  @IsNumber({}, {message: 'Must be number'})
  readonly variantId: number;
}