import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteCommentUseCase from './DeleteCommentUseCase';

class DeleteCommentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.query;
    const { comment_id } = request.params;
    const user_id = request.user.id;

    const deleteCommentUseCase = container.resolve(DeleteCommentUseCase);

    await deleteCommentUseCase.execute({
      comment_id,
      post_id: String(post_id),
      user_id,
    });

    return response.status(204).json();
  }
}

export default DeleteCommentController;
