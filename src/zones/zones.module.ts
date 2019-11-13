import { ZoneEntity } from './zone.entity';
import { Module } from '@nestjs/common';
import { ZonesController } from './zones.controller';
import { ZonesService } from './zones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([ZoneEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ZonesController],
  providers: [ZonesService]
})
export class ZonesModule {}
