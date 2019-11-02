import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  findOne(username: string ): Promise<UserEntity> {
    return this.userRepository.findOne({ username });
  }

  addOne(userPayload: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(userPayload);
  }
}