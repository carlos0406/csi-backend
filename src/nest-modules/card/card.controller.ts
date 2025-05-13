import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { SearchCardUsecase } from 'src/core/card/application/search_card.usecase';

@Controller('cards')
export class CardController {
  @Inject('searchCardUsecase')
  private readonly searchCardUsecase: SearchCardUsecase;

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  @Get()
  async searchCard(@Query('name') name: string = '') {
    const cacheKey = `cards:${name}`;
    const cachedCards = await this.cacheManager.get(cacheKey);
    if (cachedCards) {
      return cachedCards;
    }
    const cards = await this.searchCardUsecase.execute(name);
    await this.cacheManager.set(cacheKey, cards, 0);
    return cards;
  }
}
