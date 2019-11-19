import { AutomationEventEntity } from './../automations/automation_event.entity';
import { AutomationEntity } from './../automations/automation.entity';
import { UserEntity } from 'src/users/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { EventEntity } from 'src/events/event.entity';
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventsToAutomationDto } from './dto/event-to-autiomation.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventsRepository: Repository<EventEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AutomationEntity)
    private readonly automationsRepository: Repository<AutomationEntity>,
    @InjectRepository(AutomationEntity)
    private readonly automationsEventsRepository: Repository<AutomationEventEntity>,
  ) { }

  async createEvent(createEventDto: CreateEventDto, userId: string): Promise<EventEntity> {
    const user = await this.userRepository.findOne({ id: userId });

    const event = this.eventsRepository.save({ ...createEventDto, users: [user] });

    return event;
  }

  async getEvents(userId: string): Promise<EventEntity[]> {
    const events = await this.eventsRepository.createQueryBuilder('events')
      .innerJoin('events.users', 'users')
      .where('users.id = :userId', { userId }).getMany();

    return events;
  }

  async connectToAutomation(connectDto: EventsToAutomationDto, userId: string): Promise<AutomationEventEntity[]> {
    const automation = await this.automationsRepository.createQueryBuilder('automations')
      .innerJoin('automations.users', 'users')
      .where('users.id = :userId', { userId })
      .andWhere('automations.id = :automationId', { automationId: connectDto.automationId })
      .getOne();

    if (!automation) {
      throw new NotFoundException(`Automation with id: ${connectDto.automationId} doesn't exist for userId: ${userId}.`);
    }

    const events = await this.eventsRepository.createQueryBuilder('events')
      .innerJoin('events.users', 'users')
      .where('users.id = :userId', { userId })
      .andWhere('events.id IN (:...eventIds)', { eventIds: connectDto.eventIds })
      .getMany();

    if (events.length !== connectDto.eventIds.length) {
      throw new NotFoundException(`Some of the event ID's doesn't exist for userId: ${userId}.`);
    }

    const relations = connectDto.eventIds.map(eventId => {
      return AutomationEventEntity.create({
        order: connectDto.order,
        automationId: automation.id,
        eventId: eventId,
      })
    });


    const res = await AutomationEventEntity.save(relations);

    if (res.length === 0) {
      // TODO: it doesn't work.
      throw new ConflictException('Record already exist.');
    }

    return relations;
  }

}
