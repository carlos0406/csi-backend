import { Inject, Injectable } from '@nestjs/common';
import { ISessionRepository } from 'src/core/user/domain/user_session.repository.interface';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UserSessionService {
  @Inject('sessionRepository')
  private readonly sessionRepository: ISessionRepository;

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  async getSessionById(id: string) {
    // const cacheKey = `user-session:${id}`;
    // const cachedSession = await this.cacheManager.get(cacheKey);
    // if (cachedSession) {
    //   return cachedSession;
    // }
    const session = await this.sessionRepository.findById(id);
    // await this.cacheManager.set(cacheKey, session, 2 * 60 * 60 * 1000);
    return session;
  }

  async checkIfIsAdminUser(id: string) {
    // const cacheKey = `user-session:${id}`;
    // const cachedSession = await this.cacheManager.get(cacheKey);
    // if (cachedSession) {
    //   return cachedSession;
    // }
    const session = await this.sessionRepository.findById(id);
    // await this.cacheManager.set(cacheKey, session, 2 * 60 * 60 * 1000);
    return session?.user?.roles.some((role) => role.role === 'admin');
  }
}
