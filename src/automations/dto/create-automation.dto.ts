import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAutomationDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}