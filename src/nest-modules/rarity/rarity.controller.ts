import { Controller, Get, Inject } from '@nestjs/common';
import { ListRaritiesUsecase } from 'src/core/rarity/application/list_rarities.usecase';
import { Public } from '../common/decorators';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('rarities')
export class RarityController {
  @Inject('listRaritiesUsecase')
  private readonly listRaritiesUsecase: ListRaritiesUsecase;

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  @Public()
  @Get()
  async listRarities() {
    const cacheKey = 'rarities';
    const cachedRarities = await this.cacheManager.get(cacheKey);
    if (cachedRarities) {
      return cachedRarities;
    }
    const rarities = await this.listRaritiesUsecase.execute();
    await this.cacheManager.set(cacheKey, rarities, 0);
    return rarities;
  }
}
