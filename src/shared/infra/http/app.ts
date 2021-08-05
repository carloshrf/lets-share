import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import upload from '../../../config/upload';
import { AppError } from '../../errors/AppError';
import createConnection from '../typeorm';
import '../../container';
import router from './routes';

createConnection();
const app = express();

app.use('/images', express.static(`${upload.tmpFolder}/posts`));
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use(express.json());
app.use(router);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `internal server error - ${err.message}`,
    });
  }
);

export default app;
