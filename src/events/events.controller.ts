import { EventsToAutomationDto } from './dto/event-to-autiomation.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';
import { Controller, UseGuards, Post, Body, Request, Get, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService
  ) {}

  @UseGuards(AuthGuard())
  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto, @Request() req) {
    const newEvent = await this.eventsService.createEvent(createEventDto, req.user.userId);

    return newEvent;
  }

  @UseGuards(AuthGuard())
  @Get()
  async getEvents(@Request() req) {
    const events = await this.eventsService.getEvents(req.user.userId);

    return events;
  }

  @UseGuards(AuthGuard())
  @Patch()
  async connectToAutomation(@Body() eventToAutomationDto: EventsToAutomationDto, @Request() req) {
    return await this.eventsService.connectToAutomation(eventToAutomationDto, req.user.userId);
  }

}
