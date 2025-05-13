import { Inject, Injectable } from '@nestjs/common';
import { SessionRepository } from 'src/core/user/infra/user_session.repository';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UserSessionService {
  @Inject('sessionRepository')
  private readonly sessionRepository: SessionRepository;

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
}
