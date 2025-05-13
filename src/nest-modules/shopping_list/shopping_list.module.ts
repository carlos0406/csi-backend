import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ShoppingListController } from './shopping_list.controller';
import { ShoppingListProviders } from './shopping_list.provider';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ShoppingListController],
  providers: [...ShoppingListProviders],
  exports: [],
})
export class ShoppingListModule {}
