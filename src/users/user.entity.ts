import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/shared/base.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Exclude()
  @Column({ type: 'varchar', length: 200 })
  password: string;
}
