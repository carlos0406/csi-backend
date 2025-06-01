import { IUserRepository } from '../domain/user.repository.interface';

export class SearchUserUsecase {
  constructor(private readonly repository: IUserRepository) {}

  async execute() {
    return await this.repository.searchByName();
  }
}
