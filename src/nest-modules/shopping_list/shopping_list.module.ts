import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ShoppingListController } from './shopping_list.controller';
import { ShoppingListProviders } from './shopping_list.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ShoppingListController],
  providers: [...ShoppingListProviders],
  exports: [],
})
export class ShoppingListModule {}
