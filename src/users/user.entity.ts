import { Entity, Column, ManyToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/shared/base.entity';
import { ZoneEntity } from 'src/zones/zone.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Exclude()
  @Column({ type: 'varchar', length: 200 })
  password: string;

  @Exclude()
  @ManyToMany(type => ZoneEntity, zone => zone.users)
  zones: ZoneEntity[];
}
