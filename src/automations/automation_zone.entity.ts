import { IsNotEmpty } from 'class-validator';
import { ZoneEntity } from 'src/zones/zone.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, BaseEntity, IsNull } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AutomationEntity } from './automation.entity';

@Entity({ name: 'automations_zones' })
export class AutomationZoneEntity extends BaseEntity {
  @IsNotEmpty()
  @Column({ type: 'boolean' })
  onEnter: boolean;

  @IsNotEmpty()
  @Column({ type: 'boolean' })
  onLeave: boolean;

  @PrimaryColumn()
  zoneId: string;

  @PrimaryColumn()
  automationId: string;

  @ManyToOne(type => ZoneEntity, event => event.automationZones, { primary: true })
  @JoinColumn({ name: 'zoneId' })
  zone: Promise<ZoneEntity>;

  @ManyToOne(type => AutomationEntity, automation => automation.automationZones, { primary: true })
  @JoinColumn({ name: 'automationId' })
  automation: Promise<AutomationEntity>;
}
