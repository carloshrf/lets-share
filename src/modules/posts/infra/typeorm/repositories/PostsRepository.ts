import { getRepository, Repository } from 'typeorm';

import ISavePostDTO from '../../../dtos/ISavePostDTO';
import IPostsRepository from '../../../repositories/IPostsRepository';
import Post from '../entities/Post';

class PostsRepository implements IPostsRepository {
  private repository: Repository<Post>;

  constructor() {
    this.repository = getRepository(Post);
  }

  async save({ id, content, title, user_id }: ISavePostDTO): Promise<Post> {
    if (!id) {
      const post = this.repository.create({ content, title, user_id });
      await this.repository.save(post);

      return post;
    }

    const post = await this.repository.save({ id, content, title });
    return post;
  }
  async findAll(): Promise<Post[]> {
    const posts = await this.repository.find({ relations: ['user'] });

    return posts;
  }
  async findPostById(id: string): Promise<Post> {
    const post = await this.repository.findOne({ id });

    return post;
  }
  async findPostsByUser(user_id: string): Promise<Post[]> {
    const posts = await this.repository.find({ user_id });

    return posts;
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default PostsRepository;
