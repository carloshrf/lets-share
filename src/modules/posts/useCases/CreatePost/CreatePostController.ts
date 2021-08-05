import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePostUseCase from './CreatePostUseCase';

class CreatePostController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { content, title } = request.body;
    const user_id = request.user.id;

    const createPostUseCase = container.resolve(CreatePostUseCase);

    const post = await createPostUseCase.execute({ content, title, user_id });

    return response.json(post);
  }
}

export default CreatePostController;
