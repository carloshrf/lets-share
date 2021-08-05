import { inject, injectable } from 'tsyringe';

import IPostsResponseDTO from '../../dtos/IPostsResponseDTO';
import PostMap from '../../mapper/PostMap';
import IPostsRepository from '../../repositories/IPostsRepository';

@injectable()
class ListAllPostsUseCase {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ) {}

  async execute(): Promise<IPostsResponseDTO[]> {
    const allPosts = await this.postsRepository.findAll();

    const formatedPosts = allPosts.map((post) => PostMap.toDTO(post));

    return formatedPosts;
  }
}

export default ListAllPostsUseCase;
