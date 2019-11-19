import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, BaseEntity } from 'typeorm';
// import { BaseEntity } from 'src/shared/base.entity';
import { Exclude } from 'class-transformer';
import { EventEntity } from 'src/events/event.entity';
import { AutomationEntity } from './automation.entity';

@Entity({ name: 'automations_events' })
export class AutomationEventEntity extends BaseEntity {
  @Column({ type: 'numeric' })
  order: number;

  @PrimaryColumn()
  eventId: string;

  @PrimaryColumn()
  automationId: string;

  @ManyToOne(type => EventEntity, event => event.automationEvents, { primary: true })
  @JoinColumn({ name: 'eventId' })
  event: Promise<EventEntity>;

  @ManyToOne(type => AutomationEntity, automation => automation.automationEvents, { primary: true })
  @JoinColumn({ name: 'automationId' })
  automation: Promise<AutomationEntity>;
}
