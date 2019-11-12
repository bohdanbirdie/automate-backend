import { Controller, UseGuards, Get, Request, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';
import { CreateZoneDto } from 'src/zones/dto/create-zone.dto';
import { ZonesService } from 'src/zones/zones.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard())
  @Get('profile')
  async getProfile(@Request() req): Promise<UserEntity> {
    const existingUser = await this.usersService.findOne(req.user.username);
    return existingUser;
  }

  @UseGuards(AuthGuard())
  @Post('zone')
  async saveZone(@Body() createZoneDto: CreateZoneDto, @Request() req) {
    const newZone = await this.usersService.saveZone(createZoneDto, req.user.userId);
    return newZone;
  }
}
