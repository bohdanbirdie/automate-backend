import { IsNotEmpty, IsNumber, IsString, IsUUID, ArrayUnique, IsBoolean } from 'class-validator';

export class AutomationZoneDto {
  @IsNotEmpty()
  @IsUUID()
  readonly automationId: string;

  @IsNotEmpty({ each: true })
  @ArrayUnique()
  @IsUUID(undefined, { each: true })
  readonly zonesIds: string[];

  @IsNotEmpty()
  @IsBoolean()
  readonly onEnter: boolean;

  @IsNotEmpty()
  @IsBoolean()
  readonly onLeave: boolean;
}