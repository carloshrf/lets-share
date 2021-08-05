import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import IUserResponse from '../../dtos/IUserResponseDTO';
import UserMap from '../../mapper/UserMap';
import IUsersRepository from '../../repositories/IUsersRepository';

@injectable()
class ShowProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute(user_id: string): Promise<IUserResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user does not exists');
    }

    return UserMap.toDTO(user);
  }
}

export default ShowProfileUseCase;
