import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CheckIsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    if (!('session' in request)) {
      throw new UnauthorizedException();
    }

    const session = request['session'];
    const roles = session?.user?.roles || [];
    if (roles.indexOf('admin') === -1) {
      throw new ForbiddenException();
    }

    return true;
  }
}
