import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCommentUseCase from './CreateCommentUseCase';

class CreateCommentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { text, comment_reply_id } = request.body;
    const user_id = request.user.id;
    const { post_id } = request.params;

    const createCommentUseCase = container.resolve(CreateCommentUseCase);
    const comment = await createCommentUseCase.execute({
      user_id,
      text,
      post_id,
      comment_reply_id,
    });

    return response.json(comment);
  }
}

export default CreateCommentController;
