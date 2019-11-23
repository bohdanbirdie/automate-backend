import { IsNotEmpty, IsString, IsUUID, ArrayMinSize, ValidateNested, IsBoolean, IsNumber } from 'class-validator';


class ConnectedZoneDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly onEnter: boolean;

  @IsNotEmpty()
  @IsBoolean()
  readonly onLeave: boolean;

  @IsNotEmpty()
  @IsUUID()
  readonly zoneId: string;
}

class ConnectedEventDto {
  @IsNotEmpty()
  @IsNumber()
  readonly order: number;

  @IsNotEmpty()
  @IsUUID()
  readonly eventId: string;
}

export class CreateAutomationDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ValidateNested({ each: true })
  @ArrayMinSize(0)
  readonly zones: ConnectedZoneDto[];

  @ValidateNested({ each: true })
  @ArrayMinSize(0)
  readonly events: ConnectedEventDto[];

}