import { ZoneEntity } from 'src/zones/zone.entity';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ZoneEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
