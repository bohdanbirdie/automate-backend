import { ZoneEntity } from 'src/zones/zone.entity';
import { CreateZoneDto } from './../zones/dto/create-zone.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ZoneEntity)
    private readonly zonesRepository: Repository<ZoneEntity>,
  ) {}

  findOne(username: string ): Promise<UserEntity> {
    return this.userRepository.findOne({ username });
  }

  addOne(userPayload: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(userPayload);
  }

  async saveZone(zonePayload: CreateZoneDto, userId: string): Promise<ZoneEntity> {
    const existingZone = await this.zonesRepository.findOne({ uiId: zonePayload.uiId });
    if (existingZone) {
      throw new ConflictException(`Zone with uiId: ${zonePayload.uiId} already exist`);
    }
    const user = await this.userRepository.findOne({ id: userId });
    const zone = this.zonesRepository.create({...zonePayload, users: [user]});

    return this.zonesRepository.save(zone);
  }
}