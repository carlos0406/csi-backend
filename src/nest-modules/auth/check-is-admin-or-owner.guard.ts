import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ALLOW_OWNER_OR_ADMIN_KEY } from '../common/decorators';

@Injectable()
export class AllowOwnerOrAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    const session = request['session'];
    if (!session?.user) {
      throw new UnauthorizedException();
    }

    const user = session.user;
    const isAdmin = user.roles?.includes('admin');

    const paramKey = this.reflector.get<string>(
      ALLOW_OWNER_OR_ADMIN_KEY,
      context.getHandler(),
    );

    if (!paramKey) {
      throw new Error('Missing metadata key for AllowOwnerOrAdmin');
    }

    const routeParams = request.params;
    const paramValue = routeParams[paramKey];

    if (isAdmin || user.id === paramValue) {
      return true;
    }

    throw new ForbiddenException();
  }
}
