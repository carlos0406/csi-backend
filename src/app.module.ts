import { Module } from '@nestjs/common';
import { DatabaseModule } from './nest-modules/database/database.module';
import { CardModule } from './nest-modules/card/card.module';
import { UserModule } from './nest-modules/user/user.module';
import { PurchaseModule } from './nest-modules/purchase/purchase.module';
import { ShoppingListModule } from './nest-modules/shopping_list/shopping_list.module';
import { AuthModule } from './nest-modules/auth/auth.module';
import { RarityModule } from './nest-modules/rarity/rarity.module';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';

@Module({
  imports: [
    DatabaseModule,
    CardModule,
    UserModule,
    PurchaseModule,
    ShoppingListModule,
    AuthModule,
    RarityModule,
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
            }),
            createKeyv('redis://localhost:6379'),
          ],
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
