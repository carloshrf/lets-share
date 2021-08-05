import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AddPostReactionUseCase from './AddPostReactionUseCase';

class AddPostReactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: post_id } = request.params;
    const user_id = request.user.id;
    const { reaction_id } = request.body;

    const addPostReactionUseCase = container.resolve(AddPostReactionUseCase);

    await addPostReactionUseCase.execute({ user_id, post_id, reaction_id });

    return response.status(201).json();
  }
}

export default AddPostReactionController;
