import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { AutomationZoneEntity } from 'src/automations/automation_zone.entity';
import { AutomationEventEntity } from 'src/automations/automation_event.entity';
import { EventEntity } from 'src/events/event.entity';
import { AutomationEntity } from 'src/automations/automation.entity';

@Injectable()
export class GeofencesService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AutomationZoneEntity)
    private readonly automationZoneRepository: Repository<AutomationZoneEntity>,
    @InjectRepository(AutomationEventEntity)
    private readonly automationEventRepository: Repository<AutomationEventEntity>,
    @InjectRepository(EventEntity)
    private readonly eventsRepository: Repository<EventEntity>,
    @InjectRepository(AutomationEntity)
    private readonly automationsRepository: Repository<AutomationEntity>,
  ) { }

  async handleGeofenceEvent(event: Record<string, any>, userId: string) {
    if (event && event.location && event.location.event === 'geofence') {
      const user = await this.userRepository.findOne({ id: userId });

      if (!user) { return; }
      const id: string = event.location.geofence.extras.id;
      const fireOnQuery = event.location.geofence.action === 'ENTER'
        ? 'automations_zones.onEnter = true'
        : 'automations_zones.onLeave = true';

      const res = await this.automationZoneRepository.createQueryBuilder('automations_zones')
        .where('users.id = :userId', { userId })
        .andWhere(fireOnQuery)
        .innerJoinAndSelect('automations_zones.zone', 'zones')
        .where('automations_zones.zoneId = :id', { id })
        .getMany();

      await Promise.all(res.map(async (automationZone) => {
        const automationEvents = await this.automationEventRepository.createQueryBuilder('automations_events')
          .where('automations_events.automationId = :automationId', { automationId: automationZone.automationId })
          .getMany();

        await Promise.all(automationEvents.map(async (automationEvent) => {
          const eventConnected = await automationEvent.event;

          console.log(`Executing event: ${eventConnected.name}, with ID: ${eventConnected.id};`);
        }));

      }));

    }
  }
}
