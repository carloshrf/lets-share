import { inject, injectable } from 'tsyringe';

import ICreatePostDTO from '../../dtos/ISavePostDTO';
import Post from '../../infra/typeorm/entities/Post';
import IPostsRepository from '../../repositories/IPostsRepository';

@injectable()
class CreatePostUseCase {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ) {}

  async execute({ content, title, user_id }: ICreatePostDTO): Promise<Post> {
    const post = await this.postsRepository.save({ content, title, user_id });

    return post;
  }
}

export default CreatePostUseCase;
