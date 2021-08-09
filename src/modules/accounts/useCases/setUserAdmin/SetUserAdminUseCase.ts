import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  isAdmin: boolean;
  userIdToAdmin: string;
}

@injectable()
class SetUserAdminUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({ user_id, isAdmin, userIdToAdmin }: IRequest): Promise<User> {
    if (user_id === userIdToAdmin)
      throw new AppError('you cannot change your own admin status');

    const user = await this.usersRepository.findById(userIdToAdmin);

    if (!user) {
      throw new AppError('user does not exists');
    }

    user.isAdmin = isAdmin;

    const response = await this.usersRepository.save(user);

    return response;
  }
}

export default SetUserAdminUseCase;
