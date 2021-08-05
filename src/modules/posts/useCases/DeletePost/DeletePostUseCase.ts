import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import IUsersRepository from '../../../accounts/repositories/IUsersRepository';
import IPostsRepository from '../../repositories/IPostsRepository';

interface IRequest {
  post_id: string;
  user_id: string;
}

@injectable()
class DeletePostUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ) {}
  async execute({ post_id, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);
    const post = await this.postsRepository.findPostById(post_id);

    if (user.id === post.user_id || user.isAdmin) {
      await this.postsRepository.delete(post_id);

      return;
    }

    throw new AppError(
      'the post only can be deleted by the creator or admin user',
      401
    );
  }
}

export default DeletePostUseCase;
