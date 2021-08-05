import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '../../../../config/auth';
import { AppError } from '../../../../shared/errors/AppError';
import IUsersRepository from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Email or password invalid');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError('Email or password invalid');

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });

    const response: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return response;
  }
}

export default AuthenticateUserUseCase;
