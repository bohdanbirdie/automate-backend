import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ZonesService } from './zones.service';
import { ZoneEntity } from './zone.entity';

@Controller('zones')
export class ZonesController {
  constructor(
    private readonly zonesService: ZonesService,
  ) {}

  @UseGuards(AuthGuard())
  @Get()
  async getProfile(@Request() req): Promise<ZoneEntity[]> {
    const zones = await this.zonesService.getZonesForUser(req.user.userId);

    return zones;
  }
  
}
