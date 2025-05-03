import { UserRepository } from '../infra/user.repository';

export class SearchUserUsecase {
  constructor(private readonly repository: UserRepository) {}

  async execute() {
    return await this.repository.searchByName();
  }
}
