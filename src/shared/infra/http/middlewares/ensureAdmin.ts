import { NextFunction, Request, Response } from 'express';

import UsersRepository from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '../../../errors/AppError';

export default async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user.isAdmin)
    throw new AppError('user must have administrator privileges', 401);

  next();
}
