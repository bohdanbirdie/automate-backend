import { AutomationsService } from './automations.service';
import { Controller, UseGuards, Post, Body, Request, Get, Patch } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateAutomationDto } from './dto/create-automation.dto';
import { AutomationZoneDto } from './dto/autiomation-zone.dto';

@Controller('automations')
export class AutomationsController {
  constructor(
    private readonly automationsService: AutomationsService,
  ) {};


  @UseGuards(AuthGuard())
  @Post()
  async createAutomation(@Body() createAutomationDto: CreateAutomationDto, @Request() req) {
    const newAutomation = await this.automationsService.createAutomation(createAutomationDto, req.user.userId);

    return newAutomation;
  }

  @UseGuards(AuthGuard())
  @Patch()
  async connectAutomationToZone(@Body() automationZoneDto: AutomationZoneDto, @Request() req) {
    const newAutomation = await this.automationsService.connectAutomationToZone(automationZoneDto,req.user.userId);

    return newAutomation;
  }

  @UseGuards(AuthGuard())
  @Get()
  async getAutomations(@Request() req) {
    const automations = await this.automationsService.getAutomations(req.user.userId);

    return automations;
  }
}
