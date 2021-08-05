import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import Post from '../../infra/typeorm/entities/Post';
import IPostsRepository from '../../repositories/IPostsRepository';

interface IRequest {
  id: string;
  title: string;
  content: string;
  user_id: string;
}

@injectable()
class UpdatePostUseCase {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ) {}
  async execute({ id, title, content, user_id }: IRequest): Promise<Post> {
    const post = await this.postsRepository.findPostById(id);

    if (!post) throw new AppError('post does not exists');

    if (post.user_id !== user_id)
      throw new AppError(
        'the post only can be updated by the creator or admin user',
        401
      );

    const updatedPost = await this.postsRepository.save({
      id,
      title,
      content,
    });

    return updatedPost;
  }
}

export default UpdatePostUseCase;
