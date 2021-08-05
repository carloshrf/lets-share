import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '../../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({ name, email, password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (user) {
      throw new AppError('User already exists');
    }

    const encryptedPassword = await hash(password, 8);

    const newUser = await this.usersRepository.save({
      name,
      email,
      password: encryptedPassword,
      isAdmin: false,
    });

    return newUser;
  }
}

export default CreateUserUseCase;
