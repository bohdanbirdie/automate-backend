import { EventEntity } from 'src/events/event.entity';
import { EventsService } from './events.service';
import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { PassportModule } from '@nestjs/passport';
import { AutomationEntity } from 'src/automations/automation.entity';
import { AutomationEventEntity } from 'src/automations/automation_event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, EventEntity, AutomationEntity, AutomationEventEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}
