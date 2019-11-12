import { IsNotEmpty } from 'class-validator';

export class CreateZoneDto {
  @IsNotEmpty()
  readonly identifier: string;

  @IsNotEmpty()
  readonly uiId: string;

  @IsNotEmpty()
  readonly radius: number;

  @IsNotEmpty()
  readonly latitude: number;

  @IsNotEmpty()
  readonly longitude: number;

  @IsNotEmpty()
  readonly notifyOnEntry: boolean;
  
  @IsNotEmpty()
  readonly notifyOnExit: boolean;

  @IsNotEmpty()
  readonly notifyOnDwell: boolean;

  readonly loiteringDelay?: number;
}