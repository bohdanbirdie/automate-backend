import { ZoneEntity } from './../zones/zone.entity';
import { UserEntity } from './../users/user.entity';
import { Entity, Column, OneToMany, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';
import { Exclude } from 'class-transformer';
import { AutomationEventEntity } from './automation_event.entity';
import { AutomationZoneEntity } from './automation_zone.entity';

@Entity({ name: 'automations' })
export class AutomationEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @OneToMany(type => AutomationEventEntity, automationEvent => automationEvent.automation)
  automationEvents: AutomationEventEntity[];
  
  @OneToMany(type => AutomationZoneEntity, automationZone => automationZone.automation)
  automationZones: AutomationZoneEntity[];

  @Exclude()
  @ManyToMany(type => UserEntity, user => user.automations)
  @JoinTable()
  users: UserEntity[];

  // @Exclude()
  // @ManyToMany(type => ZoneEntity, zone => zone.zones)
  // zones: ZoneEntity[];
}
