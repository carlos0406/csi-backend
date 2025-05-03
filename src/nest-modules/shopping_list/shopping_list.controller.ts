import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateShoppingListUsecase } from 'src/core/shopping_list/application/create_shopping_list.usecase';
import { GetFinalShoppingListByPurchaseIdUsecase } from 'src/core/shopping_list/application/get_final_shopping_list.usecase';
import { GetShoppingListByIdUsecase } from 'src/core/shopping_list/application/get_shopping_list_by_id.usecase';
import { GetShoppingListByUserIdUsecase } from 'src/core/shopping_list/application/get_shopping_list_by_user_id.usecase';
import { ShoppingListInput } from 'src/core/shopping_list/domain/shopping_list.schema';

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

  @Post()
  async create(@Body() data: ShoppingListInput) {
    return this.createShoppingListUsecase.execute(data);
  }

  @Get('user/:userId')
  async getShoppingListByUserId(@Param('userId') userId: string) {
    return this.getShoppingListByUserIdUsecase.execute(userId);
  }

  @Get(':id')
  async getShoppingListById(@Param('id') id: string) {
    return this.getShoppingListByIdUsecase.execute(id);
  }

  @Get('purchase/:id')
  async getPurchaseByShoppingListId(@Param('id') id: string) {
    return this.getFinalShoppingListByPurchaseIdUsecase.execute(id);
  }
}
