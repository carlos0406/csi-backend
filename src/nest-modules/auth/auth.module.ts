import { Module } from '@nestjs/common';
import { UserSessionService } from './user_sessionn.service';
import { AuthGuard } from './auth.guard';
import { DatabaseModule } from '../database/database.module';
import { SesssionProviders } from './session.provider';

@Module({
  providers: [UserSessionService, AuthGuard, ...SesssionProviders],
  exports: [UserSessionService, AuthGuard],
  imports: [DatabaseModule],
})
export class AuthModule {}
