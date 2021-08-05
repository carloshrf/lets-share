import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import IUsersRepository from '../../../accounts/repositories/IUsersRepository';
import ICommentsRepository from '../../repositories/ICommentsRepository';
import IPostsRepository from '../../repositories/IPostsRepository';

interface IRequest {
  post_id: string;
  comment_id: string;
  user_id: string;
}

@injectable()
class DeleteCommentUseCase {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ post_id, comment_id, user_id }: IRequest): Promise<void> {
    const post = await this.postsRepository.findPostById(post_id);

    if (!post) {
      throw new AppError('post does not exists anymore');
    }

    const isAdmin = await this.usersRepository.isAdmin(user_id);

    if (post.user_id !== user_id && !isAdmin) {
      throw new AppError('only the comment writter can delete its own one');
    }

    const comments = await this.commentsRepository.findById(comment_id);

    if (!comments) throw new AppError('comment does not exists');

    await this.commentsRepository.delete(comment_id);
  }
}

export default DeleteCommentUseCase;
