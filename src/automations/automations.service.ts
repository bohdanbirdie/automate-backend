import { CreateAutomationDto } from './dto/create-automation.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/events/event.entity';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { AutomationEntity } from './automation.entity';

@Injectable()
export class AutomationsService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AutomationEntity)
    private readonly automationsRepository: Repository<AutomationEntity>,
  ) {};


  async createAutomation(createAutomationDto: CreateAutomationDto, userId: string): Promise<AutomationEntity> {
    const user = await this.userRepository.findOne({ id: userId });

    const automation = this.automationsRepository.save({...createAutomationDto, users: [user]});

    return automation;
  }

  async getAutomations(userId: string): Promise<AutomationEntity[]> {
    const automations = await this.automationsRepository.createQueryBuilder('automations')
      .innerJoin('automations.users', 'users')
      .where('users.id = :userId', { userId }).getMany();

    return automations;
  }
}
