import { IsNotEmpty, IsNumber, IsString, IsUUID, ArrayUnique } from 'class-validator';

export class EventsToAutomationDto {
  @IsNotEmpty()
  @IsNumber()
  readonly order: number;

  @IsNotEmpty({ each: true })
  @ArrayUnique()
  @IsUUID(undefined, { each: true })
  readonly eventIds: string[];

  @IsNotEmpty()
  @IsUUID()
  readonly automationId: string;
}