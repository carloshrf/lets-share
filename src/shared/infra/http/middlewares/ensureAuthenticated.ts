import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '../../../../config/auth';
import { AppError } from '../../../errors/AppError';

interface IPayload {
  sub: string;
}

export default function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('missing token', 401);

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, auth.secret_token) as IPayload;

    request.user = {
      id: sub,
    };

    next();
  } catch (err) {
    throw new AppError('invalid token', 401);
  }
}
