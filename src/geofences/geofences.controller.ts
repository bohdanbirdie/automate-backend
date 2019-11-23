import { GeofencesService } from './geofences.service';
import { Controller, UseGuards, Post, Body, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('geofences')
export class GeofencesController {
  constructor(
    private readonly geofencesService: GeofencesService,
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  async location(@Body() loc: any, @Request() req) {
    this.geofencesService.handleGeofenceEvent(loc, req.user.userId);
  }
}
