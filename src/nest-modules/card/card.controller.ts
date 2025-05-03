import { Controller, Get, Inject, Query } from '@nestjs/common';
import { SearchCardUsecase } from 'src/core/card/application/search_card.usecase';

@Controller('cards')
export class CardController {
  @Inject('searchCardUsecase')
  private readonly searchCardUsecase: SearchCardUsecase;

  @Get()
  async searchCard(@Query('name') name: string = '') {
    return this.searchCardUsecase.execute(name);
  }
}
