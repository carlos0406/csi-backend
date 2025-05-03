import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PurchaseController } from './purchase.controller';
import { PurchaseProviders } from './purchase.provider';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [PurchaseController],
  providers: [...PurchaseProviders],
  exports: [],
})
export class PurchaseModule {}
