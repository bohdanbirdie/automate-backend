import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from './../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/config/config.service';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: configService.getJWTSecret(),
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
