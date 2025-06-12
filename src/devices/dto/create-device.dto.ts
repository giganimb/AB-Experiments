import { IsString } from 'class-validator';

export class CreateDeviceDto {
  @IsString({message: 'Must be string'})
  readonly id: string;
}
