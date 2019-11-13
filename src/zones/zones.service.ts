import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { ZoneEntity } from './zone.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(ZoneEntity)
    private readonly zonesRepository: Repository<ZoneEntity>,
  ) {}

  async getZonesForUser(userId: string): Promise<ZoneEntity[]> {
    const zones = await this.zonesRepository.createQueryBuilder('zones')
      .leftJoin('zones.users', 'users')
      .where('users.id = :userId', { userId }).getMany();

    return zones;
  }
  
}
