import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}