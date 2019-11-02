import { UserEntity } from './users/user.entity';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import { Controller, Request, Post, UseGuards, Get, Body, ForbiddenException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
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
  
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard())
  @Get('profile')
  async getProfile(@Request() req): Promise<UserEntity> {
    const existingUser = await this.usersService.findOne(req.user.username);
    return existingUser;
  }
}