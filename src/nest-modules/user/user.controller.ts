import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CheckIsAdminGuard } from '../auth/check-is-admin.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  @UseGuards(CheckIsAdminGuard)
  @Get('admin')
  async searchAdmin() {}
}
