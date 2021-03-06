import { EventEntity } from 'src/events/event.entity';
import { Module } from '@nestjs/common';
import { AutomationsService } from './automations.service';
import { AutomationsController } from './automations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { AutomationEntity } from './automation.entity';
import { AutomationEventEntity } from './automation_event.entity';
import { PassportModule } from '@nestjs/passport';
import { ZoneEntity } from 'src/zones/zone.entity';
import { AutomationZoneEntity } from 'src/automations/automation_zone.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AutomationEntity, AutomationEventEntity, ZoneEntity, AutomationZoneEntity, EventEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AutomationsService],
  controllers: [AutomationsController]
})
export class AutomationsModule {}
