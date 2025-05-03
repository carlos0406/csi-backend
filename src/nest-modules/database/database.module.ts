import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [databaseProviders[0]],
})
export class DatabaseModule {}
