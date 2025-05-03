import { SetMetadata } from '@nestjs/common';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/**
 * Custom decorator to extract session from request
 * Usage: @Session() session: any
 * Or with property path: @Session('user') user: any
 */

export interface ISessionUser {
  id: string;
  name: string;
  email: string;
}

export interface ISessionData {
  id: string;
  user: ISessionUser;
}

export const Session = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (!request.session) {
      return null;
    }

    if (data) {
      return data.split('.').reduce((obj, prop) => {
        return obj && obj[prop] !== undefined ? obj[prop] : null;
      }, request.session);
    }

    return request.session;
  },
);

export const SessionUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (!request.session || !request.session.user) {
      return null;
    }

    // If a specific user property is requested, return only that property
    if (data) {
      return data.split('.').reduce((obj, prop) => {
        return obj && obj[prop] !== undefined ? obj[prop] : null;
      }, request.session.user);
    }

    // Otherwise return the entire user object
    return request.session.user;
  },
);
