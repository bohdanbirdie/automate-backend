import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import { Controller, Request, Post, UseGuards, Body, ForbiddenException, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    console.log('Login');
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard())
  @Get('refresh')
  async refreshToken(@Request() req) {
    const token = this.authService.login(req.user);
    return token;
  }

  @Post('auth/register')
  async register(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOne(createUserDto.username);
    if (existingUser) {
      throw new ForbiddenException();
    }

    return this.usersService.addOne(createUserDto);
  }

  // @UseGuards(AuthGuard())
  // @Post('location')
  // async location(@Body() loc: any, @Request() req) {
  //   if (loc && loc.location && loc.location.event === 'geofence') {
  //     console.log(loc.location.geofence);
  //     console.log(req.user);
  //   }
  // }
}