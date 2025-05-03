import { Inject, Injectable } from '@nestjs/common';
import { SessionRepository } from 'src/core/user/infra/user_session.repository';

@Injectable()
export class UserSessionService {
  @Inject('sessionRepository')
  private readonly sesssionRepository: SessionRepository;

  async getSessionById(id: string) {
    return await this.sesssionRepository.findById(id);
  }
}
