import { AutomationEntity } from 'src/automations/automation.entity';
import { Module } from '@nestjs/common';
import { GeofencesController } from './geofences.controller';
import { GeofencesService } from './geofences.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { AutomationZoneEntity } from 'src/automations/automation_zone.entity';
import { AutomationEventEntity } from 'src/automations/automation_event.entity';
import { EventEntity } from 'src/events/event.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([UserEntity, AutomationZoneEntity, AutomationEventEntity, EventEntity, AutomationEntity]),
  ],
  controllers: [GeofencesController],
  providers: [GeofencesService]
})
export class GeofencesModule {}
