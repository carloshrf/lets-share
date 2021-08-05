import { getRepository, Repository } from 'typeorm';

import IPostUserReaction from '../../../dtos/IPostUserReaction';
import ISaveReactedPostDTO from '../../../dtos/ISaveReactedPostDTO';
import IReactedPostsRepository from '../../../repositories/IReactedPostsRepository';
import ReactedPost from '../entities/ReactedPost';

class ReactedPostsRepository implements IReactedPostsRepository {
  private repository: Repository<ReactedPost>;

  constructor() {
    this.repository = getRepository(ReactedPost);
  }
  async save({
    id,
    reaction_id,
    user_id,
    post_id,
  }: ISaveReactedPostDTO): Promise<ReactedPost> {
    if (id) {
      const reactedPost = await this.repository.save({
        id,
        reaction_id,
        user_id,
        post_id,
      });
      return reactedPost;
    }

    const reactedPostObj = this.repository.create({
      reaction_id,
      user_id,
      post_id,
    });

    const reactedPost = await this.repository.save(reactedPostObj);

    return reactedPost;
  }

  async findByPostId(post_id: string): Promise<ReactedPost[]> {
    const reactedPost = await this.repository.find({ post_id });

    return reactedPost;
  }

  async findPostUserReaction({
    post_id,
    user_id,
  }: IPostUserReaction): Promise<ReactedPost> {
    const reaction = await this.repository.findOne({
      where: { post_id, user_id },
    });

    return reaction;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default ReactedPostsRepository;
