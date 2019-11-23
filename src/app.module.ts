import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import { configService } from './config/config.service';
import { ZonesModule } from './zones/zones.module';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { EventsModule } from './events/events.module';
import { AutomationsModule } from './automations/automations.module';
import { GeofencesModule } from './geofences/geofences.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ZonesModule,
    EventsModule,
    AutomationsModule,
    GeofencesModule,
  ],
  controllers: [AppController, EventsController],
  providers: [AppService, EventsService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
