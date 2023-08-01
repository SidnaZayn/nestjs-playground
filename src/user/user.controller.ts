import { Controller, Get, UseGuards, Patch, Body, Query } from '@nestjs/common';
import { GetUser } from '@/auth/decorator';
import { JwtGuard } from '@/auth/guard';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('4. Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser() user: User, @Query() dto: EditUserDto) {
    return this.userService.editUser(user.id, dto);
  }
}
