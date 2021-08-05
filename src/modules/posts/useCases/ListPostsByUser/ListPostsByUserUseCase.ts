import { inject, injectable } from 'tsyringe';

import IPostsResponseDTO from '../../dtos/IPostsResponseDTO';
import PostMap from '../../mapper/PostMap';
import IPostsRepository from '../../repositories/IPostsRepository';

@injectable()
class ListPostsByUserUseCase {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ) {}

  async execute(user_id: string): Promise<IPostsResponseDTO[]> {
    const allPosts = await this.postsRepository.findPostsByUser(user_id);

    const formatedPosts = allPosts.map((post) => PostMap.toDTO(post));

    return formatedPosts;
  }
}

export default ListPostsByUserUseCase;
