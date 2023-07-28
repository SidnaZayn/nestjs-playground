import { Controller, Get, UseGuards, Patch, Body } from '@nestjs/common';
import { GetUser } from '@/auth/decorator';
import { JwtGuard } from '@/auth/guard';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser() user: User, @Body() dto: EditUserDto) {
    return this.userService.editUser(user.id, dto);
  }
}
