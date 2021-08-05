import { Request, Response } from 'express';
import User from 'modules/accounts/infra/typeorm/entities/User';
import { container } from 'tsyringe';

import CreateUserUseCase from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body as User;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute(data);

    return response.json(user);
  }
}

export default CreateUserController;
