import { ZoneEntity } from 'src/zones/zone.entity';
import { CreateAutomationDto } from './dto/create-automation.dto';
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/events/event.entity';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { AutomationEntity } from './automation.entity';
import { AutomationZoneDto } from './dto/autiomation-zone.dto';
import { AutomationZoneEntity } from 'src/automations/automation_zone.entity';
import { AutomationEventEntity } from './automation_event.entity';

@Injectable()
export class AutomationsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AutomationEntity)
    private readonly automationsRepository: Repository<AutomationEntity>,
    @InjectRepository(ZoneEntity)
    private readonly zonesRepository: Repository<ZoneEntity>,
    @InjectRepository(EventEntity)
    private readonly eventsRepository: Repository<EventEntity>,
  ) { };


  async createAutomation(createAutomationDto: CreateAutomationDto, userId: string): Promise<AutomationEntity[]> {
    const user = await this.userRepository.findOne({ id: userId });
    const { name, description } = createAutomationDto;
    console.log(createAutomationDto);

    const automation = await this.automationsRepository.save({ name, description, users: [user] });

    if (createAutomationDto.zones.length) {
      const zones = await this.zonesRepository.createQueryBuilder('zones')
        .innerJoin('zones.users', 'users')
        .where('users.id = :userId', { userId })
        .andWhere('zones.id IN (:...zonesIds)', { zonesIds: createAutomationDto.zones.map(zone => zone.zoneId) })
        .getMany();

      if (zones.length !== createAutomationDto.zones.length) {
        throw new NotFoundException(`Some of the zones ID's doesn't exist for userId: ${userId}.`);
      }

      const zonesRelations = createAutomationDto.zones.map(zone => {
        return AutomationZoneEntity.create({
          onEnter: zone.onEnter,
          onLeave: zone.onLeave,
          automationId: automation.id,
          zoneId: zone.zoneId,
        })
      });

      await AutomationZoneEntity.save(zonesRelations);
    }

    if (createAutomationDto.events.length) {

      const events = await this.eventsRepository.createQueryBuilder('events')
        .innerJoin('events.users', 'users')
        .where('users.id = :userId', { userId })
        .andWhere('events.id IN (:...eventIds)', { eventIds: createAutomationDto.events.map(event => event.eventId) })
        .getMany();

      if (events.length !== createAutomationDto.events.length) {
        throw new NotFoundException(`Some of the event ID's doesn't exist for userId: ${userId}.`);
      }

      const relations = createAutomationDto.events.map(event => {
        return AutomationEventEntity.create({
          order: event.order,
          automationId: automation.id,
          eventId: event.eventId,
        })
      });


      await AutomationEventEntity.save(relations);
    }
    const automations = await this.getAutomations(userId);

    return automations;
  }


  async connectAutomationToZone(connectDto: AutomationZoneDto, userId: string): Promise<AutomationZoneEntity[]> {
    const automation = await this.automationsRepository.createQueryBuilder('automations')
      .innerJoin('automations.users', 'users')
      .where('users.id = :userId', { userId })
      .andWhere('automations.id = :automationId', { automationId: connectDto.automationId })
      .getOne();

    if (!automation) {
      throw new NotFoundException(`Automation with id: ${connectDto.automationId} doesn't exist for userId: ${userId}.`);
    }

    const zones = await this.zonesRepository.createQueryBuilder('zones')
      .innerJoin('zones.users', 'users')
      .where('users.id = :userId', { userId })
      .andWhere('zones.id IN (:...zonesIds)', { zonesIds: connectDto.zonesIds })
      .getMany();

    if (zones.length !== connectDto.zonesIds.length) {
      throw new NotFoundException(`Some of the zones ID's doesn't exist for userId: ${userId}.`);
    }

    const relations = connectDto.zonesIds.map(zoneId => {
      return AutomationZoneEntity.create({
        onEnter: connectDto.onEnter,
        onLeave: connectDto.onLeave,
        automationId: automation.id,
        zoneId: zoneId,
      })
    });


    const res = await AutomationZoneEntity.save(relations);

    if (res.length === 0) {
      throw new ConflictException('Record already exist.');
    }

    return relations;
  }

  async getAutomations(userId: string): Promise<AutomationEntity[]> {
    const automations = await this.automationsRepository
    .createQueryBuilder('automations')
      .innerJoin('automations.users', 'users')
      .where('users.id = :userId', { userId })
      .leftJoinAndSelect('automations.automationEvents', 'automations_events')
      .leftJoinAndSelect('automations.automationZones', 'automations_zones')
      .getMany()

    return automations;
  }
}
