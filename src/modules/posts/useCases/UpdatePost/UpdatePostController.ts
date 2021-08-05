import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdatePostUseCase from './UpdatePostUseCase';

class UpdatePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, content } = request.body;
    const { id } = request.params;
    const user_id = request.user.id;

    const updatePostUseCase = container.resolve(UpdatePostUseCase);

    const post = await updatePostUseCase.execute({
      id,
      user_id,
      title,
      content,
    });

    return response.json(post);
  }
}

export default UpdatePostController;
