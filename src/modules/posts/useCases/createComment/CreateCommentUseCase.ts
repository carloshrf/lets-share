import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import Comment from '../../infra/typeorm/entities/Comment';
import CommentsRepository from '../../infra/typeorm/repositories/CommentsRepository';
import PostsRepository from '../../infra/typeorm/repositories/PostsRepository';

interface IRequest {
  user_id: string;
  post_id: string;
  text: string;
  comment_reply_id: string;
}

@injectable()
class CreateCommentUseCase {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: CommentsRepository,
    @inject('PostsRepository')
    private postsRepository: PostsRepository
  ) {}

  async execute({
    post_id,
    user_id,
    text,
    comment_reply_id = null,
  }: IRequest): Promise<Comment> {
    const post = await this.postsRepository.findPostById(post_id);

    if (!post) {
      throw new AppError('post does not exists anymore', 400);
    }

    const comment = await this.commentsRepository.save({
      user_id,
      post_id,
      text,
      comment_reply_id,
    });

    return comment;
  }
}

export default CreateCommentUseCase;
