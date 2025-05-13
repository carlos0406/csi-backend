import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CardProviders } from './card.provider';
import { CardController } from './card.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [CardController],
  providers: [...CardProviders],
  exports: [],
})
export class CardModule {}
