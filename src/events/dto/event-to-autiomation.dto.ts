import { IsNotEmpty, IsNumber, IsUUID, ValidateNested, ArrayMinSize } from 'class-validator';

export class EventsToAutomationDto {
  @IsNotEmpty()
  @IsNumber()
  readonly order: number;

  @IsNotEmpty()
  @IsUUID()
  readonly automationId: string;

  @ValidateNested({ each: true })
  @ArrayMinSize(0)
  @IsUUID(undefined, { each: true })
  readonly eventIds: string[];
}