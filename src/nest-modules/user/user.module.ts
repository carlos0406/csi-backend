import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { UserProviders } from './user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...UserProviders],
  exports: [...UserProviders],
})
export class UserModule {}
