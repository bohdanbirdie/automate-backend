import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import { Controller, Request, Post, UseGuards, Body, ForbiddenException } from '@nestjs/common';
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

  @Post('auth/register')
  async register(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOne(createUserDto.username);
    if (existingUser) {
      throw new ForbiddenException();
    }

    return this.usersService.addOne(createUserDto);
  }

  @Post('location')
  async location(@Body() loc: any) {
    console.log(loc);
  }
}