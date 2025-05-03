import { Module } from '@nestjs/common';
import { DatabaseModule } from './nest-modules/database/database.module';
import { CardModule } from './nest-modules/card/card.module';
import { UserModule } from './nest-modules/user/user.module';
import { PurchaseModule } from './nest-modules/purchase/purchase.module';
import { ShoppingListModule } from './nest-modules/shopping_list/shopping_list.module';
import { AuthModule } from './nest-modules/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    CardModule,
    UserModule,
    PurchaseModule,
    ShoppingListModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
