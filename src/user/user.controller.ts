// src/user/user.controller.ts
import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles('admin')
  async deleteUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
