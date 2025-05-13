import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RarityProviders } from './rarity.provider';
import { RarityController } from './rarity.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [RarityController],
  providers: [...RarityProviders],
  exports: [],
})
export class RarityModule {}
