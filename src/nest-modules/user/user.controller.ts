import { Controller, Get, Inject } from '@nestjs/common';
import { SearchUserUsecase } from 'src/core/user/application/search_user.usecase';

@Controller('users')
export class UserController {
  @Inject('searchUserUsecase')
  private readonly searchUserUsecase: SearchUserUsecase;

  @Get()
  async searchCard() {
    return this.searchUserUsecase.execute();
  }
}
