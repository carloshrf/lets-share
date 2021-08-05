import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeletePostUseCase from './DeletePostUseCase';

class DeletePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id: post_id } = request.params;

    const deletePostUseCase = container.resolve(DeletePostUseCase);

    await deletePostUseCase.execute({ user_id, post_id });

    return response.json();
  }
}

export default DeletePostController;
