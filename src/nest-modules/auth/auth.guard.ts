import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserSessionService } from './user_sessionn.service';
import { IS_PUBLIC_KEY } from '../common/decorators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userSessionService: UserSessionService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType() !== 'http') {
      return true;
    }

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request: Request = context.switchToHttp().getRequest();
    const session = this.extractSesssionId(request);
    if (!session && !isPublic) {
      throw new UnauthorizedException();
    }
    try {
      const user_sesssion =
        await this.userSessionService.getSessionById(session);

      if (!user_sesssion) {
        throw new UnauthorizedException('Session not found');
      }

      request['session'] = {
        id: String(user_sesssion.id || ''),
        user: {
          id: String(user_sesssion.user.id || ''),
          name: String(user_sesssion.user.name || ''),
          email: String(user_sesssion.user.email || ''),
          roles: user_sesssion.user.roles
            ? user_sesssion.user.roles.map((role) => String(role.role))
            : [],
        },
      };
    } catch (error) {
      console.error('Authentication error:', error);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractSesssionId(request: Request): string | undefined {
    const cookies = request.cookies;

    const sessionId =
      cookies?.['__Secure-next-auth.session-token'] ||
      cookies?.['next-auth.session-token'];

    return sessionId;
  }
}
