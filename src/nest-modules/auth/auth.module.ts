import { Module } from '@nestjs/common';
import { UserSessionService } from './user_sessionn.service';
import { AuthGuard } from './auth.guard';
import { DatabaseModule } from '../database/database.module';
import { SesssionProviders } from './session.provider';
import { CheckIsAdminGuard } from './check-is-admin.guard';
import { AllowOwnerOrAdminGuard } from './check-is-admin-or-owner.guard';

@Module({
  providers: [
    UserSessionService,
    AuthGuard,
    CheckIsAdminGuard,
    AllowOwnerOrAdminGuard,
    ...SesssionProviders,
  ],
  exports: [
    UserSessionService,
    AuthGuard,
    CheckIsAdminGuard,
    AllowOwnerOrAdminGuard,
  ],
  imports: [DatabaseModule],
})
export class AuthModule {}
