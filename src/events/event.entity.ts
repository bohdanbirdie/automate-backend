import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';
import { AutomationEventEntity } from 'src/automations/automation_event.entity';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/users/user.entity';

@Entity({ name: 'events' })
export class EventEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Exclude()
  @OneToMany(type => AutomationEventEntity, automationEvent => automationEvent.event)
  automationEvents: Promise<AutomationEventEntity[]>;

  @Exclude()
  @ManyToMany(type => UserEntity, user => user.events)
  @JoinTable()
  users: UserEntity[];
}
