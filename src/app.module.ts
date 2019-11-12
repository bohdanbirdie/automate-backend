import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Connection } from 'typeorm';
import { configService } from './config/config.service';
import { ZonesModule } from './zones/zones.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ZonesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
