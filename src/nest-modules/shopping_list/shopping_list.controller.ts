import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateShoppingListUsecase } from 'src/core/shopping_list/application/create_shopping_list.usecase';
import { GetFinalShoppingListByPurchaseIdUsecase } from 'src/core/shopping_list/application/get_final_shopping_list.usecase';
import { GetShoppingListByIdUsecase } from 'src/core/shopping_list/application/get_shopping_list_by_id.usecase';
import { GetShoppingListByUserIdUsecase } from 'src/core/shopping_list/application/get_shopping_list_by_user_id.usecase';
import { ShoppingListInput } from 'src/core/shopping_list/domain/shopping_list.schema';
import { AuthGuard } from '../auth/auth.guard';
import { AllowOwnerOrAdmin, ISessionData, Session } from '../common/decorators';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { AllowOwnerOrAdminGuard } from '../auth/check-is-admin-or-owner.guard';
import { CheckIsAdminGuard } from '../auth/check-is-admin.guard';

@UseGuards(AuthGuard)
@Controller('shopping-list')
export class ShoppingListController {
  @Inject('createShoppingListUsecase')
  private readonly createShoppingListUsecase: CreateShoppingListUsecase;

  @Inject('getShoppingListByUserIdUsecase')
  private readonly getShoppingListByUserIdUsecase: GetShoppingListByUserIdUsecase;

  @Inject('getShoppingListByIdUsecase')
  private readonly getShoppingListByIdUsecase: GetShoppingListByIdUsecase;

  @Inject('getFinalShoppingListByPurchaseIdUsecase')
  private readonly getFinalShoppingListByPurchaseIdUsecase: GetFinalShoppingListByPurchaseIdUsecase;

  @Inject('listShoppingListByPurchaseUsecase')
  private listShoppingListByPurchaseUsecase: GetFinalShoppingListByPurchaseIdUsecase;

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  @Post()
  async create(
    @Body() data: ShoppingListInput,
    @Session() session: ISessionData,
  ) {
    const cacheKey = `shopping-list:purchase:${data.purchaseId}`;
    const cacheKeyFinal = `shopping-list:purchase-final:${data.purchaseId}`;
    data.userId = session.user.id;
    await this.cacheManager.del(cacheKey);
    await this.cacheManager.del(cacheKeyFinal);
    return this.createShoppingListUsecase.execute(data);
  }

  @Get('user/:userId')
  @UseGuards(AllowOwnerOrAdminGuard)
  @AllowOwnerOrAdmin('userId')
  async getShoppingListByUserId(@Param('userId') userId: string) {
    return this.getShoppingListByUserIdUsecase.execute(userId);
  }

  @Get(':id')
  async getShoppingListById(@Param('id') id: string) {
    // criar logica de validar o id do usuario e criar cache
    return this.getShoppingListByIdUsecase.execute(id);
  }

  @UseGuards(CheckIsAdminGuard)
  @Get('purchase/:id/final')
  async getPurchaseByShoppingListId(@Param('id') id: string) {
    const cacheKey = `shopping-list:purchase-final:${id}`;
    const cachedShoppingList = await this.cacheManager.get(cacheKey);
    if (cachedShoppingList) {
      return cachedShoppingList;
    }
    const result =
      await this.getFinalShoppingListByPurchaseIdUsecase.execute(id);
    await this.cacheManager.set(cacheKey, result, 3600000);
    return result;
  }

  @UseGuards(CheckIsAdminGuard)
  @Get('purchase/:id')
  async getByPurchaseId(@Param('id') id: string) {
    const cacheKey = `shopping-list:purchase:${id}`;
    const cachedShoppingList = await this.cacheManager.get(cacheKey);
    if (cachedShoppingList) {
      return cachedShoppingList;
    }
    const result = await this.listShoppingListByPurchaseUsecase.execute(id);
    await this.cacheManager.set(cacheKey, result, 3600000);
    return result;
  }
}
