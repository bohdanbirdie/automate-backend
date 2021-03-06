import { AutomationEntity } from './../automations/automation.entity';
import { UserEntity } from './../users/user.entity';
import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';
import { Exclude } from 'class-transformer';
import { AutomationZoneEntity } from 'src/automations/automation_zone.entity';

@Entity({ name: 'zones' })
export class ZoneEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  identifier: string;

  @Column({ type: 'varchar', length: 100 })
  uiId: string;

  @Column({ type: 'numeric' })
  radius: number;

  @Column({ type: 'numeric' })
  latitude: number;

  @Column({ type: 'numeric' })
  longitude: number;

  @Column({ type: 'boolean' })
  notifyOnEntry: boolean;
  
  @Column({ type: 'boolean' })
  notifyOnExit: boolean;

  @Column({ type: 'boolean' })
  notifyOnDwell: boolean;

  @Column({ type: 'integer', nullable: true })
  loiteringDelay?: number;

  @Exclude()
  @ManyToMany(type => UserEntity, user => user.zones)
  @JoinTable()
  users: UserEntity[];

  @OneToMany(type => AutomationZoneEntity, automationZone => automationZone.zone)
  automationZones: Promise<AutomationZoneEntity[]>;
}
